import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Place } from '../../../models/place';
import { StateService } from '../../../core/state-service/state.service';
import { reduce, map, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  places;
  category: string;

  constructor(private stateService: StateService, private route: ActivatedRoute, private router: Router) {
    this.category = this.route.snapshot.paramMap.get('category');
  }

  ngOnInit() {
    console.log('init search page');
    console.log(this.category);
    this.places = this.stateService.getState('places').pipe(
      tap(places => console.log(places)),
      map<Place[], any>(places => places.filter(place => place.category === this.category))
    );
  }

  openMap() {}
}
