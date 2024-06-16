import { casus, genera, gradi } from '../../../miscella/enumerationes';
import Ignavum from '../../../miscella/ignavum';
import { Adiectivum } from '../../../praebeunda/verba';
import Tabula from '../../tabula';
import TabulaDefecta from '../defecta';
import { type Percolamen } from '../../../praebeunda/agenda';

type Optanda = {
  relata: Ignavum<Tabula<Adiectivum>>,
  numeralis: string;
};

export default class TabulaAdiectiviNumeralis extends TabulaDefecta<Adiectivum> {
  static apponatur (): Percolamen<Adiectivum>[] {
    return gradi.map(gradus => {
      return genera.map(genus => {
        return casus.map(casus => {
          return {
            gradus: gradus,
            genus: genus,
            casus: casus
          } as Percolamen<Adiectivum>;
        });
      }).flat();
    }).flat();
  }

  private readonly _numeralis: string;

  constructor (optanda: Optanda) {
    super(optanda.relata);
    this._numeralis = optanda.numeralis;
  }

  protected referatur (colamen: Percolamen<Adiectivum>): Percolamen<Adiectivum> | null {
    return colamen.numeralis === this._numeralis ? {
      ...colamen,
      numeralis: ''
    } : null;
  }
}
