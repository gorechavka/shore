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
  constructor(private stateService: StateService, private afDatabase: AngularFireDatabase) {
    this.init();
  }

  init() {
    console.log('start getting data');
    this.afDatabase
      .object('/')
      .valueChanges()
      .subscribe((data: State) => {
        for (let type in data) {
          data[type] = Object.keys(data[type]).map(id => data[type][id]);
        }
        console.log('start setting data');
        this.stateService.setState(data);
      });
  }

  addData(type: 'places' | 'coords', newData: Place | Coords) {
    return this.afDatabase.list(type).push(newData);
  }

  changeData(type: 'places' | 'coords', key: string, newData: Place | Coords) {
    this.afDatabase.list(type).update(key, newData);
  }
}
