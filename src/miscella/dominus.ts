import { createFireAndForgetInvoker, type FireAndForgetInvoker } from '@enormora/fire-and-forget'
import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import * as Please from 'pleasejs'
import i18next from 'i18next'
import { useTheme } from 'vuetify'
import { Ignavum, Ultimum } from '@/miscella/usus'
import Nuntius from '@/miscella/nuntius'
import '@/extensions/error'
import '@/extensions/env'

type Valor = string | boolean | number | undefined

abstract class Crustulum<Hoc extends Valor> {
  private static readonly _invocator: FireAndForgetInvoker = createFireAndForgetInvoker({
    reportError(error: unknown) {
      if (Error.isError(error))
        Nuntius.timeo({
          nomen: this.constructor.name,
          error: error,
        })
    },
  })

  protected valores!: string[]
  protected vita: number = 365
  private _finis: Date = new Date()

  get inhaesa(): string {
    return this.valores[0]
  }

  get inhaesast(): boolean {
    return this.massa === this.inhaesa
  }

  inhaereatur() {
    this.massa = this.inhaesa
  }

  @Nuntius.promittum protected async coquatur(valor: string) {
    const mutatast: boolean = this.massa === valor
    if (this.coctast) this._finis.setDate(this._finis.getDate() + this.vita)
    else this._finis.setDate(Date.now() + this.vita)
    return await dominus
      .ponam(this.nomen, valor, this._finis)
      .then(async () => {
        if (mutatast) await this.responsus()
      })
      .then(() => {
        if (mutatast) window.location.reload()
      })
  }

  @Nuntius.captor get coctast(): boolean {
    return dominus.quaeram(this.nomen)
  }

  @Nuntius.modus concoctast(valor: string): boolean {
    return this.massa === valor
  }

  private get nomen(): string {
    return this.constructor.name.lowercase
  }

  @Nuntius.captor get massa(): string {
    if (this._finis !== undefined && this._finis.getTime() >= Date.now()) {
      this.deleatur()
      return this.inhaesa
    } else return dominus.inveniam(this.nomen) ?? this.inhaesa
  }

  @Nuntius.positor set massa(valor: string) {
    Crustulum._invocator.fireAndForget(async () => {
      const novus = this.massa !== valor && this.valores.includes(valor) ? valor : this.inhaesa
      await this.coquatur(novus)
    })
  }

  @Nuntius.modus interverteUtrum() {
    const valor: string = this.massa
    if (this.valores.length == 2) this.massa = this.valores[+!this.valores.indexOf(valor)]
  }

  async proferatur() {
    if (this.coctast) await this.coquatur(this.massa)
  }

  deleatur() {
    removeCookie(this.nomen)
  }

  abstract get signum(): Hoc
  abstract get scriptum(): string
  abstract responsus(): Promise<void>
}

abstract class Vexillum extends Crustulum<boolean> {
  get signum(): boolean {
    return this.massa === 'ita'
  }
  constructor(vexillum: boolean) {
    super()
    this.valores = vexillum ? ['ita', 'non'] : ['non', 'ita']
  }
}

@Ultimum
@Ignavum
class Apices extends Vexillum {
  get scriptum(): 'ā' | 'a' {
    return this.signum ? 'ā' : 'a'
  }
  constructor() {
    super(true)
  }
  async responsus() {
    /*noop*/
  }
}

@Ultimum
@Ignavum
class UtendaU extends Vexillum {
  get scriptum(): 'u' | 'v' {
    return this.signum ? 'u' : 'v'
  }
  constructor() {
    super(true)
  }
  async responsus() {
    /*noop*/
  }
}

@Ultimum
@Ignavum
class Magnas extends Vexillum {
  get scriptum(): 'A' | 'a' {
    return this.signum ? 'A' : 'a'
  }
  constructor() {
    super(false)
  }
  async responsus() {
    /*noop*/
  }
}

@Ultimum
@Ignavum
class Sessio extends Crustulum<boolean> {
  override valores = ['']
  override vita = 30
  override set massa(valor: string) {
    this.coquatur(valor)
  }
  get signum(): boolean {
    return this.coctast
  }
  get scriptum(): '' {
    return ''
  }
  responsus(): Promise<void> {
    return Promise.resolve(dominus[this.coctast ? 'inhaereantur' : 'deleantur']())
  }
}

@Ultimum
@Ignavum
class Assensus extends Crustulum<boolean | undefined> {
  override valores = ['', 'assensit', 'negavit']

  get scriptum(): '' {
    return ''
  }
  get signum(): boolean | undefined {
    return this.coctast ? this.concoctast('assensit') : undefined
  }
  responsus(): Promise<void> {
    return Promise.resolve(dominus[this.coctast ? 'inhaereantur' : 'deleantur']())
  }
}

@Ultimum
@Ignavum
class Lingua extends Crustulum<string> {
  override valores = ['latina', 'anglica']
  get signum(): 'en' | 'la' {
    return this.massa === 'anglica' ? 'en' : 'la'
  }
  get scriptum(): string {
    return `@res/picta/${this.massa}.png`
  }
  responsus(): Promise<void> {
    return Promise.resolve(i18next.changeLanguage(this.signum)).then()
  }
}

@Ultimum
@Ignavum
class Facies extends Crustulum<string> {
  override valores = ['fusca', 'illustris']
  get signum(): 'light' | 'dark' {
    return this.massa === 'illustris' ? 'light' : 'dark'
  }
  get scriptum(): 'light_mode' | 'dark_mode' {
    return `${this.signum}_mode`
  }
  async responsus() {
    useTheme().global.name.value = this.signum
  }

  get tonus(): Please.MakeColorResult {
    if (this.inhaesast)
      return Please.make_color({
        colors_returned: 1,
        saturation: 0.65,
        format: 'hex',
        value: 0.9,
        golden: true,
      })
    else
      return Please.make_color({
        colors_returned: 1,
        saturation: 0.75,
        format: 'hex',
        value: 0.55,
        golden: true,
      })
  }
}

@Ultimum
@Ignavum
class Separator extends Crustulum<string> {
  override valores = ['inane', 'interpunctum', 'nullum']
  get scriptum(): '' {
    return ''
  }
  get signum(): ' ' | '·' | '' {
    switch (this.massa) {
      case 'interpunctum':
        return '·'
      case 'nullum':
        return ''
      default:
        return ' '
    }
  }

  async responsus() {
    /*noop*/
  }
}

@Ultimum
@Ignavum
@Nuntius.factum
class Dominus {
  readonly separatores = {
    interpunctum: ' • ',
    inane: ' _ ',
    nullum: '   ',
  } as const

  private readonly _sessio: Sessio = new Sessio()
  readonly apices: Apices = new Apices()
  readonly utendaU: UtendaU = new UtendaU()
  readonly magnas: Magnas = new Magnas()
  readonly assensus: Assensus = new Assensus()
  readonly facies: Facies = new Facies()
  readonly lingua: Lingua = new Lingua()
  readonly separator: Separator = new Separator()

  readonly crustula: Crustulum<Valor>[] = [this.apices, this.utendaU, this.magnas, this._sessio, this.assensus, this.facies, this.lingua, this.separator] as const

  quaeram(nomen: string): boolean {
    return this.inveniam(nomen) !== undefined
  }

  inveniam(nomen: string): string | undefined {
    return getCookie(nomen)
  }

  async ponam(nomen: string, valor: string, finis: Date) {
    setCookie(nomen, valor, {
      secure: process.env['NODE_ENV'] === 'production',
      domain: 'conans',
      sameSite: 'strict',
      expires: finis,
    })
  }

  inhaereantur() {
    this.crustula.forEach((crustulum) => {
      if (!crustulum.coctast) crustulum.inhaereatur()
    })
  }

  deleantur() {
    this.crustula.forEach((crustulum) => {
      if (crustulum.coctast) crustulum.deleatur()
    })
  }

  proferantur() {
    this.crustula.forEach((crustulum) => {
      if (crustulum.coctast) crustulum.proferatur()
    })
  }

  get sedit(): boolean {
    return this._sessio.signum
  }

  sedeat() {
    this._sessio.massa = crypto.randomUUID()
  }

  stet() {
    this._sessio.deleatur()
  }
}

const dominus: Dominus = new Dominus()

export default dominus
