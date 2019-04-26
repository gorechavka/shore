import { Injectable } from '@angular/core';
import { debounceTime, switchMap, map, catchError, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { Address } from '../../models/address.model';
import { GeoAddress } from '../../models/geo-address.model';
import { HttpService } from '../../core/http-service/http.service';
import { Coords } from '../../models/coords.model';

@Injectable({
  providedIn: 'root'
})
export class MapSearchService {
  public query$ = new Subject<string>();
  public BASE_URL = 'https://nominatim.openstreetmap.org/search?format=json';
  public REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse?format=jsonv2';

  constructor(private httpService: HttpService) {}

  public setQuery(input: string) {
    this.query$.next(input);
  }

  public searchQuery(): Observable<Coords> {
    return this.query$.asObservable().pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(query => this.getCoords(query))
    );
  }

  public getCoords(query: string): Observable<Coords> {
    return this.httpService.get(`${this.BASE_URL}&q=${query}`).pipe(
      map(([{ lat, lon }]: GeoAddress[]) => ({ lat, lon })),
      catchError(err => of(err.message))
    );
  }

  public getAddress({ lat, lon }): Observable<Address> {
    return this.httpService
      .get(`${this.REVERSE_URL}&lat=${lat}&lon=${lon}`)
      .pipe(map(({ address, display_name }: Address) => ({ address: address, display_name })));
  }
}
