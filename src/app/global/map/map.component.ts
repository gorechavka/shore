import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MapService } from './map.service';
import { Coords } from '../../models/coords';
import { MapSearchService } from '../map-search/map-search.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { Address } from '../../models/address';

interface Location {
  long: number;
  lat: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() coords: Coords;

  map;
  markers: Array<any>;
  adress: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private mapService: MapService, private mapSearchService: MapSearchService) {}

  ngOnInit() {
    this.map = this.mapService.createMap('map');
    this.markers = this.mapService.createMarkers();
    this.map.addLayer(this.markers);
    this.mapService.setDefaultLocation(this.map, this.markers);
    //обработка ошибок!!! если ничего не найдено, ставить на дефолт и писать мол сорян
    this.mapSearchService
      .searchQuery()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ lat, lon }) => {
        try {
          this.mapService.navigateTo(this.map, [lat, lon]);
          this.getAddress({ lat, lon }).subscribe(({ display_name }: Address) => {
            this.mapService.setNewMark({
              markers: this.markers,
              coords: [lat, lon],
              popup: display_name
            });
          });
          //create handleError function
        } catch (err) {
          console.log(err.message);
          this.mapService.setDefaultLocation(this.map, this.markers);
        }
      });
    this.listenClicks();
  }

  listenClicks() {
    this.mapService.listen('click', this.map, ({ latlng: { lat, lng: lon } }) => {
      this.getAddress({ lat, lon }).subscribe(({ display_name }) =>
        this.mapService.changeMark({ markers: this.markers, coords: { lat, lon }, popup: display_name })
      );
    });
  }

  getAddress(coords: Coords): Observable<Address> {
    return this.mapSearchService.getAddress(coords).pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
