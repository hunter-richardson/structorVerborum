import { areSetsEqual } from '@neoncitylights/sets';
import equal from 'fast-deep-equal';
import { Tabula, tabulast, tabulatorst } from './tabula';
import '../extensions/array';
import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import { Fulta } from '../praebeunda/valores';
import { Multiplex } from '../praebeunda/verba';
import type { Tabulator } from '../praebeunda/interfecta';

function valores<Hoc extends Multiplex>(haec: Hoc[]): Set<Fulta>
{ return new Set(haec.map((hoc) => hoc.valores)) }

@Ignavum @Ultimum @Nuntius.factum
export default class TabulaConiuncta<Hoc extends Multiplex> extends Tabula<Hoc> {
  @Nuntius.promittum async tabulentur(): Promise<void> {
    let _prima: Hoc[] | undefined
    let _secunda: Hoc[] | undefined
    if(tabulatorst(this.prima)) _prima = this.prima.tabula.haec
    else if(tabulast(this.prima)) _prima = this.prima.haec
    if(tabulatorst(this.secunda)) _secunda = this.secunda.tabula.haec
    else if(tabulast(this.secunda)) _secunda = this.secunda.haec
    if(!_prima || !_secunda || !areSetsEqual(valores(_prima), valores(_secunda)))
      throw new Error('Inflexionis tabulae malae\'st')
    else _prima.forEach((primum) => {
      const secundum: Hoc | undefined = _secunda.first((hoc) => equal(primum.valores, hoc.valores))
      if(!secundum) throw new Error('Inflexionis tabulae malae\'st')
      else {
        primum.scriptum = `${primum.scriptum}${secundum.scriptum}`
        this._haec.push(primum)
      }
    })
  }

  constructor(private readonly prima: Tabula<Hoc> | Tabulator<Hoc>,
              private readonly secunda: Tabula<Hoc> | Tabulator<Hoc>)
  { super(); this.tabulentur() }
}
