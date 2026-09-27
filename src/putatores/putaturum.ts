import { Multiplex } from '../praebeunda/verba.ts';
import Tabula from '../tabulae/tabula.ts';
import type Ignavum from '../miscella/ignavum.ts';
import { type Colamen } from '../praebeunda/agenda.ts';
import { type Faciendum } from '../praebeunda/interfecta.ts';

export type Radicator<Hoc, Illud> = (hoc: Hoc, percolamen: Colamen<Illud>) => string

export interface Putaturum<Hoc extends Faciendum<Illud>, Illud extends Multiplex> {
  putetur(hoc: Hoc): Ignavum<Tabula<Illud>>
}
