import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";

export class TrainingService {
  exerciseChanged = new Subject<Exercise>();

  private availableExercises: Exercise[] = [
    {id: 'crunches', name: 'Bauchmuskel', duration: 30, calories: 8 },
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    {id: 'burpees', name: 'Bizeps', duration: 60, calories: 8 },
  ];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];

  getAvailableExercises() {
    return this.availableExercises.slice(); // Durch slice wird eine echte Kopie erstellt
  }

  startExercise(selectedId: string) {
    const tmpExercise = this.availableExercises.find(ex => ex.id === selectedId) ;
    this.runningExercise = tmpExercise!;
    this.exerciseChanged.next({ ...this.runningExercise});
  }

  // mit dem spread-Operator, kann man ein Objekt lelicht um wietere Properties erweitern.
  completeExercise() {
    this.exercises.push( {
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);

  }

  cancelExercise(progress: number) {
    this.exercises.push( {
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });

    this.runningExercise = null;
    this.exerciseChanged.next(null);

  }

  getRunningExercise () {
    return { ...this.runningExercise };
  }

  getCompletedOrCancelledExercises()  {
    return this.exercises.slice();
  }
}

