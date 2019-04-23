import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Place } from '../../models/place';
import { DatabaseService } from '../../core/db-service/database.service';
import { AuthService } from '../../core/auth-service/auth.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  @Input() place: Place;

  @Output() hide = new EventEmitter();

  rates = ['rate-1', 'rate-2', 'rate-3', 'rate-4', 'rate-5'];
  uid: string;
  userVoted: boolean = true;
  placeRate: number;
  inVoteState: boolean = false;

  constructor(private dbService: DatabaseService, private auth: AuthService) {}

  ngOnInit() {
    this.auth.getUserId().subscribe(uid => {
      this.uid = uid;
      this.userVoted = !!this.place.voted && this.place.voted.includes(uid);
    });
    this.setRate();
  }

  setRate() {
    this.placeRate = this.place.rate || 0;
  }

  onCloseClick() {
    this.hide.emit();
  }

  onRateClick(input) {
    input.checked = true;
    this.setVoted();
    this.dbService.changeData('places', this.place.id, {
      ...this.place,
      rate: this.countRate(input.value),
      voted: this.place.voted
    });
    this.inVoteState = false;
  }

  onVote() {
    this.inVoteState = true;
  }

  private setVoted() {
    if (!this.place.voted) {
      this.place.voted = [this.uid];
    } else if (!this.place.voted.includes(this.uid)) {
      this.place.voted = [...this.place.voted, this.uid];
    }
  }

  private countRate(newRate) {
    if (!this.place.rate) {
      this.place.rate = 0;
    }
    return Math.round((+this.place.rate + +newRate) / this.place.voted.length);
  }
}
