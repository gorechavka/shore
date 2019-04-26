import { Injectable } from '@angular/core';
import { MapIconService } from './map-icon.service';
declare let L;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor(private mapIconService: MapIconService) {}

  public createMap(div) {
    const map = L.map(div, {
      center: [55.752121, 37.617664],
      zoom: 14
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 20
    }).addTo(map);
    return map;
  }

  public createMarkersCluster() {
    return L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: false
    });
  }

  public setDefaultLocation(map, markers) {
    map.locate({ setView: true, maxZoom: 15, maximumAge: 1000 });
    map.on('locationerror', err => console.log(err.code));
    map.on('locationfound', _ => {
      const marker = this.changeMark({ markers, coords: map.getCenter() });
      this.setTooltip(marker, 'Вы здесь');
    });
  }

  public navigateTo(map, coords: number[]) {
    map.setView(coords, 15);
  }

  public changeMark({ markers, coords, tooltip = undefined }, category?: string) {
    markers.clearLayers();
    return this.setNewMark({ markers, coords, tooltip }, category);
  }

  public setNewMark({ markers, coords, tooltip = undefined }, category: string) {
    const mark = L.marker(coords, { icon: this.mapIconService.createPlaceIcon(category) });
    markers.addLayer(mark);
    return mark;
  }

  public createMarksGroup(markers, category: string) {
    return markers.map(({ coords, tooltip }) => {
      const mark = L.marker(coords, { icon: this.mapIconService.createPlaceIcon(category) });
      mark.bindTooltip(tooltip);
      return mark;
    });
  }

  public setTooltip(mark, tooltip) {
    mark.bindTooltip(tooltip);
  }

  public openTooltip(mark) {
    mark.openTooltip();
  }

  public listen(event, map, handler) {
    map.on(event, handler);
  }
}
