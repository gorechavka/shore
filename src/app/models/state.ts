import { Place } from './place';
import { Userdb } from './Userdb';

export interface State {
  places: Place[];
  images: ArrayBuffer[];
  users?: Userdb[];
  error?: boolean;
}
