import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';
import { DatabaseService } from './core/db-service/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SHORE';

  constructor(private dbService: DatabaseService) {}

  ngOnInit() {
    if (!firebase.apps.length) {
      firebase.initializeApp({});
    }
  }
}
