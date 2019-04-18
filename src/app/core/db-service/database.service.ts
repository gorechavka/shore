import { Injectable } from '@angular/core';
import { StateService } from '../state-service/state.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { State } from '../../models/state';
import { Place } from '../../models/place';
import { Coords } from '../../models/coords';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private stateService: StateService, private afDatabase: AngularFireDatabase) {}

  init() {
    console.log('init db');
    this.afDatabase
      .object('/')
      .valueChanges()
      .subscribe((data: State) => {
        for (let type in data) {
          data[type] = Object.keys(data[type]).map(id => data[type][id]);
        }
        this.stateService.setState(data);
      });
  }
}
