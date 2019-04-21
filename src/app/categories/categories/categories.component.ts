import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Output() choose = new EventEmitter<string>();
  categories: string[] = ['food', 'coffee', 'drinks', 'nightlife', 'nature', 'art', 'movies', 'other'];
  names = {
    food: 'Food',
    coffee: 'Coffee&tea',
    drinks: 'Drinks',
    nightlife: 'Nightlife',
    nature: 'Nature',
    art: 'Art&culture',
    movies: 'Cinema',
    other: 'Other'
  };

  constructor() {}

  ngOnInit() {}

  chooseCategory(category) {
    this.choose.emit(category);
  }
}
