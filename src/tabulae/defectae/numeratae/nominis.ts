import { casua } from '../../../miscella/enumerationes';
import { Nomen } from '../../../praebeunda/verba';
import TabulaDefecta from '../defecta';
import { type Colamen } from '../../../praebeunda/agenda'

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
