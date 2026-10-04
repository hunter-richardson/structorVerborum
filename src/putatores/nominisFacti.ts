import '../extensions/string';
import Nuntius from '../miscella/nuntius';
import Ignavum from '../miscella/usus';
import { NomenActum } from '../praebeunda/agenda';
import { Nomen } from '../praebeunda/verba';
import TabulaProna from '../tabulae/defectae/prona';
import TabulaRecta from '../tabulae/recta';
import Tabula from '../tabulae/tabula';
import { errator, type Factus } from '../praebeunda/valores';
import { type Putaturum } from './putaturum';

interface Percolamen {
  factum?: Factus
}

@Nuntius.factum
class PutatorNominisFacti implements Putaturum<NomenActum, Nomen> {
  @Nuntius.modus
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
