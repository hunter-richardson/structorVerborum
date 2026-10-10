import { Mixin } from 'ts-mixer';
import {
  buildRegExp,
  choiceOf,
  endOfString,
  lookahead,
  startOfString
  } from 'ts-regex-builder';
import Structor from './structor';
import {
  TabulamenAdiectivi,
  TabulamenFacti,
  TabulamenNominis,
  TabulamenNumeraminis
  } from './tabulamina';
import '../extensions/array';
import '../extensions/string';
import { dominus } from '../miscella/dominus';
import { numeraminum } from '../miscella/lector';
import Numerator from '../miscella/numerator';
import Nuntius from '../miscella/nuntius';
import { Ultimum } from '../miscella/usus';
import { Tabula } from '../tabulae/tabula';
import { dictionarium, type Eventus } from '../miscella/dictionarium';
import {
  Casuale,
  Categoricum,
  Encliticum,
  Encliticus,
  errator,
  Factum,
  Fulta,
  Generale,
  Gradale,
  Modestum,
  Numeratum,
  Personale,
  Relaturum,
  Res,
  Temporale,
  Vocale,
  type Fultum,
  type Lineae,
  } from './valores';
import { comparison, type SortResult } from '../extensions/utils';
import type { Lectum, Tabulator } from './interfecta';

export type Agendum<Hoc extends Multiplex> = Lectum &
    Omit<Hoc, 'categoria' | 'unicum' | '_encliticus' | 'encliticus' | 'monstretur' | 'paratust'>

export const ordinentur: (primum: Verbum, secundum: Verbum) => SortResult =
      comparison([
        (hoc: Verbum) => hoc instanceof Multiplex ?
            hoc.valores.count((valor) => !/^(?:null(?:a|u[ms])|derectus)$/.test(valor.valor)) : 0,
        (hoc: Verbum) => hoc.scriptum,
        (hoc: Verbum) => hoc.categoria.valor ?? ''
      ])

export class Verbum extends Categoricum {
  readonly unicum: string = crypto.randomUUID()
  protected _scriptum!: string

  get scriptum(): string { return this._scriptum }

  set scriptum(valor: string) {
    if (valor = valor.trim()) this._scriptum = valor
    else throw errator({ scriptum: valor })
  }

  paratust(): boolean { return !!this.scriptum }

  monstretur(): string {
    let monstrandum: string = this.scriptum
    if(dominus.utendaU.signum) {
      const subsituendae = { U: 'V', u: 'v', Ū: 'V̄', ū: 'v̄' };
      if([...monstrandum].intersection(Object.keys(subsituendae)).any()) {
        Object.entries(subsituendae).forEach(([clavis, valor]: [string, string]) =>
            monstrandum = monstrandum.replace(clavis, valor))
      }
    }; if(dominus.apices.signum)
          monstrandum = monstrandum.removeMacra()
       if(dominus.magnas.signum)
          monstrandum = monstrandum.toUpperCase()
    return monstrandum
  }
}

class Praedicandum extends Verbum {
  constructor()
  { super(); this.categoria.valor = this.constructor.name.toLowerCase() }
}

@Ultimum export class Numerale extends Praedicandum {
  constructor(public readonly anglicus: number) {
    super()
    if (!Numerator.arabicusConvertibilis(anglicus))
      throw errator({ anglicus: anglicus.toString() })
  }

  override get scriptum(): string { return Numerator.romanus(this.anglicus) }

  static readonly numerator: (anglicus: number) => Numerale =
      (anglicus: number): Numerale => new Numerale(anglicus)

  async numeramen(): Promise<TabulamenNumeraminis | undefined>
  { return (await numeraminum.legatur(this.scriptum)).unum }
}

export abstract class Multiplex extends Mixin(Encliticum, Praedicandum) {
  static ordinentur(primum: Multiplex, secundum: Multiplex): SortResult {
    const deNullis = buildRegExp([
      startOfString,
      choiceOf('derectus', 'nullum', 'nullus', 'nulla'),
      endOfString ])
    return comparison([
      (hoc: Multiplex) =>
        hoc.valores.count((valor) =>
          !deNullis.test(valor.valor))
    ])(primum, secundum)
  }

  static componatur<Hoc extends Multiplex> (constructor: new () => Hoc, agendum: Agendum<Hoc>): Hoc {
    const structor: Structor<Hoc> = new Structor(constructor)
    structor.ponatur((hoc) =>
          hoc.valores.forEach((valor, numerus) =>
              valor.reponatur(agendum.valores[numerus])))
    structor.ponatur((hoc) => hoc.scriptum = agendum.scriptum)
    return structor.struatur
  }

  static colamina(categoria: string): string[] {
    switch (categoria) {
      case 'actus':
        return [ 'modus', 'vox', 'tempus', 'numerus', 'persona', 'scriptum' ]
      case 'adiectivum':
        return [ 'gradus', 'genus', 'numerus', 'casus', 'scriptum' ]
      case 'adverbium':
        return [ 'gradus', 'scriptum' ]
      case 'nomen':
        return [ 'factus', 'numerus', 'casus', 'scriptum' ]
      case 'numeramen':
        return [ 'referendus', 'scriptum' ]
      case 'pronomen':
        return [ 'genus', 'numerus', 'casus', 'scriptum' ]
      default:
        return [  ]
    }
  }

  protected _valores!: Fulta

  get valores(): Fulta {
    if(this._valores.length == 1) return this._valores
    else return this._valores.sort(Res.ordinentur)
  }

  get encliticus(): Encliticus { return this._encliticus }

  set encliticus (valor: Encliticus) {
    if(this._encliticus != Encliticus.nullus)
      this.scriptum = this.scriptum.slice(0, -this._encliticus.length)
    this._encliticus = valor
    if(this._encliticus != Encliticus.nullus)
      this.scriptum += this._encliticus
  }

  componatur(agendum: Agendum<Multiplex>) {
    if(!agendum.scriptum) throw errator({ scriptum: agendum.scriptum })
    this.scriptum = agendum.scriptum
    const fulta: Fulta = agendum.valores
    this.valores.forEach((valor: Fultum<Lineae>, numerus: number) =>
        valor.valor = fulta[numerus].valor)
  }
}

@Ultimum export class Actus extends Mixin(Modestum, Multiplex, Numeratum, Personale, Temporale, Vocale) {
  constructor() {
    super();
    this._valores = new Fulta(this.modus, this.vox, this.tempus, this.numerus, this.persona)
  }

  override paratust(): boolean
  { return !this.modus.aequatur('participium') && super.paratust() }

  async participialis(): Promise<TabulamenAdiectivi> {
    if (this.modus.aequatur('participium')) {
      if (this.tempus.aequatur('praesens')) {
        const structor: Structor<TabulamenAdiectivi> = new Structor(TabulamenAdiectivi)
          .ponatur((adiectivum) => (adiectivum.principium = 'generanda/cumTruncoVario'))
          .ponatur((adiectivum) => (adiectivum.positivus = this.scriptum))
        if (this.scriptum.slice(-3) === 'āre') {
          structor
            .ponatur((adiectivum) => (adiectivum.comparativus = this.scriptum.replace('āns$', 'antior')))
            .ponatur((adiectivum) => (adiectivum.superlativus = this.scriptum.replace('āns$', 'antissimum')))
        } else {
          structor
            .ponatur((adiectivum) => (adiectivum.comparativus = this.scriptum.replace('ēns$', 'entior')))
            .ponatur((adiectivum) => (adiectivum.superlativus = this.scriptum.replace('ēns$', 'entissimum')))
        }; return structor.struatur
      } else return new Structor(TabulamenAdiectivi)
                          .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
                          .ponatur((adiectivum) => (adiectivum.positivus = this.scriptum))
                          .ponatur((adiectivum) => (adiectivum.comparativus = this.scriptum.replace('um$', 'ius')))
                          .ponatur((adiectivum) => (adiectivum.comparativus = this.scriptum.replace('um$', 'issimum')))
                          .struatur
    } else throw errator({ modus: this.modus.valor })
  }
}

@Ultimum export class Adiectivum extends Mixin(Casuale, Gradale, Generale, Multiplex, Numeratum) {
  constructor () {
    super()
    this._valores = new Fulta(this.gradus, this.genus, this.numerus, this.casus)
  }
}

@Ultimum export class Adverbium extends Mixin(Gradale, Multiplex) {
  constructor() {
    super()
    this._valores = new Fulta(this.gradus)
  }
}

@Ultimum export class Nomen extends Mixin(Casuale, Factum, Multiplex, Numeratum) {
  constructor() {
    super()
    this._valores = new Fulta(this.factus, this.numerus, this.casus)
  }
}

@Ultimum export class Numeramen extends Mixin(Multiplex, Relaturum) {
  async refer(): Promise<Eventus | undefined> {
    let nova: '' | 'numerus' | 'adverbium' | 'adiectivum' = ''
    switch(this.relaturus.valor) {
      case 'numerus':
      case 'adverbium':
        nova = this.relaturus.valor; break
      default:
        nova = 'adiectivum'; break
    }; return await dictionarium.referatur({
      categoria: nova,
      scriptum: this.scriptum
    }) ?? undefined
  }

  constructor() {
    super()
    this._valores = new Fulta(this.relaturus)
  }
}

@Ultimum export class Pronomen extends Mixin(Casuale, Generale, Multiplex, Numeratum) {
  constructor () {
    super()
    this._valores = new Fulta(this.genus, this.numerus, this.casus)
  }
}

export abstract class TabulatorActuum implements Tabulator<Actus> {
  abstract get tabula(): Tabula<Actus>

  @Nuntius.promittum async actor(genus: 'masculinum' | 'femininum' | 'neutrum'): Promise<TabulamenNominis | undefined> {
    const actus: Actus[] = this.tabula.haec;
    const _supinus: Actus | undefined =
      actus.find((hoc) => [
        hoc.modus.aequatur('participium'),
        hoc.tempus.aequatur('perfectum'),
        hoc.vox.aequatur('passiva')
      ].all())
    const _infinitivus: Actus | undefined =
      actus.find((hoc) => [
        hoc.modus.aequatur('infinitivus'),
        hoc.tempus.aequatur('praesens'),
        hoc.vox.aequatur('activa')
      ].all())
    const optanda = {
      masculinum: {
        actus: _supinus,
        principium: 'animata',
        repositum: /um$/,
        nominativus: 'or',
        genitivus: 'ōris'
      }, femininum: {
        actus: _supinus,
        principium: 'animata',
        repositum: /t?um$/,
        nominativus: 'trīx',
        genitivus: 'trīcis'
      }, neutrum: {
        actus: _infinitivus,
        principium: 'neutra',
        repositum: /re$/,
        nominativus: 'āmen',
        genitivus: 'āminis'
      }
    }; if(optanda[genus].actus === undefined) return undefined
    const optandum = optanda[genus]
    return new Structor(TabulamenNominis)
                 .ponatur((nomen) => (nomen.principium = `tertia/${optandum.principium}`))
                 .ponatur((nomen) => (nomen.nominativus = optandum.actus?.scriptum.replace(optandum.repositum, optandum.nominativus) ?? ''))
                 .ponatur((nomen) => (nomen.genitivus = optandum.actus?.scriptum.replace(optandum.repositum, optandum.genitivus) ?? ''))
                 .struatur
    // switch(genus) {
    //   case 'masculinum':
    //     return structor.ponatur((nomen) => (nomen.principium = 'tertia/animata'))
    //                    .ponatur((nomen) => (nomen.nominativus = _supinus.scriptum.replace(/um$/, 'or')))
    //                    .ponatur((nomen) => (nomen.genitivus = _supinus.scriptum.replace(/um$/, 'ōris')))
    //                    .struatur
    //   case 'femininum':
    //     return structor.ponatur((nomen) => (nomen.principium = 'tertia/animata'))
    //                    .ponatur((nomen) => (nomen.nominativus = _supinus.scriptum.replace(/t?um$/, 'trīx')))
    //                    .ponatur((nomen) => (nomen.genitivus = _supinus.scriptum.replace(/t?um$/, 'trīcis')))
    //                    .struatur
    //   case 'neutrum':
    //     return structor.ponatur((nomen) => (nomen.principium = 'tertia/neutra'))
    //                    .ponatur((nomen) => (nomen.nominativus = _supinus.scriptum.replace(/um$/, 'āmen')))
    //                    .ponatur((nomen) => (nomen.genitivus = _supinus.scriptum.replace(/um$/, 'āminis')))
    //                    .struatur
    //   default: return undefined
    // }
  }

  @Nuntius.promittum async nomen(): Promise<TabulamenFacti> {
    const actus: Actus[] = this.tabula.haec
    const _infinitivus: Actus | undefined =
      actus.find((hoc) => [
        hoc.modus.aequatur('infinitivus'),
        hoc.tempus.aequatur('praesens'),
        hoc.vox.aequatur('activa')
      ].all())
    const _gerundius: Actus | undefined =
      actus.find((hoc) => [
        hoc.modus.aequatur('participium'),
        hoc.tempus.aequatur('futurum'),
        hoc.vox.aequatur('passiva')
      ].all())
    const _supinus: Actus | undefined =
        actus.find((hoc) => [
          hoc.modus.aequatur('participium'),
          hoc.tempus.aequatur('perfectum'),
          hoc.vox.aequatur('passiva')
        ].all())
    const deVacuis: RegExp = buildRegExp([ '; ', lookahead(choiceOf(';', endOfString)) ], { global: true })
    const structor: Structor<TabulamenFacti> = new Structor(TabulamenFacti)
            .ponatur((nomen) => (nomen.infinitivum = _infinitivus?.scriptum ?? ''))
            .ponatur((nomen) => (nomen.gerundium = _gerundius?.scriptum ?? ''))
            .ponatur((nomen) => (nomen.supinum = _supinus?.scriptum ?? ''))
            .ponatur((nomen) => (nomen.principium = 'facta'))
    if(!_infinitivus)
      structor.ponatur((nomen) => nomen.scriptura = 'factus = infinitivus: dele; ')
    if (!_gerundius)
      structor.ponatur((nomen) => nomen.scriptura = 'factus = gerundius: dele; ')
    if (!_supinus)
      structor.ponatur((nomen) => nomen.scriptura = 'factus = supinus: dele; ')
    return structor.ponatur((nomen) => nomen.scriptura = nomen.scriptura?.replace(deVacuis, ''))
            .struatur
  }
}
