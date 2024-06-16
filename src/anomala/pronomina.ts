import Anomala, { Mantela } from './anomala';
import { Encliticum } from '../miscella/enumerationes';
import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import { Pronomen } from '../praebeunda/verba';
import TabulaCollata from '../tabulae/collata';
import TabulaCircumfixa from '../tabulae/rescriptae/circumfixa';
import TabulaPraefixa from '../tabulae/rescriptae/praefixa';
import TabulaRescripta from '../tabulae/rescriptae/rescripta';
import TabulaSuffixa from '../tabulae/rescriptae/suffixa';
import TabulaScapalis from '../tabulae/scapalis';

@Nuntius.factum('Pronomina')
export default class Pronomina extends Anomala<Pronomen> {
  static se: Ignavum<Pronomina> = new Ignavum(() => new Pronomina);

  @Nuntius.futurus('Pronomina')
  protected async numeretur (): Promise<void> {
    const ego: Ignavum<TabulaScapalis<Pronomen>> = new Ignavum(() =>
      new TabulaScapalis({ via: '/res/scapales/pronomina/ego', positor: Pronomen.positor }));
    const hoc: Ignavum<TabulaScapalis<Pronomen>> = new Ignavum(() =>
      new TabulaScapalis({ via: '/res/scapales/pronomina/hoc', positor: Pronomen.positor }));
    const id: Ignavum<TabulaScapalis<Pronomen>> = new Ignavum(() =>
      new TabulaScapalis({ via: '/res/scapales/pronomina/id', positor: Pronomen.positor }));
    const illud: Ignavum<TabulaScapalis<Pronomen>> = new Ignavum(() =>
      new TabulaScapalis({ via: '/res/scapales/pronomina/illud', positor: Pronomen.positor }));
    const se: Ignavum<TabulaScapalis<Pronomen>> = new Ignavum(() =>
      new TabulaScapalis({ via: '/res/scapales/pronomina/sē', positor: Pronomen.positor }));

    const egomet: Ignavum<TabulaSuffixa<Pronomen>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: ego, suffixum: 'met' }));

    const idem: Ignavum<TabulaRescripta<Pronomen>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: id,
        rescriptor (scriptum: string): string {
          switch (scriptum) {
            case 'is':
            case 'eī':
              return 'īdem';
            default:
              return scriptum.concat('dem');
          }
        },
      }));

    const ipsum: Ignavum<TabulaCollata<Pronomen>> = new Ignavum(() =>
      new TabulaCollata(
        new Ignavum<TabulaScapalis<Pronomen>>(() =>
          new TabulaScapalis({ via: '/res/scapales/pronomina/ipsum', positor: Pronomen.positor })),
        new Ignavum<TabulaRescripta<Pronomen>>(() =>
          new TabulaRescripta({
            relata: illud,
            rescriptor: scriptum => scriptum.replace('ill', 'ips')
          }))
      ));

    const istud: Ignavum<TabulaRescripta<Pronomen>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: illud,
        rescriptor: scriptum => scriptum.replace('ll', 'st')
      }));

    const quid: Ignavum<TabulaRescripta<Pronomen>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: id,
        rescriptor (scriptum: string): string {
          switch (scriptum) {
            case 'ea':
            case 'eae':
              return 'quae';
            case 'eum':
              return 'quem';
            case 'eius':
              return 'cuius';
            default:
              return scriptum.replace('e', 'qu');
          }
        },
      }));

    const quod: Ignavum<TabulaRescripta<Pronomen>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: quid,
        rescriptor (scriptum: string): string {
          switch (scriptum) {
            case 'quid':
              return 'quod';
            case 'quis':
              return 'quī';
            default:
              return scriptum;
          }
        },
      }));

    const tu: Ignavum<TabulaCollata<Pronomen>> = new Ignavum(() =>
      new TabulaCollata(
        new Ignavum<TabulaScapalis<Pronomen>>(() =>
          new TabulaScapalis({ via: '/res/scapales/pronomina/tū', positor: Pronomen.positor })),
        new Ignavum<TabulaRescripta<Pronomen>>(() =>
          new TabulaRescripta({
            relata: se,
            rescriptor: scriptum => scriptum.replace('s', 't')
          }))
      ));

    const aliquid: Ignavum<TabulaPraefixa<Pronomen>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: quid, praefixum: 'ali' }));
    const aliquod: Ignavum<TabulaPraefixa<Pronomen>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: quod, praefixum: 'ali' }));
    const aliquodpiam: Ignavum<TabulaCircumfixa<Pronomen>> = new Ignavum(() =>
      new TabulaCircumfixa({ relata: quod, praefixum: 'ali', suffixum: 'piam' }));

    const ecquid: Ignavum<TabulaRescripta<Pronomen>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: quid,
        rescriptor: scriptum => scriptum === 'cuius' ? 'ecculus' : 'ec'.concat(scriptum)
      }));

    const ecquod: Ignavum<TabulaPraefixa<Pronomen>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: quod, praefixum: 'ec' }));
    const quidnam: Ignavum<TabulaSuffixa<Pronomen>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: quid, suffixum: 'nam' }));
    const quidpiam: Ignavum<TabulaSuffixa<Pronomen>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: quid, suffixum: 'piam' }));
    const quidquam: Ignavum<TabulaSuffixa<Pronomen>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: quid, suffixum: 'quam' }));
    const quidque: Ignavum<TabulaSuffixa<Pronomen>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: quid, suffixum: Encliticum.Coniugans }));
    const quidvis: Ignavum<TabulaSuffixa<Pronomen>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: quid, suffixum: 'vīs' }));
    const quodnam: Ignavum<TabulaSuffixa<Pronomen>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: quod, suffixum: 'nam' }));
    const quodpiam: Ignavum<TabulaSuffixa<Pronomen>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: quod, suffixum: 'piam' }));
    const quodvis: Ignavum<TabulaSuffixa<Pronomen>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: quod, suffixum: 'vīs' }));
    const semet: Ignavum<TabulaSuffixa<Pronomen>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: se, suffixum: 'met' }));

    const tute: Ignavum<TabulaRescripta<Pronomen>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: tu,
        rescriptor: scriptum => scriptum === 'tū' ? 'tūte' : scriptum
      }));

    const tutemet: Ignavum<TabulaSuffixa<Pronomen>> = new Ignavum(() =>
      new TabulaSuffixa({
        relata: tute,
        suffixum: 'met'
      }));

    this.contenta.set('aliquid', new Mantela(aliquid));
    this.contenta.set('aliquod', new Mantela(aliquod));
    this.contenta.set('aliquodpiam', new Mantela(aliquodpiam));
    this.contenta.set('ecquid', new Mantela(ecquid));
    this.contenta.set('ecquod', new Mantela(ecquod));
    this.contenta.set('ego', new Mantela(ego));
    this.contenta.set('egomet', new Mantela(egomet));
    this.contenta.set('hoc', new Mantela(hoc));
    this.contenta.set('id', new Mantela(id));
    this.contenta.set('idem', new Mantela(idem));
    this.contenta.set('illud', new Mantela(illud));
    this.contenta.set('ipsum', new Mantela(ipsum));
    this.contenta.set('istud', new Mantela(istud));
    this.contenta.set('quid', new Mantela(quid));
    this.contenta.set('quidnam', new Mantela(quidnam));
    this.contenta.set('quidpiam', new Mantela(quidpiam));
    this.contenta.set('quidquam', new Mantela(quidquam));
    this.contenta.set('quidque', new Mantela(quidque));
    this.contenta.set('quidvīs', new Mantela(quidvis));
    this.contenta.set('quod', new Mantela(quod));
    this.contenta.set('quodnam', new Mantela(quodnam));
    this.contenta.set('quodpiam', new Mantela(quodpiam));
    this.contenta.set('quodvīs', new Mantela(quodvis));
    this.contenta.set('sē', new Mantela(se));
    this.contenta.set('sēmet', new Mantela(semet));
    this.contenta.set('tū', new Mantela(tu));
    this.contenta.set('tūte', new Mantela(tute));
    this.contenta.set('tūtemet', new Mantela(tutemet));
  }
}
