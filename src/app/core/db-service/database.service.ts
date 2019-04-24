import { Injectable } from '@angular/core';
import { StateService } from '../state-service/state.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { State } from '../../models/state.model';
import { Place } from '../../models/place.model';
import { Userdb } from '../../models/userdb.model';
import { map, retry, skipWhile, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(private stateService: StateService, private afDatabase: AngularFireDatabase) {
    this.init();
  }

  init() {
    this.stateService
      .getCategory()
      .pipe(
        skipWhile(category => category == null),
        switchMap(category => {
          return this.afDatabase.object(`categories/${category}`).valueChanges();
        }),
        retry(3)
      )
      .subscribe(
        (data: State) => {
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

  addUserData(newData: Userdb): firebase.database.ThenableReference {
    return this.afDatabase.list('users').push(newData);
  }

  addPlaceData(newData: Place): firebase.database.ThenableReference {
    const category = newData.category;
    return this.afDatabase.list(`categories/${category}`).push(newData);
  }

  // changeData(type: 'places' | 'users', key: string, newData: Place | Userdb): Promise<void> {

  //   return this.afDatabase.list(type).update(key, newData);
  // }

  changePlaceData(key: string, newData: Place) {
    const category = newData.category;
    return this.afDatabase.list(`categories/${category}`).update(key, newData);
  }

  changeUserData(key: string, newData: Userdb) {
    return this.afDatabase.list('users').update(key, newData);
  }
}
