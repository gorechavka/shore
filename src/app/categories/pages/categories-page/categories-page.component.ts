import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  mode: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.mode = this.route.snapshot.paramMap.get('mode');
  }

  goNext() {}
}
