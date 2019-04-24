import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Place } from '../../models/place.model';
import { DatabaseService } from '../../core/db-service/database.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent {
  @Input() place: Place;

  @Output() hide = new EventEmitter();

  rates = ['rate-1', 'rate-2', 'rate-3', 'rate-4', 'rate-5'];
  uid: string;
  userVoted: boolean = true;
  placeRate: number;
  inVoteState: boolean = false;

  constructor(public dbService: DatabaseService) {}

  public setRate() {
    this.placeRate = this.place.rate || 0;
  }

  public onCloseClick() {
    this.hide.emit();
  }

  public onRateClick(input) {
    input.checked = true;
    this.setVoted();
    this.dbService.changeData('places', this.place.id, {
      ...this.place,
      rate: this.countRate(input.value),
      voted: this.place.voted
    });
    this.inVoteState = false;
  }

  public onVote() {
    this.inVoteState = true;
  }

  public setVoted() {
    if (!this.place.voted) {
      this.place.voted = [this.uid];
    } else if (!this.place.voted.includes(this.uid)) {
      this.place.voted = [...this.place.voted, this.uid];
    }
  }

  public countRate(newRate) {
    if (!this.place.rate) {
      this.place.rate = 0;
    }
    return Math.round((+this.place.rate + +newRate) / this.place.voted.length);
  }
}
