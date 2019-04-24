import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Place } from '../../models/place.model';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceListComponent {
  @Input() places: Place[];

  @Input() selectedPlace: string;

  loading: boolean = true;

  constructor() {
    this.selectedPlace = null;
  }

  onLoaded() {
    this.loading = false;
  }
}
