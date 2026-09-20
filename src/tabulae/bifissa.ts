import Nuntius from '../miscella/nuntius';
import { NomenAgendum } from '../praebeunda/agenda';
import { Nomen } from '../praebeunda/verba';
import Tabula from './tabula';

@Nuntius.factum('TabulaBifissa')
export default class TabulaBifissa extends Tabula<Nomen> {
  singularis!: NomenAgendum
  pluralis!: NomenAgendum

  @Nuntius.futurus('TabulaBifissa')
  async plenetur(): Promise<void> {
    [
      {
        numerus: 'singularis',
        agendum: this.singularis
      }, {
        numerus: 'pluralis',
        agendum: this.pluralis
      }
    ].forEach(async (res) => {
      const tabula: Tabula<Nomen> | undefined = res.agendum.putetur()
      if (tabula) {
        (await tabula.tabulentur())
          .filter((nomen) => nomen.numerus === res.numerus)
          .forEach((nomen) => this.tabula.push(nomen))
      }
    })
  }
}
