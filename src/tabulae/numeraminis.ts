import Tabula from './tabula';
import Nuntius from '../miscella/nuntius';
import { NumeramenAgendum } from '../praebeunda/agenda';
import { relaturi, Relaturus } from '../praebeunda/valores';
import { Numeramen } from '../praebeunda/verba';

@Nuntius.factum
export default class TabulaNumeraminis extends Tabula<Numeramen> {
  public agendum!: NumeramenAgendum

  #referatur(referendum: string): string | undefined {
    switch(referendum) {
      case 'multiplicativum': return this.agendum.multiplicativum
      case 'distributivum': return this.agendum.distributivum
      case 'fractionale': return this.agendum.fractionale
      case 'cardinale': return this.agendum.cardinale
      case 'adverbium': return this.agendum.adverbium
      case 'ordinale': return this.agendum.ordinale
      default: return this.agendum.numerus
    }
  }

  @Nuntius.promittum
  async plenetur(): Promise<void> {
    relaturi.forEach((referendum) => {
      let scriptum: string | undefined = this.#referatur(referendum)
      if (scriptum) {
        this.tabula.push(
          Object.assign({}, {
            referendum: Relaturus.referendum(referendum),
            scriptum: scriptum
          } as Numeramen))
      }
    })
  }
}
