import { LectorMultiplex } from '@/miscella/lector';
import Nuntius from '@/miscella/nuntius';
import { Ignavum, Ultimum } from '@/miscella/usus';
import {
  Tabulamen,
  TabulamenActus,
  TabulamenIncomparabilis,
  TabulamenNominis
  } from '@/praebeunda/tabulamina';
import { errator } from '@/praebeunda/valores';
import {
  Actus,
  Adiectivum,
  Multiplex,
  Nomen,
  Pronomen
  } from '@/praebeunda/verba';
import TabulaCircumfixa, { Circumfigendum } from '@/tabulae/circumfixa';
import TabulaCollata, { Colligendum } from '@/tabulae/collata';
import TabulaConiuncta, { Coniungendum } from '@/tabulae/coniuncta';
import TabulaFissa, { Findendum } from '@/tabulae/fissa';
import TabulaPraefixa, { Praefigendum } from '@/tabulae/praefixa';
import TabulaRescripta from '@/tabulae/rescripta';
import TabulaSuffixa, { Suffigendum } from '@/tabulae/suffixa';
import { Tabula, tabulast, tabulatorst } from '@/tabulae/tabula';
import i18next from 'i18next';
import path from 'path';
import TabulaIrregula from '../tabulae/irregula';
import {
  LATIBILE,
  type Lectum,
  LEGIBILE,
  Tabulator
  } from '@/praebeunda/interfecta';

export enum Classis {
  Bifissa = 'bifissa',
  Circumfixa = 'circumfixa',
  Collata = 'collata',
  Coniuncta = 'coniuncta',
  Irregula = 'irregula',
  Fissa = 'fissa',
  Praefixa = 'praefixa',
  Rescripta = 'rescripta',
  Suffixa = 'suffixa',
  Tabulamen = 'tabulamen'
}

export class Crudum implements Lectum {
  readonly [ LEGIBILE ] = true as const
  readonly nomen!: string
  readonly classis!: Classis
}

type Tabulendum<Hoc extends Multiplex> = Tabula<Hoc> | Tabulator<Hoc> | undefined

@Ignavum @Ultimum @Nuntius.factum
export class Mantela<Hoc extends Multiplex> implements Tabulator<Hoc> {
  readonly [ LATIBILE ] = true as const
  constructor (private readonly _tabula: Tabula<Hoc>) { }
  get tabula (): Tabula<Hoc> { return this._tabula }
}

@Ignavum @Ultimum @Nuntius.factum class Anomala<Hoc extends Multiplex> {
  static erratorAnomali: (via: string, nomen: string) => Error =
      (via, nomen) => new Error(`Legere defectu'st res @res/${via}/${nomen}.csv`)

  protected readonly contenta: Record<string, Tabulator<Hoc>> = {}

  get categoria(): string
  { return i18next.t(`partes.${this._huius.name.lowercase}_singulare`, { lng: 'la' }) }

  get omnia (): string[] { return Object.keys(this._omnia) }

  @Nuntius.promittum async feratur(nomen: string): Promise<Tabulator<Hoc> | undefined> {
    if(Object.keys(this.contenta).length === 0)
      await this.onerentur()
    return  this.contenta[nomen]
  }

  @Nuntius.promittum protected async oneretur (nomen: string, classis: Classis): Promise<Tabulendum<Hoc>> {
    if(this.contenta[nomen] !== undefined) return this.contenta[nomen]
    const via: string = path.join('tabulae/${classis}e', this.categoria)
    switch(classis) {
      case Classis.Circumfixa: {
        const crudum =
            (await new LectorMultiplex<Circumfigendum>(via, Circumfigendum).legatur(nomen)).unum
        if(crudum === undefined) throw Anomala.erratorAnomali(via, nomen)
        const relatum: Tabulendum<Hoc> = await this.oneretur(crudum.relatum, crudum.relati)
        if(relatum === undefined) throw Anomala.erratorAnomali(via, nomen)
        return new TabulaCircumfixa(crudum.praefixum, relatum, crudum.suffixum)
      }
      case Classis.Collata: {
        const cruda =
            (await new LectorMultiplex<Colligendum>(via, Colligendum).legatur(nomen)).multa
        if(cruda.empty) throw Anomala.erratorAnomali(via, nomen)
        const relata: (Tabula<Hoc> | Tabulator<Hoc>)[] = []
        cruda.forEach(async (crudum) => {
          const relatum: Tabulendum<Hoc> = await this.oneretur(crudum.relatum, crudum.relati)
          if(relatum !== undefined) relata.push(relatum)
        }); return new TabulaCollata(...relata)
      }
      case Classis.Coniuncta: {
        const crudum =
            (await new LectorMultiplex<Coniungendum>(via, Coniungendum).legatur(nomen)).unum
        if(crudum === undefined) throw Anomala.erratorAnomali(via, nomen)
        const primum   = await this.oneretur(crudum.primum, crudum.primi)
        const secundum = await this.oneretur(crudum.secundum, crudum.secundi)
        if(primum === undefined || secundum === undefined)
          throw Anomala.erratorAnomali(via, nomen)
        return new TabulaConiuncta(primum, secundum)
      }
      case Classis.Fissa: {
        const crudum =
            (await new LectorMultiplex<Findendum>(via, Findendum).legatur(nomen)).unum
        if(crudum === undefined) throw Anomala.erratorAnomali(via, nomen)
        const relatum = await this.oneretur(crudum.relatum, crudum.relati)
        if(relatum === undefined) throw Anomala.erratorAnomali(via, nomen)
        return new TabulaFissa(relatum, crudum.scriptura)
      }
      case Classis.Praefixa: {
        const crudum =
            (await new LectorMultiplex<Praefigendum>(via, Praefigendum).legatur(nomen)).unum
        if(crudum === undefined) throw Anomala.erratorAnomali(via, nomen)
        const relatum = await this.oneretur(crudum.relatum, crudum.relati)
        if(relatum === undefined) throw Anomala.erratorAnomali(via, nomen)
        return new TabulaPraefixa(crudum.praefixum, relatum)
      }
      case Classis.Rescripta: {
        const crudum =
            (await new LectorMultiplex<Findendum>(via, Findendum).legatur(nomen)).unum
        if(crudum === undefined) throw Anomala.erratorAnomali(via, nomen)
        const relatum = await this.oneretur(crudum.relatum, crudum.relati)
        if(relatum === undefined) throw Anomala.erratorAnomali(via, nomen)
        return new TabulaRescripta(relatum,
            new Function('scriptum', crudum.scriptura) as (scriptum: string) => string)
      }
      case Classis.Suffixa: {
        const crudum =
            (await new LectorMultiplex<Suffigendum>(via, Suffigendum).legatur(nomen)).unum
        if(crudum === undefined) throw Anomala.erratorAnomali(via, nomen)
        const relatum = await this.oneretur(crudum.relatum, crudum.relati)
        if(relatum === undefined) throw Anomala.erratorAnomali(via, nomen)
        return new TabulaSuffixa(relatum, crudum.suffixum)
      }
      default: return new TabulaIrregula(this._huius, nomen)
    }
  }

  @Nuntius.promittum async onerentur() {
    (Object.entries(this._omnia) as [string, Classis][])
           .forEach(async ([nomen, classis]: [string, Classis]) => {
      const tabulendum = await this.oneretur(nomen, classis)
      if(tabulendum === undefined) throw errator({ nomen: nomen })
      if(tabulatorst(tabulendum)) this.contenta[nomen] = tabulendum
      if(tabulast(tabulendum)) this.contenta[nomen] = new Mantela(tabulendum)
    })
  }

  constructor(protected readonly _huius: new () => Hoc,
              protected readonly _omnia: Record<string, Classis>)
  { this.onerentur() }
}

class AnomalaMultiplex<Hoc extends Multiplex, Illud extends Tabulamen<Hoc>> extends Anomala<Hoc> {
  @Nuntius.promittum override async oneretur (nomen: string, classis: Classis): Promise<Tabulendum<Hoc>> {
    switch(classis) {
      case Classis.Tabulamen: {
        const via: string = path.join('tabulae/tabulamina', this.categoria)
        if(this._illius === undefined) throw Anomala.erratorAnomali(via, nomen)
        return (await new LectorMultiplex<Illud>(via, this._illius).legatur(nomen)).unum
      }
      default:
        return super.oneretur(nomen, classis)
    }
  }

  constructor(_huius: new () => Hoc,
              protected readonly _illius: new () => Illud,
              _omnia: Record<string, Classis>) { super(_huius, _omnia) }
}

export const actus: AnomalaMultiplex<Actus, TabulamenActus> =
                new AnomalaMultiplex(Actus, TabulamenActus, {
  aiere: Classis.Irregula,
  esse: Classis.Irregula,
  facere: Classis.Collata,
  fierī: Classis.Irregula,
  inquiī: Classis.Irregula,
  coesse: Classis.Rescripta,
  dare: Classis.Collata,
  ferre: Classis.Collata,
  īre: Classis.Collata,
  velle: Classis.Collata,
  meminisse: Classis.Collata,
  mālle: Classis.Collata,
  nōlle: Classis.Collata,
  abdare: Classis.Praefixa,
  abesse: Classis.Rescripta,
  abīre: Classis.Praefixa,
  afferre: Classis.Rescripta,
  ārefacere: Classis.Praefixa,
  ārfacere: Classis.Praefixa,
  auferre: Classis.Rescripta,
  benefacere: Classis.Praefixa,
  calfacere: Classis.Praefixa,
  calefacere: Classis.Praefixa,
  coīre: Classis.Praefixa,
  collabefierī: Classis.Praefixa,
  commonefacere: Classis.Praefixa,
  condocefacere: Classis.Praefixa,
  confervefacere: Classis.Praefixa,
  cōnfierī: Classis.Praefixa,
  conferre: Classis.Rescripta,
  cōnsuēfacere: Classis.Praefixa,
  dēdare: Classis.Praefixa,
  dēfervefacere: Classis.Praefixa,
  dēesse: Classis.Praefixa,
  dēferre: Classis.Praefixa,
  dēfierī: Classis.Praefixa,
  deīre: Classis.Praefixa,
  differre: Classis.Rescripta,
  disperīre: Classis.Praefixa,
  dīdare: Classis.Praefixa,
  efferre: Classis.Rescripta,
  exīre: Classis.Praefixa,
  expergēfacere: Classis.Praefixa,
  fervēfacere: Classis.Praefixa,
  incalfacere: Classis.Praefixa,
  infervefacere: Classis.Praefixa,
  inesse: Classis.Rescripta,
  īnferre: Classis.Rescripta,
  īnfierī: Classis.Fissa,
  interesse: Classis.Praefixa,
  interferre: Classis.Praefixa,
  intrōferre: Classis.Praefixa,
  inīre: Classis.Praefixa,
  interīre: Classis.Praefixa,
  introīre: Classis.Praefixa,
  labefacere: Classis.Praefixa,
  liquifacere: Classis.Praefixa,
  madefacere: Classis.Praefixa,
  malefacere: Classis.Praefixa,
  mollifacere: Classis.Praefixa,
  multifacere: Classis.Praefixa,
  mansuēfacere: Classis.Praefixa,
  nequīre: Classis.Praefixa,
  obesse: Classis.Praefixa,
  obīre: Classis.Praefixa,
  obsolefierī: Classis.Praefixa,
  obstupefacere: Classis.Praefixa,
  offerre: Classis.Praefixa,
  olfacere: Classis.Praefixa,
  patefacere: Classis.Praefixa,
  pavefacere: Classis.Praefixa,
  percalfacere: Classis.Praefixa,
  perferre: Classis.Praefixa,
  perīre: Classis.Fissa,
  permadefacere: Classis.Praefixa,
  pervelle: Classis.Praefixa,
  posse: Classis.Rescripta,
  postferre: Classis.Praefixa,
  praeesse: Classis.Praefixa,
  praeterferre: Classis.Praefixa,
  praeterīre: Classis.Praefixa,
  prōdesse: Classis.Rescripta,
  prōdīre: Classis.Praefixa,
  prōferre: Classis.Praefixa,
  putrefacere: Classis.Praefixa,
  qudīre: Classis.Praefixa,
  rārefacere: Classis.Praefixa,
  recalfacere: Classis.Praefixa,
  redīre: Classis.Praefixa,
  referre: Classis.Rescripta,
  satisfacere: Classis.Praefixa,
  stupefacere: Classis.Praefixa,
  subesse: Classis.Praefixa,
  subīre: Classis.Praefixa,
  subolfacere: Classis.Praefixa,
  sufferre: Classis.Praefixa,
  suffierī: Classis.Praefixa,
  tepefacere: Classis.Praefixa,
  trānsabīre: Classis.Praefixa,
  trānsīre: Classis.Praefixa,
  tremefacere: Classis.Praefixa,
  tupefacere: Classis.Praefixa,
  vacuēfacere: Classis.Praefixa,
  vēnīre: Classis.Praefixa,
})

export const adiectiva: AnomalaMultiplex<Adiectivum, TabulamenIncomparabilis> =
                    new AnomalaMultiplex(Adiectivum, TabulamenIncomparabilis, {
  decimum: Classis.Tabulamen,
  utrum: Classis.Tabulamen,
  aliud: Classis.Collata,
  ambō: Classis.Collata,
  duō: Classis.Rescripta,
  meum: Classis.Collata,
  mīlle: Classis.Collata,
  nōnum: Classis.Tabulamen,
  nōnumdecimum: Classis.Coniuncta,
  octāvum: Classis.Tabulamen,
  octāvumdecimum: Classis.Coniuncta,
  quārtum: Classis.Tabulamen,
  quārtumdecimum: Classis.Coniuncta,
  quīntum: Classis.Tabulamen,
  quīntumdecimum: Classis.Coniuncta,
  septimum: Classis.Tabulamen,
  septimumdecimum: Classis.Coniuncta,
  sextum: Classis.Tabulamen,
  sextumdecimum: Classis.Coniuncta,
  tertium: Classis.Tabulamen,
  tertiumdecimum: Classis.Coniuncta,
  utrumque: Classis.Suffixa,
  utrumcumque: Classis.Suffixa,
  utrumvīs: Classis.Suffixa,
  utrumvultis: Classis.Suffixa
})

export const nomina: AnomalaMultiplex<Nomen, TabulamenNominis> = new AnomalaMultiplex(Nomen, TabulamenNominis, {
  Athōs: Classis.Irregula,
  Iēsūs: Classis.Irregula,
  lexis: Classis.Irregula,
  vīs: Classis.Irregula,
  balneum: Classis.Bifissa,
  caelum: Classis.Bifissa,
  dea: Classis.Collata,
  domus: Classis.Collata,
  rēspūblica: Classis.Coniuncta,
  iūgerum: Classis.Collata,
  sēmidea: Classis.Praefixa
})

export const pronomina: Anomala<Pronomen> = new Anomala(Pronomen, {
  ego: Classis.Irregula,
  hoc: Classis.Irregula,
  id: Classis.Irregula,
  sē: Classis.Irregula,
  egomet: Classis.Suffixa,
  idem: Classis.Rescripta,
  ipsum: Classis.Collata,
  istud: Classis.Rescripta,
  quid: Classis.Rescripta,
  quod: Classis.Rescripta,
  tū: Classis.Collata,
  aliquid: Classis.Praefixa,
  aliquod: Classis.Praefixa,
  aliquodpiam: Classis.Circumfixa,
  ecquid: Classis.Praefixa,
  ecquod: Classis.Praefixa,
  quidnam: Classis.Suffixa,
  quidpiam: Classis.Suffixa,
  quiquam: Classis.Suffixa,
  quidque: Classis.Suffixa,
  quidquid: Classis.Rescripta,
  quodnam: Classis.Suffixa,
  quodpiam: Classis.Suffixa,
  sēmet: Classis.Suffixa,
  tūte: Classis.Rescripta,
  tūtemet: Classis.Suffixa,
  quodvīs: Classis.Suffixa,
  quidvīs: Classis.Rescripta,
  quodvultis: Classis.Rescripta,
  quidvultis: Classis.Rescripta
})
