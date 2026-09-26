import '../extensions/string';
import { numeraminum } from '../lectores/verbalis';
import { dominus } from '../miscella/dominus';
import type {
  casus,
  CASUS,
  categoria,
  CATEGORIA,
  factum,
  FACTUM,
  genus,
  GENUS,
  gradus,
  GRADUS,
  modus,
  MODUS,
  numerus,
  NUMERUS,
  persona,
  PERSONA,
  referendum,
  REFERENDUM,
  tempus,
  TEMPUS,
  vox,
  VOX
} from '../miscella/enumerationes.ts';
import {
  casua,
  categoriae,
  encliticum,
  facta,
  genera, gradua,
  magnificeturPrima,
  modi,
  numeri,
  personae,
  referenda,
  tempora,
  voces,
} from '../miscella/enumerationes.ts';
import Numerator from '../miscella/numerator';
import { AdiectivumAgendum, NumeramenAgendum, type Agendum, type Positor } from './agenda';
import Structor from './structor';

export const Errator: (res: object) => Error =
  (res: object) => new Error(`Vetatur ${res}`)

export class Verbum {
  readonly unicum: symbol = Symbol()
  private __categoria!: categoria
  protected _scriptum!: string

  get scriptum(): string { return this._scriptum }

  #categoriast (valor: string): valor is categoria { return valor in categoriae }

  get categoria (): categoria { return this.__categoria }

  categoriaMagna (): CATEGORIA { return magnificeturPrima(this.__categoria) }

  protected get _categoria (): categoria { return this.__categoria }

  protected set _categoria (valor: string) {
    valor = valor.toLowerCase().trim()
    if (this.#categoriast(valor)) this.__categoria = valor
    else throw Errator({ categoria: valor })
  }

  set scriptum(valor: string) {
    if (valor = valor.trim()) this._scriptum = valor
    else throw Errator({ scriptum: valor })
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

export class Numerus extends Verbum {
  private _anglicus: number = -1

  constructor() { super(); this._categoria = 'numerus' }

  override get scriptum(): string { return Numerator.romanus(this._anglicus) }

  get anglicus(): number { return this._anglicus }

  set anglicus(valor: number) {
    if (Numerator.arabicusConvertibilis(valor)) this._anglicus = valor
    else throw Errator({ anclicus: valor })
  }

  static readonly numerator: (anglicus: number) => Numerus = (anglicus: number): Numerus => {
    return new Structor<Numerus>(Numerus)
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

  private _encliticum: encliticum = encliticum.nullum

  abstract valores(): string[]

  get encliticum(): encliticum { return this._encliticum }

  set encliticum (valor: encliticum) {
    if(this._encliticum != encliticum.nullum)
      this.scriptum = this.scriptum.slice(0, -this._encliticum.length)
    this._encliticum = valor
    if(this._encliticum != encliticum.nullum)
      this.scriptum += this._encliticum
  }
}

export class Actus extends Multiplex {
  private _modus  :   modus =     modi[0]
  private _vox    :     vox =    voces[0]
  private _tempus :  tempus =  tempora[0]
  private _numerus: numerus =   numeri[0]
  private _persona: persona = personae[0]

  constructor() { super(); this._categoria = 'actus' }

  get modus(): modus { return this._modus }

  get vox(): vox { return this._vox }

  get tempus(): tempus { return this._tempus }

  get numerus(): numerus { return this._numerus }

  get persona(): persona { return this._persona }

  modusMagnus(): MODUS { return magnificeturPrima(this._modus) }

  tempusMagnum(): TEMPUS { return magnificeturPrima(this._tempus) }

  voxMagna(): VOX { return magnificeturPrima(this._vox) }

  numerusMagnus(): NUMERUS { return magnificeturPrima(this._numerus) }

  personaMagna(): PERSONA { return magnificeturPrima(this._persona) }

  #modust(valor: string): valor is modus { return valor in modi }

  #tempust(valor: string): valor is tempus { return valor in tempora }

  #vocest(valor: string): valor is vox { return valor in voces }

  #numerust(valor: string): valor is numerus { return valor in numeri }

  #personast(valor: string): valor is persona { return valor in personae }

  set modus(valor: string) {
    valor = valor.toLowerCase()
    if (this.#modust(valor)) this._modus = valor
    else throw Errator({ modus: valor })
  }

  set vox(valor: string) {
    valor = valor.toLowerCase()
    if (this.#vocest(valor)) this._vox = valor
    else throw Errator({ vox: valor })
  }

  set tempus(valor: string) {
    valor = valor.toLowerCase()
    if (this.#tempust(valor)) this._tempus = valor
    else throw Errator({ tempus: valor })
  }

  set numerus(valor: string) {
    valor = valor.toLowerCase()
    if (this.#numerust(valor)) this._numerus = valor
    else throw Errator({ numerus: valor })
  }

  set persona(valor: string) {
    valor = valor.toLowerCase()
    if (this.#personast(valor)) this._persona = valor
    else throw Errator({ persona: valor })
  }

  valores(): string[] { return [ this.modus, this.vox, this.tempus, this.numerus, this.persona ] }

  override paratumne(): boolean { return this.modus !== 'participium' && super.paratumne() }

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
    if (this.modus === 'participium') {
      if (this.tempus === 'praesens') {
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
    } else throw Errator({ modus: this.modus })
  }
}

export class Adverbium extends Multiplex {
  private _gradus: gradus = gradua[0]

  constructor() { super(); this._categoria = 'adverbium' }

  get gradus(): gradus { return this._gradus }

  gradusMagnus(): GRADUS { return magnificeturPrima(this._gradus) }

  #gradust(valor: string): valor is gradus { return valor in gradua }

  set gradus(valor: string) {
    valor = valor.toLowerCase()
    if (this.#gradust(valor)) this._gradus = valor
    else throw Errator({ gradus: valor })
  }

  valores(): string[] { return [ this.gradus ] }

  static readonly positor: Positor<Adverbium> = (istud: Agendum<Adverbium>): Adverbium =>
    new Structor<Adverbium>(Adverbium)
          .ponatur((adverbium) => (adverbium.gradus = istud.gradus ?? ''))
          .ponatur((adverbium) => (adverbium.scriptum = istud.scriptum))
          .struatur()
}

export class Nomen extends Multiplex {
  private _factum :  factum = facta[0]
  private _numerus: numerus = numeri[0]
  private _casus  :   casus = casua[0]

  constructor() { super(); this._categoria = 'nomen' }

  get factum(): factum { return this._factum }

  get numerus(): numerus { return this._numerus }

  get casus(): casus { return this._casus }

  factumMagnum(): FACTUM { return magnificeturPrima(this._factum) }

  numerusMagnus(): NUMERUS { return magnificeturPrima(this._numerus) }

  casusMagnus(): CASUS { return magnificeturPrima(this._casus) }

  #factust(valor: string): valor is factum { return valor in facta }

  #numerust(valor: string): valor is numerus { return valor in numeri }

  #casust(valor: string): valor is casus { return valor in casua }

  set actum(valor: string) {
    valor = valor.toLowerCase()
    if (this.#factust(valor)) this._factum = valor
    else throw Errator({ factum: valor })
  }

  set numerus(valor: string) {
    valor = valor.toLowerCase()
    if ([this.#numerust(valor)].any())
      this._numerus = valor
    else throw Errator({ numerus: valor })
  }

  set casus(valor: string) {
    valor = valor.toLowerCase()
    if (this.#casust(valor)) this._casus = valor
    else throw Errator({ casus: valor })
  }

  valores(): string[] { return [ this.actum, this.numerus, this.casus ] }

  static readonly positor: Positor<Nomen> = (istud: Agendum<Nomen>): Nomen =>
    new Structor<Nomen>(Nomen)
          .ponatur((nomen) => (nomen.numerus = istud.numerus ?? ''))
          .ponatur((nomen) => (nomen.casus = istud.casus ?? ''))
          .ponatur((nomen) => (nomen.scriptum = istud.scriptum))
          .struatur()
}

export class Pronomen extends Multiplex {
  private _genus  :   genus = genera[0]
  private _numerus: numerus = numeri[0]
  private _casus  :   casus =  casua[0]

  constructor() { super(); this._categoria = 'pronomen' }

  get genus(): genus { return this._genus }

  get numerus(): numerus { return this._numerus }

  get casus(): casus { return this._casus }

  genusMagnum(): GENUS { return magnificeturPrima(this._genus) }

  numerusMagnus(): NUMERUS { return magnificeturPrima(this._numerus) }

  casusMagnus(): CASUS { return magnificeturPrima(this._casus) }

  #genust(valor: string): valor is genus { return valor in genera }

  #numerust(valor: string): valor is numerus { return valor in numeri }

  #casust(valor: string): valor is casus { return valor in casua }

  set genus(valor: string) {
    valor = valor.toLowerCase()
    if (this.#genust(valor)) this._genus = valor
    else throw Errator({ genus: valor })
  }

  set numerus(valor: string) {
    valor = valor.toLowerCase()
    if (this.#numerust(valor)) this._numerus = valor
    else throw Errator({ numerus: valor })
  }

  set casus(valor: string) {
    valor = valor.toLowerCase()
    if (this.#casust(valor)) this._casus = valor
    else throw Errator({ casus: valor })
  }

  valores(): string[] { return [ this.genus, this.numerus, this.casus ] }

  static readonly positor: Positor<Pronomen> = (istud: Agendum<Pronomen>): Pronomen => {
    if (!istud.casus || istud.casus === 'Derectus') throw Errator({ casus: istud.casus })
    else return new Structor<Pronomen>(Pronomen)
                      .ponatur((pronomen) => (pronomen.casus = istud.casus))
                      .ponatur((pronomen) => (pronomen.genus = istud.genus ?? ''))
                      .ponatur((pronomen) => (pronomen.numerus = istud.numerus ?? ''))
                      .ponatur((pronomen) => (pronomen.scriptum = istud.scriptum))
                      .struatur()
  }
}

export class Adiectivum extends Multiplex {
  private _gradus :  gradus = gradua[0]
  private _genus  :   genus = genera[0]
  private _numerus: numerus = numeri[0]
  private _casus  :   casus = casua [0]

  constructor() { super(); this._categoria = 'adiectivum' }

  get gradus(): gradus { return this._gradus }

  get genus(): genus { return this._genus }

  get numerus(): numerus { return this._numerus }

  get casus(): casus { return this._casus }

  gradusMagnus(): GRADUS { return magnificeturPrima(this._gradus) }

  genusMagnum(): GENUS { return magnificeturPrima(this._genus) }

  numerusMagnus(): NUMERUS { return magnificeturPrima(this._numerus) }

  casusMagnus(): CASUS { return magnificeturPrima(this._casus) }

  #gradust(valor: string): valor is gradus { return valor in gradua }

  #genust(valor: string): valor is genus { return valor in genera }

  #numerust(valor: string): valor is numerus { return valor in numeri }

  #casust(valor: string): valor is casus { return valor in casua }

  set gradus(valor: string) {
    valor = valor.toLowerCase()
    if (this.#gradust(valor)) this._gradus = valor
    else throw Errator({ gradus: valor })
  }

  set genus(valor: string) {
    valor = valor.toLowerCase()
    if (this.#genust(valor)) this._genus = valor
    else throw Errator({ genus: valor })
  }

  set numerus(valor: string) {
    valor = valor.toLowerCase()
    if (this.#numerust(valor)) this._numerus = valor
    else throw Errator({ numerus: valor })
  }

  set casus(valor: string) {
    valor = valor.toLowerCase()
    if (this.#casust(valor)) this._casus = valor
    else throw Errator({ casus: valor })
  }

  valores(): string[] { return [ this.gradus, this.genus, this.numerus, this.casus ] }

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
  private _referendum: referendum = referenda[0]

  constructor() { super(); this._categoria = 'numeramen' }

  get referendum(): referendum { return this._referendum }

  referendumMagnum(): REFERENDUM { return magnificeturPrima(this._referendum) }

  #referendust(valor: string): valor is referendum { return valor in referenda }

  set referendum(valor: string) {
    valor = valor.toLowerCase()
    if (this.#referendust(valor)) this.referendum = valor
    else throw Errator({ referendum: valor })
  }

  valores(): string[] { return [ this.referendum ] }

  override paratumne(): boolean { return false }

  static readonly positor: Positor<Numeramen> = (istud: Agendum<Numeramen>): Numeramen =>
    new Structor<Numeramen>(Numeramen)
          .ponatur((numeramen) => (numeramen.referendum = istud.referendum))
          .ponatur((numeramen) => (numeramen.scriptum = istud.scriptum))
          .struatur()
}
