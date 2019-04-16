import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { PlaceFormComponent } from './place-form/place-form.component';
import { MapModule } from '../global/map/map.module';
import { MapSearchModule } from '../global/map-search/map-search.module';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [MapPageComponent, PlaceFormComponent, CreateComponent],
  imports: [CommonModule, MapModule, MapSearchModule]
})
export class ShareModule {}
