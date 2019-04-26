import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../core/db-service/database.service';
import { AuthService } from '../../core/auth-service/auth.service';
import { PlaceComponent } from '../place/place.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MapSearchService } from '../../global/map-search/map-search.service';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-place-aside',
  templateUrl: './place-aside.component.html',
  styleUrls: ['./place-aside.component.css']
})
export class PlaceAsideComponent extends PlaceComponent implements OnInit {
  public _destroy$ = new Subject();

  constructor(public dbService: DatabaseService, private auth: AuthService) {
    super(dbService);
  }

  public ngOnInit() {
    this.auth
      .getUserId()
      .pipe(takeUntil(this._destroy$))
      .subscribe(uid => {
        this.uid = uid;
        this.userVoted = !!this.place.voted && this.place.voted.includes(uid);
      });
    this.setRate();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
