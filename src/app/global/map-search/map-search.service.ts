import { Injectable } from '@angular/core';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { Address } from '../../models/address';
import { geoAddress } from '../../models/geoAddress';
import { HttpService } from '../../core/http-service/http.service';
import { Coords } from '../../models/coords';
import { DatabaseService } from '../../core/db-service/database.service';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {
  query$ = new Subject<string>();
  BASE_URL: string = 'https://nominatim.openstreetmap.org/search?format=json';
  REVERSE_URL: string = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2';

  constructor(private httpService: HttpService, private dbService: DatabaseService) {}

  setQuery(input: string) {
    this.query$.next(input);
  }

  searchQuery() {
    return this.query$.pipe(
      debounceTime(500),
      switchMap(query => this.getCoords(query))
    );
  }

  getCoords(query: string): Observable<Coords> {
    return this.httpService.get(`${this.BASE_URL}&q=${query}`).pipe(
      map(([{ lat, lon }]: geoAddress[]) => ({ lat, lon })),
      catchError(err => of(err.message))
    );
  }

  getAddress({ lat, lon }): Observable<Address> {
    return this.httpService
      .get(`${this.REVERSE_URL}&lat=${lat}&lon=${lon}`)
      .pipe(map(({ address, display_name }: Address) => ({ address: address, display_name })));
  }

  // responseWithError(err) {
  //   console.log(err.message);
  //   return err;
  // }
}
