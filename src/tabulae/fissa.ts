import deepEqual from 'deep-equal';
import type Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import { type Colamen } from '../praebeunda/agenda';
import { Multiplex } from '../praebeunda/verba';
import { valedictor } from './collata';
import Tabula from './tabula';

@Nuntius.factum('TabulaFissa')
export default class TabulaFissa<Hoc extends Multiplex> extends Tabula<Hoc> {
  relata!: Ignavum<Tabula<Hoc>>
  colamina!: Colamen<Hoc>[]

  @Nuntius.futurus('TabulaFissa')
  async plenetur(): Promise<void> {
    const haec: Hoc[] = await this.relata.hoc().tabulentur()
    this.colamina.forEach(async (colamen) => {
      const hoc: Hoc = haec.first((hoc) => deepEqual(colamen, valedictor(hoc)))
      if (hoc) {
        this.tabula.push(hoc)
      }
    })
  }
}
