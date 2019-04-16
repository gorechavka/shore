import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MapSearchService } from './map-search.service';
import { Subject } from 'rxjs';
import { Coords } from '../../models/coords';
import { geoAdress } from 'src/app/models/geoAdress';

@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {
  @Output() newCoords = new EventEmitter<Coords>();

  constructor(private mapSearchService: MapSearchService) {}

  ngOnInit() {
    //обработка ошибок!!!
    this.mapSearchService.searchQuery().subscribe(
      (coords: Coords) => {
        this.newCoords.emit(coords);
      },
      err => console.log(err)
    );
  }

  onSearch(input) {
    this.mapSearchService.setQuery(input);
  }
}
