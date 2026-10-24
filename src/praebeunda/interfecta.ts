import '@/extensions/string';
import { Multiplex } from '@/praebeunda/verba';
import { Tabula } from '@/tabulae/tabula';

export const LATIBILE: unique symbol = Symbol('LATIBILE')
export const LEGIBILE: unique symbol = Symbol('LEGIBILE')

export interface Referendum {
  readonly [LATIBILE]: true
}

export interface Lectum {
  readonly [LEGIBILE]: true
}

export abstract class Tabulator<Hoc extends Multiplex> implements Referendum {
  readonly [ LATIBILE ] = true as const
  abstract get tabula(): Promise<Tabula<Hoc>>
}
