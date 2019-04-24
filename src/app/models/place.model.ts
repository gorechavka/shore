import { Coords } from './coords.model';
import { Category } from './category.model';

export interface Place {
  category: Category;
  title: string;
  description: string;
  image?: ArrayBuffer | string;
  coords?: Coords;
  id?: string;
  rate?: number;
  voted?: string[];
}
