import '../extensions/string.ts';
import type Ignavum from '../miscella/ignavum';
import Tabula from '../tabulae/tabula';
import { Multiplex } from './verba';
export interface Referendum {}
export interface Lectum extends Referendum {}
export interface Faciendum<Illud extends Multiplex> extends Referendum {
  putetur(): Ignavum<Tabula<Illud>> | undefined
}
