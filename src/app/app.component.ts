import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DatabaseService } from './core/db-service/database.service';
import { AuthService } from './core/auth-service/auth.service';
import { StateExpService } from './core/state-service/state-exp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SHORE';
  signedIn: boolean = false;

  constructor(private dbService: DatabaseService, private auth: AuthService, private stateExp: StateExpService) {}

  ngOnInit() {
    if (!firebase.apps.length) {
      firebase.initializeApp({});
    }
    this.auth.isLoggedIn$.subscribe(isLoggedIn => (this.signedIn = isLoggedIn));
    this.stateExp.getState();
  }

  signOut() {
    this.auth.signout();
  }
}
