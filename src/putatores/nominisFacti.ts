import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import { NomenActum } from '../praebeunda/agenda';
import { Nomen } from '../praebeunda/verba';
import TabulaProna from '../tabulae/defectae/prona';
import TabulaRecta from '../tabulae/recta';
import Tabula from '../tabulae/tabula';
import type { Putaturum } from './putaturum';

type Percolamen = {
  actum: string
  casus: string
};

@Nuntius.factum('PutatorNominisFacti')
export default class PutatorNominisFacti implements Putaturum<NomenActum, Nomen> {
  static se: Ignavum<PutatorNominisFacti> = new Ignavum(() => new PutatorNominisFacti);

  @Nuntius.modus('PutatorNominisFacti')
  putetur(agendum: NomenActum): Tabula<Nomen> {
    const [versio, pronus] = agendum.versio.split('/');
    if (pronus === 'prona') {
      agendum.versio = versio
      return new TabulaProna(new Ignavum(() => this.putetur(agendum)));
    } else if (['prima', 'secunda', 'tertia', 'tertiaVaria', 'quarta'].includes(versio)) {
      return new TabulaRecta({
        scapum: '/res/tabula/nomina/acta',
        hoc: agendum,
        via: versio,
        positor: Nomen.positor,
        radicator: (nomen: NomenActum, colamen: Percolamen) => {
          switch (colamen.actum) {
            case 'supinum':
              return nomen.supinum.chop(2);
            case 'gerundium':
              return nomen.gerundium.chop(2);
            case 'infinitivum':
              return nomen.infinitivum.chop(3);
            default:
              return '';
          }
        }
      });
    } else {
      throw Nomen.Errator('versio', agendum.versio);
    }
  }
}
