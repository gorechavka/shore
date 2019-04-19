import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StateService } from '../../core/state-service/state.service';
import { Coords } from '../../models/coords';
import { MapSearchService } from '../../global/map-search/map-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() newCoords = new EventEmitter<Coords>();

  constructor(private mapSearchService: MapSearchService) {}

  ngOnInit() {
    this.mapSearchService.searchQuery().subscribe(coords => {
      if (coords.lat === undefined || coords.lon === undefined) return;
      this.newCoords.emit(coords);
    });
  }

  onSearch(input) {
    this.mapSearchService.setQuery(input);
  }
}
