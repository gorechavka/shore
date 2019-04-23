import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { State } from '../../models/state';
import { map } from 'rxjs/operators';
import { Place } from '../../models/place';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state$ = new BehaviorSubject<Place[] | void[]>([]);

  constructor() {}

  getState(): Observable<any> {
    return this.state$.asObservable();
  }

  setState(newState) {
    this.state$.next(newState);
  }
}
