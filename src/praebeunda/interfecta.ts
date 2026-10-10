import { Multiplex } from './verba';
import '../extensions/string';
import { Tabula } from '../tabulae/tabula';

export interface Referendum {}

export interface Lectum extends Referendum {}

export interface Faciendum<Illud extends Multiplex> extends Referendum {
  putetur(): Tabula<Illud> | undefined
}

export interface Tabulator<Illud extends Multiplex> extends Referendum {
  readonly tabula: Tabula<Illud>
}
