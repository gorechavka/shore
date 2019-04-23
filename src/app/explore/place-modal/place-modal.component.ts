import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Place } from '../../models/place';
import { DatabaseService } from '../../core/db-service/database.service';
import { AuthService } from '../../core/auth-service/auth.service';
import { PlaceComponent } from '../place/place.component';

@Component({
  selector: 'app-place-modal',
  templateUrl: './place-modal.component.html',
  styleUrls: ['./place-modal.component.css']
})
export class PlaceModalComponent extends PlaceComponent implements OnInit {
  constructor(dbService: DatabaseService, private auth: AuthService) {
    super(dbService);
  }

  ngOnInit() {
    this.auth.getUserId().subscribe(uid => {
      this.uid = uid;
      this.userVoted = !!this.place.voted && this.place.voted.includes(uid);
    });
    this.setRate();
  }
}
