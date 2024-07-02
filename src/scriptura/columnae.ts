import Crustula from '../miscella/crustula';
import { anglicum } from '../miscella/enumerationes';
import { Multiplex } from '../praebeunda/verba';

const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;

type Generanda<Hoc extends Multiplex> = {
  categoria: string,
  haec: Hoc[];
};

export type Columnae = {
  title: string,
  key: string;
}[];

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
