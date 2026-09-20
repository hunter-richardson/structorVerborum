import type Ignavum from '../../miscella/ignavum';
import Nuntius from '../../miscella/nuntius';
import { Multiplex } from '../../praebeunda/verba';
import Tabula from '../tabula';

type Rescriptor = (scriptum: string) => string

@Nuntius.factum('TabulaRescripta')
export default class TabulaRescripta<Hoc extends Multiplex> extends Tabula<Hoc> {
  relata!: Ignavum<Tabula<Hoc>>
  rescriptor!: Rescriptor

  @Nuntius.futurus('TabulaRescripta')
  async plenetur(): Promise<void> {
    this.tabula = (await this.relata.hoc().tabulentur()).map((hoc) => {
      hoc.scriptum = this.rescriptor(hoc.scriptum)
      return hoc
    })
  }
}
