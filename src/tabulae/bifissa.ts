import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import { Nomen } from '../praebeunda/verba';
import {
  type Par,
  Tabula,
  tabulast,
  tabulatorst
  } from './tabula';
import { type Tabulator } from '../praebeunda/interfecta';

@Ignavum @Ultimum @Nuntius.factum
export default class TabulaBifissa extends Tabula<Nomen> {
  private readonly _singularis: Par = { numerus: 'singularis' }
  private readonly _pluralis: Par = { numerus: 'pluralis' }

  @Nuntius.promittum async tabulentur(): Promise<void> {
    let _singularis: Nomen[] | undefined
    let _pluralis: Nomen[] | undefined
    if(tabulatorst(this.singularis)) _singularis = this.singularis.tabula.colantur(this._singularis)
    if(tabulast(this.singularis)) _singularis = this.singularis.colantur(this._singularis)
    if(tabulatorst(this.pluralis)) _pluralis = this.pluralis.tabula.colantur(this._pluralis)
    if(tabulast(this.pluralis)) _pluralis = this.pluralis.colantur(this._pluralis)
    if(!_singularis || !_pluralis) throw new Error('Inflexionis tabulae mala\'st')
    else [
      ..._singularis,
      ..._pluralis
    ].flat().forEach((hoc) => this._haec.push(hoc))
  }

  constructor (private readonly singularis: Tabula<Nomen> | Tabulator<Nomen>,
               private readonly pluralis: Tabula<Nomen> | Tabulator<Nomen>)
  { super(); this.tabulentur() }
}
