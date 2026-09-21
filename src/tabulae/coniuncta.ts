import deepEqual from 'deep-equal';
import type Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import { Multiplex } from '../praebeunda/verba';
import { valedictor } from './collata';
import Tabula from './tabula';

@Nuntius.factum('TabulaConiuncta')
export default class TabulaConiuncta<Hoc extends Multiplex> extends Tabula<Hoc> {
    prima!: Ignavum<Tabula<Hoc>>
  secunda!: Ignavum<Tabula<Hoc>>

  @Nuntius.futurus('TabulaConiuncta')
  async plenetur(): Promise<void> {
    const aequantur: (prima: Set<any>, secunda: Set<any>) => boolean = (await import('@neoncitylights/sets')).areSetsEqual

    const tabulaPrima  : Hoc[] = await this.  prima.hoc().tabulentur()
    const tabulaSecunda: Hoc[] = await this.secunda.hoc().tabulentur()

    if (aequantur(new Set(tabulaPrima.map(valedictor)), new Set(tabulaSecunda.map(valedictor)))) {
      tabulaPrima.forEach(async (primum) => {
        const secundum: Hoc = tabulaSecunda.first((hoc) => deepEqual(valedictor(hoc), valedictor(primum)))
        if (secundum) {
          primum.scriptum += secundum.scriptum
          this.tabula.push(primum)
        } else throw new Error("Inflexionis tabulae malae'st")
      })
    } else throw new Error("Inflexionis tabulae malae'st")
  }
}
