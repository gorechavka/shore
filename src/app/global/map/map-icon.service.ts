import { Injectable } from '@angular/core';
import { Category } from '../../models/category';
declare const L;

const icons = {
  food: require('./icons/food.png'),
  drinks: require('./icons/beer.png'),
  coffee: require('./icons/coffee.png'),
  nightlife: require('./icons/disco.png'),
  movies: require('./icons/movie.png'),
  music: require('./icons/music.png'),
  nature: require('./icons/nature.png'),
  other: require('./icons/clown.png'),
  location: require('./icons/location.png')
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
        iconSize: [38, 38],
        shadowSize: [0, 0],
        iconAnchor: [19, 37],
        shadowAnchor: [0, 0],
        popupAnchor: [0, -36]
      }
    });
  }

  createPlaceIcon(category: string = 'location') {
    return new this.PlaceIcon({ iconUrl: icons[category] });
  }
}
