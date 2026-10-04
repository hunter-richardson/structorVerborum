import TabulaDefecta from './defecta';
import Nuntius from '../../miscella/nuntius';
import { Casus, Factus } from '../../praebeunda/valores';
import { Nomen } from '../../praebeunda/verba';

@Nuntius.factum
export default class TabulaProna extends TabulaDefecta<Nomen> {
  static apponatur(): Colamen<Nomen>[] {
    const colamina: Colamen<Nomen>[] =
    [ { factus: Factus.factus('infinitivum') } as Colamen<Nomen> ];

    ['genitivus', 'dativus', 'accusativus', 'ablativus'].forEach((casus) => {
      colamina.push({
        factus: Factus.factus('gerundium'),
        casus: Casus.casus(casus)
      } as Colamen<Nomen>)
    })

    return colamina
  }

  referatur(colamen: Colamen<Nomen>): Colamen<Nomen> | null {
    return colamen.factus.aequatur('supinum') ? null : colamen
  }
}
