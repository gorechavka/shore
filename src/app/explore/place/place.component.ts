import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Place } from '../../models/place';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  @Input() place: Place;

  @Output() hide = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onCloseClick() {
    this.hide.emit();
  }
}
