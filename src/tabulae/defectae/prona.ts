import TabulaDefecta from './defecta.ts';
import { Casus, Factum } from '../../miscella/enumerationes.ts';
import Nuntius from '../../miscella/nuntius.ts';
import { Nomen } from '../../praebeunda/verba.ts';
import { type Colamen } from '../../praebeunda/agenda.ts';

@Nuntius.factum('TabulaProna')
export default class TabulaProna extends TabulaDefecta<Nomen> {
  static apponatur(): Colamen<Nomen>[] {
    const colamina: Colamen<Nomen>[] = [
      {
        factum: Factum.factum('infinitivum')
      } as Colamen<Nomen>
    ];

    ['genitivus', 'dativus', 'accusativus', 'ablativus'].forEach((casus) => {
      colamina.push({
        factum: Factum.factum('gerundium'),
        casus: Casus.casus(casus)
      } as Colamen<Nomen>)
    })

    return colamina
  }

  referatur(colamen: Colamen<Nomen>): Colamen<Nomen> | null {
    return colamen.factum.aequatur('supinum') ? null : colamen
  }
}
