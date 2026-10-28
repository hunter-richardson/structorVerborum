import { Ignavum, Ultimum } from '@/miscella/usus'
import { Tabulator } from '@/praebeunda/interfecta'
import TabulaRescripta from '@/tabulae/rescripta'
import { Multiplex } from '@/praebeunda/verba'
import { Tabula } from '@/tabulae/tabula'
import Nuntius from '@/miscella/nuntius'
import { Colligendum } from '@/tabulae/collata'

export class Praefigendum extends Colligendum {
  readonly praefixum!: string
}

@Ultimum
@Ignavum
@Nuntius.factum
export class TabulaPraefixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  constructor(
    private readonly praefixum: string,
    relata: Tabula<Hoc> | Tabulator<Hoc>,
  ) {
    super(relata, (scriptum: string) => `${this.praefixum}${scriptum}`)
  }
}
