import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Place } from '../../models/place.model';
import { Category } from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state$ = new BehaviorSubject<Place[] | void[]>([]);
  private category$ = new BehaviorSubject<Category | string>(null);

  constructor() {}

  getState(): Observable<any> {
    return this.state$.asObservable();
  }

  setState(newState) {
    console.log('set state');
    this.state$.next(newState);
  }

  setCategory(category: string) {
    this.category$.next(category);
    localStorage.setItem('category', category);
  }

  getCategory(): Observable<string> {
    return this.category$.asObservable();
  }
}
