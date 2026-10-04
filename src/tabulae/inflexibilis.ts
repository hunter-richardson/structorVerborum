import Tabula from './tabula';
import Nuntius from '../miscella/nuntius';
import { Multiplex } from '../praebeunda/verba';
import { type Faciendum } from '../praebeunda/interfecta';

@Nuntius.factum
export default class TabulaInflexibilis<Hoc extends Faciendum<Illud>, Illud extends Multiplex> extends Tabula<Illud> {
  positor!: Positor<Illud>
  hoc!: Hoc

  @Nuntius.promittum
  async plenetur(): Promise<void>
  { this.tabula.push(this.positor(this.hoc)) }
}
