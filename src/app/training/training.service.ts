import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  exerciseChange = new Subject<Exercise>()
  exercisesChange = new Subject<Exercise[]>()
  finisedExercisesChanged = new Subject<Exercise[]>()
  private availableExercises: Exercise[] = []
  private runningExercise: Exercise
  private fbSubs: Subscription[] = []


  constructor(private db: AngularFirestore) { }

  fetchAvailableExercises() {
    this.fbSubs.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(action => {
            const id = action.payload.doc.id
            const data = action.payload.doc.data() as Exercise
            return { id, ...data }
          })
        })
      ).subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises
        this.exercisesChange.next([...this.availableExercises])
      }))
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    )
    this.exerciseChange.next({ ...this.runningExercise })
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    })
    this.runningExercise = null
    this.exerciseChange.next(null)
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
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

  fetchCompletedOrCancelledExercises() {
    this.fbSubs .push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finisedExercisesChanged.next(exercises)
      }))
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
  }
}
