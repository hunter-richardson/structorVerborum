import Tabula from './tabula.ts';
import Nuntius from '../miscella/nuntius.ts';
import { Multiplex } from '../praebeunda/verba.ts';
import { type Positor } from '../praebeunda/agenda.ts';
import { type Faciendum } from '../praebeunda/interfecta.ts';

@Nuntius.factum('TabulaInflexibilis')
export default class TabulaInflexibilis<Hoc extends Faciendum<Illud>, Illud extends Multiplex> extends Tabula<Illud> {
  positor!: Positor<Illud>
  hoc!: Hoc

  @Nuntius.futurus('TabulaInflexibilis')
  async plenetur(): Promise<void>
  { this.tabula.push(this.positor(this.hoc)) }
}
