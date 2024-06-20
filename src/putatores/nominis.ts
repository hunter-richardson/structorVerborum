import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import { NomenAgendum } from '../praebeunda/agenda';
import Structor from '../praebeunda/structor';
import { Nomen } from '../praebeunda/verba';
import TabulaNominisNumerata from '../tabulae/defectae/numeratae/nominis';
import TabulaInflexibilis from '../tabulae/inflexibilis';
import TabulaRecta from '../tabulae/recta';
import Tabula from '../tabulae/tabula';
import TabulaVicaria from '../tabulae/vicaria';
import type { Putaturum, Radicator } from './putaturum';

type Percolamen = {
  numerus: string,
  casus: string;
};

@Nuntius.factum('PutatorNominis')
export default class PutatorNominis implements Putaturum<NomenAgendum, Nomen> {
  static se: Ignavum<PutatorNominis> = new Ignavum(() => new PutatorNominis());

  radicetur (versio: string): Radicator<NomenAgendum, Nomen> {
    switch (versio) {
      case 'quarta':
      case 'quinta':
      case 'secundaMasculina':
      case 'secundaNeutra':
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (nomen: NomenAgendum, colamen: Percolamen): string => nomen.nominativum.chop(2);
      case 'primus':
      case 'quartaVaria':
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (nomen: NomenAgendum, colamen: Percolamen): string => nomen.genitivum.chop(1);
      case 'secundaMasculina/nominativusDirectus':
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (nomen: NomenAgendum, colamen: Percolamen): string => nomen.nominativum;
      case 'secundaMasculina/cumLitteraR':
        return (nomen: NomenAgendum, colamen: Percolamen): string => {
          if ([
            colamen.numerus === 'singularis',
            [ 'nominativus', 'vocativus' ].includes(colamen.casus)
          ].all()) {
            return nomen.nominativum;
          } else {
            return nomen.genitivum.chop(1);
          }
        };
      case 'tertiaAnimata':
      case 'tertiaAnimata/cumGenitivoVario':
      case 'tertiaAnimata/cumAblativoVario':
      case 'tertiaAnimata/cumGenitivoAblativoqueVario':
        return (nomen: NomenAgendum, colamen: Percolamen): string => {
          if ([
            colamen.numerus === 'singularis',
            [ 'nominativus', 'vocativus' ].includes(colamen.casus)
          ].all()) {
            return nomen.nominativum;
          } else {
            return nomen.genitivum.chop(2);
          }
        };
      case 'tertiaNeutra':
      case 'tertiaNeutra/cumGenitivoVario':
      case 'tertiaNeutra/cumAblativoVario':
      case 'tertiaNeutra/cumGenitivoAblativoqueVario':
      case 'tertiaNeutra/cumTruncoVario':
        return (nomen: NomenAgendum, colamen: Percolamen): string => {
          if ([
            colamen.numerus === 'singularis',
            [ 'nominativus', 'accusativus', 'vocativus' ].includes(colamen.casus)
          ].all()) {
            return nomen.nominativum;
          } else {
            return nomen.genitivum.chop(2);
          }
        };
      default:
        throw Nomen.Errator('versio', versio);
    }
  }

  @Nuntius.modus('PutatorNominis')
  putetur (agendum: NomenAgendum): Tabula<Nomen> {
    // eslint-disable-next-line prefer-const
    let [ fundamen, vices, defectus ] = agendum.versio.split('/');
    if ([
      'singularis', 'pluralis'
    ].includes(defectus)) {
      agendum.versio = [ fundamen, vices ].join('/');
      return new TabulaNominisNumerata({
        relata: new Ignavum(() => this.putetur(agendum)),
        numerus: defectus
      });
    } else if ([
      'nominativusDirectus', 'cumLitteraR', 'nominativusUnigener',
      'cumGenitivoVario', 'cumAblativoVario', 'cumGenitivoAblativoqueVario', 'cumTruncoVario',
      'nominativusUnigenerCumGenitivoVario', 'nominativusUnigenerCumAblativoVario',
      'nominativusUnigenerCumGenitivoAblativoqueVario', 'nominativusUnigenerCumTruncoVario'
    ].includes(vices)) {
      if (vices === 'cumLitteraR') {
        vices = 'nominativusDirectus';
      }

      return new TabulaVicaria({
        hoc: agendum, prima: {
          scapum: '/res/vices/nomina',
          via: agendum.versio
        }, secunda: {
          scapum: '/res/tabula/nomina',
          via: fundamen
        }, positor: Nomen.positor,
        radicator: this.radicetur(agendum.versio)
      });
    } else if ([
      'prima',
      'secundaMasculina',
      'secundaNeutra',
      'tertiaAnimata',
      'tertiaNeutra',
      'quarta',
      'quartaVaria',
      'quinta'
    ].includes(fundamen)) {
      return new TabulaRecta({
        scapum: '/res/tabula/nomina',
        via: agendum.versio, hoc: agendum,
        positor: Nomen.positor,
        radicator: this.radicetur(agendum.versio)
      });
    } else if (fundamen === 'indeclinabilis') {
      return new TabulaInflexibilis({
        factor: (hoc: NomenAgendum) => new Structor(() => new Nomen)
          .ponatur(nomen => nomen.scriptum = hoc.nominativum)
          .struatur(), hoc: agendum
      });
    } else {
      throw Nomen.Errator('versio', agendum.versio);
    }
  }
}
