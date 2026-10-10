import Nuntius from '../../miscella/nuntius';
import { Ignavum, Ultimum } from '../../miscella/usus';
import { Multiplex } from '../../praebeunda/verba';
import { Tabula, tabulast, tabulatorst } from '../tabula';
import { type Tabulator } from '../../praebeunda/interfecta';

@Ignavum @Ultimum @Nuntius.factum
export default class TabulaRescripta<Hoc extends Multiplex> extends Tabula<Hoc> {
  @Nuntius.promittum async tabulentur(): Promise<void> {
    let _relata: Tabula<Hoc> | undefined
    if(tabulatorst(this.relata)) _relata = this.relata.tabula
    else if(tabulast(this.relata)) _relata = this.relata
    else throw new Error('Inflexionis tabula mala\'st')
    _relata.haec.forEach((relatum) => {
      relatum.scriptum = this.rescriptor(relatum.scriptum)
      this._haec.push(relatum)
  }) }

  constructor(private readonly relata: Tabula<Hoc> | Tabulator<Hoc>,
              protected readonly rescriptor: (scriptum: string) => string)
  { super(); this.tabulentur() }
}
