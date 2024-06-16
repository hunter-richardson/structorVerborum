import { Multiplex } from './verba';
import Tabula from '../tabulae/tabula';

export interface Referendum { }
export interface Lectum extends Referendum { }
export interface Faciendum<Illud extends Multiplex> extends Referendum {
  putetur (): Tabula<Illud> | null;
}
