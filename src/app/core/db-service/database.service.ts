import { Injectable } from '@angular/core';
import { StateService } from '../state-service/state.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { State } from '../../models/state';
import { Place } from '../../models/place';
import { Userdb } from '../../models/Userdb';
import { map, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private stateService: StateService, private afDatabase: AngularFireDatabase) {
    this.init();
  }

  init() {
    this.afDatabase
      .object('places')
      .valueChanges()
      .pipe(retry(5))
      .subscribe(
        (data: State) => {
          console.log('got data');
          const places = Object.keys(data).map(id => ({ ...data[id], id }));
          this.stateService.setState(places);
        },
        err => console.log(err.message)
      );
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

  changeData(type: 'places' | 'users', key: string, newData: Place | Userdb): Promise<void> {
    return this.afDatabase.list(type).update(key, newData);
  }
}
