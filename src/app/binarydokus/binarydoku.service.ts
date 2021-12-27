import { Subject } from "rxjs";
import { BewerberDokuData } from "./attacheddoku.model";

/*
{
"name": "Know_MySQL.docx",
"url": "http://localhost:8081/files/428ecca1-db22-4a12-bcdc-277b9a9c0925",
"type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
"size": 412251
},
{
"name": "Amazon-S3-Tutorial.pdf",
"url": "http://localhost:8081/files/479e43fa-c5f1-4074-8b26-f9286c3420f4",
"type": "application/pdf",
"size": 710356
},
{
"name": "Alexia-Nedelcu-scaled.jpg",
"url": "http://localhost:8081/files/79eb833d-db22-45c6-b1f3-58bb050fa6c5",
"type": "image/jpeg",
"size": 419505
}
*/

export class BinarydokuService {
  exerciseChanged = new Subject<BewerberDokuData>();

  private availableDokus: BewerberDokuData[] = [
    {name: 'Know_MySQL.docx', url: 'http://localhost:8081/files/428ecca1-db22-4a12-bcdc-277b9a9c0925', type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', size: 412251 },
    {name: 'Amazon-S3-Tutorial.pdf', url: 'http://localhost:8081/files/479e43fa-c5f1-4074-8b26-f9286c3420f4', type: 'application/pdf', size: 710356 },
    {name: 'Alexia-Nedelcu-scaled.jpg', url: 'http://localhost:8081/files/79eb833d-db22-45c6-b1f3-58bb050fa6c5', type: 'image/jpeg', size: 419505 },
  ];

  private selectedDoku: BewerberDokuData;
  private dokus: BewerberDokuData[] = [];

  getAvailableDokus() {
    return this.availableDokus.slice(); // Durch slice wird eine echte Kopie erstellt
  }

  startExercise(selectedId: string) {
    const tmpDoku = this.availableDokus.find(ex => ex.name === selectedId) ;
    this.selectedDoku = tmpDoku!;
    this.exerciseChanged.next({ ...this.selectedDoku});
  }

  // mit dem spread-Operator, kann man ein Objekt lelicht um wietere Properties erweitern.
  completeExercise() {
    this.dokus.push( {
      ...this.selectedDoku,
      date: new Date(),
      state: 'completed'
    });

    this.selectedDoku = null;
    this.exerciseChanged.next(null);

  }

  cancelExercise(progress: number) {
    this.dokus.push( {
      ...this.selectedDoku,
      duration: this.selectedDoku.size * (progress / 100),
      calories: this.selectedDoku.size * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });

    this.selectedDoku = null;
    this.exerciseChanged.next(null);

  }

  getRunningExercise () {
    return { ...this.selectedDoku };
  }

  getCompletedOrCancelledExercises()  {
    return this.dokus.slice();
  }
}

