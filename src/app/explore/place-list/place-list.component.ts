import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Place } from '../../models/place.model';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceListComponent {
  @Input() public places: Place[];

  @Input() public selectedPlace: string;

  public loading = true;

  constructor() {
    this.selectedPlace = null;
  }

  public onLoaded() {
    this.loading = false;
  }
}
