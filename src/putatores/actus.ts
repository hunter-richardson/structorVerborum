import '../extensions/string';
import type { modus, numerus, persona, tempus, vox } from '../miscella/enumerationes';
import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import { ActusAgendus } from '../praebeunda/agenda';
import { Actus } from '../praebeunda/verba';
import { Errator } from '../praebeunda/verba.ts';
import TabulaDeponens from '../tabulae/defectae/deponens';
import TabulaImpersonalis from '../tabulae/defectae/impersonalis';
import TabulaPerfecta from '../tabulae/defectae/perfecta';
import TabulaRecta from '../tabulae/recta';
import Tabula from '../tabulae/tabula';
import TabulaVicaria from '../tabulae/vicaria';
import type { Putaturum, Radicator } from './putaturum';


interface Percolamen {
    modus?: modus
   tempus?: tempus
      vox?: vox
  numerus?: numerus
  persona?: persona
}

@Nuntius.factum('PutatorActus')
class PutatorActus implements Putaturum<ActusAgendus, Actus> {
  private radicetur(versio: string): Radicator<ActusAgendus, Actus> {
    switch (versio) {
      case 'prima':
      case 'secunda':
      case 'secunda/impersonalis':
      case 'secunda/impersonalis/passivo':
      case 'secunda//impersonalis':
      case 'secunda//impersonalis/passivo':
      case 'quarta/perfecta':
      case 'quarta//perfecta':
      case 'tertia/perfecta':
      case 'tertia//perfecta':
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (actus: ActusAgendus,): string => actus.perfectum?.chop(4) ?? ''
      case 'quartus':
        return (actus: ActusAgendus, colamen: Percolamen): string => {
          switch (true) {
            case [
              colamen.modus === 'participium',
              colamen.vox === 'passiva',
              colamen.tempus === 'futurum'
            ].all():
              return actus.supinum?.chop(2) ?? ''
            case ['perfectum', 'plusquamperfectum', 'exigendum'].includes(colamen.tempus ?? ''):
              return actus.perfectum?.chop(4) ?? ''
            default:
              return actus.infinitivum?.chop(3) ?? ''
          }
        }
      case 'tertia':
      case 'tertiaVaria':
      case 'tertia/impersonalis':
      case 'tertia/impersonalis/passivo':
      case 'tertia//impersonalis':
      case 'tertia//impersonalis/passivo':
        return (actus: ActusAgendus, colamen: Percolamen): string => {
          switch (true) {
            case [
              colamen.modus === 'participium',
              colamen.vox === 'passiva',
              colamen.tempus === 'futurum'
            ].all():
              return actus.supinum?.chop(2) ?? ''
            case ['perfectum', 'plusquamperfectum', 'exigendum'].includes(colamen.tempus ?? ''):
              return actus.perfectum?.chop(4) ?? ''
            default:
              return actus.infinitivum?.chop(1) ?? ''
          }
        }
      case 'prima/deponens':
      case 'prima//deponens':
      case 'secunda/deponens':
      case 'secunda//deponens':
      case 'tertia/peponens':
      case 'tertia//peponens':
      case 'quarta/peponens':
      case 'quarta//peponens':
      case 'prima/semideponens':
      case 'prima//semideponens':
      case 'secunda/semideponens':
      case 'secunda//semideponens':
      case 'tertia/semideponens':
      case 'tertia//semideponens':
      case 'prima/impersonalis/semideponens':
      case 'prima//impersonalis/semideponens':
      case 'secunda/impersonalis/semideponens':
      case 'secunda//impersonalis/semideponens':
      case 'tertia/impersonalis/semideponens':
      case 'tertia//impersonalis/semideponens':
        return (actus: ActusAgendus, colamen: Percolamen): string => {
          switch (true) {
            case [
              colamen.modus === 'participium',
              colamen.tempus === 'futurum',
              colamen.vox === 'activa'
            ].all():
              return actus.supinum?.chop(2) ?? ''
            case [
              colamen.modus === 'participium',
              colamen.tempus === 'perfectum',
              colamen.vox === 'passiva'
            ].all():
              return actus.supinum?.chop(2) ?? ''
            default:
              return actus.infinitivum?.chop(3) ?? ''
          }
        }
      case 'prima/semideponensActiva':
      case 'prima//semideponensActiva':
      case 'secunda/semideponensActiva':
      case 'secunda//semideponensActiva':
      case 'tertia/semideponensActiva':
      case 'tertia//semideponensActiva':
        return (actus: ActusAgendus,): string => actus.infinitivum?.chop(3) ?? ''
      case 'prima/impersonalis/semideponensActiva':
      case 'prima//impersonalis/semideponensActiva':
      case 'secunda/impersonalis/semideponensActiva':
      case 'secunda//impersonalis/semideponensActiva':
      case 'tertia/impersonalis/semideponensActiva':
      case 'tertia//impersonalis/semideponensActiva':
        return (actus: ActusAgendus, colamen: Percolamen): string => {
          switch (true) {
            case [
              colamen.modus === 'infintivus',
              colamen.tempus === 'perfectum',
              colamen.vox === 'passiva'
            ].all():
              return actus.perfectum ?? ''
            default:
              return actus.infinitivum?.chop(3) ?? ''
          }
        }
      default:
        throw Errator({ versio: versio })
    }
  }

  @Nuntius.modus('PutatorActus')
  putetur(agendus: ActusAgendus): Ignavum<Tabula<Actus>> {
    // eslint-disable-next-line prefer-const
    const [fundamen, vices, defectus, defectusSecundus] = agendus.versio.split('/')
    if (defectus) {
      agendus.versio = [fundamen, vices].join('/')
      switch (defectus) {
        case 'deponens':
        case 'semideponens':
        case 'semideponensActiva':
          return new Ignavum(TabulaDeponens, {
                       relata: this.putetur(agendus),
                       ut: defectus
                     })
        case 'impersonalis':
          return new Ignavum(TabulaImpersonalis, {
                       relata: this.putetur(agendus),
                       et: defectusSecundus
                     })
        case 'perfectus': return new Ignavum(TabulaPerfecta, { relata: this.putetur(agendus) })
        default:
          throw Errator({ versio: agendus.versio })
      }
    } else if (vices) {
      agendus.versio = fundamen
      if (vices === 'cumImperativoBrevi')
        return new Ignavum(TabulaVicaria, {
                     prima: {
                       scapum: '/res/vices/actus',
                       via: [fundamen, vices].join('/')
                     }, secunda: {
                       scapum: '/res/tabula/actus',
                       via: fundamen
                     }, radicator: this.radicetur(fundamen),
                     positor: Actus.positor,
                     hoc: agendus
                   })
      else throw Errator({ versio: agendus.versio })
    } else {
      if ([
        'prima', 'secunda', 'tertia', 'tertiaVaria', 'quarta'
      ].includes(fundamen)) {
        agendus.versio = fundamen
        return new Ignavum(TabulaRecta, {
                     radicator: this.radicetur(agendus.versio),
                     scapum: '/res/tabula/actus',
                     positor: Actus.positor,
                     via: agendus.versio,
                     hoc: agendus
        })
      } else throw Errator({ versio: agendus.versio })
    }
  }
}

export const actus = new Ignavum(PutatorActus)
