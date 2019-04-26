import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Coords } from '../../models/coords.model';
import { ActivatedRoute } from '@angular/router';
import { Place } from '../../models/place.model';
import { StateService } from '../../core/state-service/state.service';
import { MapComponent } from '../../global/map/map.component';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit, AfterViewInit, OnDestroy {
  public coords: Coords;
  public category: Category;
  public places: { coords: Coords; title: string }[];
  public placeChoosen: boolean;
  public placeToShow: Place;

  private destroy$ = new Subject<boolean>();

  @ViewChild(MapComponent) public mapComponent: MapComponent;

  constructor(private route: ActivatedRoute, private stateService: StateService) {}

  public ngOnInit() {
    // this.category = <Category>this.route.snapshot.paramMap.get('category');
    this.stateService.getCategory().subscribe(category => (this.category = <Category>category));
  }

  public ngAfterViewInit(): void {
    this.stateService
      .getState()
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
        this.mapComponent.setPlaces(places, this.category);
      });
  }

  public showPlace(place) {
    this.placeToShow = place;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
