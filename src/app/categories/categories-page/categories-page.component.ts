import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category.model';
import { StateService } from '../../core/state-service/state.service';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {
  action: string;
  category: Category;
  constructor(private route: ActivatedRoute, private router: Router, private stateService: StateService) {}

  ngOnInit() {
    this.action = this.route.snapshot.paramMap.get('action');
  }

  onCategoryChoose(category: Category) {
    this.category = category;
    this.stateService.setCategory(category);
  }

  goNext() {
    this.router
      .navigate([`./${this.action}/${this.category}`])
      .then(_ => console.log('navigated to ' + `./${this.action}/${this.category}`));
  }
}
