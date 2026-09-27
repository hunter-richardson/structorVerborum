import Tabula from './tabula.ts';
import Lector, { LectorAgendorum } from '../lectores/lector.ts';
import Nuntius from '../miscella/nuntius.ts';
import { Multiplex } from '../praebeunda/verba.ts';
import type Ignavum from '../miscella/ignavum.ts';
import type { Agendum, Positor } from '../praebeunda/agenda.ts';

@Nuntius.factum('TabulaScapalis')
export default class TabulaScapalis<Hoc extends Multiplex> extends Tabula<Hoc> {
  positor!: Positor<Hoc>
  scapum!: string
  via!: string

  @Nuntius.futurus('TabulaScapalis')
  async plenetur(): Promise<void> {
    const lector: Ignavum<Lector<Agendum<Hoc>[]>> = LectorAgendorum(this.scapum)
    const agenda: Agendum<Hoc>[] | undefined = await lector.hoc().legatur(this.via)
    if (agenda) this.tabula = agenda.map((agendum) => this.positor(agendum))
  }
}
