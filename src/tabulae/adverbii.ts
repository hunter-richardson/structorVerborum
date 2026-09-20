import { gradua } from '../miscella/enumerationes';
import Nuntius from '../miscella/nuntius';
import { AdverbiumAgendum } from '../praebeunda/agenda';
import { Adverbium } from '../praebeunda/verba';
import Tabula from './tabula';

@Nuntius.factum('TabulaAdverbii')
export default class TabulaAdverbii extends Tabula<Adverbium> {
  public agendum!: AdverbiumAgendum

  @Nuntius.futurus('TabulaAdverbii')
  async plenetur(): Promise<void> {
    gradua.forEach((gradus) => {
      let scriptum: string = ''
      switch (gradus) {
        case 'positivus':
          scriptum = this.agendum.positivum
          break
        case 'comparativus':
          scriptum = this.agendum.comparativum
          break
        case 'superlativus':
          scriptum = this.agendum.superlativum
          break
      }

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
