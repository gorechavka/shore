import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { PlacePageComponent } from './pages/place-page/place-page.component';
import { PlaceCardComponent } from './place-card/place-card.component';
import { ExlporeRoutingModule } from './exlpore-routing.module';
import { PlaceListComponent } from './place-list/place-list.component';
import { TagsComponent } from './tags/tags.component';
import { TagComponent } from './tag/tag.component';
import { PlaceComponent } from './place/place.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    PlacePageComponent,
    PlaceCardComponent,
    PlaceListComponent,
    TagsComponent,
    TagComponent,
    PlaceComponent
  ],
  imports: [CommonModule, ExlporeRoutingModule]
})
export class ExploreModule {}
