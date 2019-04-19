import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { Coords } from '../../../models/coords';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../../models/place';
import { StateService } from '../../../core/state-service/state.service';
import { MapComponent } from '../../../global/map/map.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit, AfterViewInit {
  coords: Coords;
  category: string;
  places: { coords; title }[];

  @ViewChild(MapComponent) mapComponent: MapComponent;

  placeChoosen: boolean = false;
  constructor(private route: ActivatedRoute, private stateService: StateService) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
  }

  ngAfterViewInit(): void {
    this.stateService
      .getState('places')
      .pipe(
        map((places: Place[]) =>
          places.reduce((acc, { category, coords, title }) => {
            if (category == this.category) {
              acc.push({ coords, title });
            }
            return acc;
          }, [])
        )
      )
      .subscribe(places => this.mapComponent.setPlaces(places));
  }
}
