import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';

export interface Exercice {
  title: string,
  value: string
}

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {

  exercices: Exercice[] = [
    { title: 'Crunches', value: 'crunches' },
    { title: 'Touch Toes', value: 'touch-toes' },
    { title: 'Side Lunges', value: 'side-lunges' },
    { title: 'Burpees', value: 'burpees' },
  ];

  @Output() trainingStart = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onStartTraining() {
    this.trainingStart.emit()
  }

}
