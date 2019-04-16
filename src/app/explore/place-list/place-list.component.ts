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
        title: 'Река',
        description: 'река грязная',
        image: '../assets/places/place.jpeg'
      },
      {
        title: 'Дом',
        description: 'который построил Джек',
        image: '../assets/places/place.jpeg'
      },
      {
        title: 'Гусятня',
        description: 'который построил Джек',
        image: '../assets/places/place.jpeg'
      },
      {
        title: 'Дворец',
        description: 'который построил Джек',
        image: '../assets/places/place.jpeg'
      },
      {
        title: 'АД',
        description: 'который построил Джек',
        image: '../assets/places/place.jpeg'
      }
    ];
  }
}
