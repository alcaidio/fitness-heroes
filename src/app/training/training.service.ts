import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';
import * as UI from '../shared/ui.actions';
import { Exercise } from './exercise.model';
import * as Training from './store/training.actions';
import * as fromTraining from './store/training.reducer';

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


  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) { }

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true)
    this.fbSubs.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(actions => {
          // throw (new Error())
          return actions.map(action => {
            const id = action.payload.doc.id
            const data = action.payload.doc.data() as Exercise
            return { id, ...data }
          })
        })
      ).subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading())
        this.store.dispatch(new Training.SetAvailableTrainings(exercises))
      }, error => {
        this.store.dispatch(new UI.StopLoading())
        this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000)
        this.exercisesChange.next(null)
      }))
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    )
    this.store.dispatch(new Training.StartTraining(selectedId))
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      })
      this.store.dispatch(new Training.StopTraining())
    })
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      })
      this.store.dispatch(new Training.StopTraining())
    })
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new Training.SetFinishedTrainings(exercises))
      }))
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
  }
}
