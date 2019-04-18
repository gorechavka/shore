import { Place } from './place';
import { Coords } from './coords';

export interface State {
  places: Place[];
  coords: Coords[];
  error?: boolean;
}
