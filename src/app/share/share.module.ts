import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { MapModule } from '../global/map/map.module';
import { MapSearchModule } from '../global/map-search/map-search.module';
import { CreateComponent } from './create/create.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FeedbackModule } from '../global/feedback/feedback.module';

@NgModule({
  declarations: [MapPageComponent, CreateComponent],
  imports: [CommonModule, MapModule, MapSearchModule, ReactiveFormsModule, FeedbackModule],
  providers: [FormBuilder]
})
export class ShareModule {}
