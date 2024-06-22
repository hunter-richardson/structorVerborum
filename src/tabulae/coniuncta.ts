import deepEqual from 'deep-equal'
import { valedictor } from './collata'
import Tabula from './tabula'
import Ignavum from '../miscella/ignavum'
import Nuntius from '../miscella/nuntius'
import { Multiplex } from '../praebeunda/verba'
import { type Positor } from '../praebeunda/agenda'

type Optanda<Hoc extends Multiplex> = {
  prima: Ignavum<Tabula<Hoc>>
  secunda: Ignavum<Tabula<Hoc>>
  positor: Positor<Hoc>
}

@Nuntius.factum('TabulaConiuncta')
export default class TabulaConiuncta<Hoc extends Multiplex> extends Tabula<Hoc> {
  private readonly _: Optanda<Hoc>

  constructor(optanda: Optanda<Hoc>) {
    super()
    this._ = optanda
  }

  @Nuntius.futurus('TabulaConiuncta')
  async plenetur(): Promise<void> {
    const prima: Tabula<Hoc> = this._.prima.ipse()
    const secunda: Tabula<Hoc> = this._.prima.ipse()

    const areSetsEqual: (prima: Set<any>, secunda: Set<any>) => boolean = (
      await import('@neoncitylights/sets')
    ).areSetsEqual

    const tabulaPrima: Hoc[] = await prima.tabulentur()
    const tabulaSecunda: Hoc[] = await secunda.tabulentur()

    if (
      areSetsEqual(new Set(tabulaPrima.map(valedictor)), new Set(tabulaSecunda.map(valedictor)))
    ) {
      tabulaPrima.forEach(async (primum) => {
        const secundum: Hoc = tabulaSecunda.first((hoc) =>
          deepEqual(valedictor(hoc), valedictor(primum))
        )
        if (secundum) {
          primum.scriptum = primum.scriptum.concat(secundum.scriptum)
          this.tabula.push(primum)
        } else {
          throw new Error("Inflexionis tabulae malae'st")
        }
      })
    } else {
      throw new Error("Inflexionis tabulae malae'st")
    }
  }
}
