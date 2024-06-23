import Tabula from './tabula';
import Nuntius from '../miscella/nuntius';
import { Multiplex } from '../praebeunda/verba';
import type { Faciendum } from '../praebeunda/interfecta';

type Factor<Hoc, Illud> = (hoc: Hoc) => Illud;

type Optanda<Hoc, Illud> = {
  factor: Factor<Hoc, Illud>,
  hoc: Hoc
};

@Nuntius.factum('TabulaInflexibilis')
export default class TabulaInflexibilis<Hoc extends Faciendum<Illud>, Illud extends Multiplex> extends Tabula<Illud> {
  private readonly _: Optanda<Hoc, Illud>;

  constructor(optanda: Optanda<Hoc, Illud>) {
    super();
    this._ = optanda;
  }

  @Nuntius.futurus('TabulaInflexibilis')
  async plenetur(): Promise<void> {
    this.tabula.push(this._.factor(this._.hoc));
  }
}
