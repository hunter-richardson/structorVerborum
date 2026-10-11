import Nuntius from '@/miscella/nuntius';
import { Ignavum, Ultimum } from '@/miscella/usus';
import { Multiplex } from '@/praebeunda/verba';
import { Tabula } from '@/tabulae/tabula';
import TabulaRescripta from './rescripta';
import { type Tabulator } from '@/praebeunda/interfecta';

@Ultimum @Ignavum @Nuntius.factum
export default class TabulaSuffixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  constructor (relata: Tabula<Hoc> | Tabulator<Hoc>, private readonly suffixum: string)
  { super(relata, (scriptum: string) => `${scriptum}${this.suffixum}`) }
}
