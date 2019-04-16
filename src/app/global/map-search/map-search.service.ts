import { Injectable } from '@angular/core';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { HttpService } from 'src/app/core/http-service/http.service';
import { geoAdress } from 'src/app/models/geoAdress';
import { Coords } from 'src/app/models/coords';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {
  query$ = new Subject<string>();
  BASE_URL: string = 'https://nominatim.openstreetmap.org/search?format=json';

  constructor(private httpService: HttpService) {}

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
      map(([{ lat, lon }]: geoAdress[]) => ({ adress: query, lat, lon })),
      catchError(err => of(err.message))
    );
  }

  // responseWithError(err) {
  //   console.log(err.message);
  //   return err;
  // }
}
