import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { MapService } from './map.service';
import { Coords } from '../../models/coords';
import { MapSearchService } from '../map-search/map-search.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Address } from '../../models/address';
import { Category } from '../../models/category';
import { Place } from '../../models/place';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  @Input() coords: Coords;
  @Input() clickable: boolean;
  @Output() newCoords = new EventEmitter<Coords>();
  @Output() choosenPlace = new EventEmitter<Place>();

  map;
  markers: Array<any>;
  adress: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private mapService: MapService, private mapSearchService: MapSearchService) {}

  ngOnInit() {
    this.map = this.mapService.createMap('map');
    this.markers = this.mapService.createMarkersCluster();
    this.map.addLayer(this.markers);
    this.mapService.setDefaultLocation(this.map, this.markers);
    //обработка ошибок!!! если ничего не найдено, ставить на дефолт и писать мол сорян
    this.mapSearchService
      .searchQuery()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ lat, lon }) => {
        try {
          this.mapService.navigateTo(this.map, [lat, lon]);
          this.setMark({ lat, lon });
          //create handleError function
        } catch (err) {
          console.log(err.message);
          return;
        }
      });

    if (this.clickable) {
      this.listenClicks();
    }
  }

  listenClicks() {
    this.mapService.listen('click', this.map, ({ latlng: { lat, lng: lon }, target }) => {
      this.setMark({ lat, lon });
      this.newCoords.emit({ lat, lon });
    });
  }

  listenMapMove() {
    this.mapService.listen('move', this.map, e => {
      console.log(e);
      // if (!e.target.classList.contains('map__container')) {
      //   e.stopPropagation();
      // }
    });
  }

  setPlaces(places, category: Category) {
    if (!places || !this.map) return;
    const markers = this.mapService.createMarksGroup(
      places.map(({ coords, title }) => ({ coords, tooltip: title })),
      category
    );

    this.bindPlaces(markers, places);

    const cluster = this.mapService.createMarkersCluster();
    cluster.addLayers(markers);
    this.map.addLayer(cluster);
  }

  private setMark({ lat, lon }, tooltip?: string) {
    const newMark = this.mapService.changeMark({
      markers: this.markers,
      coords: [lat, lon]
    });
    if (tooltip === undefined) {
      this.getAddress({ lat, lon }).subscribe(({ display_name }: Address) => {
        this.mapService.setTooltip(newMark, this.shortenAdress(display_name));
      });
    }
  }

  private bindPlaces(markers, places) {
    markers.forEach(marker => {
      marker.on('click', ({ latlng }) => {
        const place = places.find(({ coords }: Place) => coords.lat == latlng.lat && coords.lon == latlng.lng);
        if (place) this.choosenPlace.emit(place);
      });
    });
  }

  private getAddress(coords: Coords): Observable<Address> {
    return this.mapSearchService.getAddress(coords).pipe(takeUntil(this.destroy$));
  }

  private shortenAdress(adress) {
    return adress.split(',')[0] + ', ' + adress.split(',')[1];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
