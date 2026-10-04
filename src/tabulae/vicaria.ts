import TabulaRecta from './recta';
import Tabula from './tabula';
import Nuntius from '../miscella/nuntius';
import Ignavum from '../miscella/usus';
import { Multiplex } from '../praebeunda/verba';
import { type Faciendum } from '../praebeunda/interfecta';
import { type Radicator } from '../putatores/putaturum';

interface Vicaria {
  scapum?: string
  via: string
}

@Nuntius.factum
export default class TabulaVicaria<Hoc extends Faciendum<Illud>, Illud extends Multiplex> extends Tabula<Illud> {
  prima!: Vicaria
  secunda!: Vicaria
  hoc!: Hoc
  radicator!: Radicator<Hoc, Illud>

  @Nuntius.promittum
  async plenetur(): Promise<void> {
    const tabulaPrima: Ignavum<TabulaRecta<Hoc, Illud>> =
                   new Ignavum(TabulaRecta, {
                         radicator: this.radicator,
                         scapum: this.prima.scapum,
                         via: this.prima.via,
                         hoc: this.hoc
                       })

    const tabulaSecunda: Ignavum<TabulaRecta<Hoc, Illud>> =
                     new Ignavum(TabulaRecta, {
                           radicator: this.radicator,
                           scapum: this.secunda.scapum,
                           via: this.secunda.via,
                           hoc: this.hoc
                       })

    this.tabula = [
      ...new Set([
        ...(await tabulaPrima.hoc.tabulentur()),
        ...(await tabulaSecunda.hoc.tabulentur())
      ])
    ]
  }
}
