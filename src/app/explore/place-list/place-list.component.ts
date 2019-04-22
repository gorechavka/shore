import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Place } from '../../models/place';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent {
  @Input() places: Place[];

  @Input() selectedPlace: string;

  // @Output() loaded = new EventEmitter<boolean>();

  loading: boolean = true;

  constructor() {
    this.selectedPlace = null;
  }

  onLoaded() {
    this.loading = false;
  }
}
