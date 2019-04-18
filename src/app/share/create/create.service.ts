import { Injectable } from '@angular/core';
import { DatabaseService } from '../../core/db-service/database.service';
import { Place } from '../../models/place';
import { Coords } from '../../models/coords';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  constructor(private dbService: DatabaseService) {}

  addPlace(place: Place, successHandler?, errorHandler?) {
    this.dbService
      .addData('places', place)
      .then(_ => this.handleSuccess(successHandler), err => this.handleError(errorHandler, err));
  }

  addCoords(coords: Coords, successHandler?, errorHandler?) {
    this.dbService
      .addData('coords', coords)
      .then(_ => this.handleSuccess(successHandler), err => this.handleError(errorHandler, err));
  }

  handleSuccess(handler?: () => void) {
    if (handler !== undefined) {
      handler();
    } else console.log('success');
  }

  handleError(err: Error, handler?: (err: Error) => void) {
    if (handler !== undefined) {
      handler(err);
    } else console.log(`Error ${err.message}`);
  }
}
