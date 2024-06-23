import TabulaScapalis from './scapalis';
import Tabula from './tabula';
import Nuntius from '../miscella/nuntius';
import { Multiplex } from '../praebeunda/verba';
import type { Colamen, Positor } from '../praebeunda/agenda'
import type { Faciendum } from '../praebeunda/interfecta'

type Radicator<Hoc, Illud> = (hoc: Hoc, colamen: Colamen<Illud>) => string

type Optanda<Hoc extends Faciendum<Illud>, Illud extends Multiplex> = {
  radicator: Radicator<Hoc, Illud>
  positor: Positor<Illud>
  scapum?: string
  via: string
  hoc: Hoc
}

@Nuntius.factum('TabulaRecta')
export default class TabulaRecta<
  Hoc extends Faciendum<Illud>,
  Illud extends Multiplex
> extends Tabula<Illud> {
  private readonly _: Optanda<Hoc, Illud>

  constructor(optanda: Optanda<Hoc, Illud>) {
    super()
    this._ = optanda
  }

  @Nuntius.futurus('TabulaRecta')
  async plenetur(): Promise<void> {
    const scapalis: TabulaScapalis<Illud> = new TabulaScapalis({
      positor: this._.positor,
      scapum: this._.scapum,
      via: this._.via
    })

    this.tabula = (await scapalis.tabulentur()).map((illud) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { scriptum, categoria, ...valores } = illud
      illud.scriptum = this._.radicator(this._.hoc, valores as any).concat(scriptum)
      return illud
    })
  }
}
