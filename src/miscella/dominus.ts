import i18next from 'i18next';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';
import { useTheme } from 'vuetify';
import Ignavum from './ignavum';
import Nuntius from './nuntius';

type Valor = string | boolean | number | undefined

abstract class Crustulum<Hoc extends Valor> {
  protected nomen!: string
  protected valores!: string[]
  protected vita: number = 365
  private _finis: Date = new Date

  #inhaesa(): string { return this.valores[0] }

  inhaesast(): boolean { return this.massa === this.#inhaesa() }

  inhaereatur() { this.massa = this.#inhaesa() }

  @Nuntius.futurus('Crustulum')
  protected async coquatur(valor: string) {
    const mutatast: boolean = this.massa === valor
    if(!!this.coctast()) this._finis.setDate(this._finis.getDate() + this.vita)
    else this._finis.setDate(Date.now() + this.vita)
    return dominus.hoc().ponam(this.nomen, valor, this._finis)
                  .then(() => { if(mutatast) this.respondeam() })
                  .then(() => { if(mutatast) window.location.reload() })
  }

  @Nuntius.modus('Crustulum')
  coctast(): boolean { return dominus.hoc().quaeram(this.nomen) }

  @Nuntius.modus('Crustulum')
  concoctast (valor: string): boolean { return this.massa === valor }

  @Nuntius.captor('Crustulum')
  get massa(): string {
    if(!!this._finis && this._finis.getTime() >= Date.now()) {
      this.deleatur()
      return this.#inhaesa()
    } else return dominus.hoc().inveniam(this.nomen) ?? this.#inhaesa()
  }

  @Nuntius.positor('Crustulum')
  set massa(valor: string) {
    if(this.massa !== valor && this.valores.includes(valor))
         this.coquatur(valor)
    else this.coquatur(this.#inhaesa())
  }

  async proferatur ()
  { if (this.coctast()) await this.coquatur(this.massa); }

  deleatur() { removeCookie(this.nomen) }

  abstract signetur(): Hoc
  abstract scribatur(): string
  abstract respondeam(): Promise<void>
}

abstract class Vexillum extends Crustulum<boolean> {
  signetur (): boolean { return this.massa === 'ita' }
  constructor(vexillum: boolean) {
    super()
    this.valores = vexillum ? [ 'ita', 'non' ] : [ 'non', 'ita' ]
  }
}

class Apices extends Vexillum {
  override nomen = 'apices'
  scribatur (): string { return this.signetur() ? 'ā' : 'a' }
  constructor() { super(true) }
  async respondeam () { /*noop*/ }
}

class UtendaU extends Vexillum {
  override nomen = 'utendaU'
  scribatur (): string { return this.signetur() ? 'u' : 'v' }
  constructor () { super(true) }
  async respondeam () { /*noop*/ }
}

class Magnas extends Vexillum {
  override nomen = 'magnas'
  scribatur (): string { return this.signetur() ? 'A' : 'a' }
  constructor () { super(false) }
  async respondeam () { /*noop*/ }
}

class Sessio extends Crustulum<undefined> {
  override nomen = 'sessio'
  override valores = [ '' ]
  override vita = 30
  override set massa(valor: string) { this.coquatur(valor) }
  signetur() { return undefined }
  scribatur() { return '' }
  async respondeam() {
    if(this.coctast()) dominus.hoc().inhaereantur()
    else dominus.hoc().deleantur()
  }
}

class Asssensus extends Crustulum<undefined> {
  override nomen = 'assensus'
  override valores = [ '', 'assensit', 'negavit' ]

  signetur (): undefined { return undefined }
  scribatur (): string { return '' }
  async respondeam () {
    if(this.massa === 'assensit')
         dominus.hoc().inhaereantur()
    else dominus.hoc().deleantur()
  }
}

class Lingua extends Crustulum<string> {
  override nomen = 'lingua'
  override valores = [ 'latina', 'anglica' ]
  signetur (): string { return this.massa === 'anglica' ? 'en' : 'la' }
  scribatur (): string { return `/res/picta/${this.massa}.png` }
  async respondeam ()
  { i18next.changeLanguage(this.signetur()) }
}

class Facies extends Crustulum<string> {
  override nomen = 'facies'
  override valores = [ 'fusca', 'illustris' ]
  signetur (): string { return this.massa === 'illustris' ? 'light' : 'dark' }
  scribatur (): string { return `${this.signetur()}_mode` }
  async respondeam ()
  { useTheme().global.name.value = this.signetur() }
}

class Separator extends Crustulum<string> {
  override nomen = 'separator'
  override valores = [ 'inane', 'interpunctum', 'nullum' ]
  scribatur (): string { return '' }
  signetur (): string {
    switch (this.massa) {
      case 'interpunctum': return '·'
      case 'nullum': return ''
      default: return ' '
    }
  }

  async respondeam () {}
}

type Optanda = NonNullable<Parameters<typeof setCookie>[ 2 ]>
class Dominus {
  private static readonly _optanda: Optanda = {
    domain: 'conans',
    sameSite: 'strict',
    secure: import.meta.env.PROD
  }

  readonly separatores = {
    interpunctum: ' • ',
    inane: ' _ ',
    nullum: '   '
  } as const

  private readonly _sessio: Sessio = new Sessio
  readonly apices: Apices = new Apices
  readonly utendaU: UtendaU = new UtendaU
  readonly magnas: Magnas = new Magnas
  readonly assensus: Asssensus = new Asssensus
  readonly facies: Facies = new Facies
  readonly lingua: Lingua = new Lingua
  readonly separator: Separator = new Separator

  readonly crustula: Crustulum<Valor>[] = [
    this.apices, this.utendaU, this.magnas, this._sessio, this.assensus, this.facies, this.lingua, this.separator
  ] as const

  quaeram(nomen: string): boolean { return this.inveniam(nomen) !== undefined }

  inveniam(nomen: string): string | undefined { return getCookie(nomen) }

  async ponam(nomen: string, valor: string, finis: Date) {
    setCookie(nomen, valor, {
      ...Dominus._optanda,
      expires: finis
    })
  }

  inhaereantur() {
    this.crustula.forEach((crustulum) =>
      { if(!crustulum.coctast()) crustulum.inhaereatur() })
  }

  deleantur() {
    this.crustula.forEach((crustulum) =>
      { if(crustulum.coctast()) crustulum.deleatur() })
  }

  proferantur() {
    this.crustula.forEach(crustulum =>
      { if(crustulum.coctast()) crustulum.proferatur() })
  }

  sedit(): boolean { return this._sessio.coctast() }

  sedeat() { this._sessio.massa = crypto.randomUUID() }

  stet() { this._sessio.deleatur() }
}

export const dominus: Ignavum<Dominus> = new Ignavum(Dominus)
