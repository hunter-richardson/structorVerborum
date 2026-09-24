import { dominus } from '../miscella/dominus';
import { anglicum } from '../miscella/enumerationes';
import { Multiplex } from '../praebeunda/verba';
import '../extensions/string'

const latina: boolean = dominus.hoc().lingua.inhaesast()

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
        title: (latina ? clavis : anglicum(clavis)).capitalize(),
        key: clavis
      }
    })
}
