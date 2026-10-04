import Tabula from './tabula';
import Nuntius from '../miscella/nuntius';
import { NomenAgendum } from '../praebeunda/agenda';
import { Nomen } from '../praebeunda/verba';
import type Ignavum from '../miscella/usus';

@Nuntius.factum
export default class TabulaBifissa extends Tabula<Nomen> {
  singularis!: NomenAgendum
  pluralis!: NomenAgendum

  #coniungantur(): {
    numerus: string,
    agendum: NomenAgendum
  }[] {
    return [
      {
        numerus: 'singularis',
        agendum: this.singularis
      }, {
        numerus: 'pluralis',
        agendum: this.pluralis
      }
    ]
  }

  @Nuntius.promittum
  async plenetur(): Promise<void> {
    this.#coniungantur().forEach(async (res) => {
      const tabula: Ignavum<Tabula<Nomen>> | undefined = res.agendum.putetur()
      if (tabula) (await tabula.hoc.tabulentur())
                               .filter((nomen: Nomen) => nomen.numerus.aequatur(res.numerus))
                               .forEach((nomen: Nomen) => this.tabula.push(nomen))
    })
  }
}
