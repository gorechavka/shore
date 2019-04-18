import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { PlaceCardComponent } from './place-card/place-card.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { TagsComponent } from './tags/tags.component';
import { TagComponent } from './tag/tag.component';
import { PlaceComponent } from './place/place.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    PlaceCardComponent,
    PlaceListComponent,
    TagsComponent,
    TagComponent,
    PlaceComponent
  ],
  imports: [CommonModule]
})
export class ExploreModule {}
