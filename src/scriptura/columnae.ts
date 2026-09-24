import { dominus } from '../miscella/dominus';
import { anglicum } from '../miscella/enumerationes';
import { Multiplex } from '../praebeunda/verba';
import '../extensions/string'

const anglica: boolean = dominus.hoc().lingua.concoctast('anglica') ?? false

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
        title: (anglica ? anglicum(clavis) : clavis).capitalize(),
        key: clavis
      }
    })
}
