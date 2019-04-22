import { Component, OnInit } from '@angular/core';
import { Place } from '../../../models/place';
import { StateService } from '../../../core/state-service/state.service';
import { map, tap, switchMap, zipAll, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Coords } from '../../../models/coords';
import { CountService } from '../../../global/count-service/count.service';
import { Observable, from, zip } from 'rxjs';
import { places } from '../../../../utils/places-db';
import { images } from '../../../../utils/images';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  places: Observable<Place[]>;
  filteredPlaces: Observable<any[]>;
  images;
  category: string;

  constructor(private stateService: StateService, private route: ActivatedRoute, private countService: CountService) {
    this.category = this.route.snapshot.paramMap.get('category');
  }

  ngOnInit() {
    this.places = this.stateService
      .getState('places')
      .pipe(map<Place[], any>(places => places.filter(place => place.category === this.category)));

    this.filteredPlaces = this.places;
  }

  onNewCoords(coords: Coords) {
    this.filteredPlaces = this.places.pipe(
      map(places => places.filter(place => this.checkNeighborhood(place.coords, coords)))
    );
  }

  private checkNeighborhood(current: Coords, target: Coords, dist: number = 3) {
    return this.countService.countDist(current, target) <= dist;
  }
}
