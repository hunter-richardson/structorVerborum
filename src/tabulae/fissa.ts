import deepEqual from 'deep-equal';
import { valedictor } from './collata.ts';
import Tabula from './tabula.ts';
import '../extensions/array.ts';
import Nuntius from '../miscella/nuntius.ts';
import { Multiplex } from '../praebeunda/verba.ts';
import type Ignavum from '../miscella/ignavum.ts';
import { type Colamen } from '../praebeunda/agenda.ts';

@Nuntius.factum('TabulaFissa')
export default class TabulaFissa<Hoc extends Multiplex> extends Tabula<Hoc> {
  relata!: Ignavum<Tabula<Hoc>>
  colamina!: Colamen<Hoc>[]

  @Nuntius.futurus('TabulaFissa')
  async plenetur(): Promise<void> {
    const haec: Hoc[] = await this.relata.hoc().tabulentur()
    this.colamina.forEach(async (colamen) => {
      const hoc: Hoc = haec.first((hoc) => deepEqual(colamen, valedictor(hoc)))
      if (hoc) this.tabula.push(hoc)
    })
  }
}
