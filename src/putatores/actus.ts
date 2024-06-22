import Ignavum from '../miscella/ignavum'
import Nuntius from '../miscella/nuntius'
import { ActusAgendus } from '../praebeunda/agenda'
import { Actus } from '../praebeunda/verba'
import TabulaDeponens from '../tabulae/defectae/deponens'
import TabulaImpersonalis from '../tabulae/defectae/impersonalis'
import TabulaPerfecta from '../tabulae/defectae/perfecta'
import TabulaRecta from '../tabulae/recta'
import Tabula from '../tabulae/tabula'
import TabulaVicaria from '../tabulae/vicaria'
import type { Putaturum, Radicator } from './putaturum'

type Percolamen = {
  modus: string
  vox: string
  tempus: string
  numerus: string
  persona: string
}

@Nuntius.factum('PutatorActus')
export default class PutatorActus implements Putaturum<ActusAgendus, Actus> {
  static se: Ignavum<PutatorActus> = new Ignavum(() => new PutatorActus())

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
        return (actus: ActusAgendus, colamen: Percolamen): string => actus.perfectum.chop(4)
      case 'quartus':
        return (actus: ActusAgendus, colamen: Percolamen): string => {
          switch (true) {
            case [
              colamen.modus === 'participalis',
              colamen.vox === 'passiva',
              colamen.tempus === 'futurum'
            ].all():
              return actus.supinum.chop(2)
            case ['perfectum', 'plusquamperfectum', 'exigendum'].includes(colamen.tempus):
              return actus.perfectum.chop(4)
            default:
              return actus.infinitivum.chop(3)
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
              colamen.modus === 'participalis',
              colamen.vox === 'passiva',
              colamen.tempus === 'futurum'
            ].all():
              return actus.supinum.chop(2)
            case ['perfectum', 'plusquamperfectum', 'exigendum'].includes(colamen.tempus):
              return actus.perfectum.chop(4)
            default:
              return actus.infinitivum.chop(1)
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
              colamen.modus === 'participalis',
              colamen.tempus === 'futurum',
              colamen.vox === 'activa'
            ].all():
              return actus.supinum.chop(2)
            case [
              colamen.modus === 'participalis',
              colamen.tempus === 'perfectum',
              colamen.vox === 'passiva'
            ].all():
              return actus.supinum.chop(2)
            default:
              return actus.infinitivum.chop(3)
          }
        }
      case 'prima/semideponensActiva':
      case 'prima//semideponensActiva':
      case 'secunda/semideponensActiva':
      case 'secunda//semideponensActiva':
      case 'tertia/semideponensActiva':
      case 'tertia//semideponensActiva':
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return (actus: ActusAgendus, colamen: Percolamen): string => actus.infinitivum.chop(3)
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
              return actus.perfectum
            default:
              return actus.infinitivum.chop(3)
          }
        }
      default:
        throw Actus.Errator('versio', versio)
    }
  }

  @Nuntius.modus('PutatorActus')
  putetur(agendus: ActusAgendus): Tabula<Actus> {
    // eslint-disable-next-line prefer-const
    const [fundamen, vices, defectus, defectusSecundus] = agendus.versio.split('/')
    if (defectus) {
      agendus.versio = [fundamen, vices].join('/')
      switch (defectus) {
        case 'deponens':
        case 'semideponens':
        case 'semideponensActiva':
          return new TabulaDeponens({
            relata: new Ignavum(() => this.putetur(agendus)),
            ut: defectus
          })
        case 'impersonalis':
          return new TabulaImpersonalis({
            relata: new Ignavum(() => this.putetur(agendus)),
            et: defectusSecundus
          })
        case 'perfectus':
          return new TabulaPerfecta(new Ignavum(() => this.putetur(agendus)))
        default:
          throw Actus.Errator('versio', agendus.versio)
      }
    } else if (vices) {
      agendus.versio = fundamen
      if (vices === 'cumImperativoBrevi') {
        return new TabulaVicaria({
          hoc: agendus,
          prima: {
            scapum: '/res/vices/actus',
            via: [fundamen, vices].join('/')
          },
          secunda: {
            scapum: '/res/tabula/actus',
            via: fundamen
          },
          positor: Actus.positor,
          radicator: this.radicetur(fundamen)
        })
      } else {
        throw Actus.Errator('versio', agendus.versio)
      }
    } else {
      if (['prima', 'secunda', 'tertia', 'tertiaVaria', 'quarta'].includes(fundamen)) {
        agendus.versio = fundamen
        return new TabulaRecta({
          radicator: this.radicetur(agendus.versio),
          scapum: '/res/tabula/actus',
          positor: Actus.positor,
          via: agendus.versio,
          hoc: agendus
        })
      } else {
        throw Actus.Errator('versio', agendus.versio)
      }
    }
  }
}
