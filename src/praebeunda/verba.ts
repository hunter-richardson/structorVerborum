import '../extensions/string.ts';
import { numeraminum } from '../lectores/verbalis.ts';
import { dominus } from '../miscella/dominus.ts';
import {
  Casus,
  Categoria,
  Encliticum,
  errator,
  Factum,
  Genus,
  Gradus,
  Modus,
  Numerus,
  Persona,
  Referendum,
  Tempus,
  Vox
} from '../miscella/enumerationes.ts';
import Numerator from '../miscella/numerator.ts';
import { AdiectivumAgendum, NumeramenAgendum, type Agendum, type Positor } from './agenda.ts';
import Structor from './structor.ts';

export class Verbum {
  readonly unicum: symbol = Symbol()
  categoria: Categoria = new Categoria
  protected _scriptum!: string

  get scriptum(): string { return this._scriptum }

  set scriptum(valor: string) {
    if (valor = valor.trim()) this._scriptum = valor
    else throw errator({ scriptum: valor })
  }

  paratumne(): boolean { return !!this.scriptum }

  monstretur(): string {
    let monstrandum: string = this.scriptum
    if(dominus.hoc().utendaU.signetur())
      monstrandum = monstrandum.replace('U', 'V')
                               .replace('u', 'v')
                               .replace('ū', 'v')
                               .replace('Ū', 'V')

    if(dominus.hoc().apices.signetur())
      monstrandum = monstrandum.removeMacra()
    if(dominus.hoc().magnas.signetur())
      monstrandum = monstrandum.toUpperCase()
    return ''
  }
}

export class Numerale extends Verbum {
  private _anglicus: number = -1

  constructor() { super(); this.categoria.valor = 'numerale' }

  override get scriptum(): string { return Numerator.romanus(this._anglicus) }

  get anglicus(): number { return this._anglicus }

  set anglicus(valor: number) {
    if (Numerator.arabicusConvertibilis(valor)) this._anglicus = valor
    else throw errator({ anglicus: valor.toString() })
  }

  static readonly numerator: (anglicus: number) => Numerale = (anglicus: number): Numerale => {
    return new Structor<Numerale>(Numerale)
                 .ponatur((numerus) => (numerus.anglicus = anglicus))
                 .struatur()
  }

  async numeramen(): Promise<NumeramenAgendum | undefined> {
    return await numeraminum.hoc().legatur(this.scriptum)
  }
}

export abstract class Multiplex extends Verbum {
  static colamina(categoria: string): string[] {
    switch (categoria) {
      case 'actus':
        return [ 'modus', 'vox', 'tempus', 'numerus', 'persona', 'scriptum' ]
      case 'adiectivum':
        return [ 'gradus', 'genus', 'numerus', 'casus', 'scriptum' ]
      case 'adverbium':
        return [ 'gradus', 'scriptum' ]
      case 'nomen':
        return [ 'actum', 'numerus', 'casus', 'scriptum' ]
      case 'numeramen':
        return [ 'referendum', 'scriptum' ]
      case 'pronomen':
        return [ 'genus', 'numerus', 'casus', 'scriptum' ]
      default:
        return [  ]
    }
  }

  private _encliticum: Encliticum = Encliticum.nullum

  abstract valores(): string[]

  get encliticum(): Encliticum { return this._encliticum }

  set encliticum (valor: Encliticum) {
    if(this._encliticum != Encliticum.nullum)
      this.scriptum = this.scriptum.slice(0, -this._encliticum.length)
    this._encliticum = valor
    if(this._encliticum != Encliticum.nullum)
      this.scriptum += this._encliticum
  }
}

export class Actus extends Multiplex {
  modus  :   Modus = new   Modus
  vox    :     Vox = new     Vox
  tempus :  Tempus = new  Tempus
  numerus: Numerus = new Numerus
  persona: Persona = new Persona

  constructor() { super(); this.categoria.valor = 'actus' }

  valores (): string[] {
    return [ this.modus.valor, this.vox.valor, this.tempus.valor, this.numerus.valor, this.persona.valor ]
  }

  override paratumne(): boolean { return !this.modus.aequatur('participium') && super.paratumne() }

  static readonly positor: Positor<Actus> = (istud: Agendum<Actus>): Actus => {
    return new Structor<Actus>(Actus)
                 .ponatur((actus) => (actus.modus = istud.modus))
                 .ponatur((actus) => (actus.vox = istud.vox ?? ''))
                 .ponatur((actus) => (actus.tempus = istud.tempus ?? ''))
                 .ponatur((actus) => (actus.numerus = istud.numerus ?? ''))
                 .ponatur((actus) => (actus.persona = istud.persona ?? ''))
                 .ponatur((actus) => (actus.scriptum = istud.scriptum))
                 .struatur()
  }

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

export class Adverbium extends Multiplex {
  gradus: Gradus = new Gradus

  constructor() { super(); this.categoria.valor = 'adverbium' }

  valores(): string[] { return [ this.gradus.valor ] }

  static readonly positor: Positor<Adverbium> = (istud: Agendum<Adverbium>): Adverbium =>
    new Structor<Adverbium>(Adverbium)
          .ponatur((adverbium) => (adverbium.gradus = istud.gradus ?? ''))
          .ponatur((adverbium) => (adverbium.scriptum = istud.scriptum))
          .struatur()
}

export class Nomen extends Multiplex {
  factum :  Factum = new Factum
  numerus: Numerus = new Numerus
  casus  :   Casus = new Casus

  constructor() { super(); this.categoria.valor = 'nomen' }

  valores (): string[] { return [ this.factum.valor, this.numerus.valor, this.casus.valor ] }

  static readonly positor: Positor<Nomen> = (istud: Agendum<Nomen>): Nomen =>
    new Structor<Nomen>(Nomen)
          .ponatur((nomen) => (nomen.numerus = istud.numerus ?? ''))
          .ponatur((nomen) => (nomen.casus = istud.casus ?? ''))
          .ponatur((nomen) => (nomen.scriptum = istud.scriptum))
          .struatur()
}

export class Pronomen extends Multiplex {
  genus  :   Genus = new Genus
  numerus: Numerus = new Numerus
  casus  :   Casus = new Casus

  constructor() { super(); this.categoria.valor = 'pronomen' }

  valores (): string[] { return [ this.genus.valor, this.numerus.valor, this.casus.valor ] }

  static readonly positor: Positor<Pronomen> = (istud: Agendum<Pronomen>): Pronomen => {
    if (!istud.casus || istud.casus.aequatur('derectus')) throw errator({ casus: istud.casus.valor })
    else return new Structor<Pronomen>(Pronomen)
                      .ponatur((pronomen) => (pronomen.casus = istud.casus))
                      .ponatur((pronomen) => (pronomen.genus = istud.genus ?? ''))
                      .ponatur((pronomen) => (pronomen.numerus = istud.numerus ?? ''))
                      .ponatur((pronomen) => (pronomen.scriptum = istud.scriptum))
                      .struatur()
  }
}

export class Adiectivum extends Multiplex {
  gradus :  Gradus = new Gradus
  genus  :   Genus = new Genus
  numerus: Numerus = new Numerus
  casus  :   Casus = new Casus

  constructor() { super(); this.categoria.valor = 'adiectivum' }

  valores (): string[] {
    return [ this.gradus.valor, this.genus.valor, this.numerus.valor, this.casus.valor ]
  }

  static readonly positor: Positor<Adiectivum> = (istud: Agendum<Adiectivum>): Adiectivum =>
    new Structor<Adiectivum>(Adiectivum)
          .ponatur((adiectivum) => (adiectivum.gradus = istud.gradus ?? ''))
          .ponatur((adiectivum) => (adiectivum.genus = istud.genus ?? ''))
          .ponatur((adiectivum) => (adiectivum.numerus = istud.numerus ?? ''))
          .ponatur((adiectivum) => (adiectivum.casus = istud.casus ?? ''))
          .ponatur((adiectivum) => (adiectivum.scriptum = istud.scriptum))
          .struatur()
}

export class Numeramen extends Multiplex {
  referendum: Referendum = new Referendum

  constructor() { super(); this.categoria.valor = 'numeramen' }

  valores(): string[] { return [ this.referendum.valor ] }

  override paratumne(): boolean { return false }

  static readonly positor: Positor<Numeramen> = (istud: Agendum<Numeramen>): Numeramen =>
    new Structor<Numeramen>(Numeramen)
          .ponatur((numeramen) => (numeramen.referendum = istud.referendum))
          .ponatur((numeramen) => (numeramen.scriptum = istud.scriptum))
          .struatur()
}
