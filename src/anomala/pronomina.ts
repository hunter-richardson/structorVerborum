import Anomala, { Mantela } from './anomala';
import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import { Encliticus } from '../praebeunda/valores';
import { Pronomen } from '../praebeunda/verba';
import TabulaCollata from '../tabulae/collata';
import TabulaIrregula from '../tabulae/irregula';
import TabulaCircumfixa from '../tabulae/rescriptae/circumfixa';
import TabulaPraefixa from '../tabulae/rescriptae/praefixa';
import TabulaRescripta from '../tabulae/rescriptae/rescripta';
import TabulaSuffixa from '../tabulae/rescriptae/suffixa';

@Ultimum @Ignavum @Nuntius.factum
class Pronomina extends Anomala<Pronomen> {
  @Nuntius.promittum
  protected async numeretur(): Promise<void> {
    const ego: TabulaIrregula<Pronomen> = new TabulaIrregula<Pronomen>(Pronomen, 'ego')
    const hoc: TabulaIrregula<Pronomen> = new TabulaIrregula<Pronomen>(Pronomen, 'hoc')
    const id: TabulaIrregula<Pronomen> = new TabulaIrregula<Pronomen>(Pronomen, 'id')
    const illud: TabulaIrregula<Pronomen> = new TabulaIrregula<Pronomen>(Pronomen, 'illud')
    const se: TabulaIrregula<Pronomen> = new TabulaIrregula<Pronomen>(Pronomen, 'sē')

    const egomet: TabulaSuffixa<Pronomen> = new TabulaSuffixa<Pronomen>(ego, 'met')
    const idem: TabulaRescripta<Pronomen> = new TabulaRescripta<Pronomen>(id,
      (scriptum: string): string => {
        switch(scriptum) {
          case 'is':
          case 'eī':
            return 'īdem'
          default:
            return `${scriptum}dem`
        }
      })
    const ipsum: TabulaCollata<Pronomen> = new TabulaCollata<Pronomen>(
             new TabulaIrregula<Pronomen>(Pronomen, 'ipsum'),
             new TabulaRescripta<Pronomen>(illud,
                   (scriptum: string): string => scriptum.replace('ll', 'ps')))
    const istud: TabulaRescripta<Pronomen> = new TabulaRescripta<Pronomen>(illud,
              (scriptum: string): string => scriptum.replace('ll', 'st'))
    const quid: TabulaRescripta<Pronomen> = new TabulaRescripta<Pronomen>(id,
      (scriptum: string): string => {
        switch(scriptum) {
          case 'ea':
          case 'eae':
            return 'quae'
          case 'eum':
            return 'quem'
          case 'eius':
            return 'cuius'
          case 'eī':
            return 'cui'
          default:
            return scriptum.replace('e', 'qu')
        }
      })
    const quod: TabulaRescripta<Pronomen> = new TabulaRescripta<Pronomen>(quid,
      (scriptum: string): string => {
        switch(scriptum) {
          case 'quid':
            return 'quod'
          case 'quis':
            return 'quī'
          default:
            return scriptum
        }
      })
    const tu: TabulaCollata<Pronomen> = new TabulaCollata<Pronomen>(
          new TabulaIrregula<Pronomen>(Pronomen, 'tū'),
          new TabulaRescripta<Pronomen>(se,
                (scriptum: string): string => scriptum.replace('s', 't')))
    const aliquid: TabulaPraefixa<Pronomen> = new TabulaPraefixa<Pronomen>('ali', quid)
    const aliquod: TabulaPraefixa<Pronomen> = new TabulaPraefixa<Pronomen>('ali', quod)
    const aliquodpiam: TabulaCircumfixa<Pronomen> = new TabulaCircumfixa<Pronomen>('ali', quod, 'piam')
    const ecquid: TabulaRescripta<Pronomen> = new TabulaRescripta<Pronomen>(quid,
      (scriptum: string): string => (scriptum === 'cuius' ? 'ecculus' : `ec${scriptum}`))
    const ecquod: TabulaPraefixa<Pronomen> = new TabulaPraefixa<Pronomen>('ec', quod)
    const quidnam: TabulaSuffixa<Pronomen> = new TabulaSuffixa<Pronomen>(quid, 'nam')
    const quidpiam: TabulaSuffixa<Pronomen> = new TabulaSuffixa<Pronomen>(quid, 'piam')
    const quidquam: TabulaSuffixa<Pronomen> = new TabulaSuffixa<Pronomen>(quid, 'quam')
    const quidque: TabulaSuffixa<Pronomen> = new TabulaSuffixa<Pronomen>(quid, Encliticus.coniugans)
    const quidvis: TabulaSuffixa<Pronomen> = new TabulaSuffixa<Pronomen>(quid, 'vīs')
    const quodnam: TabulaSuffixa<Pronomen> = new TabulaSuffixa<Pronomen>(quod, 'nam')
    const quodpiam: TabulaSuffixa<Pronomen> = new TabulaSuffixa<Pronomen>(quod, 'piam')
    const quodvis: TabulaSuffixa<Pronomen> = new TabulaSuffixa<Pronomen>(quod, 'vīs')
    const semet: TabulaSuffixa<Pronomen> = new TabulaSuffixa<Pronomen>(se, 'met')
    const tute: TabulaRescripta<Pronomen> = new TabulaRescripta<Pronomen>(tu,
      (scriptum: string): string => scriptum === 'tū' ? 'tūte' : scriptum)
    const tutemet: TabulaSuffixa<Pronomen> = new TabulaSuffixa<Pronomen>(tute, 'met')

    this.contenta.set('aliquid', new Mantela(aliquid))
    this.contenta.set('aliquod', new Mantela(aliquod))
    this.contenta.set('aliquodpiam', new Mantela(aliquodpiam))
    this.contenta.set('ecquid', new Mantela(ecquid))
    this.contenta.set('ecquod', new Mantela(ecquod))
    this.contenta.set('ego', new Mantela(ego))
    this.contenta.set('egomet', new Mantela(egomet))
    this.contenta.set('hoc', new Mantela(hoc))
    this.contenta.set('id', new Mantela(id))
    this.contenta.set('idem', new Mantela(idem))
    this.contenta.set('illud', new Mantela(illud))
    this.contenta.set('ipsum', new Mantela(ipsum))
    this.contenta.set('istud', new Mantela(istud))
    this.contenta.set('quid', new Mantela(quid))
    this.contenta.set('quidnam', new Mantela(quidnam))
    this.contenta.set('quidpiam', new Mantela(quidpiam))
    this.contenta.set('quidquam', new Mantela(quidquam))
    this.contenta.set('quidque', new Mantela(quidque))
    this.contenta.set('quidvīs', new Mantela(quidvis))
    this.contenta.set('quod', new Mantela(quod))
    this.contenta.set('quodnam', new Mantela(quodnam))
    this.contenta.set('quodpiam', new Mantela(quodpiam))
    this.contenta.set('quodvīs', new Mantela(quodvis))
    this.contenta.set('sē', new Mantela(se))
    this.contenta.set('sēmet', new Mantela(semet))
    this.contenta.set('tū', new Mantela(tu))
    this.contenta.set('tūte', new Mantela(tute))
    this.contenta.set('tūtemet', new Mantela(tutemet))
  }
}

export const pronomina: Pronomina = new Pronomina()
