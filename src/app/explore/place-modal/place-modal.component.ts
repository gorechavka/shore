import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../../core/db-service/database.service';
import { AuthService } from '../../core/auth-service/auth.service';
import { PlaceComponent } from '../place/place.component';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { MapSearchService } from '../../global/map-search/map-search.service';

@Component({
  selector: 'app-place-modal',
  templateUrl: './place-modal.component.html',
  styleUrls: ['./place-modal.component.css']
})
export class PlaceModalComponent extends PlaceComponent implements OnInit, OnDestroy {
  _$destroy = new Subject();
  adress: Observable<string>;

  constructor(dbService: DatabaseService, private mapSearch: MapSearchService, private auth: AuthService) {
    super(dbService);
  }

  ngOnInit() {
    this.auth
      .getUserId()
      .pipe(takeUntil(this._$destroy))
      .subscribe(uid => {
        this.uid = uid;
        this.userVoted = !!this.place.voted && this.place.voted.includes(uid);
      });
    this.setRate();
    this.adress = this.mapSearch.getAddress(this.place.coords).pipe(map(adress => adress.display_name));
  }

  ngOnDestroy(): void {
    this._$destroy.next();
    this._$destroy.unsubscribe();
  }
}
