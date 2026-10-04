import '../extensions/string';
import Nuntius from '../miscella/nuntius';
import Ignavum from '../miscella/usus';
import { NomenAgendum } from '../praebeunda/agenda';
import { Nomen } from '../praebeunda/verba';
import TabulaNominisNumerata from '../tabulae/defectae/numeratae/nominis';
import TabulaInflexibilis from '../tabulae/inflexibilis';
import TabulaRecta from '../tabulae/recta';
import Tabula from '../tabulae/tabula';
import TabulaVicaria from '../tabulae/vicaria';
import { errator, type Casus, type Numerus } from '../praebeunda/valores';
import type { Putaturum, Radicator } from './putaturum';

export interface Percolamen {
  numerus?: Numerus
    casus?: Casus
}

@Nuntius.factum
class PutatorNominis implements Putaturum<NomenAgendum, Nomen> {
  radicetur(versio: string): Radicator<NomenAgendum, Nomen> {
    switch (versio) {
      case 'quarta':
      case 'quinta':
      case 'secundaMasculina':
      case 'secundaNeutra':
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (nomen: NomenAgendum,): string => nomen.nominativum.chop(2)
      case 'primus':
      case 'quartaVaria':
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (nomen: NomenAgendum,): string => nomen.genitivum.chop(1)
      case 'secundaMasculina/nominativusDirectus':
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (nomen: NomenAgendum,): string => nomen.nominativum
      case 'secundaMasculina/cumLitteraR':
        return (nomen: NomenAgendum, colamen: Percolamen): string => {
          return [
            colamen.numerus?.aequatur('singularis'),
            [ 'nominativus', 'vocativus' ].includes(colamen.casus?.valor ?? '')
          ].all() ? nomen.nominativum : nomen.genitivum.chop(1)
        }
      case 'tertiaAnimata':
      case 'tertiaAnimata/cumGenitivoVario':
      case 'tertiaAnimata/cumAblativoVario':
      case 'tertiaAnimata/cumGenitivoAblativoqueVario':
        return (nomen: NomenAgendum, colamen: Percolamen): string => {
          return [
            colamen.numerus?.aequatur('singularis'),
            [ 'nominativus', 'vocativus' ].includes(colamen.casus?.valor ?? '')
          ].all() ? nomen.nominativum : nomen.genitivum.chop(2)
        }
      case 'tertiaNeutra':
      case 'tertiaNeutra/cumGenitivoVario':
      case 'tertiaNeutra/cumAblativoVario':
      case 'tertiaNeutra/cumGenitivoAblativoqueVario':
      case 'tertiaNeutra/cumTruncoVario':
        return (nomen: NomenAgendum, colamen: Percolamen): string => {
          return [
            colamen.numerus?.aequatur('singularis'),
            [ 'nominativus', 'accusativus', 'vocativus' ].includes(colamen.casus?.valor ?? '')
          ].all() ? nomen.nominativum : nomen.genitivum.chop(2)
        }
      default: throw errator({ versio: versio })
    }
  }

  @Nuntius.modus
  putetur(agendum: NomenAgendum): Ignavum<Tabula<Nomen>> {
    // eslint-disable-next-line prefer-const
    let [fundamen, vices, defectus] = agendum.versio.split('/')
    if (['singularis', 'pluralis'].includes(defectus)) {
      agendum.versio = [fundamen, vices].join('/')
      return new Ignavum(TabulaNominisNumerata, {
                   relata: this.putetur(agendum),
                   numerus: defectus
                 })
    } else if (
      [
        'nominativusDirectus',
        'cumLitteraR',
        'nominativusUnigener',
        'cumGenitivoVario',
        'cumAblativoVario',
        'cumGenitivoAblativoqueVario',
        'cumTruncoVario',
        'nominativusUnigenerCumGenitivoVario',
        'nominativusUnigenerCumAblativoVario',
        'nominativusUnigenerCumGenitivoAblativoqueVario',
        'nominativusUnigenerCumTruncoVario'
      ].includes(vices)
    ) {
      if (vices === 'cumLitteraR') vices = 'nominativusDirectus'
      return new Ignavum(TabulaVicaria, {
                   prima: {
                     scapum: '/res/vices/nomina',
                     via: agendum.versio
                   }, secunda: {
                      scapum: '/res/tabula/nomina',
                      via: fundamen
                   }, radicator: this.radicetur(agendum.versio),
                   positor: Nomen.positor,
                   hoc: agendum
                 })
    } else if (
      [
        'prima',
        'secundaMasculina',
        'secundaNeutra',
        'tertiaAnimata',
        'tertiaNeutra',
        'quarta',
        'quartaVaria',
        'quinta'
      ].includes(fundamen)
    ) {
      return new Ignavum(TabulaRecta, {
                   radicator: this.radicetur(agendum.versio),
                   scapum: '/res/tabula/nomina',
                   positor: Nomen.positor,
                   via: agendum.versio,
                   hoc: agendum
                 })
    } else if (fundamen === 'indeclinabilis')
      return new Ignavum(TabulaInflexibilis, {
                   positor: Nomen.positor,
                   hoc: agendum
                 })
    else throw errator({ versio: agendum.versio })
  }
}

export const nominis = new Ignavum(PutatorNominis)
