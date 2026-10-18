import Nuntius from '@/miscella/nuntius';
import { Ignavum, Ultimum } from '@/miscella/usus';
import { Tabulator } from '@/praebeunda/interfecta';
import { Multiplex } from '@/praebeunda/verba';
import TabulaRescripta from '@/tabulae/rescripta';
import { Tabula } from '@/tabulae/tabula';
import { Colligendum } from './collata';

export class Praefigendum extends Colligendum
{ readonly praefixum!: string }

@Ultimum @Ignavum @Nuntius.factum
export default class TabulaPraefixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  constructor(private readonly praefixum: string, relata: Tabula<Hoc> | Tabulator<Hoc>)
  { super(relata, (scriptum: string) => `${this.praefixum}${scriptum}`) }
}
