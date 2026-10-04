import Nuntius from '../../../miscella/nuntius';
import { Casus, casus, Numerus } from '../../../praebeunda/valores';
import { Nomen } from '../../../praebeunda/verba';
import TabulaDefecta from '../defecta';
import { type Colamen } from '../../../praebeunda/agenda';

@Nuntius.factum
export default class TabulaNominisNumerata extends TabulaDefecta<Nomen> {
  static apponatur(): Colamen<Nomen>[] {
    return casus.map((casus) => {
      return {
        casus: Casus.casus(casus)
      } as Colamen<Nomen>
    })
  }

  public numerus!: string

  protected referatur(colamen: Colamen<Nomen>): Colamen<Nomen> | null {
    return colamen.numerus.aequatur(this.numerus) ? {
          ...colamen,
          numerus: new Numerus
        } : null
  }
}
