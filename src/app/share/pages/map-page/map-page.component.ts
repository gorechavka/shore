import { Component, OnInit, Input } from '@angular/core';
import { Coords } from '../../../models/coords';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  coords: Coords;
  constructor() {}

  ngOnInit() {}

  setCoords(newCoords: Coords) {
    this.coords = newCoords;
  }
}
