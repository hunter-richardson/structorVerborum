import Nuntius from '../../miscella/nuntius.ts';
import { Multiplex } from '../../praebeunda/verba.ts';
import Tabula from '../tabula.ts';
import type Ignavum from '../../miscella/ignavum.ts';

type Rescriptor = (scriptum: string) => string

@Nuntius.factum('TabulaRescripta')
export default class TabulaRescripta<Hoc extends Multiplex> extends Tabula<Hoc> {
  relata!: Ignavum<Tabula<Hoc>>
  rescriptor!: Rescriptor

  @Nuntius.promittum('TabulaRescripta')
  async plenetur(): Promise<void> {
    this.tabula = (await this.relata.hoc().tabulentur()).map((hoc) => {
      hoc.scriptum = this.rescriptor(hoc.scriptum)
      return hoc
    })
  }
}
