import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Place } from '../../models/place.model';
import { switchMap, tap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StateExpService {
  private _state$ = new BehaviorSubject<Place[] | []>([]);

  constructor() {}

  getState(): Observable<Place> {
    return this._state$.asObservable().pipe(
      switchMap(places => from(places))
      // tap((place: Place) => console.log(place['title']))
    );
  }

  setState(newState) {
    console.log('set state');
    this._state$.next(newState);
  }
}
