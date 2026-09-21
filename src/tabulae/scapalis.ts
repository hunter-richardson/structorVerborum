import Lector, { LectorAgendorum } from '../lectores/lector';
import type Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import type { Agendum, Positor } from '../praebeunda/agenda';
import { Multiplex } from '../praebeunda/verba';
import Tabula from './tabula';

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
