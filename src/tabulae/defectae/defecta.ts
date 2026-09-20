import type Ignavum from '../../miscella/ignavum';
import Nuntius from '../../miscella/nuntius';
import { type Colamen } from '../../praebeunda/agenda';
import { Multiplex } from '../../praebeunda/verba';
import Tabula from '../tabula';

@Nuntius.factum('TabulaDefecta')
export default abstract class TabulaDefecta<Hoc extends Multiplex> extends Tabula<Hoc> {
  public relata!: Ignavum<Tabula<Hoc>>

  protected abstract referatur(colamen: Colamen<Hoc>): Colamen<Hoc> | null

  @Nuntius.futurus('TabulaDefecta')
  async plenetur(): Promise<void> {
    (await this.relata.hoc().tabulentur()).forEach((hoc) => {
      const { scriptum, categoria, ...ista } = hoc
      const illa: Colamen<Hoc> | null = this.referatur(ista as any)
      if (illa) {
        this.tabula.push({
          ...illa,
          scriptum,
          categoria
        } as Hoc)
      }
    })
  }
}
