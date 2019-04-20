import { Injectable } from '@angular/core';
declare const L;

const icons = {
  food: require('./icons/foodI.png'),
  drinks: require('./icons/beerI.png'),
  coffee: require('./icons/coffeeI.png'),
  nightlife: require('./icons/discoI.png'),
  movies: require('./icons/movieI.png'),
  music: require('./icons/musicI.png'),
  nature: require('./icons/natureI.png'),
  other: require('./icons/clownI.png'),
  location: require('./icons/locationI.png')
};

@Injectable({
  providedIn: 'root'
})
export class MapIconService {
  PlaceIcon;
  constructor() {
    this.PlaceIcon = L.Icon.extend({
      options: {
        shadowUrl: '',
        iconSize: [42, 42],
        shadowSize: [0, 0],
        iconAnchor: [21, 40],
        shadowAnchor: [0, 0],
        popupAnchor: [0, -40]
      }
    });
  }

  createPlaceIcon(category: string = 'location') {
    return new this.PlaceIcon({ iconUrl: icons[category] });
  }
}
