import { Component, OnInit, OnDestroy } from '@angular/core';
import { DatabaseService } from '../../core/db-service/database.service';
import { AuthService } from '../../core/auth-service/auth.service';
import { PlaceComponent } from '../place/place.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-place-modal',
  templateUrl: './place-modal.component.html',
  styleUrls: ['./place-modal.component.css']
})
export class PlaceModalComponent extends PlaceComponent implements OnInit, OnDestroy {
  _$destroy = new Subject();

  constructor(dbService: DatabaseService, private auth: AuthService) {
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
  }

  ngOnDestroy(): void {
    this._$destroy.next();
    this._$destroy.unsubscribe();
  }
}
