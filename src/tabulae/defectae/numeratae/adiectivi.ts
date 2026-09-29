import {
  Casus,
  casus,
  genera,
  Genus,
  Gradus,
  gradus,
  Numerus
  } from '../../../miscella/enumerationes.ts';
import Nuntius from '../../../miscella/nuntius.ts';
import { Adiectivum } from '../../../praebeunda/verba.ts';
import TabulaDefecta from '../defecta.ts';
import { type Colamen } from '../../../praebeunda/agenda.ts';

@Nuntius.factum('TabulaAdiectiviNumerata')
export default class TabulaAdiectiviNumerata extends TabulaDefecta<Adiectivum> {
  static apponatur(): Colamen<Adiectivum>[] {
    return gradus.map((gradus) => {
        return genera.map((genus) => {
            return casus.map((casus) => {
              return {
                gradus: Gradus.gradus(gradus),
                genus: Genus.genus(genus),
                casus: Casus.casus(casus)
              } as Colamen<Adiectivum>
            }).flat()
          }).flat()
      }).flat()
  }

  public numerus!: string

  protected referatur(colamen: Colamen<Adiectivum>): Colamen<Adiectivum> | null {
    return colamen.numerus.aequatur(this.numerus) ? {
          ...colamen,
          numerus: new Numerus
        } : null
  }
}
