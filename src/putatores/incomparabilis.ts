import { type genus } from '../miscella/enumerationes';
import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import { Incomparabile } from '../praebeunda/agenda';
import { Adiectivum, Errator } from '../praebeunda/verba';
import TabulaAdiectiviNumerata from '../tabulae/defectae/numeratae/adiectivi';
import TabulaRecta from '../tabulae/recta';
import Tabula from '../tabulae/tabula';
import TabulaVicaria from '../tabulae/vicaria';
import { type Percolamen as Nominis } from './nominis';
import type { Putaturum, Radicator } from './putaturum';
import '../extensions/string'

export interface Percolamen extends Nominis {
  genus?: genus
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
            colamen.genus === 'masculinum',
            colamen.numerus === 'singularis',
            [ 'nominativus', 'vocativus' ].includes(colamen.casus ?? '')
          ].all() ? adiectivum.nominativum : adiectivum.genitivum.chop(1)
        }
      case 'tertia':
      case 'tertia/cumGenitivoVario':
      case 'tertia/cumAblativoVario':
      case 'tertia/cumGenitivoAblativoqueVario':
      case 'tertia/cumTruncoVario':
        return (adiectivum: Incomparabile, colamen: Percolamen): string => {
          return [
            [ 'masculinum', 'femininum' ].includes(colamen.genus ?? ''),
            [ 'nominativus', 'vocativus' ].includes(colamen.casus ?? ''),
            colamen.numerus === 'singularis'
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
              ['nominativus', 'vocativus'].includes(colamen.casus ?? ''),
              colamen.numerus === 'singularis'
            ].all():
              return adiectivum.nominativum
            case [
              colamen.genus === 'neutrum',
              colamen.casus === 'accusativus',
              colamen.numerus === 'singularis'
            ].all():
              return adiectivum.nominativum
            default:
              return adiectivum.genitivum.chop(2)
          }
        }
      default: throw Errator({ versio: versio })
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
    else throw Errator({ versio: agendum.versio })
  }
}

export const incomparabilis = new Ignavum(PutatorIncomparabilis)
