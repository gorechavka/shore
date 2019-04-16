import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { PlaceCardComponent } from './place-card/place-card.component';

const routes: Routes = [{ path: 'place/:id', component: PlaceCardComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExlporeRoutingModule {}
