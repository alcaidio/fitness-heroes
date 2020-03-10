import { TrainingService } from './../training/training.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>()
  private user: User = null
  private isAuthenticated: boolean = false

  constructor(
    private router: Router, 
    private angularFireAuth: AngularFireAuth,
    private trainingService: TrainingService
  ) {}

  initAuthListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if(user) {
        this.isAuthenticated = true
        this.authChange.next(true)
        this.router.navigate(['/training'])
      } else {
        this.trainingService.cancelSubscriptions()
        this.authChange.next(false)
        this.router.navigate(['/login'])
        this.isAuthenticated = false
      }
    })
  }

  registerUser(authData: AuthData) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => { 
        console.log(result);
      })
      .catch(error => console.log(error))
  }

  login(authData: AuthData) {
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => { 
        console.log(result);
      })
      .catch(error => console.log(error))
  }

  logout() {
    this.angularFireAuth.signOut()
  }

  isAuth() {    
    return this.isAuthenticated
  }
  
}
