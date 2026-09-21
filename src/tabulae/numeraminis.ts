import Tabula from './tabula';
import { referenda } from '../miscella/enumerationes';
import Nuntius from '../miscella/nuntius';
import { NumeramenAgendum } from '../praebeunda/agenda';
import { Numeramen } from '../praebeunda/verba';

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
      case         'numerus': return this.agendum.numerus
    }
  }

  @Nuntius.futurus('TabulaNumeraminis')
  async plenetur(): Promise<void> {
    referenda.forEach((referendum) => {
      let scriptum: string | undefined = this.#referatur(referendum)
      if (scriptum) {
        this.tabula.push(
          Object.assign({}, {
            referendum: referendum,
            scriptum: scriptum
          } as Numeramen))
      }
    })
  }
}
