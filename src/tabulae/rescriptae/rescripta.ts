import Ignavum from '../../miscella/ignavum'
import Nuntius from '../../miscella/nuntius'
import { Multiplex } from '../../praebeunda/verba'
import Tabula from '../tabula'

type Rescriptor = (scriptum: string) => string

type Optanda<Hoc extends Multiplex> = {
  relata: Ignavum<Tabula<Hoc>>
  rescriptor: Rescriptor
}

@Nuntius.factum('TabulaRescripta')
export default class TabulaRescripta<Hoc extends Multiplex> extends Tabula<Hoc> {
  private readonly _: Optanda<Hoc>

  constructor(optanda: Optanda<Hoc>) {
    super()
    this._ = optanda
  }

  @Nuntius.futurus('TabulaRescripta')
  async plenetur(): Promise<void> {
    const relata: Tabula<Hoc> = this._.relata.ipse()
    this.tabula = (await relata.tabulentur()).map((hoc) => {
      hoc.scriptum = this._.rescriptor(hoc.scriptum)
      return hoc
    })
  }
}
