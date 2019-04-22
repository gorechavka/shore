import { Injectable } from '@angular/core';
import { StateService } from '../state-service/state.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { State } from '../../models/state';
import { Place } from '../../models/place';
import { Userdb } from '../../models/Userdb';

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
          data[type] = Object.keys(data[type]).map(id => ({ ...data[type][id], id }));
        }
        console.log('start setting data');
        this.stateService.setState(data);
      });
  }

  addData(
    type: 'places' | 'users' | 'images',
    newData: Place | Userdb | { image: ArrayBuffer | string; id: string }
  ): firebase.database.ThenableReference {
    //затестить
    // if (id !== undefined) {
    //   return this.afDatabase.list(`${type}/${id}`).push(newData);
    // }
    return this.afDatabase.list(type).push(newData);
  }

  changeData(
    type: 'places' | 'users' | 'images',
    key: string,
    newData: Place | Userdb | { image: ArrayBuffer | string; id: string }
  ) {
    return this.afDatabase.list(type).update(key, newData);
  }
}
