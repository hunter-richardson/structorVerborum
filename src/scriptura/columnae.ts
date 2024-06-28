import type { VDataTable } from 'vuetify/components';
import Cocutor from '../miscella/cocutor';
import { anglicum } from '../miscella/enumerationes';
import { Multiplex } from '../praebeunda/verba';

const anglica: boolean = Cocutor.se.ipse().edatur('lingua') === 'anglica';

type Generanda<Hoc extends Multiplex> = {
  categoria: string,
  haec: Hoc[];
};

export type Columnae = VDataTable[ '$props' ][ 'headers' ];

export function categoricum<Hoc extends Multiplex> (generanda: Generanda<Hoc>): Columnae {
  return Multiplex.colamina(generanda.categoria)
    .filter(clavis => generanda.haec.some(hoc =>
      Object.keys(hoc).includes(clavis)))
    .map(clavis => {
      return {
        title: (anglica ? anglicum(clavis) : clavis).capitalize(),
        key: clavis
      };
    });
}
