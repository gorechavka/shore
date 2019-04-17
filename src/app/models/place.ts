import { Coords } from './coords';

export interface Place {
  title: string;
  description: string;
  image?: File | string;
  coords?: Coords;
  id?: string | number;
}
