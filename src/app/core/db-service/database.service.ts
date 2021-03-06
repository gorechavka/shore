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

  public init() {
    this.stateService
      .getCategory()
      .pipe(
        skipWhile((category: string) => category == null),
        switchMap((category: string) => {
          return this.afDatabase.object(`categories/${category}`).valueChanges();
        }),
        retry(3)
      )
      .subscribe(
        (data: State) => {
          console.log(data);
          const places: Place[] = Object.keys(data).map(id => ({ ...data[id], id }));
          console.log(places);
          this.stateService.setState(places);
        },
        err => console.log(err.message)
      );
  }

  public getUserData(uid: string): Observable<Userdb> {
    return this.afDatabase
      .object('/users')
      .valueChanges()
      .pipe(map((users: Userdb[]) => users.find((user: Userdb) => user.uid === uid)));
  }

  public addData(type: 'places' | 'users', newData: Place | Userdb): firebase.database.ThenableReference {
    return this.afDatabase.list(type).push(newData);
  }

  public addUserData(newData: Userdb): firebase.database.ThenableReference {
    return this.afDatabase.list('users').push(newData);
  }

  public addPlaceData(newData: Place): firebase.database.ThenableReference {
    const category: string = newData.category;
    return this.afDatabase.list(`categories/${category}`).push(newData);
  }

  public changePlaceData(key: string, newData: Place) {
    const category: string = newData.category;
    return this.afDatabase.list(`categories/${category}`).update(key, newData);
  }

  public changeUserData(key: string, newData: Userdb) {
    return this.afDatabase.list('users').update(key, newData);
  }
}
