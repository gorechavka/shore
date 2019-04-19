import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '../../models/state';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state$ = new BehaviorSubject<State>({
    coords: [],
    places: []
  });

  constructor() {}

  getState(type?: string): Observable<any> {
    return this.state$.asObservable().pipe(
      map(curState => {
        if (type === undefined) {
          return curState;
        }
        console.log(` get state`);
        return curState[type];
      })
      // catchError(err => this.handleError(err))
    );
  }

  setState(newState, type?: string) {
    this.state$.next(newState);
    console.log('set new state');
  }
}
