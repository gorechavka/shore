import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Place } from '../../models/place.model';

@Component({
  selector: 'app-map-place',
  templateUrl: './map-place.component.html',
  styleUrls: ['./map-place.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapPlaceComponent {
  @Input() public place: Place;
  @Output() public close = new EventEmitter();

  constructor() {}

  public onCloseClick() {
    this.close.emit();
  }
}
