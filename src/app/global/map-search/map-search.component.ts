import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { MapSearchService } from './map-search.service';
import { Subject } from 'rxjs';
import { Coords } from '../../models/coords';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit, OnDestroy {
  @Output() newCoords = new EventEmitter<Coords>();

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private mapSearchService: MapSearchService) {}

  ngOnInit() {
    //обработка ошибок!!!
    this.mapSearchService
      .searchQuery()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (coords: Coords) => {
          //обработка ошибок!!!
          if (coords.lat === undefined || coords.lon === undefined) return;
          this.newCoords.emit(coords);
        },
        err => console.log(err)
      );
  }

  onSearch(input) {
    this.mapSearchService.setQuery(input);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
