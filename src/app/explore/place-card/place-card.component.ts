import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Place } from '../../models/place';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css']
})
export class PlaceCardComponent implements OnInit, AfterViewInit {
  @Input() place: Place;

  @Output() select = new EventEmitter<string>();

  @Output() loaded = new EventEmitter<boolean>();

  photo: string;
  name: string;
  description: string;

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
