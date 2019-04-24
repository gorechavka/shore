import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../core/db-service/database.service';
import { AuthService } from '../../core/auth-service/auth.service';
import { PlaceComponent } from '../place/place.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-place-aside',
  templateUrl: './place-aside.component.html',
  styleUrls: ['./place-aside.component.css']
})
export class PlaceAsideComponent extends PlaceComponent implements OnInit {
  _destroy$ = new Subject();

  constructor(dbService: DatabaseService, private auth: AuthService) {
    super(dbService);
  }

  ngOnInit() {
    this.auth
      .getUserId()
      .pipe(takeUntil(this._destroy$))
      .subscribe(uid => {
        this.uid = uid;
        this.userVoted = !!this.place.voted && this.place.voted.includes(uid);
      });
    this.setRate();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
