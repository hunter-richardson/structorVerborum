import { Agendum, Multiplex } from '../praebeunda/verba.ts';

export interface Refector<Hoc extends Multiplex>
{ frangentur(agenda: Agendum<Hoc>[]): void }
