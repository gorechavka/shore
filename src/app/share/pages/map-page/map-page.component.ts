import { Component, OnInit, Input } from '@angular/core';
import { Coords } from '../../../models/coords';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css']
})
export class MapPageComponent implements OnInit {
  coords: Coords;
  category: string;

  placeChoosen: boolean = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
  }
}
