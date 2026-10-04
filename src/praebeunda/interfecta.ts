import { Multiplex } from './verba';
import '../extensions/string';
import Tabula from '../tabulae/tabula';
import type { Fulta } from './valores';

export interface Referendum {}

export interface Lectum extends Referendum {}

export interface Inflectendum<Hoc extends Multiplex> {
  versio: string
  scapum: string
}

export interface Faciendum<Illud extends Multiplex> extends Referendum {
  putetur(): Tabula<Illud> | undefined
}

export abstract class Cretor<Hoc extends Multiplex, Illud extends Inflectendum<Hoc>> {
  protected abstract cernatur(illud: Illud, fulta: Fulta): string
  protected abstract metiatur(illud: Illud, fulta: Fulta): number
}
