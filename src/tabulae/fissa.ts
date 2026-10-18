import '@/extensions/array';
import Nuntius from '@/miscella/nuntius';
import Refector from '@/miscella/refector';
import { Ignavum, Ultimum } from '@/miscella/usus';
import { Tabulator } from '@/praebeunda/interfecta';
import { Colligendum } from './collata';
import { Tabula, tabulast, tabulatorst } from './tabula';
import { type Agendum, Multiplex } from '@/praebeunda/verba';

export class Findendum extends Colligendum
{ readonly scriptura!: string }

@Ignavum @Ultimum @Nuntius.factum
export default class TabulaFissa<Hoc extends Multiplex> extends Tabula<Hoc> {
  @Nuntius.promittum async tabulentur(): Promise<void> {
    const refector: Refector<Hoc> = new Refector<Hoc>(this.scriptura)
    let _relata: Tabula<Hoc> | undefined
    if(tabulatorst(this.relata)) _relata = this.relata.tabula
    else if(tabulast(this.relata)) _relata = this.relata
    else throw new Error('Inflexionis tabulae mala\'st')
    refector.reficiatur(_relata.haec as Agendum<Hoc>[])
    _relata.haec.forEach((hoc) => this._haec.push(hoc))
  }

  constructor(private readonly relata: Tabula<Hoc> | Tabulator<Hoc>,
              private scriptura: string)
  { super(); this.tabulentur() }
}
