import { Subject } from 'rxjs'
import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  exerciseChange = new Subject<Exercise>()

  private availableExercises: Exercise[] = [
    { name: 'Crunches', id: 'crunches', duration: 30, calories: 8 },
    { name: 'Touch Toes', id: 'touch-toes', duration: 180, calories: 15 },
    { name: 'Side Lunges', id: 'side-lunges', duration: 120, calories: 18 },
    { name: 'Burpees', id: 'burpees', duration: 60, calories: 8 },
  ];

  private runningExercise: Exercise
  private exercises: Exercise[] = []

  getAvailableExercises() {
    return this.availableExercises.slice()
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    )
    this.exerciseChange.next({ ...this.runningExercise })
  }

  completeExercise() {
    this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' })
    this.runningExercise = null 
    this.exerciseChange.next(null)
  }

  cancelExercise(progress: number) {
    this.exercises.push({ 
      ...this.runningExercise, 
      duration: this.runningExercise.duration * (progress / 100), 
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(), 
      state: 'cancelled' 
    })
    this.runningExercise = null 
    this.exerciseChange.next(null)
  }

  getRunningExercise() {
    return { ...this.runningExercise }
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice()
  }
}
