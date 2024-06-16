import Anomala, { Mantela } from './anomala';
import Ignavum from '../miscella/ignavum';
import { ActusAgendus } from '../praebeunda/agenda';
import Structor from '../praebeunda/structor';
import { Actus as Anomalon } from '../praebeunda/verba';
import TabulaCollata from '../tabulae/collata';
import TabulaImpersonalis from '../tabulae/defectae/impersonalis';
import TabulaPerfecta from '../tabulae/defectae/perfecta';
import TabulaFissa from '../tabulae/fissa';
import TabulaPraefixa from '../tabulae/rescriptae/praefixa';
import TabulaRescripta from '../tabulae/rescriptae/rescripta';
import TabulaSuffixa from '../tabulae/rescriptae/suffixa';
import TabulaScapalis from '../tabulae/scapalis';
import type Tabula from '../tabulae/tabula';

export default class Actus extends Anomala<Anomalon> {
  static se: Ignavum<Actus> = new Ignavum(() => new Actus);

  protected override async numeretur (): Promise<void> {
    const aiere: Ignavum<TabulaScapalis<Anomalon>> = new Ignavum(() =>
      new TabulaScapalis({ via: '/res/scapales/actus/aiere', positor: Anomalon.positor }));
    const esse: Ignavum<TabulaScapalis<Anomalon>> = new Ignavum(() =>
      new TabulaScapalis({ via: '/res/scapales/actus/esse', positor: Anomalon.positor }));
    const fieri: Ignavum<TabulaScapalis<Anomalon>> = new Ignavum(() =>
      new TabulaScapalis({ via: '/res/scapales/actus/fierī', positor: Anomalon.positor }));
    const infieri: Ignavum<TabulaScapalis<Anomalon>> = new Ignavum(() =>
      new TabulaScapalis({ via: '/res/scapales/actus/īnfierī', positor: Anomalon.positor }));
    const inquii: Ignavum<TabulaScapalis<Anomalon>> = new Ignavum(() =>
      new TabulaScapalis({ via: '/res/scapales/actus/inquiī', positor: Anomalon.positor }));

    const coesse: Ignavum<TabulaCollata<Anomalon>> = new Ignavum(() =>
      new TabulaCollata(
        new Ignavum(() =>
          new TabulaScapalis({ via: '/res/scapales/actus/coepisse', positor: Anomalon.positor })),
        new Ignavum(() => new TabulaFissa({
          relata: new Ignavum(() =>
            new TabulaRescripta({
              relata: esse,
              rescriptor: scriptum => scriptum.startsWith('f') ? 'cōn' : 'co'
            })),
          tabula: TabulaPerfecta.apponatur()
        }))
      ));

    const dare: Ignavum<TabulaCollata<Anomalon>> = new Ignavum(() =>
      new TabulaCollata(
        new Ignavum(() =>
          new TabulaScapalis({ via: '/res/scapales/actus/dare', positor: Anomalon.positor })),
        new Ignavum(() => new Structor(() => new ActusAgendus)
          .ponatur(actus => actus.infinitivum = 'dare')
          .ponatur(actus => actus.perfectum = 'dedisse')
          .ponatur(actus => actus.supinum = 'dātum')
          .ponatur(actus => actus.versio = 'prima')
          .struatur().putetur())
      ));

    const ferre: Ignavum<TabulaCollata<Anomalon>> = new Ignavum(() =>
      new TabulaCollata(
        new Ignavum(() =>
          new TabulaScapalis({ via: '/res/scapales/actus/ferre', positor: Anomalon.positor })),
        new Ignavum(() => new Structor(() => new ActusAgendus)
          .ponatur(actus => actus.infinitivum = 'ferre')
          .ponatur(actus => actus.perfectum = 'tulisse')
          .ponatur(actus => actus.supinum = 'lātum')
          .ponatur(actus => actus.versio = 'tertia')
          .struatur().putetur())
      ));

    const facere: Ignavum<TabulaCollata<Anomalon>> = new Ignavum(() => new TabulaCollata(
      new Ignavum(() =>
        new TabulaScapalis({ via: '/res/scapales/actus/facere', positor: Anomalon.positor })),
      new Ignavum(() => new Structor(() => new ActusAgendus)
        .ponatur(actus => actus.infinitivum = 'facere')
        .ponatur(actus => actus.perfectum = 'fēcisse')
        .ponatur(actus => actus.supinum = 'factum')
        .ponatur(actus => actus.versio = 'tertiaVaria/cumImperativoBrevi')
        .struatur().putetur())
    ));

    const ire: Ignavum<TabulaCollata<Anomalon>> = new Ignavum(() =>
      new TabulaCollata(
        new Ignavum(() =>
          new TabulaScapalis({ via: '/res/scapales/actus/ferre', positor: Anomalon.positor })),
        new Ignavum(() => new Structor(() => new ActusAgendus)
          .ponatur(actus => actus.infinitivum = 'īre')
          .ponatur(actus => actus.perfectum = 'īsse')
          .ponatur(actus => actus.supinum = 'itum')
          .ponatur(actus => actus.versio = 'secunda')
          .struatur().putetur())
      ));

    const perire: Ignavum<TabulaFissa<Anomalon>> = new Ignavum(() =>
      new TabulaFissa({
        relata: new Ignavum(() =>
          new TabulaPraefixa({
            relata: ire,
            praefixum: 'per'
          })),
        tabula: TabulaImpersonalis.apponatur('passivo')
      }));

    const velle: Ignavum<TabulaCollata<Anomalon>> = new Ignavum(() =>
      new TabulaCollata(
        new Ignavum(() =>
          new TabulaScapalis({ via: '/res/scapales/actus/velle', positor: Anomalon.positor })),
        new Ignavum(() => new Structor(() => new ActusAgendus)
          .ponatur(actus => actus.infinitivum = 'volere')
          .ponatur(actus => actus.perfectum = 'voluisse')
          .ponatur(actus => actus.versio = 'tertia//semideponens')
          .struatur().putetur())
      ));

    const malle: Ignavum<TabulaCollata<Anomalon>> = new Ignavum(() =>
      new TabulaCollata(
        new Ignavum(() =>
          new TabulaScapalis({ via: '/res/scapales/actus/mālle', positor: Anomalon.positor })),
        new Ignavum(() => new TabulaRescripta({
          relata: velle, rescriptor: scriptum => scriptum.replace('ve', 'mā'),
        }))
      ));

    const meminisse: Ignavum<TabulaCollata<Anomalon>> = new Ignavum(() =>
      new TabulaCollata(
        new Ignavum(() =>
          new TabulaScapalis({ via: '/res/scapales/actus/meminisse', positor: Anomalon.positor })),
        new Ignavum(() => new Structor(() => new ActusAgendus)
          .ponatur(actus => actus.perfectum = 'meminisse')
          .ponatur(actus => actus.versio = 'tertia//perfecta')
          .struatur().putetur())
      ));

    const abdare: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: dare, praefixum: 'ab' }));
    const abesse: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({ relata: dare, rescriptor: scriptum => scriptum.startsWith('f') ? 'ā' : 'ab' }));
    const abire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'ab' }));
    const afferre: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({ relata: ferre, rescriptor: scriptum => 'a'.concat(scriptum.at(0) ?? '', scriptum) }));

    const auferre: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: ferre,
        rescriptor (scriptum) {
          switch (scriptum.at(0)) {
            case 'f':
              return 'au'.concat(scriptum);
            case 't':
              return 'abs'.concat(scriptum);
            case 'l':
              return 'ab'.concat(scriptum);
            default:
              return scriptum;
          }
        },
      }));

    const nolle: Ignavum<TabulaCollata<Anomalon>> = new Ignavum(() =>
      new TabulaCollata(
        new Ignavum(() =>
          new TabulaScapalis({ via: '/res/scapales/actus/nōlle', positor: Anomalon.positor })),
        new Ignavum(() => new TabulaRescripta({
          relata: velle,
          rescriptor (scriptum) {
            switch (scriptum) {
              case 'vīs':
              case 'vult':
              case 'vultis':
                return '';
              default:
                return scriptum.replace('ve', 'nō');
            }
          },
        }))
      ));

    const coepisse: Ignavum<TabulaCollata<Anomalon>> = new Ignavum(() =>
      new TabulaCollata(
        new Ignavum(() =>
          new TabulaScapalis({ via: '/res/scapales/actus/coepisse', positor: Anomalon.positor })),
        new Ignavum((() => new Structor(() => new ActusAgendus)
          .ponatur(actus => actus.perfectum = 'coepisse')
          .ponatur(actus => actus.versio = 'tertia//perfecta')
          .struatur().putetur())
        )));

    const coire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'co' }));
    const collabefieri: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: fieri, praefixum: 'collabe' }));
    const confieri: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: fieri, praefixum: 'cōn' }));

    const conferre: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: ferre,
        rescriptor (scriptum) {
          switch (scriptum.at(0)) {
            case 'f':
              return 'cōn'.concat(scriptum);
            case 't':
              return 'con'.concat(scriptum);
            case 'l':
              return 'col'.concat(scriptum);
            default:
              return scriptum;
          }
        },
      }));

    const dedare: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: dare, praefixum: 'dē' }));
    const deesse: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: esse, praefixum: 'dē' }));
    const deferre: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ferre, praefixum: 'dē' }));
    const defieri: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: fieri, praefixum: 'dē' }));
    const deire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'de' }));

    const differre: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: ferre,
        rescriptor (scriptum) {
          switch (scriptum.at(0)) {
            case 'f':
              return 'dif'.concat(scriptum);
            case 't':
              return 'dis'.concat(scriptum);
            case 'l':
              return 'dī'.concat(scriptum);
            default:
              return scriptum;
          }
        },
      }));

    const disperire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'disper' }));
    const didare: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: dare, praefixum: 'dī' }));

    const efferre: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: ferre,
        rescriptor (scriptum) {
          switch (scriptum.at(0)) {
            case 'f':
              return 'ef'.concat(scriptum);
            case 't':
              return 'ex'.concat(scriptum);
            case 'l':
              return 'ē'.concat(scriptum);
            default:
              return scriptum;
          }
        },
      }));

    const exire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'ex' }));
    const inesse: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: esse, praefixum: 'īn' }));

    const inferre: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: ferre,
        rescriptor (scriptum) {
          switch (scriptum.at(0)) {
            case 'f':
              return 'īn'.concat(scriptum);
            case 't':
              return 'in'.concat(scriptum);
            case 'l':
              return 'il'.concat(scriptum);
            default:
              return scriptum;
          }
        },
      }));

    const interesse: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: esse, praefixum: 'inter' }));
    const interferre: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ferre, praefixum: 'inter' }));
    const introferre: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ferre, praefixum: 'intrō' }));
    const inire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'in' }));
    const interire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'inter' }));
    const introire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'intro' }));
    const nequire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'nequ' }));
    const obesse: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: esse, praefixum: 'ob' }));
    const obire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'ob' }));
    const obsolefieri: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: fieri, praefixum: 'obsole' }));

    const odisse: Ignavum<TabulaCollata<Anomalon>> = new Ignavum(() =>
      new TabulaCollata(
        new Ignavum(() =>
          new TabulaScapalis({ via: '/res/scapales/actus/ōdisse', positor: Anomalon.positor })),
        new Ignavum(() => new Structor(() => new ActusAgendus)
          .ponatur(actus => actus.perfectum = 'ōdisse')
          .ponatur(actus => actus.versio = 'quarta//perfecta')
          .struatur().putetur())
      ));

    const offerre: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: ferre,
        rescriptor: scriptum => (scriptum.startsWith('f') ? 'of' : 'ob').concat(scriptum),
      }));

    const perferre: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ferre, praefixum: 'per' }));
    const pervelle: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: velle, praefixum: 'per' }));

    const posse: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: esse,
        rescriptor (scriptum) {
          switch (true) {
            case scriptum === 'esse':
              return 'posse';
            case scriptum === 'estō':
              return '';
            case scriptum.startsWith('s'):
              return 'pos'.concat(scriptum);
            case scriptum.startsWith('e'):
              return 'pot'.concat(scriptum);
            case scriptum.startsWith('f'):
              return 'pot'.concat(scriptum.substring(1));
            default:
              return '';
          }
        },
      }));

    const postferre: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ferre, praefixum: 'post' }));
    const praeesse: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: esse, praefixum: 'prae' }));
    const praeterferre: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ferre, praefixum: 'praeter' }));

    const prodesse: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: esse,
        rescriptor: scriptum => (scriptum.startsWith('e') ? 'prō' : 'prōd').concat(scriptum),
      }));

    const prodire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'prōd' }));
    const proferre: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ferre, praefixum: 'prō' }));
    const quire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'qu' }));
    const redire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'red' }));

    const referre: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: esse,
        rescriptor: scriptum => (scriptum.startsWith('t') ? 'ret' : 're').concat(scriptum),
      }));

    const subesse: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: esse, praefixum: 'sub' }));
    const subire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'sub' }));
    const sufferre: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ferre, praefixum: 'suf' }));
    const superesse: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: esse, praefixum: 'super' }));
    const suffieri: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: fieri, praefixum: 'suf' }));
    const superfieri: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: fieri, praefixum: 'super' }));
    const transabire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'trānsab' }));
    const transire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'trāns' }));
    const venire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({ relata: ire, praefixum: 'vēn' }));

    const venireRectum: Ignavum<Tabula<Anomalon>> = new Ignavum(() =>
      new Structor(() => new ActusAgendus)
        .ponatur(actus => actus.infinitivum = 'venīre')
        .ponatur(actus => actus.perfectum = 'vēnīsse')
        .ponatur(actus => actus.supinum = 'ventum')
        .ponatur(actus => actus.versio = 'quartus//impersonalis//passivo')
        .struatur().putetur());

    const arefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'āre'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const arfacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'ār'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const benefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'bene'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const calfacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'cal'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const calefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'cale'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const commonefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'commone'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const condocfacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'condoce'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const consuefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'cōnsuē'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const expergefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'expergē'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const fervefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'fervē'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const infervefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'inferve'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const labefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'labe'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const liquifacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'liqui'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const madefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'made'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const malefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'male'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const mollifacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'molli'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const multifacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'multi'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const mansuefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'mānsuē'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const olfacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'ol'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const patefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'pate'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const pavefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'pave'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const putrefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'putre'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const satisfacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'satis'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const stupefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'stupe'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const tepefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'tepe'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const tremefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'treme'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const tumefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'tume'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const vacuefacere: Ignavum<TabulaRescripta<Anomalon>> = new Ignavum(() =>
      new TabulaRescripta({
        relata: facere,
        rescriptor: scriptum => 'vacuē'.concat(scriptum === 'fac' ? 'face' : scriptum)
      }));

    const incalfacere: Ignavum<TabulaSuffixa<Anomalon>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: calfacere, suffixum: 'in' }));
    const percalfacere: Ignavum<TabulaSuffixa<Anomalon>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: calfacere, suffixum: 'per' }));
    const recalfacere: Ignavum<TabulaSuffixa<Anomalon>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: calfacere, suffixum: 're' }));
    const permadefacere: Ignavum<TabulaSuffixa<Anomalon>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: madefacere, suffixum: 'per' }));
    const subolfacere: Ignavum<TabulaSuffixa<Anomalon>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: olfacere, suffixum: 'sub' }));
    const confervefacere: Ignavum<TabulaSuffixa<Anomalon>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: fervefacere, suffixum: 'con' }));
    const defervefacere: Ignavum<TabulaSuffixa<Anomalon>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: calfacere, suffixum: 'dē' }));
    const obstupefacere: Ignavum<TabulaSuffixa<Anomalon>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: stupefacere, suffixum: 'ob' }));
    const rarefacere: Ignavum<TabulaSuffixa<Anomalon>> = new Ignavum(() =>
      new TabulaSuffixa({ relata: arefacere, suffixum: 'r' }));

    const advenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'ad'
      }));

    const adinvenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'adin'
      }));

    const antevenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'ante'
      }));

    const circumvenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'circum'
      }));

    const convenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'con'
      }));

    const contravenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'contrā'
      }));

    const disconvenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'discon'
      }));

    const devenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'dē'
      }));

    const evenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'ē'
      }));

    const invenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'in'
      }));

    const intervenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'inter'
      }));

    const obvenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'ob'
      }));

    const pervenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'per'
      }));

    const praevenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'prae'
      }));

    const provenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'prō'
      }));

    const subvenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'sub'
      }));

    const supervenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'super'
      }));

    const transvenire: Ignavum<TabulaPraefixa<Anomalon>> = new Ignavum(() =>
      new TabulaPraefixa({
        relata: new Ignavum(() => venireRectum.ipse()),
        praefixum: 'trāns'
      }));

    this.contenta.set('abdare', new Mantela(abdare));
    this.contenta.set('abesse', new Mantela(abesse));
    this.contenta.set('advenīre', new Mantela(advenire));
    this.contenta.set('adinvenīre', new Mantela(adinvenire));
    this.contenta.set('afferre', new Mantela(afferre));
    this.contenta.set('antevenīre', new Mantela(antevenire));
    this.contenta.set('ārefacere', new Mantela(arefacere));
    this.contenta.set('ārfacere', new Mantela(arfacere));
    this.contenta.set('auferre', new Mantela(auferre));
    this.contenta.set('abīre', new Mantela(abire));
    this.contenta.set('aiere', new Mantela(aiere));
    this.contenta.set('benefacere', new Mantela(benefacere));
    this.contenta.set('calfacere', new Mantela(calfacere));
    this.contenta.set('calefacere', new Mantela(calefacere));
    this.contenta.set('circumvenīre', new Mantela(circumvenire));
    this.contenta.set('coepisse', new Mantela(coepisse));
    this.contenta.set('coesse', new Mantela(coesse));
    this.contenta.set('coīre', new Mantela(coire));
    this.contenta.set('collabefierī', new Mantela(collabefieri));
    this.contenta.set('commonefacere', new Mantela(commonefacere));
    this.contenta.set('condocefacere', new Mantela(condocfacere));
    this.contenta.set('confervēfacere', new Mantela(confervefacere));
    this.contenta.set('cōnsuēfacere', new Mantela(consuefacere));
    this.contenta.set('conferre', new Mantela(conferre));
    this.contenta.set('cōnfierī', new Mantela(confieri));
    this.contenta.set('convenīre', new Mantela(convenire));
    this.contenta.set('contrāvenīre', new Mantela(contravenire));
    this.contenta.set('dare', new Mantela(dare));
    this.contenta.set('dēdare', new Mantela(dedare));
    this.contenta.set('dēferre', new Mantela(deferre));
    this.contenta.set('dēfervēfacere', new Mantela(defervefacere));
    this.contenta.set('dēfierī', new Mantela(defieri));
    this.contenta.set('dēesse', new Mantela(deesse));
    this.contenta.set('dēīre', new Mantela(deire));
    this.contenta.set('dēvenīre', new Mantela(devenire));
    this.contenta.set('dīdare', new Mantela(didare));
    this.contenta.set('differre', new Mantela(differre));
    this.contenta.set('disconvenīre', new Mantela(disconvenire));
    this.contenta.set('disperīre', new Mantela(disperire));
    this.contenta.set('diferre', new Mantela(differre));
    this.contenta.set('efferre', new Mantela(efferre));
    this.contenta.set('esse', new Mantela(esse));
    this.contenta.set('ēvenīre', new Mantela(evenire));
    this.contenta.set('expergēfacere', new Mantela(expergefacere));
    this.contenta.set('exīre', new Mantela(exire));
    this.contenta.set('facere', new Mantela(facere));
    this.contenta.set('ferre', new Mantela(ferre));
    this.contenta.set('fervēfacere', new Mantela(fervefacere));
    this.contenta.set('fierī', new Mantela(fieri));
    this.contenta.set('incalfacere', new Mantela(incalfacere));
    this.contenta.set('infervefacere', new Mantela(infervefacere));
    this.contenta.set('īnfierī', new Mantela(infieri));
    this.contenta.set('inquiī', new Mantela(inquii));
    this.contenta.set('interesse', new Mantela(interesse));
    this.contenta.set('interferre', new Mantela(interferre));
    this.contenta.set('intrōferre', new Mantela(introferre));
    this.contenta.set('īnesse', new Mantela(inesse));
    this.contenta.set('īnferre', new Mantela(inferre));
    this.contenta.set('inīre', new Mantela(inire));
    this.contenta.set('interīre', new Mantela(interire));
    this.contenta.set('introīre', new Mantela(introire));
    this.contenta.set('invenīre', new Mantela(invenire));
    this.contenta.set('intervenīre', new Mantela(intervenire));
    this.contenta.set('īre', new Mantela(ire));
    this.contenta.set('labefacere', new Mantela(labefacere));
    this.contenta.set('liquifacere', new Mantela(liquifacere));
    this.contenta.set('madefacere', new Mantela(madefacere));
    this.contenta.set('malefacere', new Mantela(malefacere));
    this.contenta.set('mālle', new Mantela(malle));
    this.contenta.set('mānsuēfacere', new Mantela(mansuefacere));
    this.contenta.set('meminisse', new Mantela(meminisse));
    this.contenta.set('mollifacere', new Mantela(mollifacere));
    this.contenta.set('multifacere', new Mantela(multifacere));
    this.contenta.set('nōlle', new Mantela(nolle));
    this.contenta.set('nequīre', new Mantela(nequire));
    this.contenta.set('obesse', new Mantela(obesse));
    this.contenta.set('obīre', new Mantela(obire));
    this.contenta.set('obstupefacere', new Mantela(obstupefacere));
    this.contenta.set('obvenīre', new Mantela(obvenire));
    this.contenta.set('ōdisse', new Mantela(odisse));
    this.contenta.set('offerre', new Mantela(offerre));
    this.contenta.set('olfacere', new Mantela(olfacere));
    this.contenta.set('obsolefierī', new Mantela(obsolefieri));
    this.contenta.set('patefacere', new Mantela(patefacere));
    this.contenta.set('pavefacere', new Mantela(pavefacere));
    this.contenta.set('percalfacere', new Mantela(percalfacere));
    this.contenta.set('perferre', new Mantela(perferre));
    this.contenta.set('perīre', new Mantela(perire));
    this.contenta.set('permadefacere', new Mantela(permadefacere));
    this.contenta.set('pervelle', new Mantela(pervelle));
    this.contenta.set('pervenīre', new Mantela(pervenire));
    this.contenta.set('posse', new Mantela(posse));
    this.contenta.set('postferre', new Mantela(postferre));
    this.contenta.set('praeesse', new Mantela(praeesse));
    this.contenta.set('praeterferre', new Mantela(praeterferre));
    this.contenta.set('praevenīre', new Mantela(praevenire));
    this.contenta.set('prōdesse', new Mantela(prodesse));
    this.contenta.set('prōferre', new Mantela(proferre));
    this.contenta.set('prōdīre', new Mantela(prodire));
    this.contenta.set('prōvenīre', new Mantela(provenire));
    this.contenta.set('putrefacere', new Mantela(putrefacere));
    this.contenta.set('quīre', new Mantela(quire));
    this.contenta.set('rārefacere', new Mantela(rarefacere));
    this.contenta.set('redīre', new Mantela(redire));
    this.contenta.set('referre', new Mantela(referre));
    this.contenta.set('recalfacere', new Mantela(recalfacere));
    this.contenta.set('satisfacere', new Mantela(satisfacere));
    this.contenta.set('stupefacere', new Mantela(stupefacere));
    this.contenta.set('subesse', new Mantela(subesse));
    this.contenta.set('subīre', new Mantela(subire));
    this.contenta.set('subolfacere', new Mantela(subolfacere));
    this.contenta.set('subvenīre', new Mantela(subvenire));
    this.contenta.set('sufferre', new Mantela(sufferre));
    this.contenta.set('suffierī', new Mantela(suffieri));
    this.contenta.set('superesse', new Mantela(superesse));
    this.contenta.set('superfierī', new Mantela(superfieri));
    this.contenta.set('supervenīre', new Mantela(supervenire));
    this.contenta.set('tepefacere', new Mantela(tepefacere));
    this.contenta.set('trānsabīre', new Mantela(transabire));
    this.contenta.set('trānsīre', new Mantela(transire));
    this.contenta.set('trānsvenīre', new Mantela(transvenire));
    this.contenta.set('tremefacere', new Mantela(tremefacere));
    this.contenta.set('tumefacere', new Mantela(tumefacere));
    this.contenta.set('vacuēfacere', new Mantela(vacuefacere));
    this.contenta.set('velle', new Mantela(velle));
    this.contenta.set('vēnīre', new Mantela(venire));
    this.contenta.set('venīre', new Mantela(venireRectum));
  }
}
