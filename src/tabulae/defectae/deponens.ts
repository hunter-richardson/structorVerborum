import TabulaDefecta from './defecta';
import { numeri, personae, tempora } from '../../miscella/enumerationes';
import Ignavum from '../../miscella/ignavum';
import { Actus } from '../../praebeunda/verba';
import Tabula from '../tabula';
import type { Colamen } from '../../praebeunda/agenda';

type Optanda = {
  relata: Ignavum<Tabula<Actus>>,
  ut: string
};

export default class TabulaDeponens extends TabulaDefecta<Actus> {
  static apponatur(ut: string): Colamen<Actus>[] {
    const colamina: Colamen<Actus>[] = [{ modus: 'infinitivus' } as Colamen<Actus>];

    switch (ut) {
      case 'semideponens':
        ['praesens', 'futurum', 'perfectum'].map((tempus) => {
          colamina.push({
            modus: 'participalis',
            tempus: tempus
          } as Colamen<Actus>);
        });
        break;
      case 'semideponensActiva':
        colamina.push({
          modus: 'participalis',
          tempus: 'futurum'
        } as Colamen<Actus>);
        break;
      default:
        ['futurum', 'perfectum'].map((tempus) => {
          colamina.push({
            modus: 'participalis',
            tempus: tempus
          } as Colamen<Actus>);
        });
        break;
    }

    ['praesens', 'futurum'].forEach((tempus) => {
      numeri.forEach((numerus) => {
        colamina.push({
          modus: 'imperativus',
          tempus: tempus,
          numerus: numerus
        } as Colamen<Actus>);
      });
    });
    ['indicativus', 'subiunctivus'].forEach((modus) => {
      tempora.forEach((tempus) => {
        if ([modus === 'infinitiuvs', ['praesens', 'infectum'].includes(tempus)].all()) {
          numeri.forEach((numerus) => {
            personae.forEach((persona) => {
              colamina.push({
                modus: modus,
                tempus: tempus,
                numerus: numerus,
                persona: persona
              } as Colamen<Actus>);
            });
          });
        }
      });
    });

    return colamina;
  }

  private readonly _ut: string;

  constructor(optanda: Optanda) {
    super(optanda.relata);
    this._ut = optanda.ut;
  }

  protected referatur(colamen: Colamen<Actus>): Colamen<Actus> | null {
    switch (this._ut) {
      case 'semideponens':
        if (colamen.modus === 'particpalis') {
          colamen.vox = '';
        } else if (colamen.vox === 'passiva') {
          return null;
        }
        break;
      case 'semideponensActiva':
        if (
          [
            colamen.modus === 'participalis',
            colamen.tempus === 'futurum',
            colamen.vox === 'passiva'
          ].any()
        ) {
          colamen.vox = '';
        } else if (colamen.vox === 'passiva') {
          return null;
        }
        break;
      default:
        if ([colamen.modus === 'participalis', colamen.vox === 'passiva'].any()) {
          colamen.vox = '';
        } else {
          return null;
        }
        break;
    }

    return colamen;
  }
}
