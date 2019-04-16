import { Injectable } from '@angular/core';
declare let L;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  constructor() {}

  createMap(div) {
    const map = L.map(div);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(map);
    return map;
  }

  createMarkers() {
    return L.markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: false
    });
  }

  setDefaultLocation(map, markers) {
    map.locate({ setView: true, maxZoom: 13, maximumAge: 1000 });
    map.on('locationerror', err => console.log(err.code));
    map.on('locationfound', _ => this.changeMark({ markers, coords: map.getCenter(), popup: 'U are here' }));
  }

  navigateTo(map, coords: number[]) {
    map.setView(coords, 14);
  }

  changeMark({ markers, coords, popup = undefined }) {
    markers.clearLayers();
    this.setNewMark({ markers, coords, popup });
  }

  setNewMark({ markers, coords, popup = undefined }) {
    const mark = L.marker(coords, { draggable: true });
    if (popup !== undefined) mark.bindPopup(popup).openPopup();
    markers.addLayer(mark);
  }

  // getAdress({lat, lon}){
  // }

  listen(event, map, handler) {
    map.on(event, handler);
  }
}
