import Nuntius from '../../miscella/nuntius.ts';
import { Multiplex } from '../../praebeunda/verba.ts';
import Tabula from '../tabula.ts';
import type Ignavum from '../../miscella/ignavum.ts';
import { type Colamen } from '../../praebeunda/agenda.ts';

export default abstract class TabulaDefecta<Hoc extends Multiplex> extends Tabula<Hoc> {
  public relata!: Ignavum<Tabula<Hoc>>

  protected abstract referatur(colamen: Colamen<Hoc>): Colamen<Hoc> | null

  @Nuntius.promittum('TabulaDefecta')
  async plenetur(): Promise<void> {
    (await this.relata.hoc().tabulentur()).forEach((hoc) => {
      const { scriptum, categoria, ...ista } = hoc
      const illa: Colamen<Hoc> | null = this.referatur(ista as any)
      if (illa)
        this.tabula.push({
          ...illa,
          scriptum,
          categoria
        } as Hoc)
    })
  }
}
