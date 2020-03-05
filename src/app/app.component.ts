import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  openSidenav = false
  navLinks = [
    { title: 'Signup', href: '/signup', icon: 'face' },
    { title: 'Login', href: '/login', icon: 'input' },
    { title: 'Training', href: '/training', icon: 'fitness_center' },
    { title: 'Logout', href: '/logout', icon: 'eject' },
  ]
}
