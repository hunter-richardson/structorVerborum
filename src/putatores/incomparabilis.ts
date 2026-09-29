import '../extensions/string.ts';
import { errator, type Genus } from '../miscella/enumerationes.ts';
import Ignavum from '../miscella/ignavum.ts';
import Nuntius from '../miscella/nuntius.ts';
import { Incomparabile } from '../praebeunda/agenda.ts';
import { Adiectivum } from '../praebeunda/verba.ts';
import TabulaAdiectiviNumerata from '../tabulae/defectae/numeratae/adiectivi.ts';
import TabulaRecta from '../tabulae/recta.ts';
import Tabula from '../tabulae/tabula.ts';
import TabulaVicaria from '../tabulae/vicaria.ts';
import { type Percolamen as Nominis } from './nominis.ts';
import type { Putaturum, Radicator } from './putaturum.ts';

export interface Percolamen extends Nominis {
  genus?: Genus
}

@Nuntius.factum('PutatorIncomparabilis')
class PutatorIncomparabilis implements Putaturum<Incomparabile, Adiectivum> {
  radicetur(versio: string): Radicator<Incomparabile, Adiectivum> {
    switch (versio) {
      case 'autPrimaAutSecunda':
      case 'pronominalis':
        return (adiectivum: Incomparabile,): string => adiectivum.nominativum.chop(2)
      case 'autPrimaAutSecunda/nominativusDirectus':
      case 'pronominalis/nominativusDirectus':
        return (adiectivum: Incomparabile,): string => adiectivum.nominativum
      case 'autPrimaAutSecunda/cumLitteraR':
      case 'pronominalis/cumLitteraR':
        return (adiectivum: Incomparabile, colamen: Percolamen): string => {
          return [
            colamen.genus?.aequatur('masculinum'),
            colamen.numerus?.aequatur('singularis'),
            [ 'nominativus', 'vocativus' ].includes(colamen.casus?.valor ?? '')
          ].all() ? adiectivum.nominativum : adiectivum.genitivum.chop(1)
        }
      case 'tertia':
      case 'tertia/cumGenitivoVario':
      case 'tertia/cumAblativoVario':
      case 'tertia/cumGenitivoAblativoqueVario':
      case 'tertia/cumTruncoVario':
        return (adiectivum: Incomparabile, colamen: Percolamen): string => {
          return [
            [ 'masculinum', 'femininum' ].includes(colamen.genus?.valor ?? ''),
            [ 'nominativus', 'vocativus' ].includes(colamen.casus?.valor ?? ''),
            colamen.numerus?.aequatur('singularis')
          ].all() ? adiectivum.nominativum : adiectivum.genitivum.chop(2)
        }
      case 'tertia/nominativusUnigener':
      case 'tertia/nominativusUnigenerCumGenitivoVario':
      case 'tertia/nominativusUnigenerCumAblativoVario':
      case 'tertia/nominativusUnigenerCumGenitivoAblativoqueVario':
      case 'tertia/nominativusUnigenerCumTruncoVario':
        return (adiectivum: Incomparabile, colamen: Percolamen): string => {
          switch (true) {
            case [
              ['nominativus', 'vocativus'].includes(colamen.casus?.valor ?? ''),
              colamen.numerus?.aequatur('singularis')
            ].all():
              return adiectivum.nominativum
            case [
              colamen.genus?.aequatur('neutrum'),
              colamen.casus?.aequatur('accusativus'),
              colamen.numerus?.aequatur('singularis')
            ].all():
              return adiectivum.nominativum
            default:
              return adiectivum.genitivum.chop(2)
          }
        }
      default: throw errator({ versio: versio })
    }
  }

  @Nuntius.modus('PutatorIncomparabilis')
  putetur(agendum: Incomparabile): Ignavum<Tabula<Adiectivum>> {
    // eslint-disable-next-line prefer-const
    let [fundamen, vices, defectus] = agendum.versio.split('/')
    if (['singularis', 'pluralis'].includes(defectus)) {
      agendum.versio = [fundamen, vices].join('/')
      return new Ignavum(TabulaAdiectiviNumerata, {
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
                       scapum: '/res/vices/adiectiva/incomparabilia',
                       via: agendum.versio
                     }, secunda: {
                       scapum: '/res/tabula/adiectiva/incomparabilia',
                       via: fundamen
                     }, radicator: this.radicetur(agendum.versio),
                     positor: Adiectivum.positor,
                     hoc: agendum
                   })
    } else if (['autPrimaAutSecunda', 'tertia', 'pronominalis'].includes(fundamen))
      return new Ignavum(TabulaRecta, {
                   scapum: '/res/tabula/adiectiva/incomparabilia',
                   hoc: agendum,
                   via: agendum.versio,
                   positor: Adiectivum.positor,
                   radicator: this.radicetur(agendum.versio)
                 })
    else throw errator({ versio: agendum.versio })
  }
}

export const incomparabilis = new Ignavum(PutatorIncomparabilis)
