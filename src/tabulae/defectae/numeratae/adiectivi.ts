import { casus, genera, gradi } from '../../../miscella/enumerationes';
import Ignavum from '../../../miscella/ignavum';
import { Adiectivum } from '../../../praebeunda/verba';
import Tabula from '../../tabula';
import TabulaDefecta from '../defecta';
import { type Colamen } from '../../../praebeunda/agenda';

type Optanda = {
  relata: Ignavum<Tabula<Adiectivum>>,
  numerus: string;
};

export default class TabulaAdiectiviNumerata extends TabulaDefecta<Adiectivum> {
  static apponatur (): Colamen<Adiectivum>[] {
    return gradi.map(gradus => {
      return genera.map(genus => {
        return casus.map(casus => {
          return {
            gradus: gradus,
            genus: genus,
            casus: casus
          } as Colamen<Adiectivum>;
        });
      }).flat();
    }).flat();
  }

  private readonly _numerus: string;

  constructor (optanda: Optanda) {
    super(optanda.relata);
    this._numerus = optanda.numerus;
  }

  protected referatur (colamen: Colamen<Adiectivum>): Colamen<Adiectivum> | null {
    return colamen.numerus === this._numerus ? {
      ...colamen,
      numerus: ''
    } : null;
  }
}
