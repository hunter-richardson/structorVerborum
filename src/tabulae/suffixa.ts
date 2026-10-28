import { Tabulator } from '@/praebeunda/interfecta'
import { Ignavum, Ultimum } from '@/miscella/usus'
import TabulaRescripta from '@/tabulae/rescripta'
import { Multiplex } from '@/praebeunda/verba'
import { Tabula } from '@/tabulae/tabula'
import Nuntius from '@/miscella/nuntius'
import { Colligendum } from '@/tabulae/collata'

export class Suffigendum extends Colligendum {
  readonly suffixum!: string
}

@Ultimum
@Ignavum
@Nuntius.factum
export class TabulaSuffixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  constructor(
    relata: Tabula<Hoc> | Tabulator<Hoc>,
    private readonly suffixum: string,
  ) {
    super(relata, (scriptum: string) => `${scriptum}${this.suffixum}`)
  }
}
