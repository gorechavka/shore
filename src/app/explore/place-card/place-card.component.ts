import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Place } from '../../models/place';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit {
  @Input() place: Place;

  @Output() select = new EventEmitter<string>();

  photo: string;
  name: string;
  description: string;

  constructor() {}

  ngOnInit() {
    this.photo = `../assets/${this.place.image}`;
  }

  selectPlace(name) {
    this.select.emit(name);
  }
}
