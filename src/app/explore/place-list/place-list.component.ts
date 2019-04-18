import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../models/place';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  @Input() places: Place[];

  @Input() selectedPlace: string;

  constructor() {
    this.selectedPlace = null;
  }

  ngOnInit() {}
}
