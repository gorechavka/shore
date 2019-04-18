import { Coords } from './coords';
import { Category } from './category';

export interface Place {
  category: Category;
  title: string;
  description: string;
  image?: ArrayBuffer | string;
  coords?: Coords;
  id?: string | number;
}
