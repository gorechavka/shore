import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '../../models/state';
import { map, catchError } from 'rxjs/operators';
import { Place } from '../../models/place';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state$ = new BehaviorSubject<State>({ places: [], images: [], users: [] });

  constructor() {}

  getState(type?: 'places' | 'images' | 'users'): Observable<any> {
    return this.state$.asObservable().pipe(
      map(curState => {
        if (type === undefined) {
          return curState;
        }
        console.log(` get state ${type}`);
        return curState[type];
      })
      // catchError(err => this.handleError(err))
    );
  }

  setState(newState) {
    this.state$.next(newState);
  }
}
