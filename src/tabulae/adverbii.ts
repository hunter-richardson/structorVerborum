import Tabula from './tabula';
import { gradua } from '../miscella/enumerationes';
import Nuntius from '../miscella/nuntius';
import { AdverbiumAgendum } from '../praebeunda/agenda';
import { Adverbium } from '../praebeunda/verba';

@Nuntius.factum('TabulaAdverbii')
export default class TabulaAdverbii extends Tabula<Adverbium> {
  public agendum!: AdverbiumAgendum

  #gradatur(gradus: string): string {
    switch (gradus) {
      case 'comparativus': return this.agendum.comparativum;
      case 'superlativus': return this.agendum.superlativum;
      case    'positivus': return this.agendum.positivum;
                  default: return ''
    }
  }

  @Nuntius.futurus('TabulaAdverbii')
  async plenetur(): Promise<void> {
    gradua.forEach((gradus) => {
      let scriptum: string = this.#gradatur(gradus)
      if (scriptum) {
        this.tabula.push(
          Object.assign({}, {
              gradus: gradus,
              scriptum: scriptum
            }) as Adverbium)
      }
    })
  }
}
