import { Component, OnInit, ViewChild } from '@angular/core';
import { Place } from '../../../models/place';
import { StateService } from '../../../core/state-service/state.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Coords } from '../../../models/coords';
import { CountService } from '../../../global/count-service/count.service';
import { Observable } from 'rxjs';
import { MapComponent } from '../../../global/map/map.component';
import { Category } from '../../../models/category';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  places: Observable<Place[]>;
  filteredPlaces: Observable<any[]>;
  coords: Coords;
  category: Category;
  searchOnMap = false;
  choosenPlace: Place;

  constructor(private stateService: StateService, private route: ActivatedRoute, private countService: CountService) {
    this.category = <Category>this.route.snapshot.paramMap.get('category');
  }

  ngOnInit() {
    this.places = this.stateService
      .getState()
      .pipe(map<Place[], any>(places => places.filter(place => place.category === this.category)));

    this.filteredPlaces = this.places;
  }

  onNewCoords(coords: Coords) {
    this.coords = coords;
    this.filteredPlaces = this.places.pipe(
      map(places => places.filter(place => this.checkNeighborhood(place.coords, coords)))
    );
  }

  onStopSearch() {
    this.filteredPlaces = this.places;
  }

  onMapOpenClick() {
    this.searchOnMap = true;
  }

  onMapLoaded(map) {
    this.filteredPlaces.subscribe(places => map.setPlaces(places, this.category));
  }

  onChoosePlace(place) {
    this.choosenPlace = place;
  }

  private checkNeighborhood(current: Coords, target: Coords, dist: number = 3) {
    return this.countService.countDist(current, target) <= dist;
  }
}
