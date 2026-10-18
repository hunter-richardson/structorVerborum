import Nuntius from '@/miscella/nuntius';
import { Ignavum, Ultimum } from '@/miscella/usus';
import { Tabulator } from '@/praebeunda/interfecta';
import { Multiplex } from '@/praebeunda/verba';
import TabulaRescripta from '@/tabulae/rescripta';
import { Tabula } from '@/tabulae/tabula';
import { Mixin } from 'ts-mixer';
import { Praefigendum } from './praefixa';
import { Suffigendum } from './suffixa';

export class Circumfigendum extends Mixin(Praefigendum, Suffigendum) {}

@Ultimum @Ignavum @Nuntius.factum
export default class TabulaCircumfixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  constructor(private readonly praefixum: string,
              relata: Tabula<Hoc> | Tabulator<Hoc>,
              private readonly suffixum: string)
  { super(relata, (scriptum: string) => `${this.praefixum}${scriptum}${this.suffixum}`) }
}
