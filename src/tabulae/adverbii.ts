import Tabula from './tabula';
import { gradi } from '../miscella/enumerationes';
import Nuntius from '../miscella/nuntius';
import { AdverbiumAgendum } from '../praebeunda/agenda';
import { Adverbium } from '../praebeunda/verba';

@Nuntius.factum('TabulaAdverbii')
export default class TabulaAdverbii extends Tabula<Adverbium> {
  private readonly _agendum: AdverbiumAgendum;

  constructor (agendum: AdverbiumAgendum) {
    super();
    this._agendum = agendum;
  }

  @Nuntius.futurus('TabulaAdverbii')
  async plenetur (): Promise<void> {
    gradi.forEach(gradus => {
      let scriptum: string = '';
      switch (gradus) {
        case 'positivus':
          scriptum = this._agendum.positivum;
          break;
        case 'comparativus':
          scriptum = this._agendum.comparativum;
          break;
        case 'superlativus':
          scriptum = this._agendum.superlativum;
          break;
      }

      if (scriptum) {
        this.tabula.push(Object.assign({}, {
          gradus: gradus,
          scriptum: scriptum
        }) as any);
      }
    });
  }
}
