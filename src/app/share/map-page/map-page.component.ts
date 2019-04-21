import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Coords } from '../../models/coords';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../models/place';
import { StateService } from '../../core/state-service/state.service';
import { MapComponent } from '../../global/map/map.component';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Category } from '../../models/category';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit, AfterViewInit {
  coords: Coords;
  category: Category;
  places: { coords; title }[];

  private destroy$ = new Subject<boolean>();

  @ViewChild(MapComponent) mapComponent: MapComponent;

  placeToShow: Place;
  constructor(private route: ActivatedRoute, private stateService: StateService) {}

  ngOnInit() {
    this.category = <Category>this.route.snapshot.paramMap.get('category');
  }

  ngAfterViewInit(): void {
    this.stateService
      .getState('places')
      .pipe(
        takeUntil(this.destroy$),
        map((places: Place[]) =>
          places.reduce((acc, place: Place) => {
            if (place.category == this.category) {
              acc.push(place);
            }
            return acc;
          }, [])
        )
      )
      .subscribe(places => {
        console.log('set places');
        this.mapComponent.setPlaces(places, this.category);
      });
  }

  showPlace(place) {
    this.placeToShow = place;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
