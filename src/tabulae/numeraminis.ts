import { referenda } from '../miscella/enumerationes';
import Nuntius from '../miscella/nuntius';
import { NumeramenAgendum } from '../praebeunda/agenda';
import { Numeramen } from '../praebeunda/verba';
import Tabula from './tabula';

@Nuntius.factum('TabulaNumeraminis')
export default class TabulaNumeraminis extends Tabula<Numeramen> {
  public agendum!: NumeramenAgendum

  @Nuntius.futurus('TabulaNumeraminis')
  async plenetur(): Promise<void> {
    referenda.forEach((referendum) => {
      let scriptum: string | undefined = undefined
      switch (referendum) {
        case 'numerus':
          scriptum = this.agendum.numerus
          break
        case 'ordinale':
          scriptum = this.agendum.ordinale
          break
        case 'cardinale':
          scriptum = this.agendum.cardinale
          break
        case 'adverbium':
          scriptum = this.agendum.adverbium
          break
        case 'multiplicativum':
          scriptum = this.agendum.multiplicativum
          break
        case 'distributivum':
          scriptum = this.agendum.distributivum
          break
        case 'fractionale':
          scriptum = this.agendum.fractionale
          break
      }

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
