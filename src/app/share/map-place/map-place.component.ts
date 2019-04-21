import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Place } from '../../models/place';

@Component({
  selector: 'app-map-place',
  templateUrl: './map-place.component.html',
  styleUrls: ['./map-place.component.css']
})
export class MapPlaceComponent {
  @Input() place: Place;
  @Output() close = new EventEmitter();

  constructor() {}

  onCloseClick() {
    this.close.emit();
  }
}
