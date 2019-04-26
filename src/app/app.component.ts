import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { DatabaseService } from './core/db-service/database.service';
import { AuthService } from './core/auth-service/auth.service';
import { StateService } from './core/state-service/state.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'SHORE';
  public signedIn: boolean = false;
  private categories: string[] = ['food', 'drinks', 'coffee', 'nightlife', 'art', 'nature', 'movies', 'other'];

  constructor(
    private dbService: DatabaseService,
    private location: Location,
    private auth: AuthService,
    private stateService: StateService
  ) {}

  public ngOnInit() {
    if (!firebase.apps.length) {
      firebase.initializeApp({});
    }
    this.auth.isLoggedIn$.subscribe((isLoggedIn: boolean) => (this.signedIn = isLoggedIn));
    this.setCategory();
  }

  public signOut() {
    this.auth.signout();
  }

  public setCategory() {
    const category: string = window.location.href.split('/').pop();
    if (this.categories.includes(category)) {
      this.stateService.setCategory(category);
    }
  }

  public goBack() {
    this.location.back();
  }

  public goForward() {
    this.location.forward();
  }
}
