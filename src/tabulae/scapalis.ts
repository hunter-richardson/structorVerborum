import Tabula from './tabula';
import Lector, { LectorAgendorum } from '../lectores/lector';
import Nuntius from '../miscella/nuntius';
import { Multiplex } from '../praebeunda/verba';
import type { Agendum, Positor } from '../praebeunda/agenda';

type Optanda<Hoc extends Multiplex> = {
  positor: Positor<Hoc>,
  scapum?: string,
  via: string;
};

@Nuntius.factum('TabulaScapalis')
export default class TabulaScapalis<Hoc extends Multiplex> extends Tabula<Hoc> {
  private readonly _: Optanda<Hoc>;

  constructor (optanda: Optanda<Hoc>) {
    super();
    this._ = optanda;
  }

  @Nuntius.futurus('TabulaScapalis')
  async plenetur (): Promise<void> {
    const lector: Lector<Agendum<Hoc>[]> = LectorAgendorum(this._.scapum);
    const agenda: Agendum<Hoc>[] | null = await lector.legatur(this._.via);
    if (agenda) {
      this.tabula = agenda.map(agendum => this._.positor(agendum));
    }
  }
}
