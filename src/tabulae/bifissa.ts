import Nuntius from '@/miscella/nuntius';
import { Ignavum, Ultimum } from '@/miscella/usus';
import { Tabulator } from '@/praebeunda/interfecta';
import { type Multiplex } from '@/praebeunda/verba';
import {
  type Par,
  Tabula,
  tabulast,
  tabulatorst
  } from './tabula';
import type { Numeratum } from '../praebeunda/valores';

@Ignavum @Ultimum @Nuntius.factum
export default class TabulaBifissa<Hoc extends Multiplex & Numeratum> extends Tabula<Hoc> {
  private readonly _singularis: Par = { numerus: 'singularis' }
  private readonly _pluralis  : Par = { numerus: 'pluralis'   }

  @Nuntius.promittum async tabulentur(): Promise<void> {
    let _singularis: Tabula<Hoc> | undefined
    let _pluralis: Tabula<Hoc> | undefined
    if(tabulatorst(this.singularis)) _singularis = this.singularis.tabula
    if(tabulast   (this.singularis)) _singularis = this.singularis
    if(tabulatorst(this.  pluralis)) _pluralis   = this.  pluralis.tabula
    if(tabulast   (this.  pluralis)) _pluralis   = this.  pluralis
    if(_singularis === undefined || _pluralis === undefined)
      throw new Error('Inflexionis tabulae mala\'st')
    _singularis.colantur(this._singularis).forEach((hoc) => this._haec.push(hoc))
    _pluralis  .colantur(this._pluralis  ).forEach((hoc) => this._haec.push(hoc))
  }

  constructor (private readonly singularis: Tabula<Hoc> | Tabulator<Hoc>,
               private readonly pluralis: Tabula<Hoc> | Tabulator<Hoc>)
  { super(); this.tabulentur() }
}
