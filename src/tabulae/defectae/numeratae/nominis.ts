import { casus } from '../../../miscella/enumerationes';
import Ignavum from '../../../miscella/ignavum';
import { Nomen } from '../../../praebeunda/verba';
import Tabula from '../../tabula';
import TabulaDefecta from '../defecta';
import type { Colamen } from '../../../praebeunda/agenda';

type Optanda = {
  relata: Ignavum<Tabula<Nomen>>,
  numerus: string
};

export default class TabulaNominisNumerata extends TabulaDefecta<Nomen> {
  static apponatur(): Colamen<Nomen>[] {
    return casus.map((casus) => {
      return {
        casus: casus
      } as Colamen<Nomen>;
    });
  }

  private readonly _numerus: string;

  constructor(optanda: Optanda) {
    super(optanda.relata);
    this._numerus = optanda.numerus;
  }

  protected referatur(colamen: Colamen<Nomen>): Colamen<Nomen> | null {
    return colamen.numerus === this._numerus ? {
          ...colamen,
          numerus: ''
        } : null;
  }
}
