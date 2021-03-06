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
  @Output() public newCoords = new EventEmitter<Coords>();
  @Output() public emptyQuery = new EventEmitter();

  public showError = false;

  private isEmpty = true;

  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private mapSearchService: MapSearchService) {}

  public ngOnInit() {
    // обработка ошибок!!!
    this.mapSearchService
      .searchQuery()
      .pipe(takeUntil(this._destroy$))
      .subscribe(
        (coords: Coords) => {
          // обработка ошибок!!!
          if (coords.lat === undefined || coords.lon === undefined) {
            if (!this.isEmpty) {
              this.showError = true;
            }
            return;
          }
          this.showError = false;
          this.newCoords.emit(coords);
        },
        err => console.log(err)
      );
  }

  public onSearch(input: string) {
    if (!input) {
      this.emptyQuery.emit();
      this.isEmpty = true;
    } else this.isEmpty = false;
    this.mapSearchService.setQuery(input);
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
