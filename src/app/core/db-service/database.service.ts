import { Injectable } from '@angular/core';
import { StateService } from '../state-service/state.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { State } from '../../models/state';
import { Place } from '../../models/place';
import { Userdb } from '../../models/Userdb';
import { User } from '../auth-service/user';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
      .object('places')
      .valueChanges()
      .subscribe((data: State) => {
        const places = Object.keys(data).map(id => ({ ...data[id], id }));
        this.stateService.setState(places);
      });
  }

  getUserData(uid: string): Observable<Userdb> {
    return this.afDatabase
      .object('/users')
      .valueChanges()
      .pipe(map((users: Userdb[]) => users.find(user => user.uid === uid)));
  }

  addData(type: 'places' | 'users', newData: Place | Userdb): firebase.database.ThenableReference {
    return this.afDatabase.list(type).push(newData);
  }

  changeData(type: 'places' | 'users', key: string, newData: Place | Userdb) {
    console.log(newData);
    return this.afDatabase.list(type).update(key, newData);
  }
}
