import { Component, OnInit } from '@angular/core';
import { Place } from '../../models/place.model';
import { StateService } from '../../core/state-service/state.service';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Coords } from '../../models/coords.model';
import { CountService } from '../../global/count-service/count.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  public coords: Coords;
  public category: Category;
  public searchOnMap = false;
  public choosenPlace: Place = null;
  public showMore = false;
  public places$ = new BehaviorSubject<Place[]>([]);
  public initPlaces: Place[] = [];
  public _destroy$ = new Subject();

  constructor(private stateService: StateService, private route: ActivatedRoute, private countService: CountService) {
    this.category = <Category>this.route.snapshot.paramMap.get('category');
  }

  public ngOnInit() {
    this.stateService
      .getState()
      .pipe(map<Place[], any>(places => places.filter(place => place.category === this.category)))
      .subscribe(places => {
        this.initPlaces = places;
        this.places$.next(places);
      });
  }

  public onNewCoords(coords: Coords) {
    this.coords = coords;
    this.places$.next(this.initPlaces.filter(place => this.checkNeighborhood(place.coords, coords)));
  }

  public onStopSearch() {
    this.places$.next(this.initPlaces);
  }

  public onMapOpenClick() {
    this.searchOnMap = true;
  }
  public onMapCloseClick() {
    this.searchOnMap = false;
  }

  public onMapLoaded(map) {
    this.places$.asObservable().subscribe(places => map.setPlaces(places, this.category));
  }

  public onChoosePlace(place) {
    this.choosenPlace = place;
  }

  private checkNeighborhood(current: Coords, target: Coords, dist: number = 3) {
    return this.countService.countDist(current, target) <= dist;
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
