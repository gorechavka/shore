import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { PlaceFormComponent } from './place-form/place-form.component';
import { MapModule } from '../global/map/map.module';
import { MapSearchModule } from '../global/map-search/map-search.module';

@NgModule({
  declarations: [MapPageComponent, CreatePageComponent, PlaceFormComponent],
  imports: [CommonModule, MapModule, MapSearchModule]
})
export class ShareModule {}
