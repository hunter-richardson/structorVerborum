import Tabula from './tabula.ts';
import { referenda, Referendum } from '../miscella/enumerationes.ts';
import Nuntius from '../miscella/nuntius.ts';
import { NumeramenAgendum } from '../praebeunda/agenda.ts';
import { Numeramen } from '../praebeunda/verba.ts';

@Nuntius.factum('TabulaNumeraminis')
export default class TabulaNumeraminis extends Tabula<Numeramen> {
  public agendum!: NumeramenAgendum

  #referatur(referendum: string): string | undefined {
    switch(referendum) {
      case 'multiplicativum': return this.agendum.multiplicativum
      case   'distributivum': return this.agendum.distributivum
      case     'fractionale': return this.agendum.fractionale
      case       'cardinale': return this.agendum.cardinale
      case       'adverbium': return this.agendum.adverbium
      case        'ordinale': return this.agendum.ordinale
                     default: return this.agendum.numerus
    }
  }

  @Nuntius.promittum('TabulaNumeraminis')
  async plenetur(): Promise<void> {
    referenda.forEach((referendum) => {
      let scriptum: string | undefined = this.#referatur(referendum)
      if (scriptum) {
        this.tabula.push(
          Object.assign({}, {
            referendum: Referendum.referendum(referendum),
            scriptum: scriptum
          } as Numeramen))
      }
    })
  }
}
