import { Tabula, tabulast, tabulatorst } from '@/tabulae/tabula'
import { type Numeratum } from '@/praebeunda/valores'
import { Tabulator } from '@/praebeunda/interfecta'
import { type Multiplex } from '@/praebeunda/verba'
import { Ignavum, Ultimum } from '@/miscella/usus'
import Nuntius from '@/miscella/nuntius'

@Ignavum
@Ultimum
@Nuntius.factum
export default class<Hoc extends Multiplex & Numeratum> extends Tabula<Hoc> {
  private readonly _singularis: Record<string, string> = {
    numerus: 'singularis',
  }
  private readonly _pluralis: Record<string, string> = { numerus: 'pluralis' }

  @Nuntius.promittum async tabulentur(): Promise<void> {
    let _singularis: Tabula<Hoc> | undefined
    let _pluralis: Tabula<Hoc> | undefined
    if (tabulatorst(this.singularis)) _singularis = await this.singularis.tabula
    else if (tabulast(this.singularis)) _singularis = this.singularis
    if (tabulatorst(this.pluralis)) _pluralis = await this.pluralis.tabula
    else if (tabulast(this.pluralis)) _pluralis = this.pluralis
    if (_singularis === undefined || _pluralis === undefined) throw new Error("Inflexionis tabulae mala'st")
    _singularis
      .colantur({
        radix: '',
        fulta: this._singularis,
      })
      .forEach((hoc) => this._haec.push(hoc))
    _pluralis
      .colantur({
        radix: '',
        fulta: this._pluralis,
      })
      .forEach((hoc) => this._haec.push(hoc))
    return Promise.resolve()
  }

  constructor(
    private readonly singularis: Tabula<Hoc> | Tabulator<Hoc>,
    private readonly pluralis: Tabula<Hoc> | Tabulator<Hoc>,
  ) {
    super()
  }
}
