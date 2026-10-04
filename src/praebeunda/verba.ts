import { Mixin } from 'ts-mixer';
import { AdiectivumAgendum, NumeramenAgendum } from './agenda';
import Structor from './structor';
import '../extensions/array';
import '../extensions/string';
import { numeraminum } from '../lectores/verbalis';
import { dominus } from '../miscella/dominus';
import Numerator from '../miscella/numerator';
import { Ultimum } from '../miscella/usus';
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

export type Agendum<Hoc extends Multiplex> = Omit<Hoc, 'categoria' | 'unicum' | '_encliticus' | 'encliticus' | 'monstretur' | 'paratust'>

export const ordinentur: (primum: Verbum, secundum: Verbum) => SortResult =
      comparison([
        (hoc: Verbum) => hoc instanceof Multiplex ? hoc.valores.count((valor) => !/^(?:null(?:a|u[ms])|derectus)$/.test(valor.valor)) : 0,
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
    if(dominus.utendaU.signetur()) {
      const subsituendae = { U: 'V', u: 'v', Ū: 'V̄', ū: 'v̄' };
      if([...monstrandum].intersection(Object.keys(subsituendae)).any()) {
        Object.entries(subsituendae).forEach(([clavis, valor]: [string, string]) =>
            monstrandum = monstrandum.replace(clavis, valor))
      }
    }; if(dominus.apices.signetur())
          monstrandum = monstrandum.removeMacra()
       if(dominus.magnas.signetur())
          monstrandum = monstrandum.toUpperCase()
    return monstrandum
  }
}

@Ultimum export class Numerale extends Verbum {
  private _anglicus: number = -1

  constructor() { super(); this.categoria.valor = 'numerale' }

  override get scriptum(): string { return Numerator.romanus(this._anglicus) }

  get anglicus(): number { return this._anglicus }

  set anglicus(valor: number) {
    if (Numerator.arabicusConvertibilis(valor)) this._anglicus = valor
    else throw errator({ anglicus: valor.toString() })
  }

  static readonly numerator: (anglicus: number) => Numerale =
      (anglicus: number): Numerale =>
          new Structor<Numerale>(Numerale)
                .ponatur((numerus) => (numerus.anglicus = anglicus))
                .struatur()

  async numeramen(): Promise<NumeramenAgendum | undefined> {
    return (await numeraminum.legatur(this.scriptum)).first()
  }
}

export abstract class Multiplex extends Mixin(Encliticum, Verbum) {
  static ordinentur: (primum: Multiplex, secundum: Multiplex) => SortResult =
      comparison([
        (hoc) => hoc.valores.count((valor) => !/^(?:null(?:a|u[ms])|derectus)$/.test(valor.valor))
      ])

  static componatur<Hoc extends Multiplex> (constructor: new () => Hoc, agendum: Agendum<Hoc>): Hoc {
    const structor: Structor<Hoc> = new Structor(constructor)
    structor.ponatur((hoc) =>
          hoc.valores.forEach((valor, numerus) =>
              valor.reponatur(agendum.valores[numerus])))
    structor.ponatur((hoc) => hoc.scriptum = agendum.scriptum)
    return structor.struatur()
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
    super(); this.categoria.valor = 'actus'
    this._valores = new Fulta(this.modus, this.vox, this.tempus, this.numerus, this.persona)
  }

  override paratust(): boolean
  { return !this.modus.aequatur('participium') && super.paratust() }

  async participialis(): Promise<AdiectivumAgendum> {
    if (this.modus.aequatur('participium')) {
      if (this.tempus.aequatur('praesens')) {
        const structor: Structor<AdiectivumAgendum> = new Structor(AdiectivumAgendum)
          .ponatur((adiectivum) => (adiectivum.versio = 'positivusTertia/cumTruncoVario'))
          .ponatur((adiectivum) => (adiectivum.positivum = this.scriptum))
        if (this.scriptum.slice(-3) === 'āre') {
          structor
            .ponatur((adiectivum) => (adiectivum.comparativum = this.scriptum.replace('āns$', 'antior')))
            .ponatur((adiectivum) => (adiectivum.superlativum = this.scriptum.replace('āns$', 'antissimum')))
        } else {
          structor
            .ponatur((adiectivum) => (adiectivum.comparativum = this.scriptum.replace('ēns$', 'entior')))
            .ponatur((adiectivum) => (adiectivum.superlativum = this.scriptum.replace('ēns$', 'entissimum')))
        }

        return structor.struatur()
      } else return new Structor(AdiectivumAgendum)
                          .ponatur((adiectivum) => (adiectivum.versio = 'postivusAutPrimaAutSecunda'))
                          .ponatur((adiectivum) => (adiectivum.positivum = this.scriptum))
                          .ponatur((adiectivum) => (adiectivum.comparativum = this.scriptum.replace('um$', 'ius')))
                          .ponatur((adiectivum) => (adiectivum.comparativum = this.scriptum.replace('um$', 'issimum')))
                          .struatur()
    } else throw errator({ modus: this.modus.valor })
  }
}

@Ultimum export class Adiectivum extends Mixin(Casuale, Gradale, Generale, Multiplex, Numeratum) {
  constructor () {
    super(); this.categoria.valor = 'adiectivum';
    this._valores = new Fulta(this.gradus, this.genus, this.numerus, this.casus);
  }
}

@Ultimum export class Adverbium extends Mixin(Gradale, Multiplex) {
  constructor() {
    super(); this.categoria.valor = 'adverbium'
    this._valores = new Fulta(this.gradus)
  }
}

@Ultimum export class Nomen extends Mixin(Casuale, Factum, Multiplex, Numeratum) {
  constructor() {
    super(); this.categoria.valor = 'nomen'
    this._valores = new Fulta(this.factus, this.numerus, this.casus)
  }
}

@Ultimum export class Numeramen extends Mixin(Multiplex, Relaturum) {
  constructor() {
    super(); this.categoria.valor = 'numeramen'
    this._valores = new Fulta(this.relaturus)
  }
}

@Ultimum export class Pronomen extends Mixin(Casuale, Generale, Multiplex, Numeratum) {
  constructor () {
    super(); this.categoria.valor = 'pronomen';
    this._valores = new Fulta(this.genus, this.numerus, this.casus);
  }
}
