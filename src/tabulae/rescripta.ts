import { Tabula, tabulast, tabulatorst } from '@/tabulae/tabula'
import { Tabulator } from '@/praebeunda/interfecta'
import { Multiplex } from '@/praebeunda/verba'
import { Ignavum } from '@/miscella/usus'
import Nuntius from '@/miscella/nuntius'

@Ignavum
@Nuntius.factum
export default class<Hoc extends Multiplex> extends Tabula<Hoc> /* NOSONAR: Nil moror */ {
  @Nuntius.promittum async tabulentur(): Promise<void> {
    let _relata: Tabula<Hoc> | undefined
    if (tabulatorst(this.relata)) _relata = await this.relata.tabula
    else if (tabulast(this.relata)) _relata = this.relata
    else throw new Error("Inflexionis tabula mala'st")
    _relata.haec.forEach((relatum) => {
      relatum.scriptum = this.rescriptor(relatum.scriptum)
      this._haec.push(relatum)
    })
  }

  constructor(
    private readonly relata: Tabula<Hoc> | Tabulator<Hoc>,
    protected readonly rescriptor: (scriptum: string) => string
  ) {
    super()
  }
}
