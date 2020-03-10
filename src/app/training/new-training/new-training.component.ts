import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Exercise } from '../exercise.model';
import { TrainingService } from './../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[]
  isLoading = true
  private loadingSubscription: Subscription
  private exerciseSubscription: Subscription

  constructor(private trainingService: TrainingService, private uiService: UIService) { }

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading
    })
    this.exerciseSubscription = this.trainingService.exercisesChange.subscribe(exercises => {
      this.exercises = exercises
    })
    this.fetchExersises()
  }

  fetchExersises() {
    this.trainingService.fetchAvailableExercises()
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe()
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe()
    }
  }

}
