import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  maxDate: Date
  hide: boolean

  constructor() { }

  ngOnInit() {
    this.maxDate = new Date()
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 13)
    this.hide = true
  }

  //template driven technique 
  onSubmit(form: NgForm) {
    console.log(form)
  }

}
