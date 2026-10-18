import Nuntius from '@/miscella/nuntius';
import { Ignavum, Ultimum } from '@/miscella/usus';
import { Tabulator } from '@/praebeunda/interfecta';
import { Multiplex } from '@/praebeunda/verba';
import TabulaRescripta from '@/tabulae/rescripta';
import { Tabula } from '@/tabulae/tabula';
import { Colligendum } from './collata';

export class Suffigendum extends Colligendum
{ readonly suffixum!: string }

@Ultimum @Ignavum @Nuntius.factum
export default class TabulaSuffixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  constructor (relata: Tabula<Hoc> | Tabulator<Hoc>, private readonly suffixum: string)
  { super(relata, (scriptum: string) => `${scriptum}${this.suffixum}`) }
}
