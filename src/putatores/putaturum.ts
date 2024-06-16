import { Multiplex } from '../praebeunda/verba';
import Tabula from '../tabulae/tabula';
import { type Percolamen } from '../praebeunda/agenda';
import { type Faciendum } from '../praebeunda/interfecta';

export type Radicator<Hoc, Illud> = (hoc: Hoc, percolamen: Percolamen<Illud>) => string;

export interface Putaturum<Hoc extends Faciendum<Illud>, Illud extends Multiplex> {
  putetur (hoc: Hoc): Tabula<Illud>;
}
