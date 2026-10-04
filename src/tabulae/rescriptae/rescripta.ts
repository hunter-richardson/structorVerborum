import Nuntius from '../../miscella/nuntius';
import { Multiplex } from '../../praebeunda/verba';
import Tabula from '../tabula';
import type Ignavum from '../../miscella/usus';

type Rescriptor = (scriptum: string) => string

@Nuntius.factum
export default class TabulaRescripta<Hoc extends Multiplex> extends Tabula<Hoc> {
  relata!: Ignavum<Tabula<Hoc>>
  rescriptor!: Rescriptor

  @Nuntius.promittum
  async plenetur(): Promise<void> {
    this.tabula = (await this.relata.hoc.tabulentur()).map((hoc) => {
      hoc.scriptum = this.rescriptor(hoc.scriptum)
      return hoc
    })
  }
}
