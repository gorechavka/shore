import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MapSearchService } from './map-search.service';
import { Subject } from 'rxjs';
import { Coords } from '../../models/coords.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit, OnDestroy {
  @Output() newCoords = new EventEmitter<Coords>();
  @Output() emptyQuery = new EventEmitter();

  _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private mapSearchService: MapSearchService) {}

  ngOnInit() {
    // обработка ошибок!!!
    this.mapSearchService
      .searchQuery()
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (coords: Coords) => {
          // обработка ошибок!!!
          if (coords.lat === undefined || coords.lon === undefined) {
            return;
          }
          this.newCoords.emit(coords);
        },
        err => console.log(err)
      );
  }

  onSearch(input: string) {
    if (!input) {
      this.emptyQuery.emit();
    }
    this.mapSearchService.setQuery(input);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
