import { casus } from '../../../miscella/enumerationes';
import Ignavum from '../../../miscella/ignavum';
import { Nomen } from '../../../praebeunda/verba';
import Tabula from '../../tabula';
import TabulaDefecta from '../defecta';
import { type Percolamen } from '../../../praebeunda/agenda';

type Optanda = {
  relata: Ignavum<Tabula<Nomen>>,
  numeralis: string;
};

export default class TabulaNominisNumeralis extends TabulaDefecta<Nomen> {
  static apponatur (): Percolamen<Nomen>[] {
    return casus.map(casus => {
      return {
        casus: casus
      } as Percolamen<Nomen>;
    });
  }

  private readonly _numeralis: string;

  constructor (optanda: Optanda) {
    super(optanda.relata);
    this._numeralis = optanda.numeralis;
  }

  protected referatur (colamen: Percolamen<Nomen>): Percolamen<Nomen> | null {
    return colamen.numeralis === this._numeralis ? {
      ...colamen,
      numeralis: ''
    } : null;
  }
}
