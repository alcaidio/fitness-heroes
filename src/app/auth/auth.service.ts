import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as fromApp from '../app.reducer';
import { UIService } from './../shared/ui.service';
import { TrainingService } from './../training/training.service';
import { AuthData } from './auth-data.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>()
  private isAuthenticated: boolean = false

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<{ ui: fromApp.State }>
  ) { }

  initAuthListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
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
    // this.uiService.loadingStateChanged.next(true)
    this.store.dispatch({ type: 'START_LOADING' })
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch({ type: 'STOP_LOADING' })
        // this.uiService.loadingStateChanged.next(false)
      })
      .catch(error => {
        this.store.dispatch({ type: 'STOP_LOADING' })
        // this.uiService.loadingStateChanged.next(false)
        this.uiService.showSnackbar(error.message, null, 3000)
      })
  }

  login(authData: AuthData) {
    this.store.dispatch({ type: 'START_LOADING' })
    // this.uiService.loadingStateChanged.next(true)
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch({ type: 'STOP_LOADING' })
        // this.uiService.loadingStateChanged.next(false)
      })
      .catch(error => {
        this.store.dispatch({ type: 'STOP_LOADING' })
        // this.uiService.loadingStateChanged.next(false)
        this.uiService.showSnackbar(error.message, null, 3000)
      })
  }

  logout() {
    this.angularFireAuth.signOut()
  }

  isAuth() {
    return this.isAuthenticated
  }

}
