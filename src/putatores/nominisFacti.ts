import '../extensions/string.ts';
import { errator, type Factum } from '../miscella/enumerationes.ts';
import Ignavum from '../miscella/ignavum.ts';
import Nuntius from '../miscella/nuntius.ts';
import { NomenActum } from '../praebeunda/agenda.ts';
import { Nomen } from '../praebeunda/verba.ts';
import TabulaProna from '../tabulae/defectae/prona.ts';
import TabulaRecta from '../tabulae/recta.ts';
import Tabula from '../tabulae/tabula.ts';
import { type Putaturum } from './putaturum.ts';

interface Percolamen {
  factum?: Factum
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
                     switch (colamen.factum?.valor) {
                       case 'supinum': return nomen.supinum.chop(2)
                       case 'gerundium': return nomen.gerundium.chop(2)
                       case 'infinitivum': return nomen.infinitivum.chop(3)
                       default: return ''
                     }
                   }
                 })
    } else throw errator({ versio: agendum.versio })
  }
}

export const nominisFacti = new Ignavum(PutatorNominisFacti)
