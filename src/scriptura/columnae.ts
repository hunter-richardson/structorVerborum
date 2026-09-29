import translation from '../extensions/i18next.ts';
import '../extensions/string.ts';
import { Multiplex } from '../praebeunda/verba.ts';

interface Generanda<Hoc extends Multiplex> {
  categoria: string
       haec: Hoc[]
}

interface Columna {
  title: string
    key: string
}

export type Columnae = Columna[]

export function categoricum<Hoc extends Multiplex> (generanda: Generanda<Hoc>): Columnae {
  return Multiplex.colamina(generanda.categoria)
    .filter(clavis => generanda.haec.some(hoc => Object.keys(hoc).includes(clavis)))
    .map(clavis => {
      return {
        title: translation().tf(clavis, 'capitalize'),
        key: clavis
      }
    })
}
