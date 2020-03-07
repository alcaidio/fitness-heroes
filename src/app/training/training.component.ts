import { TrainingService } from './training.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit, OnDestroy {
  onGoingTraining = false
  exerciseSubscription: Subscription

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChange.subscribe(
      exercise => {
        if(exercise) {
          this.onGoingTraining = true
        } else {
          this.onGoingTraining = false
        }
      }
    )
  }

  ngOnDestroy() {

  }

}
