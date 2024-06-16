import Tabula from './tabula';
import Nuntius from '../miscella/nuntius';
import { NomenAgendum } from '../praebeunda/agenda';
import { Nomen } from '../praebeunda/verba';

type Optanda = {
  singularis: NomenAgendum,
  pluralis: NomenAgendum;
};

@Nuntius.factum('TabulaBifissa')
export default class TabulaBifissa extends Tabula<Nomen> {
  private readonly _: Optanda;
  constructor (optanda: Optanda) {
    super();
    this._ = optanda;
  }

  @Nuntius.futurus('TabulaBifissa')
  async plenetur (): Promise<void> {
    [
      {
        numeralis: 'singularis',
        agendum: this._.singularis
      }, {
        numeralis: 'pluralis',
        agendum: this._.pluralis
      }
    ].forEach(async res => {
      const tabula: Tabula<Nomen> | null = res.agendum.putetur();
      if (tabula) {
        (await tabula.tabulentur()).filter(nomen => nomen.numeralis === res.numeralis)
          .forEach(nomen => this.tabula.push(nomen));
      }
    });
  }
}
