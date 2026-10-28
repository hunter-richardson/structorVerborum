import { Mixin } from 'ts-mixer'
import { Tabulator } from '@/praebeunda/interfecta'
import { Ignavum, Ultimum } from '@/miscella/usus'
import TabulaRescripta from '@/tabulae/rescripta'
import { Praefigendum } from '@/tabulae/praefixa'
import { Suffigendum } from '@/tabulae/suffixa'
import { Multiplex } from '@/praebeunda/verba'
import { Tabula } from '@/tabulae/tabula'
import Nuntius from '@/miscella/nuntius'

export class Circumfigendum extends Mixin(Praefigendum, Suffigendum) {}

@Ultimum
@Ignavum
@Nuntius.factum
export class TabulaCircumfixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  constructor(
    private readonly praefixum: string,
    relata: Tabula<Hoc> | Tabulator<Hoc>,
    private readonly suffixum: string,
  ) {
    super(relata, (scriptum: string) => `${this.praefixum}${scriptum}${this.suffixum}`)
  }
}
