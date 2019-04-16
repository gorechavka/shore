import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/models/place';

@Component({
  selector: 'app-place-list',
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.css']
})
export class PlaceListComponent implements OnInit {
  places: Place[];

  @Input() selectedPlace: string;

  constructor() {}

  ngOnInit() {
    this.places = [
      {
        name: 'Река',
        description: 'река грязная',
        photo: '../assets/places/place.jpeg',
        coords: 'aaaaa'
      },
      {
        name: 'Дом',
        description: 'который построил Джек',
        photo: '../assets/places/place.jpeg',
        coords: 'aaaaa'
      },
      {
        name: 'Гусятня',
        description: 'который построил Джек',
        photo: '../assets/places/place.jpeg',
        coords: 'aaaaa'
      },
      {
        name: 'Дворец',
        description: 'который построил Джек',
        photo: '../assets/places/place.jpeg',
        coords: 'aaaaa'
      },
      {
        name: 'АД',
        description: 'который построил Джек',
        photo: '../assets/places/place.jpeg',
        coords: 'aaaaa'
      }
    ];
  }
}
