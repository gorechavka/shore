import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Place } from '../../models/place';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit {
  @Input() place: Place;

  @Output() select = new EventEmitter<string>();

  @Output() loaded = new EventEmitter<boolean>();

  photo: string;
  name: string;
  description: string;

  constructor() {}

  ngOnInit() {
    this.photo = `../assets/${this.place.image}`;
  }

  ngAfterViewInit(): void {
    console.log('loaded');
    this.loaded.emit(true);
  }

  selectPlace(name) {
    this.select.emit(name);
  }
}
