import Cocutor from '../miscella/cocutor';
import { anglicum } from '../miscella/enumerationes';
import { Multiplex } from '../praebeunda/verba';

const anglica: boolean = Cocutor.se.ipse().edatur('lingua') === 'anglica';

type Generanda<Hoc extends Multiplex> = {
  categoria: string,
  haec: Hoc[];
};

export type Columnae<Hoc extends Multiplex> = {
  key: string, title: string,
  filter: (hoc: Hoc, colamen: string) => boolean;
}[];

export function categoricum<Hoc extends Multiplex> (generanda: Generanda<Hoc>): Columnae<Hoc> {
  return Multiplex.colamina(generanda.categoria)
    .filter(clavis => generanda.haec.some(hoc =>
      Object.keys(hoc).includes(clavis)))
    .map(clavis => {
      return {
        key: clavis,
        title: (anglica ? anglicum(clavis) : clavis).capitalize(),
        filter: (hoc: Hoc, colamen: string): boolean => {
          return hoc.valores().includes(colamen);
        }
      };
    });
}
