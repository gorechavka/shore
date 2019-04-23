import { Place } from './place';
import { Userdb } from './Userdb';

export interface State {
  places: Place[];
  users?: Userdb[];
  error?: boolean;
}
