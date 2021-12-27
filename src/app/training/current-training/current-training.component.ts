import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';
import { Exercise } from '../../training/exercise.model';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  // im Verlauf des Turotrials wird jetzt andere Methode eingeführt: (training.service.ts)
  // @Output() trainingExit = new EventEmitter();
  progress = 0;
  timerID: any;
  exercise: Exercise;

  constructor(private dialog: MatDialog, private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exercise = this.trainingService.getRunningExercise();
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {

    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;

    this.timerID = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timerID);
      }
    }, step);
  }

  onStop () {
    clearInterval(this.timerID);

    // Man bekommt aufgrund des open()-Befehls eine Referenz auf den kleinen Ja/Nein-Dialog zurück
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    // die Methoder afterClosed() ist ein Observable, das wir gleich subscriben, um
    // den Moment zu fangen, wenn der Dialog wieder geschlossen ist. Es wird mitgegeben, ob
    // mit Ja oder Nein der Dialog verlassen wurde und hier entsprechwend ausgewertet.
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result =='true') {
        // Ja, man will das Training beenden (im Verlauf des Turotrials wird jetzt andere Methode eingeführt: training.service.ts)
        // this.trainingExit.emit();
        this.trainingService.cancelExercise(this.progress)
      } else {
        // Nein, die Trainingsuhr soll weiter laufen
        this.startOrResumeTimer();
      }
    })
  }
}
