import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '../../models/state';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private lastState: State = {
    places: [],
    coords: []
  };

  private state$ = new BehaviorSubject<State>(this.lastState);

  constructor() {}

  getState(type?: string): Observable<any> {
    return this.state$.asObservable().pipe(
      map(curState => {
        if (type === undefined) {
          return curState;
        }
        console.log(` get state ${curState}`);
        return curState[type];
      })
      // catchError(err => this.handleError(err))
    );
  }

  setState(newState, type?: string) {
    console.log(`set state ${newState}`);
    if (type === undefined) {
      this.lastState = <State>newState;
      this.state$.next(<State>newState);
    } else {
      this.lastState[type] = newState;
      this.state$.next({ ...this.lastState });
    }
  }
}
