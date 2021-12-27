import { Component, OnInit, /* EventEmitter, Output */ } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RequestService } from 'src/app/services/RequestService';
import { BewerberDokuData } from '../attacheddoku.model';
import { BinarydokuService } from '../binarydoku.service';

@Component({
  selector: 'app-showdokus',
  templateUrl: './showdokus.component.html',
  styleUrls: ['./showdokus.component.css']
})
export class ShowdokusComponent implements OnInit {

  // @Output() trainingStart = new EventEmitter<void>();
  bewerberdoku: BewerberDokuData[] = [];

  loading: boolean = false;
  errorMessage: string = '';
  url: string = '';

  constructor(private binarydokuService: BinarydokuService,
              private requestService: RequestService) {
              }

  ngOnInit(): void {
    this.bewerberdoku = this.binarydokuService.getAvailableDokus();
  }

  onFetchDokument(form: NgForm) {

    console.log(form);
    console.log(form.value.urltodoku);

    this.loading = true;
    this.errorMessage = "";
    this.url = "";

    // Jetzt müssen wir einen Request an das Backend absetzen, um die binären Daten des selektierten Dokumentes zu holen
    // Der anzuspreechend Endpunkt ist: Get files/{id}
    this.requestService.getDokuBinary(form.value.urltodoku)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          // this.repos = response;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error: ' + error.message);
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   //complete() callback
          console.error('Request completed')      //This is actually not needed
          this.loading = false;
        })

    // this.trainingStart.emit(); nicht mehr notwendig, da man jetzt automatisch starte, wenn in der Listbox eine Übunrg ausgewählt wurde
    // this.binarydokuService.startExercise(form.value.urltodoku);
  }
}

