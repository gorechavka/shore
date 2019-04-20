import { Injectable } from '@angular/core';
import { Category } from '../../models/category';
import { MapIconService } from './map-icon.service';
declare let L;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private mapIconService: MapIconService) {}

  createMap(div) {
    const map = L.map(div);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 20
    }).addTo(map);
    return map;
  }

  createMarkersCluster() {
    return L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: false
    });
  }

  setDefaultLocation(map, markers) {
    map.locate({ setView: true, maxZoom: 15, maximumAge: 1000 });
    map.on('locationerror', err => console.log(err.code));
    map.on('locationfound', _ => {
      const marker = this.changeMark({ markers, coords: map.getCenter() });
      this.setPopup(marker, 'Вы здесь');
    });
  }

  navigateTo(map, coords: number[]) {
    map.setView(coords, 16);
  }

  changeMark({ markers, coords, popup = undefined }, category?: string) {
    markers.clearLayers();
    return this.setNewMark({ markers, coords, popup }, category);
  }

  setNewMark({ markers, coords, popup = undefined }, category: string) {
    const mark = L.marker(coords, { icon: this.mapIconService.createPlaceIcon(category) });
    markers.addLayer(mark);
    return mark;
  }

  createMarksGroup(markers, category: string) {
    return markers.map(({ coords, popup }) => {
      const mark = L.marker(coords, { icon: this.mapIconService.createPlaceIcon(category) });
      mark.bindPopup(popup);
      return mark;
    });
  }

  setPopup(mark, popup) {
    mark.bindPopup(popup).openPopup();
  }

  listen(event, map, handler) {
    map.on(event, handler);
  }
}
