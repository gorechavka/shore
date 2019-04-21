import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './map-page/map-page.component';
import { MapModule } from '../global/map/map.module';
import { MapSearchModule } from '../global/map-search/map-search.module';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FeedbackModule } from '../global/feedback/feedback.module';
import { MapPlaceComponent } from './map-place/map-place.component';

@NgModule({
  declarations: [MapPageComponent, CreateComponent, MapPlaceComponent],
  imports: [CommonModule, MapModule, MapSearchModule, ReactiveFormsModule, FeedbackModule],
  providers: [FormBuilder]
})
export class ShareModule {}
