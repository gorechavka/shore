import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor() {}

  @Input() mode: string;

  ngOnInit() {}
}
