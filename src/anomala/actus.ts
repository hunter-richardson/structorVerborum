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
  @Nuntius.captor get omnia(): Promise<string[]> {
    return new Promise(() => [
      'abdare', 'abesse', 'abīre', 'afferre', 'aiere', 'ārefacere', 'ārfacere', 'auferre', 'benefacere', 'calfacere', 'calefacere', 'coesse', 'coīre', 'collabefierī', 'commonefacere', 'condocefacere', 'confervēfacere', 'cōnsuēfacere', 'conferre', 'cōnfierī', 'dēdare', 'dēferre', 'dēfervēfacere', 'dēfervēfierī', 'dēesse', 'dēīre', 'dīdare', 'diferre', 'efferre', 'esse', 'expergēfacere', 'exīre', 'facere', 'ferre', 'fervēfacere', 'fierī', 'incalfacere', 'infervefacere', 'īnfierī', 'īnquiī', 'interesse', 'intrōferre', 'īnesse', 'īnferre', 'īnīre', 'interīre', 'introīre', 'īre', 'madefacere', 'malefacere', 'mālle', 'mānsuēfacere', 'meminisse', 'mollifacere', 'multifacere', 'nōlle', 'nequīre', 'obesse', 'obstupefacere', 'offerre', 'olfacere', 'obsolefierī', 'patefacere', 'pavefacere', 'percalfacere', 'perferre', 'perīre', 'permadefacere', 'pervelle', 'posse', 'postferre', 'praeesse', 'praeterferre', 'praeterīre', 'prōdesse', 'prōferre', 'prōdīre', 'putrefacere', 'quīre', 'rārefacere', 'redīre', 'referre', 'recalfacere', 'satisfacere', 'stupefacere', 'subesse', 'subīre', 'subolfacere', 'sufferre', 'suffierī', 'superesse', 'superfierī', 'tepefacere', 'trānsabīre', 'trānsīre', 'tremefacere', 'vacuēfacere', 'velle', 'vēnīre'
    ].sort().unique())
  }

  @Nuntius.promittum
  protected override async numeretur(): Promise<void> {
    this.contenta['facere'] = new Mantela(new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'facere'),
        new Structor(TabulamenActus)
              .ponatur((actus) => (actus.principium = 'terta/varia/cumImperativoBrevi'))
              .ponatur((actus) => (actus.praesens = 'facere'))
              .ponatur((actus) => (actus.perfectum = 'fēcisse'))
              .ponatur((actus) => (actus.supinum = 'factum'))
              .struatur))
    const facereFalsum = new TabulaRescripta<Actus>(this.contenta['facere'],
        (scriptum: string) => scriptum === 'fac' ? 'face' : scriptum)

    this.contenta['aiere'] = new Mantela(new TabulaIrregula<Actus>(Actus, 'aiere'))
    this.contenta['esse'] = new Mantela(new TabulaIrregula<Actus>(Actus, 'esse'))
    this.contenta['fieri'] = new Mantela(new TabulaIrregula<Actus>(Actus, 'fierī'))
    this.contenta['infieri'] = new Mantela(new TabulaIrregula<Actus>(Actus, 'īnfierī'))
    this.contenta['inquii'] = new Mantela(new TabulaIrregula<Actus>(Actus, 'inquiī'))
    this.contenta['coesse'] = new Mantela(new TabulaFissa<Actus>(
        new TabulaRescripta<Actus>(this.contenta['esse'],
            (scriptum: string) => {
              switch(scriptum[0]) {
                case 'e': return `co${scriptum}`
                case 'f': return `cō${scriptum}`
                case 's': return `cōn${scriptum}`
                default: return ''
              }
            }
        ), 'persona = prima: dele; persona = secunda: dele; modus = participium & vox = passiva: dele; persona = tertia: pone(persona: nulla)'))
    this.contenta['dare'] = new Mantela(new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'dare'),
        new Structor(TabulamenActus)
              .ponatur((actus) => (actus.principium = 'prima'))
              .ponatur((actus) => (actus.praesens = 'dare'))
              .ponatur((actus) => (actus.perfectum = 'dedisse'))
              .ponatur((actus) => (actus.supinum = 'dātum'))
              .struatur))
    this.contenta['ferre'] = new Mantela(new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'ferre'),
        new Structor(TabulamenActus)
              .ponatur((actus) => (actus.principium = 'tertia/cumImperativoBrevi'))
              .ponatur((actus) => (actus.praesens = 'ferere'))
              .ponatur((actus) => (actus.perfectum = 'tulisse'))
              .ponatur((actus) => (actus.supinum = 'lātum'))
              .struatur))
    this.contenta['ire'] = new Mantela(new TabulaIrregula<Actus>(Actus, 'īre'))
    this.contenta['perire'] = new Mantela(new TabulaFissa<Actus>(
        new TabulaPraefixa<Actus>('per', this.contenta['ire']),
        'persona ! tertia & tempus < perfect: dele; persona = tertia & tempus < perfect: pone(persona: nulla)'))
    this.contenta['velle'] = new Mantela(new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'velle'),
        new Structor(TabulamenActus)
              .ponatur((actus) => (actus.principium = 'tertia'))
              .ponatur((actus) => (actus.scriptura = 'vox = passiva: dele'))
              .ponatur((actus) => (actus.praesens = 'volere'))
              .ponatur((actus) => (actus.perfectum = 'voluisse'))
              .struatur))
    this.contenta['malle'] = new Mantela(new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'mālle'),
        new TabulaRescripta<Actus>(this.contenta['velle'],
          (scriptum: string) => scriptum.replace('ve', 'mā'))))
    this.contenta['meminisse'] = new Mantela(new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'meminisse'),
        new Structor(TabulamenActus)
              .ponatur((actus) => (actus.scriptura = 'modus ! participium & tempus < perfectum: dele; modus = participium & tempus ! praesens; dele; tempus = perfectum: pone(tempus: praesens); tempus = plusquamperfectum: pone(tempus: infectum); tempus = exigendum: pone(tempus: futurum)'))
              .ponatur((actus) => (actus.principium = 'tertia'))
              .ponatur((actus) => (actus.perfectum = 'meminisse'))
              .struatur))
    this.contenta['abdare'] = new Mantela(new TabulaPraefixa<Actus>('ab', this.contenta['dare']))
    this.contenta['abesse'] = new Mantela(new TabulaRescripta<Actus>(this.contenta['esse'],
        (scriptum: string) => `${scriptum.startsWith('f') ? 'ā' : 'ab'}${scriptum}`))
    this.contenta['abire'] = new Mantela(new TabulaPraefixa<Actus>('ab', this.contenta['ire']))
    this.contenta['afferre'] = new Mantela(new TabulaRescripta<Actus>(this.contenta['ferre'],
        (scriptum: string) => `a${scriptum[0]}${scriptum}`))
    this.contenta['auferre'] = new Mantela(new TabulaRescripta<Actus>(this.contenta['ferre'],
        (scriptum: string) => {
          switch(scriptum[0]) {
            case 'f': return `au${scriptum}`
            case 'l': return `abs${scriptum}`
            case 't': return `ab${scriptum}`
            default: return ''
          }
        }))
    this.contenta['nolle'] = new Mantela(new TabulaCollata<Actus>(
        new TabulaIrregula<Actus>(Actus, 'nōlle'),
        new TabulaRescripta<Actus>(this.contenta['velle'],
          (scriptum: string) => {
            switch(scriptum) {
              case 'vīs':
              case 'vult':
              case 'vultis':
                return ''
              default:
                return scriptum.replace('ve', 'nō')
            }
          })))
    this.contenta['coire'] = new Mantela(new TabulaPraefixa<Actus>('co', this.contenta['ire']))
    this.contenta['collabefieri'] = new Mantela(new TabulaPraefixa<Actus>('collabe', this.contenta['fieri']))
    this.contenta['confieri'] = new Mantela(new TabulaPraefixa<Actus>('cōn', this.contenta['fieri']))
    this.contenta['conferre'] = new Mantela(new TabulaRescripta<Actus>(this.contenta['ferre'],
        (scriptum: string) => {
                        switch(scriptum[0]) {
                          case 'f': return `cōn${scriptum}`
                          case 't': return `con${scriptum}`
                          case 'l': return `col${scriptum}`
                          default: return scriptum
                        }
                      }))
    this.contenta['dedare'] = new Mantela(new TabulaPraefixa<Actus>('dē', this.contenta['dare']))
    this.contenta['deesse'] = new Mantela(new TabulaPraefixa<Actus>('dē', this.contenta['esse']))
    this.contenta['deferre'] = new Mantela(new TabulaPraefixa<Actus>('dē', this.contenta['ferre']))
    this.contenta['defieri'] = new Mantela(new TabulaPraefixa<Actus>('dē', this.contenta['fieri']))
    this.contenta['deire'] = new Mantela(new TabulaPraefixa<Actus>('de', this.contenta['ire']))
    this.contenta['differre'] = new Mantela(new TabulaRescripta<Actus>(this.contenta['ferre'],
        (scriptum: string) => {
          switch(scriptum[0]) {
            case 'f': return `dif${scriptum}`
            case 't': return `dis${scriptum}`
            case 'l': return `dī${scriptum}`
            default: return scriptum
          }
        }))
    this.contenta['disperire'] = new Mantela(new TabulaPraefixa<Actus>('disper', this.contenta['ire']))
    this.contenta['didare'] = new Mantela(new TabulaPraefixa<Actus>('dī', this.contenta['dare']))
    this.contenta['efferre'] = new Mantela(new TabulaRescripta<Actus>(this.contenta['ferre'],
        (scriptum: string) => {
          switch(scriptum[0]) {
            case 'f': return `ef${scriptum}`
            case 't': return `ex${scriptum}`
            case 'l': return `ē${scriptum}`
            default: return scriptum
          }
        }))
    this.contenta['exire'] = new Mantela(new TabulaPraefixa<Actus>('ex', this.contenta['ire']))
    this.contenta['inesse'] = new Mantela(new TabulaRescripta<Actus>(this.contenta['esse'],
        (scriptum: string) => `${(scriptum.startsWith('e') ? 'in' : 'īn')}${scriptum}`))
    this.contenta['inferre'] = new Mantela(new TabulaRescripta<Actus>(this.contenta['ferre'],
        (scriptum: string) => {
          switch(scriptum[0]) {
            case 'f': return `īn${scriptum}`
            case 't': return `in${scriptum}`
            case 'l': return `il${scriptum}`
            default: return scriptum
          }
        }))
    this.contenta['interesse'] = new Mantela(new TabulaPraefixa<Actus>('inter', this.contenta['esse']))
    this.contenta['interferre'] = new Mantela(new TabulaPraefixa<Actus>('inter', this.contenta['ferre']))
    this.contenta['introferre'] = new Mantela(new TabulaPraefixa<Actus>('intrō', this.contenta['ferre']))
    this.contenta['inire'] = new Mantela(new TabulaPraefixa<Actus>('in', this.contenta['ire']))
    this.contenta['interire'] = new Mantela(new TabulaPraefixa<Actus>('inter', this.contenta['ire']))
    this.contenta['introire'] = new Mantela(new TabulaPraefixa<Actus>('intro', this.contenta['ire']))
    this.contenta['nequire'] = new Mantela(new TabulaPraefixa<Actus>('nequ', this.contenta['ire']))
    this.contenta['obesse'] = new Mantela(new TabulaPraefixa<Actus>('ob', this.contenta['esse']))
    this.contenta['obire'] = new Mantela(new TabulaPraefixa<Actus>('ob', this.contenta['ire']))
    this.contenta['obsolefieri'] = new Mantela(new TabulaPraefixa<Actus>('obsole', this.contenta['fieri']))
    this.contenta['offerre'] = new Mantela(new TabulaRescripta<Actus>(this.contenta['ferre'],
        (scriptum: string): string => `${scriptum.startsWith('f') ? 'of' : 'ob'}${scriptum}`))
    this.contenta['perferre'] = new Mantela(new TabulaPraefixa<Actus>('per', this.contenta['ferre']))
    this.contenta['pervelle'] = new Mantela(new TabulaPraefixa<Actus>('per', this.contenta['velle']))
    this.contenta['posse'] = new Mantela(new TabulaRescripta<Actus>(this.contenta['esse'],
        (scriptum: string) => {
          switch(true) {
            case scriptum === 'esse': return 'posse'
            case scriptum === 'estō': return ''
            case scriptum.startsWith('s'): return `pos${scriptum}`
            case scriptum.startsWith('e'): return `pot${scriptum}`
            case scriptum.startsWith('f'): return `pot${scriptum.substring(1)}`
            default: return ''
          }
        }))
    this.contenta['postferre'] = new Mantela(new TabulaPraefixa<Actus>('post', this.contenta['ferre']))
    this.contenta['praeesse'] = new Mantela(new TabulaPraefixa<Actus>('prae', this.contenta['esse']))
    this.contenta['praeterferre'] = new Mantela(new TabulaPraefixa<Actus>('praeter', this.contenta['ferre']))
    this.contenta[ 'praeterire' ] = new Mantela(new TabulaPraefixa<Actus>('praeter', this.contenta[ 'ire' ]))
    this.contenta['prodesse'] = new Mantela(new TabulaRescripta<Actus>(this.contenta['esse'],
        (scriptum: string) => `${scriptum.startsWith('e') ? 'prō' : 'prōd'}${scriptum}`))
    this.contenta['prodire'] = new Mantela(new TabulaPraefixa<Actus>('prōd', this.contenta['ire']))
    this.contenta['proferre'] = new Mantela(new TabulaPraefixa<Actus>('prō', this.contenta['ferre']))
    this.contenta['quire'] = new Mantela(new TabulaPraefixa<Actus>('qu', this.contenta['ire']))
    this.contenta['redire'] = new Mantela(new TabulaPraefixa<Actus>('red', this.contenta['ire']))
    this.contenta['referre'] = new Mantela(new TabulaRescripta<Actus>(this.contenta['esse'],
        (scriptum: string) => `${scriptum.startsWith('t') ? 'ret' : 're'}${scriptum}`))
    this.contenta['subesse'] = new Mantela(new TabulaPraefixa<Actus>('sub', this.contenta['esse']))
    this.contenta['subire'] = new Mantela(new TabulaPraefixa<Actus>('sub', this.contenta['ire']))
    this.contenta['sufferre'] = new Mantela(new TabulaPraefixa<Actus>('suf', this.contenta['ferre']))
    this.contenta['superesse'] = new Mantela(new TabulaPraefixa<Actus>('super', this.contenta['esse']))
    this.contenta['suffieri'] = new Mantela(new TabulaPraefixa<Actus>('suf', this.contenta['fieri']))
    this.contenta['superfieri'] = new Mantela(new TabulaPraefixa<Actus>('super', this.contenta['fieri']))
    this.contenta['transabire'] = new Mantela(new TabulaPraefixa<Actus>('trānsab', this.contenta['ire']))
    this.contenta['transire'] = new Mantela(new TabulaPraefixa<Actus>('trāns', this.contenta['ire']))
    this.contenta['venire'] = new Mantela(new TabulaPraefixa<Actus>('vēn', this.contenta['ire']))
    this.contenta['arefacere'] = new Mantela(new TabulaPraefixa<Actus>('āre', facereFalsum))
    this.contenta['arfacere'] = new Mantela(new TabulaPraefixa<Actus>('ār', facereFalsum))
    this.contenta['benefacere'] = new Mantela(new TabulaPraefixa<Actus>('bene', facereFalsum))
    this.contenta['calfacere'] = new Mantela(new TabulaPraefixa<Actus>('cal', facereFalsum))
    this.contenta['calefacere'] = new Mantela(new TabulaPraefixa<Actus>('cale', facereFalsum))
    this.contenta['commonefacere'] = new Mantela(new TabulaPraefixa<Actus>('commone', facereFalsum))
    this.contenta['condocfacere'] = new Mantela(new TabulaPraefixa<Actus>('condoce', facereFalsum))
    this.contenta['consuefacere'] = new Mantela(new TabulaPraefixa<Actus>('cōnsuē', facereFalsum))
    this.contenta['expergefacere'] = new Mantela(new TabulaPraefixa<Actus>('expergē', facereFalsum))
    this.contenta['fervefacere'] = new Mantela(new TabulaPraefixa<Actus>('fervē', facereFalsum))
    this.contenta['infervefacere'] = new Mantela(new TabulaPraefixa<Actus>('inverve', facereFalsum))
    this.contenta['labefacere'] = new Mantela(new TabulaPraefixa<Actus>('labe', facereFalsum))
    this.contenta['liquifacere'] = new Mantela(new TabulaPraefixa<Actus>('liqui', facereFalsum))
    this.contenta['madefacere'] = new Mantela(new TabulaPraefixa<Actus>('made', facereFalsum))
    this.contenta['malefacere'] = new Mantela(new TabulaPraefixa<Actus>('male', facereFalsum))
    this.contenta['mollifacere'] = new Mantela(new TabulaPraefixa<Actus>('molli', facereFalsum))
    this.contenta['multifacere'] = new Mantela(new TabulaPraefixa<Actus>('multi', facereFalsum))
    this.contenta['mansuefacere'] = new Mantela(new TabulaPraefixa<Actus>('mansuē', facereFalsum))
    this.contenta['olfacere'] = new Mantela(new TabulaPraefixa<Actus>('ol', facereFalsum))
    this.contenta['patefacere'] = new Mantela(new TabulaPraefixa<Actus>('pate', facereFalsum))
    this.contenta['pavefacere'] = new Mantela(new TabulaPraefixa<Actus>('pave', facereFalsum))
    this.contenta['putrefacere'] = new Mantela(new TabulaPraefixa<Actus>('putre', facereFalsum))
    this.contenta['satisfacere'] = new Mantela(new TabulaPraefixa<Actus>('satis', facereFalsum))
    this.contenta['stupefacere'] = new Mantela(new TabulaPraefixa<Actus>('stupe', facereFalsum))
    this.contenta['tepefacere'] = new Mantela(new TabulaPraefixa<Actus>('tepe', facereFalsum))
    this.contenta['tremefacere'] = new Mantela(new TabulaPraefixa<Actus>('treme', facereFalsum))
    this.contenta['tumefacere'] = new Mantela(new TabulaPraefixa<Actus>('tume', facereFalsum))
    this.contenta['vacuefacere'] = new Mantela(new TabulaPraefixa<Actus>('vacuē', facereFalsum))
    this.contenta['incalfacere'] = new Mantela(new TabulaPraefixa<Actus>('incal', facereFalsum))
    this.contenta['percalfacere'] = new Mantela(new TabulaPraefixa<Actus>('percal', facereFalsum))
    this.contenta['recalfacere'] = new Mantela(new TabulaPraefixa<Actus>('recal', facereFalsum))
    this.contenta['permadefacere'] = new Mantela(new TabulaPraefixa<Actus>('permade', facereFalsum))
    this.contenta['subolfacere'] = new Mantela(new TabulaPraefixa<Actus>('subol', facereFalsum))
    this.contenta['confervefacere'] = new Mantela(new TabulaPraefixa<Actus>('conferve', facereFalsum))
    this.contenta['defervefacere'] = new Mantela(new TabulaPraefixa<Actus>('dēferve', facereFalsum))
    this.contenta['obstupefacere'] = new Mantela(new TabulaPraefixa<Actus>('obstupe', facereFalsum))
    this.contenta['rarefacere'] = new Mantela(new TabulaPraefixa<Actus>('rāre', facereFalsum))
  }
}

export const actus: ActusAnomali = new ActusAnomali
