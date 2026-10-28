import equal from 'fast-deep-equal'
import { Tabula, tabulast, tabulatorst } from '@/tabulae/tabula'
import { type Lectum, LEGIBILE, Tabulator } from '@/praebeunda/interfecta'
import { Ignavum, Ultimum } from '@/miscella/usus'
import { type Classis } from '@/miscella/anomala'
import { Multiplex } from '@/praebeunda/verba'
import Nuntius from '@/miscella/nuntius'
import '@/extensions/array'

export class Colligendum implements Lectum {
  readonly [LEGIBILE] = true as const
  readonly relatum!: string
  readonly relati!: Classis
}

@Ignavum
@Ultimum
@Nuntius.factum
export class TabulaCollata<Hoc extends Multiplex> extends Tabula<Hoc> {
  impellantur(illa: Hoc[]) {
    illa.forEach((illud) => {
      if (this._haec.none((hoc) => equal(hoc.valores, illud.valores))) this._haec.push(illud)
    })
  }

  @Nuntius.promittum tabulentur() {
    this.colligenda.forEach(async (colligendum) => {
      if (tabulatorst(colligendum)) {
        this.impellantur((await colligendum.tabula).haec)
      } else if (tabulast(colligendum)) {
        this.impellantur(colligendum.haec)
      }
    })
    return Promise.resolve()
  }

  constructor(private readonly colligenda: (Tabula<Hoc> | Tabulator<Hoc>)[]) {
    super()
  }
}
