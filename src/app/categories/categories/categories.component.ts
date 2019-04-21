import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

const coffeeI = require('../../assets/imgs/coffee.png');

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Output() choose = new EventEmitter<string>();
  categories: string[] = ['food', 'coffee', 'drinks', 'nightlife', 'nature', 'music', 'movies', 'other'];

  constructor() {}

  ngOnInit() {}

  chooseCategory(category) {
    this.choose.emit(category);
  }
}
