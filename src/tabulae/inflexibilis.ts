import Nuntius from '../miscella/nuntius';
import { type Positor } from '../praebeunda/agenda';
import { type Faciendum } from '../praebeunda/interfecta';
import { Multiplex } from '../praebeunda/verba';
import Tabula from './tabula';

@Nuntius.factum('TabulaInflexibilis')
export default class TabulaInflexibilis<Hoc extends Faciendum<Illud>, Illud extends Multiplex> extends Tabula<Illud> {
  positor!: Positor<Illud>
  hoc!: Hoc

  @Nuntius.futurus('TabulaInflexibilis')
  async plenetur(): Promise<void> {
    this.tabula.push(this.positor(this.hoc))
  }
}
