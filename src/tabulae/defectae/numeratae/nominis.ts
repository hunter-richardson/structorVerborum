import { casua } from '../../../miscella/enumerationes.ts';
import { Nomen } from '../../../praebeunda/verba.ts';
import TabulaDefecta from '../defecta.ts';
import { type Colamen } from '../../../praebeunda/agenda.ts'

export default class TabulaNominisNumerata extends TabulaDefecta<Nomen> {
  static apponatur(): Colamen<Nomen>[] {
    return casua.map((casus) => {
      return {
        casus: casus
      } as Colamen<Nomen>
    })
  }

  public numerus!: string

  protected referatur(colamen: Colamen<Nomen>): Colamen<Nomen> | null {
    return colamen.numerus === this.numerus ? {
          ...colamen,
          numerus: ''
        } : null
  }
}
