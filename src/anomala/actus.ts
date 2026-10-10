import Anomala, { Mantela } from './anomala';
import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import Structor from '../praebeunda/structor';
import { TabulamenActus } from '../praebeunda/tabulamina';
import { Actus } from '../praebeunda/verba';
import TabulaCollata from '../tabulae/collata';
import TabulaFissa from '../tabulae/fissa';
import TabulaIrregula from '../tabulae/irregula';
import TabulaPraefixa from '../tabulae/rescriptae/praefixa';
import TabulaRescripta from '../tabulae/rescriptae/rescripta';

@Ultimum @Ignavum @Nuntius.factum
class ActusAnomali extends Anomala<Actus> {
  @Nuntius.promittum
  protected override async numeretur(): Promise<void> {
    const aiere: TabulaIrregula<Actus> = new TabulaIrregula<Actus>(Actus, 'aiere')
    const esse: TabulaIrregula<Actus> = new TabulaIrregula<Actus>(Actus, 'esse')
    const fieri: TabulaIrregula<Actus> = new TabulaIrregula<Actus>(Actus, 'fierī')
    const infieri: TabulaIrregula<Actus> = new TabulaIrregula<Actus>(Actus, 'īnfierī')
    const inquii: TabulaIrregula<Actus> = new TabulaIrregula<Actus>(Actus, 'inquiī')
    const coesse: TabulaFissa<Actus> = new TabulaFissa<Actus>(
        new TabulaRescripta<Actus>(esse,
            (scriptum: string) => {
              switch(scriptum[0]) {
                case 'e': return `co${scriptum}`
                case 'f': return `cō${scriptum}`
                case 's': return `cōn${scriptum}`
                default: return ''
              }
            }
        ), 'persona = prima: dele; persona = secunda: dele; modus = participium & vox = passiva: dele; persona = tertia: pone(persona: nulla)')
    const dare: TabulaCollata<Actus> = new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'dare'),
        new Structor(TabulamenActus)
              .ponatur((actus) => (actus.principium = 'prima'))
              .ponatur((actus) => (actus.praesens = 'dare'))
              .ponatur((actus) => (actus.perfectum = 'dedisse'))
              .ponatur((actus) => (actus.supinum = 'dātum'))
              .struatur)
    const ferre: TabulaCollata<Actus> = new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'ferre'),
        new Structor(TabulamenActus)
              .ponatur((actus) => (actus.principium = 'tertia/cumImperativoBrevi'))
              .ponatur((actus) => (actus.praesens = 'ferere'))
              .ponatur((actus) => (actus.perfectum = 'tulisse'))
              .ponatur((actus) => (actus.supinum = 'lātum'))
              .struatur)
    const facere: TabulaCollata<Actus> = new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'facere'),
        new Structor(TabulamenActus)
              .ponatur((actus) => (actus.principium = 'terta/varia/cumImperativoBrevi'))
              .ponatur((actus) => (actus.praesens = 'facere'))
              .ponatur((actus) => (actus.perfectum = 'fēcisse'))
              .ponatur((actus) => (actus.supinum = 'factum'))
              .struatur)
    const ire: TabulaIrregula<Actus> = new TabulaIrregula<Actus>(Actus, 'īre')
    const perire: TabulaFissa<Actus> = new TabulaFissa<Actus>(
        new TabulaPraefixa<Actus>('per', ire),
        'persona ! tertia & tempus < perfect: dele; persona = tertia & tempus < perfect: pone(persona: nulla)')
    const velle: TabulaCollata<Actus> = new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'velle'),
        new Structor(TabulamenActus)
              .ponatur((actus) => (actus.principium = 'tertia'))
              .ponatur((actus) => (actus.scriptura = 'vox = passiva: dele'))
              .ponatur((actus) => (actus.praesens = 'volere'))
              .ponatur((actus) => (actus.perfectum = 'voluisse'))
              .struatur)
    const malle: TabulaCollata<Actus> = new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'mālle'),
        new TabulaRescripta<Actus>(velle,
          (scriptum: string) => scriptum.replace('ve', 'mā')))
    const meminisse: TabulaCollata<Actus> = new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'meminisse'),
        new Structor(TabulamenActus)
              .ponatur((actus) => (actus.scriptura = 'modus ! participium & tempus < perfectum: dele; modus = participium & tempus ! praesens; dele; tempus = perfectum: pone(tempus: praesens); tempus = plusquamperfectum: pone(tempus: infectum); tempus = exigendum: pone(tempus: futurum)'))
              .ponatur((actus) => (actus.principium = 'tertia'))
              .ponatur((actus) => (actus.perfectum = 'meminisse'))
              .struatur)
    const abdare: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('ab', dare)
    const abesse: TabulaRescripta<Actus> = new TabulaRescripta<Actus>(esse,
        (scriptum: string) => `${scriptum.startsWith('f') ? 'ā' : 'ab'}${scriptum}`)
    const abire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('ab', ire)
    const afferre: TabulaRescripta<Actus> = new TabulaRescripta<Actus>(ferre,
        (scriptum: string) => `a${scriptum[0]}${scriptum}`)
    const auferre: TabulaRescripta<Actus> = new TabulaRescripta<Actus>(ferre,
        (scriptum: string) => {
          switch(scriptum[0]) {
            case 'f': return `au${scriptum}`
            case 'l': return `abs${scriptum}`
            case 't': return `ab${scriptum}`
            default: return ''
          }
        })
    const nolle: TabulaCollata<Actus> = new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'nōlle'),
        new TabulaRescripta<Actus>(velle,
          (scriptum: string) => {
            switch(scriptum) {
              case 'vīs':
              case 'vult':
              case 'vultis':
                return ''
              default:
                return scriptum.replace('ve', 'nō')
            }
          }))
    const coire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('co', ire)
    const collabefieri: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('collabe', fieri)
    const confieri: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('cōn', fieri)
    const conferre: TabulaRescripta<Actus> = new TabulaRescripta<Actus>(ferre,
        (scriptum: string) => {
                        switch(scriptum[0]) {
                          case 'f': return `cōn${scriptum}`
                          case 't': return `con${scriptum}`
                          case 'l': return `col${scriptum}`
                          default: return scriptum
                        }
                      })
    const dedare: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('dē', dare)
    const deesse: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('dē', esse)
    const deferre: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('dē', ferre)
    const defieri: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('dē', fieri)
    const deire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('de', ire)
    const differre: TabulaRescripta<Actus> = new TabulaRescripta<Actus>(ferre,
        (scriptum: string) => {
          switch(scriptum[0]) {
            case 'f': return `dif${scriptum}`
            case 't': return `dis${scriptum}`
            case 'l': return `dī${scriptum}`
            default: return scriptum
          }
        })
    const disperire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('disper', ire)
    const didare: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('dī', dare)
    const efferre: TabulaRescripta<Actus> = new TabulaRescripta<Actus>(ferre,
        (scriptum: string) => {
          switch(scriptum[0]) {
            case 'f': return `ef${scriptum}`
            case 't': return `ex${scriptum}`
            case 'l': return `ē${scriptum}`
            default: return scriptum
          }
        })
    const exire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('ex', ire)
    const inesse: TabulaRescripta<Actus> = new TabulaRescripta<Actus>(esse,
        (scriptum: string) => `${(scriptum.startsWith('e') ? 'in' : 'īn')}${scriptum}`)
    const inferre: TabulaRescripta<Actus> = new TabulaRescripta<Actus>(ferre,
        (scriptum: string) => {
          switch(scriptum[0]) {
            case 'f': return `īn${scriptum}`
            case 't': return `in${scriptum}`
            case 'l': return `il${scriptum}`
            default: return scriptum
          }
        })
    const interesse: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('inter', esse)
    const interferre: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('inter', ferre)
    const introferre: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('intrō', ferre)
    const inire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('in', ire)
    const interire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('inter', ire)
    const introire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('intro', ire)
    const nequire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('nequ', ire)
    const obesse: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('ob', esse)
    const obire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('ob', ire)
    const obsolefieri: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('obsole', fieri)
    const offerre: TabulaRescripta<Actus> = new TabulaRescripta<Actus>(ferre,
        (scriptum: string): string => `${scriptum.startsWith('f') ? 'of' : 'ob'}${scriptum}`)
    const perferre: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('per', ferre)
    const pervelle: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('per', velle)
    const posse: TabulaRescripta<Actus> = new TabulaRescripta<Actus>(esse,
        (scriptum: string) => {
          switch(true) {
            case scriptum === 'esse': return 'posse'
            case scriptum === 'estō': return ''
            case scriptum.startsWith('s'): return `pos${scriptum}`
            case scriptum.startsWith('e'): return `pot${scriptum}`
            case scriptum.startsWith('f'): return `pot${scriptum.substring(1)}`
            default: return ''
          }
        })
    const postferre: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('post', ferre)
    const praeesse: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('prae', esse)
    const praeterferre: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('praeter', ferre)
    const prodesse: TabulaRescripta<Actus> = new TabulaRescripta<Actus>(esse,
        (scriptum: string) => `${scriptum.startsWith('e') ? 'prō' : 'prōd'}${scriptum}`)
    const prodire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('prōd', ire)
    const proferre: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('prō', ferre)
    const quire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('qu', ire)
    const redire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('red', ire)
    const referre: TabulaRescripta<Actus> = new TabulaRescripta<Actus>(esse,
        (scriptum: string) => `${scriptum.startsWith('t') ? 'ret' : 're'}${scriptum}`)
    const subesse: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('sub', esse)
    const subire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('sub', ire)
    const sufferre: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('suf', ferre)
    const superesse: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('super', esse)
    const suffieri: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('suf', fieri)
    const superfieri: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('super', fieri)
    const transabire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('trānsab', ire)
    const transire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('trāns', ire)
    const venire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('vēn', ire)
    const venireRectum: TabulamenActus = new Structor(TabulamenActus)
            .ponatur((actus) => (actus.principium = 'quartus'))
            .ponatur((actus) => (actus.scriptura = 'modus ! participium & tempus >= perfectum & persona ! tertia: dele; modus ! participium & tempus >= perfectum & numers ! singularis: dele'))
            .ponatur((actus) => (actus.praesens = 'venīre'))
            .ponatur((actus) => (actus.perfectum = 'vēnīsse'))
            .ponatur((actus) => (actus.supinum = 'ventum'))
            .struatur
    const facereFalsum: TabulaRescripta<Actus> = new TabulaRescripta<Actus>(facere,
        (scriptum: string) => scriptum === 'fac' ? 'face' : scriptum)
    const arefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('āre', facereFalsum)
    const arfacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('ār', facereFalsum)
    const benefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('bene', facereFalsum)
    const calfacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('cal', facereFalsum)
    const calefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('cale', facereFalsum)
    const commonefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('commone', facereFalsum)
    const condocfacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('condoce', facereFalsum)
    const consuefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('cōnsuē', facereFalsum)
    const expergefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('expergē', facereFalsum)
    const fervefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('fervē', facereFalsum)
    const infervefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('inverve', facereFalsum)
    const labefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('labe', facereFalsum)
    const liquifacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('liqui', facereFalsum)
    const madefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('made', facereFalsum)
    const malefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('male', facereFalsum)
    const mollifacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('molli', facereFalsum)
    const multifacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('multi', facereFalsum)
    const mansuefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('mansuē', facereFalsum)
    const olfacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('ol', facereFalsum)
    const patefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('pate', facereFalsum)
    const pavefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('pave', facereFalsum)
    const putrefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('putre', facereFalsum)
    const satisfacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('satis', facereFalsum)
    const stupefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('stupe', facereFalsum)
    const tepefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('tepe', facereFalsum)
    const tremefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('treme', facereFalsum)
    const tumefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('tume', facereFalsum)
    const vacuefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('vacuē', facereFalsum)
    const incalfacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('incal', facereFalsum)
    const percalfacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('percal', facereFalsum)
    const recalfacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('recal', facereFalsum)
    const permadefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('permade', facereFalsum)
    const subolfacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('subol', facereFalsum)
    const confervefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('conferve', facereFalsum)
    const defervefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('dēferve', facereFalsum)
    const obstupefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('obstupe', facereFalsum)
    const rarefacere: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('rāre', facereFalsum)
    const advenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('ad', venireRectum)
    const adinvenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('adin', venireRectum)
    const antevenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('ante', venireRectum)
    const circumvenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('circum', venireRectum)
    const convenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('con', venireRectum)
    const contravenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('contrā', venireRectum)
    const disconvenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('discon', venireRectum)
    const devenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('dē', venireRectum)
    const evenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('ē', venireRectum)
    const invenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('in', venireRectum)
    const intervenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('inter', venireRectum)
    const obvenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('ob', venireRectum)
    const pervenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('per', venireRectum)
    const praevenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('prae', venireRectum)
    const provenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('prō', venireRectum)
    const subvenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('sub', venireRectum)
    const supervenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('super', venireRectum)
    const transvenire: TabulaPraefixa<Actus> = new TabulaPraefixa<Actus>('trāns', venireRectum)

    this.contenta.set('abdare', new Mantela(abdare))
    this.contenta.set('abesse', new Mantela(abesse))
    this.contenta.set('advenīre', new Mantela(advenire))
    this.contenta.set('adinvenīre', new Mantela(adinvenire))
    this.contenta.set('afferre', new Mantela(afferre))
    this.contenta.set('antevenīre', new Mantela(antevenire))
    this.contenta.set('ārefacere', new Mantela(arefacere))
    this.contenta.set('ārfacere', new Mantela(arfacere))
    this.contenta.set('auferre', new Mantela(auferre))
    this.contenta.set('abīre', new Mantela(abire))
    this.contenta.set('aiere', new Mantela(aiere))
    this.contenta.set('benefacere', new Mantela(benefacere))
    this.contenta.set('calfacere', new Mantela(calfacere))
    this.contenta.set('calefacere', new Mantela(calefacere))
    this.contenta.set('circumvenīre', new Mantela(circumvenire))
    this.contenta.set('coesse', new Mantela(coesse))
    this.contenta.set('coīre', new Mantela(coire))
    this.contenta.set('collabefierī', new Mantela(collabefieri))
    this.contenta.set('commonefacere', new Mantela(commonefacere))
    this.contenta.set('condocefacere', new Mantela(condocfacere))
    this.contenta.set('confervēfacere', new Mantela(confervefacere))
    this.contenta.set('cōnsuēfacere', new Mantela(consuefacere))
    this.contenta.set('conferre', new Mantela(conferre))
    this.contenta.set('cōnfierī', new Mantela(confieri))
    this.contenta.set('convenīre', new Mantela(convenire))
    this.contenta.set('contrāvenīre', new Mantela(contravenire))
    this.contenta.set('dare', new Mantela(dare))
    this.contenta.set('dēdare', new Mantela(dedare))
    this.contenta.set('dēferre', new Mantela(deferre))
    this.contenta.set('dēfervēfacere', new Mantela(defervefacere))
    this.contenta.set('dēfierī', new Mantela(defieri))
    this.contenta.set('dēesse', new Mantela(deesse))
    this.contenta.set('dēīre', new Mantela(deire))
    this.contenta.set('dēvenīre', new Mantela(devenire))
    this.contenta.set('dīdare', new Mantela(didare))
    this.contenta.set('differre', new Mantela(differre))
    this.contenta.set('disconvenīre', new Mantela(disconvenire))
    this.contenta.set('disperīre', new Mantela(disperire))
    this.contenta.set('diferre', new Mantela(differre))
    this.contenta.set('efferre', new Mantela(efferre))
    this.contenta.set('esse', new Mantela(esse))
    this.contenta.set('ēvenīre', new Mantela(evenire))
    this.contenta.set('expergēfacere', new Mantela(expergefacere))
    this.contenta.set('exīre', new Mantela(exire))
    this.contenta.set('facere', new Mantela(facere))
    this.contenta.set('ferre', new Mantela(ferre))
    this.contenta.set('fervēfacere', new Mantela(fervefacere))
    this.contenta.set('fierī', new Mantela(fieri))
    this.contenta.set('incalfacere', new Mantela(incalfacere))
    this.contenta.set('infervefacere', new Mantela(infervefacere))
    this.contenta.set('īnfierī', new Mantela(infieri))
    this.contenta.set('inquiī', new Mantela(inquii))
    this.contenta.set('interesse', new Mantela(interesse))
    this.contenta.set('interferre', new Mantela(interferre))
    this.contenta.set('intrōferre', new Mantela(introferre))
    this.contenta.set('īnesse', new Mantela(inesse))
    this.contenta.set('īnferre', new Mantela(inferre))
    this.contenta.set('inīre', new Mantela(inire))
    this.contenta.set('interīre', new Mantela(interire))
    this.contenta.set('introīre', new Mantela(introire))
    this.contenta.set('invenīre', new Mantela(invenire))
    this.contenta.set('intervenīre', new Mantela(intervenire))
    this.contenta.set('īre', new Mantela(ire))
    this.contenta.set('labefacere', new Mantela(labefacere))
    this.contenta.set('liquifacere', new Mantela(liquifacere))
    this.contenta.set('madefacere', new Mantela(madefacere))
    this.contenta.set('malefacere', new Mantela(malefacere))
    this.contenta.set('mālle', new Mantela(malle))
    this.contenta.set('mānsuēfacere', new Mantela(mansuefacere))
    this.contenta.set('meminisse', new Mantela(meminisse))
    this.contenta.set('mollifacere', new Mantela(mollifacere))
    this.contenta.set('multifacere', new Mantela(multifacere))
    this.contenta.set('nōlle', new Mantela(nolle))
    this.contenta.set('nequīre', new Mantela(nequire))
    this.contenta.set('obesse', new Mantela(obesse))
    this.contenta.set('obīre', new Mantela(obire))
    this.contenta.set('obstupefacere', new Mantela(obstupefacere))
    this.contenta.set('obvenīre', new Mantela(obvenire))
    this.contenta.set('offerre', new Mantela(offerre))
    this.contenta.set('olfacere', new Mantela(olfacere))
    this.contenta.set('obsolefierī', new Mantela(obsolefieri))
    this.contenta.set('patefacere', new Mantela(patefacere))
    this.contenta.set('pavefacere', new Mantela(pavefacere))
    this.contenta.set('percalfacere', new Mantela(percalfacere))
    this.contenta.set('perferre', new Mantela(perferre))
    this.contenta.set('perīre', new Mantela(perire))
    this.contenta.set('permadefacere', new Mantela(permadefacere))
    this.contenta.set('pervelle', new Mantela(pervelle))
    this.contenta.set('pervenīre', new Mantela(pervenire))
    this.contenta.set('posse', new Mantela(posse))
    this.contenta.set('postferre', new Mantela(postferre))
    this.contenta.set('praeesse', new Mantela(praeesse))
    this.contenta.set('praeterferre', new Mantela(praeterferre))
    this.contenta.set('praevenīre', new Mantela(praevenire))
    this.contenta.set('prōdesse', new Mantela(prodesse))
    this.contenta.set('prōferre', new Mantela(proferre))
    this.contenta.set('prōdīre', new Mantela(prodire))
    this.contenta.set('prōvenīre', new Mantela(provenire))
    this.contenta.set('putrefacere', new Mantela(putrefacere))
    this.contenta.set('quīre', new Mantela(quire))
    this.contenta.set('rārefacere', new Mantela(rarefacere))
    this.contenta.set('redīre', new Mantela(redire))
    this.contenta.set('referre', new Mantela(referre))
    this.contenta.set('recalfacere', new Mantela(recalfacere))
    this.contenta.set('satisfacere', new Mantela(satisfacere))
    this.contenta.set('stupefacere', new Mantela(stupefacere))
    this.contenta.set('subesse', new Mantela(subesse))
    this.contenta.set('subīre', new Mantela(subire))
    this.contenta.set('subolfacere', new Mantela(subolfacere))
    this.contenta.set('subvenīre', new Mantela(subvenire))
    this.contenta.set('sufferre', new Mantela(sufferre))
    this.contenta.set('suffierī', new Mantela(suffieri))
    this.contenta.set('superesse', new Mantela(superesse))
    this.contenta.set('superfierī', new Mantela(superfieri))
    this.contenta.set('supervenīre', new Mantela(supervenire))
    this.contenta.set('tepefacere', new Mantela(tepefacere))
    this.contenta.set('trānsabīre', new Mantela(transabire))
    this.contenta.set('trānsīre', new Mantela(transire))
    this.contenta.set('trānsvenīre', new Mantela(transvenire))
    this.contenta.set('tremefacere', new Mantela(tremefacere))
    this.contenta.set('tumefacere', new Mantela(tumefacere))
    this.contenta.set('vacuēfacere', new Mantela(vacuefacere))
    this.contenta.set('velle', new Mantela(velle))
    this.contenta.set('vēnīre', new Mantela(venire))
    this.contenta.set('venīre', new Mantela(venireRectum.tabula))
  }
}

export const actus: ActusAnomali = new ActusAnomali
