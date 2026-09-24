import type { casus, factum } from '../miscella/enumerationes';
import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import { NomenActum } from '../praebeunda/agenda';
import { Errator, Nomen } from '../praebeunda/verba';
import TabulaProna from '../tabulae/defectae/prona';
import TabulaRecta from '../tabulae/recta';
import Tabula from '../tabulae/tabula';
import { type Putaturum } from './putaturum';
import '../extensions/string'

interface Percolamen {
  factum?: factum
   casus?: casus
}

@Nuntius.factum('PutatorNominisFacti')
class PutatorNominisFacti implements Putaturum<NomenActum, Nomen> {
  @Nuntius.modus('PutatorNominisFacti')
  putetur(agendum: NomenActum): Ignavum<Tabula<Nomen>> {
    const [versio, pronus] = agendum.versio.split('/')
    if (pronus === 'prona') {
      agendum.versio = versio
      return new Ignavum(TabulaProna, { relata: this.putetur(agendum) })
    } else if (['prima', 'secunda', 'tertia', 'tertiaVaria', 'quarta'].includes(versio)) {
      return new Ignavum(TabulaRecta, {
                   via: versio,
                   hoc: agendum,
                   positor: Nomen.positor,
                   scapum: '/res/tabula/nomina/acta',
                   radicator: (nomen: NomenActum, colamen: Percolamen) => {
                     switch (colamen.factum) {
                       case 'supinum': return nomen.supinum.chop(2)
                       case 'gerundium': return nomen.gerundium.chop(2)
                       case 'infinitivum': return nomen.infinitivum.chop(3)
                       default: return ''
                     }
                   }
                 })
    } else throw Errator({ versio: agendum.versio })
  }
}

export const nominisFacti = new Ignavum(PutatorNominisFacti)
