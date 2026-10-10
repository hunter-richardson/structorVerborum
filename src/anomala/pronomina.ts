import Anomala, { Mantela } from './anomala';
import '../extensions/array';
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
  @Nuntius.captor get omnia(): Promise<string[]> {
    return new Promise(() => [
        'aliquid', 'aliquod', 'aliquodpiam', 'ecquid', 'ecquod', 'ego', 'egomet', 'hoc', 'id', 'idem', 'illud', 'ipsum', 'istud', 'quid', 'quidnam', 'quidpiam', 'quidquam', 'quidque', 'quidvīs', 'quod', 'quodnam', 'quodpiam', 'quodvīs', 'sē', 'sēmet', 'tū', 'tūte', 'tūtemet'
      ].sort().unique())
  }

  @Nuntius.promittum
  protected async numeretur(): Promise<void> {
    this.contenta['ego'] = new Mantela(new TabulaIrregula<Pronomen>(Pronomen, 'ego'))
    this.contenta['hoc'] = new Mantela(new TabulaIrregula<Pronomen>(Pronomen, 'hoc'))
    this.contenta['id'] = new Mantela(new TabulaIrregula<Pronomen>(Pronomen, 'id'))
    this.contenta['illud'] = new Mantela(new TabulaIrregula<Pronomen>(Pronomen, 'illud'))
    this.contenta['se'] = new Mantela(new TabulaIrregula<Pronomen>(Pronomen, 'sē'))
    this.contenta['egomet'] = new Mantela(new TabulaSuffixa<Pronomen>(this.contenta['ego'], 'met'))
    this.contenta[ 'idem' ] = new Mantela(new TabulaRescripta<Pronomen>(this.contenta['id'],
      (scriptum: string): string => {
        switch(scriptum) {
          case 'is':
          case 'eī':
            return 'īdem'
          default:
            return `${scriptum}dem`
      } }))
    this.contenta['ipsum'] = new Mantela(new TabulaCollata<Pronomen>(
             new TabulaIrregula<Pronomen>(Pronomen, 'ipsum'),
             new TabulaRescripta<Pronomen>(this.contenta['illud'],
                   (scriptum: string): string => scriptum.replace('ll', 'ps'))))
    this.contenta['istud'] = new Mantela(new TabulaRescripta<Pronomen>(this.contenta['illud'],
              (scriptum: string): string => scriptum.replace('ll', 'st')))
    this.contenta['quid'] = new Mantela(new TabulaRescripta<Pronomen>(this.contenta['id'],
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
      } }))
    this.contenta['quod'] = new Mantela(new TabulaRescripta<Pronomen>(this.contenta['quid'],
      (scriptum: string): string => {
        switch(scriptum) {
          case 'quid':
            return 'quod'
          case 'quis':
            return 'quī'
          default:
            return scriptum
      } }))
    this.contenta['tu'] = new Mantela(new TabulaCollata<Pronomen>(
          new TabulaIrregula<Pronomen>(Pronomen, 'tū'),
          new TabulaRescripta<Pronomen>(this.contenta['se'],
                (scriptum: string): string => scriptum.replace('s', 't'))))
    this.contenta['aliquid'] = new Mantela(new TabulaPraefixa<Pronomen>('ali', this.contenta['quid']))
    this.contenta['aliquod'] = new Mantela(new TabulaPraefixa<Pronomen>('ali', this.contenta['quod']))
    this.contenta[ 'aliquodpiam' ] = new Mantela(new TabulaCircumfixa<Pronomen>('ali', this.contenta['quod'], 'piam'))
    this.contenta['ecquid'] = new Mantela(new TabulaRescripta<Pronomen>(this.contenta['quid'],
      (scriptum: string): string => (scriptum === 'cuius' ? 'ecculus' : `ec${scriptum}`)))
    this.contenta['ecquod'] = new Mantela(new TabulaPraefixa<Pronomen>('ec', this.contenta['quod']))
    this.contenta['quidnam'] = new Mantela(new TabulaSuffixa<Pronomen>(this.contenta['quid'], 'nam'))
    this.contenta['quidpiam'] = new Mantela(new TabulaSuffixa<Pronomen>(this.contenta['quid'], 'piam'))
    this.contenta['quidquam'] = new Mantela(new TabulaSuffixa<Pronomen>(this.contenta['quid'], 'quam'))
    this.contenta['quidque'] = new Mantela(new TabulaSuffixa<Pronomen>(this.contenta['quid'], Encliticus.coniugans))
    this.contenta['quidvis'] = new Mantela(new TabulaSuffixa<Pronomen>(this.contenta['quid'], 'vīs'))
    this.contenta['quodnam'] = new Mantela(new TabulaSuffixa<Pronomen>(this.contenta['quod'], 'nam'))
    this.contenta['quodpiam'] = new Mantela(new TabulaSuffixa<Pronomen>(this.contenta['quod'], 'piam'))
    this.contenta['quodvis'] = new Mantela(new TabulaSuffixa<Pronomen>(this.contenta['quod'], 'vīs'))
    this.contenta['semet'] = new Mantela(new TabulaSuffixa<Pronomen>(this.contenta['se'], 'met'))
    this.contenta['tute'] = new Mantela(new TabulaRescripta<Pronomen>(this.contenta['tu'],
      (scriptum: string): string => scriptum === 'tū' ? 'tūte' : scriptum))
    this.contenta['tutemet'] = new Mantela(new TabulaSuffixa<Pronomen>(this.contenta['tute'], 'met'))
  }
}

export const pronomina: Pronomina = new Pronomina()
