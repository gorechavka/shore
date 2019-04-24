import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page/search-page.component';
import { PlaceCardComponent } from './place-card/place-card.component';
import { PlaceListComponent } from './place-list/place-list.component';
import { MapModule } from '../global/map/map.module';
import { MapSearchModule } from '../global/map-search/map-search.module';
import { LoaderModule } from '../global/loader/loader.module';
import { PlaceAsideComponent } from './place-aside/place-aside.component';
import { PlaceModalComponent } from './place-modal/place-modal.component';
import { PlaceComponent } from './place/place.component';

@NgModule({
  declarations: [
    SearchPageComponent,
    PlaceCardComponent,
    PlaceListComponent,
    PlaceModalComponent,
    PlaceAsideComponent,
    PlaceComponent
  ],
  imports: [CommonModule, MapModule, MapSearchModule, LoaderModule]
})
export class ExploreModule {}
