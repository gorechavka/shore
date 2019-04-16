import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  tags: string[];

  constructor() {}

  ngOnInit() {
    this.tags = ['Лучшее', 'Для компании', 'Бесплатно', 'Круглосуточно'];
  }
}
