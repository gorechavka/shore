import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../core/db-service/database.service';
import { AuthService } from '../../core/auth-service/auth.service';
import { PlaceComponent } from '../place/place.component';

@Component({
  selector: 'app-place-aside',
  templateUrl: './place-aside.component.html',
  styleUrls: ['./place-aside.component.css']
})
export class PlaceAsideComponent extends PlaceComponent implements OnInit {
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
