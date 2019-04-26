import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { Place } from '../../models/place.model';

@Component({
  selector: 'app-place-card',
  templateUrl: './place-card.component.html',
  styleUrls: ['./place-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceCardComponent implements OnInit, AfterViewInit {
  @Input() public place: Place;

  @Output() public select = new EventEmitter<string>();

  @Output() public loaded = new EventEmitter<boolean>();

  public photo: string;
  public name: string;
  public description: string;

  public ngOnInit() {
    this.photo = `../assets/${this.place.image}`;
  }

  public ngAfterViewInit(): void {
    console.log('loaded');
    this.loaded.emit(true);
  }

  public selectPlace(name) {
    this.select.emit(name);
  }
}
