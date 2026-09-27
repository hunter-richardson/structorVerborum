import '../extensions/string.ts';
import Ignavum from '../miscella/ignavum.ts';
import Nuntius from '../miscella/nuntius.ts';
import { AdiectivumAgendum } from '../praebeunda/agenda.ts';
import { Adiectivum, Errator } from '../praebeunda/verba.ts';
import TabulaAdiectiviNumerata from '../tabulae/defectae/numeratae/adiectivi.ts';
import TabulaInflexibilis from '../tabulae/inflexibilis.ts';
import TabulaRecta from '../tabulae/recta.ts';
import Tabula from '../tabulae/tabula.ts';
import TabulaVicaria from '../tabulae/vicaria.ts';
import { type gradus } from '../miscella/enumerationes.ts';
import { type Percolamen as Incomparabile } from './incomparabilis.ts';
import type { Putaturum, Radicator } from './putaturum.ts';

interface Percolamen extends Incomparabile {
  gradus?: gradus
}

@Nuntius.factum('PutatorAdiectivi')
class PutatorAdiectivi implements Putaturum<AdiectivumAgendum, Adiectivum> {
  radicetur(versio: string): Radicator<AdiectivumAgendum, Adiectivum> {
    switch (versio) {
      case 'positivaAutPrimaAutSecunda':
        return (adiectivum: AdiectivumAgendum, colamen: Percolamen): string => {
          switch (colamen.gradus) {
            case 'positivus':
              return adiectivum.positivum.chop(2)
            case 'comparativus':
              return adiectivum.comparativum.chop(3)
            case 'superlativus':
              return adiectivum.superlativum.chop(2)
            default:
              return ''
          }
        }
      case 'positivaAutPrimaAutSecunda/nominativusDirectus':
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (adiectivum: AdiectivumAgendum, colamen: Percolamen): string => adiectivum.positivum
      case 'positivaAutPrimaAutSecunda/cumLitteraR':
        return (adiectivum: AdiectivumAgendum, colamen: Percolamen): string => {
          switch (colamen.gradus) {
            case 'positivus':
              return adiectivum.positivum.chop([
                colamen.genus === 'masculinum',
                colamen.numerus === 'singularis',
                [ 'nominativus', 'vocativus' ].includes(colamen.casus ?? '')
              ].all() ? 0 : 1)
            case 'comparativus':
              return adiectivum.comparativum.chop(3)
            case 'superlativus':
              return adiectivum.superlativum.chop(2)
            default:
              return ''
          }
        }
      case 'positivaTertia':
      case 'positivaTertia/cumGenitivoVario':
      case 'positivaTertia/cumGenitivoVario/pluralis':
      case 'positivaTertia/cumAblativoVario':
      case 'positivaTertia/cumAblativoVario/pluralis':
      case 'positivaTertia/cumGenitivoAblativoVario':
      case 'positivaTertia/cumGenitivoAblativoVario/pluralis':
      case 'positivaTertia/cumTruncoVario':
      case 'positivaTertia/cumTruncoVario/pluralis':
        return (adiectivum: AdiectivumAgendum, colamen: Percolamen): string => {
          switch (colamen.gradus) {
            case 'positivus':
              return [
                colamen.genus === 'neutrum',
                colamen.numerus === 'singularis',
                colamen.casus === 'accusativus'
              ].all() ? adiectivum.positivum : adiectivum.comparativum.chop(3)
            case 'comparativus':
              return adiectivum.comparativum.chop(3)
            case 'superlativus':
              return adiectivum.superlativum.chop(2)
            default:
              return ''
          }
        }
      case 'positivaTertia/nominativusUnigener':
      case 'positivaTertia/nominativusUnigenerCumGenitivoVario':
      case 'positivaTertia/nominativusUnigenerCumAblativoVario':
      case 'positivaTertia/nominativusUnigenerCumGenitivoAblativoqueVario':
      case 'positivaTertia/nominativusUnigenerCumTruncoVario':
        return (adiectivum: AdiectivumAgendum, colamen: Percolamen): string => {
          switch (colamen.gradus) {
            case 'positivus':
              switch (true) {
                case [
                  colamen.genus === 'neutrum',
                  colamen.numerus === 'singularis',
                  colamen.casus === 'accusativus'
                ].all():
                  return adiectivum.positivum
                case [
                  colamen.numerus === 'singularis',
                  ['nominativus', 'vocativus'].includes(colamen.casus ?? '')
                ].all():
                  return adiectivum.positivum
                default:
                  return adiectivum.comparativum.chop(3)
              }
            case 'comparativus':
              return adiectivum.comparativum.chop(3)
            case 'superlativus':
              return adiectivum.superlativum.chop(2)
            default:
              return ''
          }
        }
      default: throw Errator({ versio: versio })
    }
  }

  @Nuntius.modus('PutatorAdiectivi')
  putetur(agendum: AdiectivumAgendum): Ignavum<Tabula<Adiectivum>> {
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
                     scapum: '/res/vices/adiectiva',
                     via: agendum.versio
                   }, secunda: {
                   scapum: '/res/tabula/adiectiva',
                   via: fundamen
                   }, radicator: this.radicetur(agendum.versio),
                   positor: Adiectivum.positor,
                   hoc: agendum
                 })
    } else if (['positivaAutPrimaAutSecunda', 'positivaTertia'].includes(fundamen))
      return new Ignavum(TabulaRecta, {
                   radicator: this.radicetur(agendum.versio),
                   scapum: '/res/tabula/adiectiva',
                   positor: Adiectivum.positor,
                   via: agendum.versio,
                   hoc: agendum
                 })
    else if (fundamen === 'indeclinabilis')
      return new Ignavum(TabulaInflexibilis, {
                   positor: Adiectivum.positor,
                   hoc: agendum
                 })
    else throw Errator({ versio: agendum.versio })
  }
}

export const adiectivi = new Ignavum(PutatorAdiectivi)
