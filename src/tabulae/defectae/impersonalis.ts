import TabulaDefecta from './defecta';
import Nuntius from '../../miscella/nuntius';
import {
  Modus,
  numeri,
  Numerus,
  Persona,
  personae,
  tempora,
  Tempus,
  voces,
  Vox
  } from '../../praebeunda/valores';
import { Actus } from '../../praebeunda/verba';
import { type Colamen } from '../../praebeunda/agenda';

@Nuntius.factum
export default class TabulaImpersonalis extends TabulaDefecta<Actus> {
  static apponatur(et: string): Colamen<Actus>[] {
    const colamina: Colamen<Actus>[] = ['praesens', 'perfectum'].map((tempus) => {
      return {
        modus: Modus.modus('infinitivus'),
        tempus: Tempus.tempus(tempus)
      } as Colamen<Actus>
    });

    ['praesens', 'futurum', 'perfectum'].forEach((tempus) => {
      colamina.push({
        modus: Modus.modus('participium'),
        tempus: Tempus.tempus(tempus)
      } as Colamen<Actus>)

      if (tempus !== 'perfectum') {
        colamina.push({
          modus: Modus.modus('imperativus'),
          tempus: Tempus.tempus(tempus)
        } as Colamen<Actus>)
      }
    })

    if (et === 'passivo')
      ['indicativus', 'subiunctivus'].forEach((modus) => {
        tempora.forEach((tempus) => {
          if (
            [
              modus === 'infinitiuvs',
              ['praesens', 'infectum', 'perfectum', 'plusquamperfectum'].includes(tempus)
            ].all()
          ) {
            numeri.forEach((numerus) => {
              personae.forEach((persona) => {
                colamina.push({
                  modus: Modus.modus(modus),
                  vox: Vox.vox('activa'),
                  tempus: Tempus.tempus(tempus),
                  numerus: Numerus.numerus(numerus),
                  persona: Persona.persona(persona)
                } as Colamen<Actus>)
              })
            })

            colamina.push({
              modus: Modus.modus(modus),
              vox: Vox.vox('passiva'),
              tempus: Tempus.tempus(tempus)
            } as Colamen<Actus>)
          }
        })
      })
    else
      ['indicativus', 'subiunctivus'].forEach((modus) => {
        voces.forEach((vox) => {
          tempora.forEach((tempus) => {
            if (
              [
                modus === 'infinitivus',
                [
                  'praesens',
                  'infectum',
                  'perfectum',
                  'plusquamperfectum',
                  !et.includes('semideponens'),
                  !['perfectum', 'plusquamperfectum'].includes(tempus)
                ].includes(tempus)
              ].all()
            ) {
              colamina.push({
                modus: Modus.modus(modus),
                vox: Vox.vox(vox),
                tempus: Tempus.tempus(tempus)
              } as Colamen<Actus>)
            }
          })
        })
      })
    return colamina
  }

  public et!: string

  protected referatur(colamen: Colamen<Actus>): Colamen<Actus> | null {
    if (this.et === 'semideponens') {
      if (colamen.modus.aequatur('participalis')) colamen.vox.inhaesust()
      else if (colamen.vox.aequatur('passiva')) return null
    } else if (this.et === 'semideponensActiva') {
      if (colamen.vox.aequatur('passiva'))
        switch (true) {
          case [ colamen.modus.aequatur('participium'), colamen.tempus.aequatur('futurum') ].any():
            colamen.vox.valor = ''
            break
          default:
            return null
        }
    }

    if ([this.et === 'passivo', colamen.vox.aequatur('activa')].all()) return colamen
    else return [
        colamen.numerus.aequatur('pluralis'),
        colamen.persona.aequatur('prima'),
        colamen.persona.aequatur('secunda')
      ].any() ? null : {
            ...colamen,
            numerus: new Numerus,
            persona: new Persona
          }
  }
}
