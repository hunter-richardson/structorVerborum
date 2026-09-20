import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import { type Positor } from '../praebeunda/agenda';
import { type Faciendum } from '../praebeunda/interfecta';
import { Multiplex } from '../praebeunda/verba';
import { type Radicator } from '../putatores/putaturum';
import TabulaRecta from './recta';
import Tabula from './tabula';

interface Vicaria {
  scapum?: string
  via: string
}

@Nuntius.factum('TabulaVicaria')
export default class TabulaVicaria<Hoc extends Faciendum<Illud>, Illud extends Multiplex> extends Tabula<Illud> {
  prima!: Vicaria
  secunda!: Vicaria
  hoc!: Hoc
  radicator!: Radicator<Hoc, Illud>
  positor!: Positor<Illud>

  @Nuntius.futurus('TabulaVicaria')
  async plenetur(): Promise<void> {
    const tabulaPrima: Ignavum<TabulaRecta<Hoc, Illud>> =
                   new Ignavum(TabulaRecta, {
                         radicator: this.radicator,
                         positor: this.positor as Positor<Multiplex>,
                         scapum: this.prima.scapum,
                         via: this.prima.via,
                         hoc: this.hoc
                       })

    const tabulaSecunda: Ignavum<TabulaRecta<Hoc, Illud>> =
                     new Ignavum(TabulaRecta, {
                           radicator: this.radicator,
                           positor: this.positor as Positor<Multiplex>,
                           scapum: this.secunda.scapum,
                           via: this.secunda.via,
                           hoc: this.hoc
                       })

    this.tabula = [
      ...new Set([
        ...(await tabulaPrima.hoc().tabulentur()),
        ...(await tabulaSecunda.hoc().tabulentur())
      ])
    ]
  }
}
