import { casua, genera, gradua } from '../../../miscella/enumerationes.ts';
import { Adiectivum } from '../../../praebeunda/verba.ts';
import TabulaDefecta from '../defecta.ts';
import { type Colamen } from '../../../praebeunda/agenda.ts';

export default class TabulaAdiectiviNumerata extends TabulaDefecta<Adiectivum> {
  static apponatur(): Colamen<Adiectivum>[] {
    return gradua.map((gradus) => {
        return genera.map((genus) => {
            return casua.map((casus) => {
              return {
                gradus: gradus,
                genus: genus,
                casus: casus
              } as Colamen<Adiectivum>
            }).flat()
          }).flat()
      }).flat()
  }

  public numerus!: string

  protected referatur(colamen: Colamen<Adiectivum>): Colamen<Adiectivum> | null {
    return colamen.numerus === this.numerus ? {
          ...colamen,
          numerus: ''
        } : null
  }
}
