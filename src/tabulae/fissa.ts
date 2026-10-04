import deepEqual from 'deep-equal';
import { valedictor } from './collata';
import Tabula from './tabula';
import '../extensions/array';
import Nuntius from '../miscella/nuntius';
import { Multiplex } from '../praebeunda/verba';
import type Ignavum from '../miscella/usus';

@Nuntius.factum
export default class TabulaFissa<Hoc extends Multiplex> extends Tabula<Hoc> {
  relata!: Ignavum<Tabula<Hoc>>
  colamina!: Colamen<Hoc>[]

  @Nuntius.promittum
  async plenetur(): Promise<void> {
    const haec: Hoc[] = await this.relata.hoc.tabulentur()
    this.colamina.forEach(async (colamen) => {
      const hoc: Hoc = haec.first((hoc) => deepEqual(colamen, valedictor(hoc)))
      if (hoc) this.tabula.push(hoc)
    })
  }
}
