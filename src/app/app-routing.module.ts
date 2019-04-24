import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesPageComponent } from './categories/categories-page/categories-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapPageComponent } from './share/map-page/map-page.component';
import { SearchPageComponent } from './explore/search-page/search-page.component';
import { AuthGuard } from './core/auth-service/auth.guard';
import { AuthComponent } from './global/auth/auth.component';

const routes: Routes = [
  {
    path: 'categories/:action',
    component: CategoriesPageComponent
  },
  {
    path: 'share/:category',
    component: MapPageComponent,
    canActivate: [AuthGuard]
  },
  { path: 'explore/:category', component: SearchPageComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
