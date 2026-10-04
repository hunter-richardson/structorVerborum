import Tabula from './tabula';
import Nuntius from '../miscella/nuntius';
import { AdverbiumAgendum } from '../praebeunda/agenda';
import { Gradus, gradus } from '../praebeunda/valores';
import { Adverbium } from '../praebeunda/verba';

@Nuntius.factum
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

  @Nuntius.promittum
  async plenetur(): Promise<void> {
    gradus.forEach((gradus) => {
      let scriptum: string = this.#gradatur(gradus)
      if (scriptum) {
        this.tabula.push(
          Object.assign({}, {
              gradus: Gradus.gradus(gradus),
              scriptum: scriptum
            }) as Adverbium)
      }
    })
  }
}
