import { Casus, casus, Numerus } from '../../../miscella/enumerationes.ts';
import Nuntius from '../../../miscella/nuntius.ts';
import { Nomen } from '../../../praebeunda/verba.ts';
import TabulaDefecta from '../defecta.ts';
import { type Colamen } from '../../../praebeunda/agenda.ts';

@Nuntius.factum('TabulaNominisNumerata')
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
