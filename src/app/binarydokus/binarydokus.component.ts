import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BinarydokuService } from './binarydoku.service';
// import { RequestService } from '../services/RequestService';


@Component({
  selector: 'app-binarydokus',
  templateUrl: './binarydokus.component.html',
  styleUrls: ['./binarydokus.component.css']
})
export class BinarydokusComponent implements OnInit {

  ongoingTraining = false;
  exerciseSubscription: Subscription;

  constructor(private binarydokuService: BinarydokuService) { }

  ngOnInit(): void {
    // wird gefeuert, wenn eine neue Exercise angestossen wird
    this.exerciseSubscription = this.binarydokuService.exerciseChanged.subscribe(ex => {

      if (ex) {
        this.ongoingTraining = true;
      } else {
        this.ongoingTraining = false;
      }

    });
  }

}

