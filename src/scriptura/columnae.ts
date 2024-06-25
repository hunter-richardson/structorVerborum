import Cocutor from '../miscella/cocutor';
import { anglicum } from '../miscella/enumerationes';
import type { Multiplex } from '../praebeunda/verba';

const anglica: boolean = Cocutor.se.ipse().edatur('lingua') === 'anglica';

export type Columnae<Hoc extends Multiplex> = {
  key: string, title: string,
  filter: (hoc: Hoc, colamen: string) => boolean;
}[];

export function erigantur<Hoc extends Multiplex> (claves: string[]): Columnae<Hoc> {
  return claves.map(clavis => {
    return {
      key: clavis,
      title: (anglica ? anglicum(clavis) : clavis).capitalize(),
      filter: (hoc: Hoc, colamen: string): boolean => {
        return hoc.valores().includes(colamen);
      }
    };
  });
}
