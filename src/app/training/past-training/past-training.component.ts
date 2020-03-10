import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Exercise } from './../exercise.model';
import { TrainingService } from './../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  displayedColumns: string[] = ['name', 'duration', 'calories', 'state', 'date']
  dataSource = new MatTableDataSource<Exercise>()

  private trainingSubscription: Subscription

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingSubscription = this.trainingService.finisedExercisesChanged
      .subscribe((exercises: Exercise[]) => {
        this.dataSource.data = exercises
      })
    this.trainingService.fetchCompletedOrCancelledExercises()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.trainingSubscription) {
      this.trainingSubscription.unsubscribe()
    }
  }

}
