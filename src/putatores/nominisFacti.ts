import '../extensions/string.ts';
import Ignavum from '../miscella/ignavum.ts';
import Nuntius from '../miscella/nuntius.ts';
import { NomenActum } from '../praebeunda/agenda.ts';
import { Errator, Nomen } from '../praebeunda/verba.ts';
import TabulaProna from '../tabulae/defectae/prona.ts';
import TabulaRecta from '../tabulae/recta.ts';
import Tabula from '../tabulae/tabula.ts';
import type { casus, factum } from '../miscella/enumerationes.ts';
import { type Putaturum } from './putaturum.ts';

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
