import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [CategoriesPageComponent, CategoriesComponent],
  imports: [CommonModule]
})
export class CategoriesModule {}
