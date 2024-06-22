import Ignavum from '../miscella/ignavum'
import Nuntius from '../miscella/nuntius'
import { AdiectivumAgendum } from '../praebeunda/agenda'
import Structor from '../praebeunda/structor'
import { Adiectivum } from '../praebeunda/verba'
import TabulaAdiectiviNumerata from '../tabulae/defectae/numeratae/adiectivi'
import TabulaInflexibilis from '../tabulae/inflexibilis'
import TabulaRecta from '../tabulae/recta'
import Tabula from '../tabulae/tabula'
import TabulaVicaria from '../tabulae/vicaria'
import type { Putaturum, Radicator } from './putaturum'

type Percolamen = {
  gradus: string
  genus: string
  numerus: string
  casus: string
}

@Nuntius.factum('PutatorAdiectivi')
export default class PutatorAdiectivi implements Putaturum<AdiectivumAgendum, Adiectivum> {
  static se: Ignavum<PutatorAdiectivi> = new Ignavum(() => new PutatorAdiectivi())

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
              if (
                [
                  colamen.genus === 'masculinum',
                  colamen.numerus === 'singularis',
                  ['nominativus', 'vocativus'].includes(colamen.casus)
                ].all()
              ) {
                return adiectivum.positivum
              } else {
                return adiectivum.positivum.chop(1)
              }
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
              switch (true) {
                case [
                  colamen.genus === 'neutrum',
                  colamen.numerus === 'singularis',
                  colamen.casus === 'accusativus'
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
                  ['nominativus', 'vocativus'].includes(colamen.casus)
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
      default:
        throw Adiectivum.Errator('versio', versio)
    }
  }

  @Nuntius.modus('PutatorAdiectivi')
  putetur(agendum: AdiectivumAgendum): Tabula<Adiectivum> {
    // eslint-disable-next-line prefer-const
    let [fundamen, vices, defectus] = agendum.versio.split('/')
    if (['singularis', 'pluralis'].includes(defectus)) {
      agendum.versio = [fundamen, vices].join('/')
      return new TabulaAdiectiviNumerata({
        relata: new Ignavum(() => this.putetur(agendum)),
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
      if (vices === 'cumLitteraR') {
        vices = 'nominativusDirectus'
      }

      return new TabulaVicaria({
        hoc: agendum,
        prima: {
          scapum: '/res/vices/adiectiva',
          via: agendum.versio
        },
        secunda: {
          scapum: '/res/tabula/adiectiva',
          via: fundamen
        },
        positor: Adiectivum.positor,
        radicator: this.radicetur(agendum.versio)
      })
    } else if (['positivaAutPrimaAutSecunda', 'positivaTertia'].includes(fundamen)) {
      return new TabulaRecta({
        scapum: '/res/tabula/adiectiva',
        hoc: agendum,
        via: agendum.versio,
        positor: Adiectivum.positor,
        radicator: this.radicetur(agendum.versio)
      })
    } else if (fundamen === 'indeclinabilis') {
      return new TabulaInflexibilis({
        factor: (hoc: AdiectivumAgendum) =>
          new Structor(() => new Adiectivum())
            .ponatur((adiectivum) => (adiectivum.scriptum = hoc.positivum))
            .struatur(),
        hoc: agendum
      })
    } else {
      throw Adiectivum.Errator('versio', agendum.versio)
    }
  }
}
