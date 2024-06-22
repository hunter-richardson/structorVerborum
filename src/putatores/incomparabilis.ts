import Ignavum from '../miscella/ignavum'
import Nuntius from '../miscella/nuntius'
import { Incomparabile } from '../praebeunda/agenda'
import { Adiectivum } from '../praebeunda/verba'
import TabulaAdiectiviNumerata from '../tabulae/defectae/numeratae/adiectivi'
import TabulaRecta from '../tabulae/recta'
import Tabula from '../tabulae/tabula'
import TabulaVicaria from '../tabulae/vicaria'
import type { Putaturum, Radicator } from './putaturum'

type Percolamen = {
  genus: string
  numerus: string
  casus: string
}

@Nuntius.factum('PutatorIncomparabilis')
export default class PutatorIncomparabilis implements Putaturum<Incomparabile, Adiectivum> {
  static se: Ignavum<PutatorIncomparabilis> = new Ignavum(() => new PutatorIncomparabilis())

  radicetur(versio: string): Radicator<Incomparabile, Adiectivum> {
    switch (versio) {
      case 'autPrimaAutSecunda':
      case 'pronominalis':
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (adiectivum: Incomparabile, colamen: Percolamen): string =>
          adiectivum.nominativum.chop(2)
      case 'autPrimaAutSecunda/nominativusDirectus':
      case 'pronominalis/nominativusDirectus':
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (adiectivum: Incomparabile, colamen: Percolamen): string => adiectivum.nominativum
      case 'autPrimaAutSecunda/cumLitteraR':
      case 'pronominalis/cumLitteraR':
        return (adiectivum: Incomparabile, colamen: Percolamen): string => {
          if (
            [
              colamen.genus === 'masculinum',
              colamen.numerus === 'singularis',
              ['nominativus', 'vocativus'].includes(colamen.casus)
            ].all()
          ) {
            return adiectivum.nominativum
          } else {
            return adiectivum.genitivum.chop(1)
          }
        }
      case 'tertia':
      case 'tertia/cumGenitivoVario':
      case 'tertia/cumAblativoVario':
      case 'tertia/cumGenitivoAblativoqueVario':
      case 'tertia/cumTruncoVario':
        return (adiectivum: Incomparabile, colamen: Percolamen): string => {
          switch (true) {
            case [
              ['masculinum', 'femininum'].includes(colamen.genus),
              ['nominativus', 'vocativus'].includes(colamen.casus),
              colamen.numerus === 'singularis'
            ].all():
              return adiectivum.nominativum
            default:
              return adiectivum.genitivum.chop(2)
          }
        }
      case 'tertia/nominativusUnigener':
      case 'tertia/nominativusUnigenerCumGenitivoVario':
      case 'tertia/nominativusUnigenerCumAblativoVario':
      case 'tertia/nominativusUnigenerCumGenitivoAblativoqueVario':
      case 'tertia/nominativusUnigenerCumTruncoVario':
        return (adiectivum: Incomparabile, colamen: Percolamen): string => {
          switch (true) {
            case [
              ['nominativus', 'vocativus'].includes(colamen.casus),
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
      default:
        throw Adiectivum.Errator('versio', versio)
    }
  }

  @Nuntius.modus('PutatorIncomparabilis')
  putetur(agendum: Incomparabile): Tabula<Adiectivum> {
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
          scapum: '/res/vices/adiectiva/incomparabilia',
          via: agendum.versio
        },
        secunda: {
          scapum: '/res/tabula/adiectiva/incomparabilia',
          via: fundamen
        },
        positor: Adiectivum.positor,
        radicator: this.radicetur(agendum.versio)
      })
    } else if (['autPrimaAutSecunda', 'tertia', 'pronominalis'].includes(fundamen)) {
      return new TabulaRecta({
        scapum: '/res/tabula/adiectiva/incomparabilia',
        hoc: agendum,
        via: agendum.versio,
        positor: Adiectivum.positor,
        radicator: this.radicetur(agendum.versio)
      })
    } else {
      throw Adiectivum.Errator('versio', agendum.versio)
    }
  }
}
