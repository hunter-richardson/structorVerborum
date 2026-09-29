import TabulaDefecta from './defecta.ts';
import {
  Modus,
  numeri,
  Numerus,
  Persona,
  personae,
  tempora,
  Tempus
  } from '../../miscella/enumerationes.ts';
import Nuntius from '../../miscella/nuntius.ts';
import { Actus } from '../../praebeunda/verba.ts';
import { type Colamen } from '../../praebeunda/agenda.ts';

@Nuntius.factum('TabulaPerfecta')
export default class TabulaPerfecta extends TabulaDefecta<Actus> {
  static apponatur(): Colamen<Actus>[] {
    const colamina: Colamen<Actus>[] = [{
      modus: Modus.modus('infinitivus')
    } as Colamen<Actus>];

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

  protected referatur(colamen: Colamen<Actus>): Colamen<Actus> | null {
    switch (colamen.modus.valor) {
      case 'infinitivus':
        if ([colamen.vox.aequatur('activa'), colamen.tempus.aequatur('perfectum')].all()) {
          colamen.vox.valor = ''
          colamen.tempus.valor = ''
        } else {
          return null
        }
        break
      case 'indicativus':
      case 'subiunctivus':
        switch (colamen.tempus.valor) {
          case 'perfectum':
            colamen.tempus.valor = 'praesens'
            break
          case 'plusquamperfectum':
            colamen.tempus.valor = 'infectum'
            break
          case 'exigendum':
            colamen.tempus.valor = 'futurum'
            break
          default:
            return null
        }
        break
      default:
        return null
    }

    return colamen
  }
}
