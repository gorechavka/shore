import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DatabaseService } from './core/db-service/database.service';
import { AuthService } from './core/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SHORE';
  signedIn: boolean = false;

  constructor(private dbService: DatabaseService, private auth: AuthService) {}

  ngOnInit() {
    if (!firebase.apps.length) {
      firebase.initializeApp({});
    }
    this.auth.isLoggedIn$.subscribe(isLoggedIn => (this.signedIn = isLoggedIn));
  }

  signOut() {
    this.auth.signout();
  }
}
