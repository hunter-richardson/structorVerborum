import { Multiplex } from './verba.ts';
import '../extensions/string.ts';
import Tabula from '../tabulae/tabula.ts';
import type Ignavum from '../miscella/ignavum.ts';
export interface Referendum {}
export interface Lectum extends Referendum {}
export interface Faciendum<Illud extends Multiplex> extends Referendum {
  putetur(): Ignavum<Tabula<Illud>> | undefined
}
