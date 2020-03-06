import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter()
  progress = 0
  timer: ReturnType<typeof setInterval>
  time = 15

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
    this.startOrResumeTimer(this.time)
  }

  onStop() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {data: {
      progress: this.progressRounded
    }})
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.trainingExit.emit()
      } else {
        this.startOrResumeTimer(this.time)
      }
    })
  }

  private startOrResumeTimer(timeInSecond: number) {
    this.timer = setInterval(() => {
      const refresh = 200
      const coeff = 100 / ((1000/refresh) * timeInSecond)
      this.progress = this.progress + coeff
      if (this.progress >= 100) {
        clearInterval(this.timer)
        this.progress = 100
      }
    }, 200)
  }

  get progressRounded() {
    return Math.round(this.progress)
  }

}
