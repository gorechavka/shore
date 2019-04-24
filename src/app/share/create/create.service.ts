import { Injectable } from '@angular/core';
import { DatabaseService } from '../../core/db-service/database.service';
import { Place } from '../../models/place.model';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  constructor(private dbService: DatabaseService) {}

  addPlace(place: Place, errorHandler?): Promise<string | void> {
    return this.dbService
      .addPlaceData(place)
      .then(ref => this.handleSuccess(ref.key))
      .catch(err => this.handleError(err, errorHandler));
  }

  private handleSuccess(key, handler?: () => void) {
    if (handler !== undefined) {
      handler();
    } else return Promise.resolve(key);
  }

  private handleError(err: Error, handler?: (err: Error) => void) {
    if (handler !== undefined) {
      handler(err);
    } else console.log(`Error ${err.message}`);
  }
}
