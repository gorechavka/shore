import { Component, Input } from '@angular/core';
import { Place } from '../../models/place';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
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
