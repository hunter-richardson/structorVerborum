import equal from 'fast-deep-equal';
import { Tabula, tabulast, tabulatorst } from './tabula';
import '../extensions/array';
import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import { Multiplex } from '../praebeunda/verba';
import { type Tabulator } from '../praebeunda/interfecta';

@Ignavum @Ultimum @Nuntius.factum
export default class TabulaCollata<Hoc extends Multiplex> extends Tabula<Hoc> {
  tabulae: Tabula<Hoc>[] = []

  @Nuntius.promittum async tabulentur() {
    this.tabulae.forEach((tabula) => {
      tabula.haec.forEach((illud) => {
        if(this._haec.none((hoc) => equal(hoc.valores, illud.valores)))
          this._haec.push(illud)
      })
    })
  }

  constructor(...colligenda: (Tabula<Hoc> | Tabulator<Hoc>)[]) {
    super(); colligenda.forEach((colligendum) => {
      if(tabulatorst(colligendum)) this.tabulae.push(colligendum.tabula)
      if(tabulast(colligendum)) this.tabulae.push(colligendum)
    }); this.tabulentur()
  }
}
