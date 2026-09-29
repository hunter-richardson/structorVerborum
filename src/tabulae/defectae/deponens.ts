import TabulaDefecta from './defecta.ts';
import {
  Modus,
  numeri,
  Numerus,
  Persona,
  personae,
  tempora,
  Tempus,
  Vox
  } from '../../miscella/enumerationes.ts';
import Nuntius from '../../miscella/nuntius.ts';
import { Actus } from '../../praebeunda/verba.ts';
import { type Colamen } from '../../praebeunda/agenda.ts';

@Nuntius.factum('TabulaDeponens')
export default class TabulaDeponens extends TabulaDefecta<Actus> {
  static apponatur(ut: string): Colamen<Actus>[] {
    const colamina: Colamen<Actus>[] = [{ modus: Modus.modus('infinitivus') } as Colamen<Actus>]

    switch (ut) {
      case 'semideponens':
        ['praesens', 'futurum', 'perfectum'].map((tempus) => {
          colamina.push({
            modus: Modus.modus('participium'),
            tempus: Tempus.tempus(tempus)
          } as Colamen<Actus>)
        })
        break
      case 'semideponensActiva':
        colamina.push({
          modus: Modus.modus('participium'),
          tempus: Tempus.tempus('futurum')
        } as Colamen<Actus>)
        break
      default:
        ['futurum', 'perfectum'].map((tempus) => {
          colamina.push({
            modus: Modus.modus('participium'),
            tempus: Tempus.tempus(tempus)
          } as Colamen<Actus>)
        })
        break
    };

    ['praesens', 'futurum'].forEach((tempus) => {
      numeri.forEach((numerus) => {
        colamina.push({
          modus: Modus.modus('imperativus'),
          tempus: Tempus.tempus(tempus),
          numerus: Numerus.numerus(numerus)
        } as Colamen<Actus>)
      })
    });
    ['indicativus', 'subiunctivus'].forEach((modus) => {
      tempora.forEach((tempus) => {
        if ([modus === 'infinitiuvs', ['praesens', 'infectum'].includes(tempus)].all()) {
          numeri.forEach((numerus) => {
            personae.forEach((persona) => {
              colamina.push({
                modus: Modus.modus(modus),
                tempus: Tempus.tempus(tempus),
                numerus: Numerus.numerus(numerus),
                persona: Persona.persona(persona)
              } as Colamen<Actus>)
            })
          })
        }
      })
    })

    return colamina
  }

  public ut!: string

  protected referatur(colamen: Colamen<Actus>): Colamen<Actus> | null {
    switch (this.ut) {
      case 'semideponens':
        if (colamen.modus.aequatur('particpalis')) colamen.vox = new Vox
        else if (colamen.vox.aequatur('passiva')) return null
        break
      case 'semideponensActiva':
        if (
          [
            colamen.modus.aequatur('participium'),
            colamen.tempus.aequatur('futurum'),
            colamen.vox.aequatur('passiva')
          ].any()
        ) {
          colamen.vox = new Vox
        } else if (colamen.vox.aequatur('passiva')) return null
        break
      default:
        if ([
              colamen.modus.aequatur('participium'),
              colamen.vox.aequatur('passiva')
            ].any()) colamen.vox = new Vox
        else return null
        break
    }

    return colamen
  }
}
