import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as Auth from '../auth/store/auth.actions';
import * as UI from '../shared/ui.actions';
import { UIService } from './../shared/ui.service';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) { }

  initAuthListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated())
        this.router.navigate(['/training'])
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated())
        this.router.navigate(['/login'])
      }
    })
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading())
    this.angularFireAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading())
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading())
        this.uiService.showSnackbar(error.message, null, 3000)
      })
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading())
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading())
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading())
        this.uiService.showSnackbar(error.message, null, 3000)
      })
  }

  logout() {
    this.angularFireAuth.signOut()
  }

}
