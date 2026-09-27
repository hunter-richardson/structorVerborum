import TabulaRecta from './recta.ts';
import Tabula from './tabula.ts';
import Ignavum from '../miscella/ignavum.ts';
import Nuntius from '../miscella/nuntius.ts';
import { Multiplex } from '../praebeunda/verba.ts';
import { type Positor } from '../praebeunda/agenda.ts';
import { type Faciendum } from '../praebeunda/interfecta.ts';
import { type Radicator } from '../putatores/putaturum.ts';

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
