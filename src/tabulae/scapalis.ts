import Tabula from './tabula';
import Lector, { agendorum } from '../lectores/lector';
import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import { Multiplex } from '../praebeunda/verba';
import type { Agendum } from '../praebeunda/verba';

@Ultimum @Ignavum @Nuntius.factum
export default class TabulaScapalis<Hoc extends Multiplex> extends Tabula<Hoc> {
  scapum!: string
  via!: string

  @Nuntius.promittum
  async plenetur(): Promise<void> {
    const lector: Lector<Agendum<Hoc>> = agendorum(this.scapum)
    const agenda: Agendum<Hoc>[] = await lector.legatur(this.via)
    if (agenda) this.tabula = agenda.map((agendum) => this.positor(agendum))
  }
}
