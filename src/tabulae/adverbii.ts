import Tabula from './tabula.ts';
import { Gradus, gradus } from '../miscella/enumerationes.ts';
import Nuntius from '../miscella/nuntius.ts';
import { AdverbiumAgendum } from '../praebeunda/agenda.ts';
import { Adverbium } from '../praebeunda/verba.ts';

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

  @Nuntius.promittum('TabulaAdverbii')
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
