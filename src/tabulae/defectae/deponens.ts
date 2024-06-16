import TabulaDefecta from './defecta';
import { numerales, personae, tempora } from '../../miscella/enumerationes';
import Ignavum from '../../miscella/ignavum';
import { Actus } from '../../praebeunda/verba';
import Tabula from '../tabula';
import { type Percolamen } from '../../praebeunda/agenda';

type Optanda = {
  relata: Ignavum<Tabula<Actus>>,
  ut: string;
};

export default class TabulaDeponens extends TabulaDefecta<Actus> {
  static apponatur (ut: string): Percolamen<Actus>[] {
    const colamina: Percolamen<Actus>[] = [
      { modus: 'infinitivus' } as Percolamen<Actus>
    ];

    switch (ut) {
      case 'semideponens':
        [
          'praesens', 'futurum', 'perfectum'
        ].map(tempus => {
          colamina.push({
            modus: 'participalis',
            tempus: tempus
          } as Percolamen<Actus>);
        });
        break;
      case 'semideponensActiva':
        colamina.push({
          modus: 'participalis',
          tempus: 'futurum'
        } as Percolamen<Actus>);
        break;
      default:
        [
          'futurum', 'perfectum'
        ].map(tempus => {
          colamina.push({
            modus: 'participalis',
            tempus: tempus
          } as Percolamen<Actus>);
        });
        break;
    }

    [
      'praesens', 'futurum'
    ].forEach(tempus => {
      numerales.forEach(numeralis => {
        colamina.push({
          modus: 'imperativus',
          tempus: tempus,
          numeralis: numeralis
        } as Percolamen<Actus>);
      })
    });

    [
      'indicativus', 'subiunctivus'
    ].forEach(modus => {
      tempora.forEach(tempus => {
        if ([
          modus === 'infinitiuvs', [
            'praesens', 'infectum'
          ].includes(tempus)
        ].all()) {
          numerales.forEach(numeralis => {
            personae.forEach(persona => {
              colamina.push({
                modus: modus,
                tempus: tempus,
                numeralis: numeralis,
                persona: persona
              } as Percolamen<Actus>);
            });
          });
        }
      });
    });

    return colamina;
  }

  private readonly _ut: string;

  constructor (optanda: Optanda) {
    super(optanda.relata);
    this._ut = optanda.ut;
  }

  protected referatur (colamen: Percolamen<Actus>): Percolamen<Actus> | null {
    switch (this._ut) {
      case 'semideponens':
        if (colamen.modus === 'particpalis') {
          colamen.vox = '';
        } else if (colamen.vox === 'passiva') {
          return null;
        }
      case 'semideponensActiva':
        if ([
          colamen.modus === 'participalis',
          colamen.tempus === 'futurum',
          colamen.vox === 'passiva'
        ].any()) {
          colamen.vox = '';
        } else if (colamen.vox === 'passiva') {
          return null;
        }
      default:
        if ([
          colamen.modus === 'participalis',
          colamen.vox === 'passiva'
        ].any()) {
          colamen.vox = '';
        } else {
          return null;
        }
    }

    return colamen;
  }
}
