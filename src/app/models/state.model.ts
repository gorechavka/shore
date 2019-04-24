import { Place } from './place.model';
import { Userdb } from './userdb.model';

export interface State {
  places: Place[];
  users?: Userdb[];
  error?: boolean;
}
