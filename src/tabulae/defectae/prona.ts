import TabulaDefecta from './defecta';
import Ignavum from '../../miscella/ignavum';
import { Nomen } from '../../praebeunda/verba';
import Tabula from '../tabula';
import { type Percolamen } from '../../praebeunda/agenda';

export default class TabulaProna extends TabulaDefecta<Nomen> {
  static apponatur (): Percolamen<Nomen>[] {
    const colamina: Percolamen<Nomen>[] = [
      {
        factum: 'infinitivum',
        numeralis: '',
        casus: ''
      } as Percolamen<Nomen>
    ];

    [
      'genitivus',
      'dativus',
      'accusativus',
      'ablativus'
    ].forEach(casus => {
      colamina.push({
        factum: 'gerundium',
        casus: casus
      } as Percolamen<Nomen>);
    });

    return colamina;
  }

  constructor (relata: Ignavum<Tabula<Nomen>>) {
    super(relata);
  }

  referatur (colamen: Percolamen<Nomen>): Percolamen<Nomen> | null {
    return colamen.factum === 'supinum' ? null : colamen;
  }
}
