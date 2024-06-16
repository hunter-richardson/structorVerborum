import TabulaDefecta from './defecta';
import {
  numerales,
  personae,
  tempora,
  voces
  } from '../../miscella/enumerationes';
import Ignavum from '../../miscella/ignavum';
import { Actus } from '../../praebeunda/verba';
import Tabula from '../tabula';
import { type Colamen } from '../../praebeunda/agenda';

type Optanda = {
  relata: Ignavum<Tabula<Actus>>,
  et: string;
};

export default class TabulaImpersonalis extends TabulaDefecta<Actus> {
  static apponatur (et: string): Colamen<Actus>[] {
    const colamina: Colamen<Actus>[] = [
      'praesens', 'perfectum'
    ].map(tempus => {
      return {
        modus: 'infinitivus',
        tempus: tempus
      } as Colamen<Actus>;
    });

    [
      'praesens', 'futurum', 'perfectum'
    ].forEach(tempus => {
      colamina.push({
        modus: 'participalis',
        tempus: tempus
      } as Colamen<Actus>);

      if (tempus !== 'perfectum') {
        colamina.push({
          modus: 'imperativus',
          tempus: tempus
        } as Colamen<Actus>);
      }
    });

    if (et === 'passivo') {
      [
        'indicativus', 'subiunctivus'
      ].forEach(modus => {
        tempora.forEach(tempus => {
          if ([
            modus === 'infinitiuvs', [
              'praesens', 'infectum', 'perfectum', 'plusquamperfectum'
            ].includes(tempus)
          ].all()) {
            numerales.forEach(numeralis => {
              personae.forEach(persona => {
                colamina.push({
                  modus: modus,
                  vox: 'activa',
                  tempus: tempus,
                  numeralis: numeralis,
                  persona: persona
                } as Colamen<Actus>);
              });
            });

            colamina.push({
              modus: modus,
              vox: 'passiva',
              tempus: tempus
            } as Colamen<Actus>);
          }
        });
      });
    } else {
      [
        'indicativus', 'subiunctivus'
      ].forEach(modus => {
        voces.forEach(vox => {
          tempora.forEach(tempus => {
            if ([
              modus === 'infinitiuvs', [
                'praesens', 'infectum', 'perfectum', 'plusquamperfectum',
              !et.includes('semideponens'),
              ![ 'perfectum', 'plusquamperfectum' ].includes(tempus)
              ].includes(tempus)
            ].all()) {
              colamina.push({
                modus: modus,
                vox: vox,
                tempus: tempus
              } as Colamen<Actus>);
            }
          });
        });
      });
    }

    return colamina;
  }

  private readonly _et: string;

  constructor (optanda: Optanda) {
    super(optanda.relata);
    this._et = optanda.et;
  }

  protected referatur (colamen: Colamen<Actus>): Colamen<Actus> | null {
    if (this._et === 'semideponens') {
      if (colamen.modus === 'particpalis') {
        colamen.vox = '';
      } else if (colamen.vox === 'passiva') {
        return null;
      }
    } else if (this._et === 'semideponensActiva') {
      if (colamen.vox === 'passiva') {
        switch (true) {
          case [
            colamen.modus === 'participalis',
            colamen.tempus === 'futurum',
          ].any():
            colamen.vox = '';
            break;
          default:
            return null;
        }
      }
    }

    if ([
      this._et === 'passivo',
      colamen.vox === 'activa'
    ].all()) {
      return colamen;
    } else {
      return [
        colamen.numeralis === 'pluralis',
        colamen.persona === 'prima',
        colamen.persona === 'secunda'
      ].any() ? null : {
        ...colamen,
        numeralis: '',
        persona: ''
      };
    }
  }
}
