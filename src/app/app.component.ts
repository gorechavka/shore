import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DatabaseService } from './core/db-service/database.service';
import { AuthService } from './core/auth-service/auth.service';
import { StateService } from './core/state-service/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SHORE';
  signedIn: boolean = false;
  private categories = ['food', 'drinks', 'coffee', 'nightlife', 'art', 'nature', 'movies', 'other'];

  constructor(private dbService: DatabaseService, private auth: AuthService, private stateService: StateService) {}

  ngOnInit() {
    if (!firebase.apps.length) {
      firebase.initializeApp({});
    }
    this.auth.isLoggedIn$.subscribe(isLoggedIn => (this.signedIn = isLoggedIn));
    this.setCategory();
  }

  signOut() {
    this.auth.signout();
  }

  setCategory() {
    const category = window.location.href.split('/').pop();
    if (this.categories.includes(category)) {
      this.stateService.setCategory(category);
    }
  }
}
