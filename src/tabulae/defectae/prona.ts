import { type Colamen } from '../../praebeunda/agenda';
import { Nomen } from '../../praebeunda/verba';
import TabulaDefecta from './defecta';

export default class TabulaProna extends TabulaDefecta<Nomen> {
  static apponatur(): Colamen<Nomen>[] {
    const colamina: Colamen<Nomen>[] = [
      {
        actum: 'infinitivum',
        numerus: '',
        casus: ''
      } as Colamen<Nomen>
    ];

    ['genitivus', 'dativus', 'accusativus', 'ablativus'].forEach((casus) => {
      colamina.push({
        actum: 'gerundium',
        casus: casus
      } as Colamen<Nomen>)
    })

    return colamina
  }

  referatur(colamen: Colamen<Nomen>): Colamen<Nomen> | null {
    return colamen.actum === 'supinum' ? null : colamen
  }
}
