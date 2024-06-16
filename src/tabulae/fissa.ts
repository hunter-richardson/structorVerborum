import deepEqual from 'deep-equal';
import { valedictor } from './collata';
import Tabula from './tabula';
import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import { Multiplex } from '../praebeunda/verba';
import { type Percolamen } from '../praebeunda/agenda';

type Optanda<Hoc extends Multiplex> = {
  relata: Ignavum<Tabula<Hoc>>,
  tabula: Percolamen<Hoc>[];
};

@Nuntius.factum('TabulaFissa')
export default class TabulaFissa<Hoc extends Multiplex> extends Tabula<Hoc> {
  private readonly _: Optanda<Hoc>;

  constructor (optanda: Optanda<Hoc>) {
    super();
    this._ = optanda;
  }

  @Nuntius.futurus('TabulaFissa')
  async plenetur (): Promise<void> {
    const haec: Hoc[] = await this._.relata.ipse().tabulentur();
    this._.tabula.forEach(async colamen => {
      const hoc: Hoc = haec.first(hoc => deepEqual(colamen, valedictor(hoc)));
      if (hoc) {
        this.tabula.push(hoc);
      }
    });
  }
}
