import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesPageComponent } from './categories/pages/categories-page/categories-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapPageComponent } from './share/pages/map-page/map-page.component';
import { SearchPageComponent } from './explore/pages/search-page/search-page.component';

const routes: Routes = [
  { path: 'categories/:action', component: CategoriesPageComponent },
  { path: 'share/:category', component: MapPageComponent },
  { path: 'explore/:category', component: SearchPageComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
