import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';



@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor() { }

  availableExercises: Exercise[] = [
    { name: 'Crunches', id: 'crunches', duration: 30, calories: 8 },
    { name: 'Touch Toes', id: 'touch-toes', duration: 180, calories: 15 },
    { name: 'Side Lunges', id: 'side-lunges', duration: 120, calories: 18 },
    { name: 'Burpees', id: 'burpees', duration: 60, calories: 8 },
  ];

  private runningExercise: Exercise
  private exercices: Exercise[] = []

  getAvailableExercises() {
    return this.availableExercises.slice()
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    )
  }
}
