import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MapService } from './map.service';
import { Coords } from '../../models/coords';
import { MapSearchService } from '../map-search/map-search.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
      .subscribe(({ lat, lon, adress }) => {
        try {
          this.mapService.navigateTo(this.map, [lat, lon]);
          this.mapService.setNewMark({
            markers: this.markers,
            coords: [lat, lon],
            //доделать всплывающий адресс на карте - лучше по координатам делать обратный запрос на геокодинг и потом разбирать пришедший объект
            popup: this.beautifyAdress(adress)
          });

          //create handleError function
        } catch (err) {
          console.log(err.message);
          this.mapService.setDefaultLocation(this.map, this.markers);
        }
      });
  }

  listenClicks() {
    this.mapService.listen('click', this.map, ({ latlng }) => {
      this.mapService.changeMark({ markers: this.markers, coords: latlng });
    });
  }

  beautifyAdress(adress: string) {
    return adress.split(' ').reduce((res, word: string) => res + ' ' + word[0].toUpperCase() + word.slice(1), '');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
