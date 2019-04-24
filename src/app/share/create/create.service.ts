import { Injectable } from '@angular/core';
import { DatabaseService } from '../../core/db-service/database.service';
import { Place } from '../../models/place';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  constructor(private dbService: DatabaseService) {}

  addPlace(place: Place, errorHandler?): Promise<string | void> {
    return this.dbService
      .addData('places', place)
      .then(ref => Promise.resolve(ref.key))
      .catch(err => this.handleError(err, errorHandler));
  }

  private handleSuccess(handler?: () => void) {
    if (handler !== undefined) {
      handler();
    } else console.log('success');
  }

  private handleError(err: Error, handler?: (err: Error) => void) {
    if (handler !== undefined) {
      handler(err);
    } else console.log(`Error ${err.message}`);
  }
}
