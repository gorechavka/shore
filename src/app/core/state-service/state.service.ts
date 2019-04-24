import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    console.log('set state');
    this.state$.next(newState);
  }
}
