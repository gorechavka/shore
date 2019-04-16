import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { CategoriesComponent } from './categories/categories.component';
// import { Routes, RouterModule } from '@angular/router';
// import { SearchPageComponent } from '../explore/pages/search-page/search-page.component';

@NgModule({
  declarations: [CategoriesPageComponent, CategoriesComponent],
  imports: [CommonModule]
})
export class CategoriesModule {}
