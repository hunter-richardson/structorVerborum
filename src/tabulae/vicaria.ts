import TabulaRecta from './recta'
import Tabula from './tabula'
import Nuntius from '../miscella/nuntius'
import { Multiplex } from '../praebeunda/verba'
import { type Positor } from '../praebeunda/agenda'
import { type Faciendum } from '../praebeunda/interfecta'
import { type Radicator } from '../putatores/putaturum'

type Optanda<Hoc extends Faciendum<Illud>, Illud extends Multiplex> = {
  prima: {
    scapum?: string
    via: string
  }
  secunda: {
    scapum?: string
    via: string
  }
  radicator: Radicator<Hoc, Illud>
  positor: Positor<Illud>
  hoc: Hoc
}

@Nuntius.factum('TabulaVicaria')
export default class TabulaVicaria<
  Hoc extends Faciendum<Illud>,
  Illud extends Multiplex
> extends Tabula<Illud> {
  private readonly _: Optanda<Hoc, Illud>

  constructor(optanda: Optanda<Hoc, Illud>) {
    super()
    this._ = optanda
  }

  @Nuntius.futurus('TabulaVicaria')
  async plenetur(): Promise<void> {
    const prima: TabulaRecta<Hoc, Illud> = new TabulaRecta({
      radicator: this._.radicator,
      positor: this._.positor,
      scapum: this._.prima.scapum,
      via: this._.prima.via,
      hoc: this._.hoc
    })

    const secunda: TabulaRecta<Hoc, Illud> = new TabulaRecta({
      radicator: this._.radicator,
      positor: this._.positor,
      scapum: this._.secunda.scapum,
      via: this._.secunda.via,
      hoc: this._.hoc
    })

    this.tabula = [...new Set([...(await prima.tabulentur()), ...(await secunda.tabulentur())])]
  }
}
