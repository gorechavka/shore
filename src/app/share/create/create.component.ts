import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Coords } from 'src/app/models/coords';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() coords: Coords;
  @Output() close = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onCloseClick() {
    this.close.emit();
  }
}
