import i18next from 'i18next';
import {
  getCookie,
  getCookies,
  removeCookie,
  setCookie
  } from 'typescript-cookie';
import { useTheme } from 'vuetify';
import Ignavum from './ignavum';
import Nuntius from './nuntius';

type Optiones = NonNullable<Parameters<typeof setCookie>[2]>

type Valor = string | boolean | number

@Nuntius.factum('Crustulum')
class Crustulum<Hoc extends Valor> {
  private static readonly _optiones: Optiones = {
    domain: 'conans',
    expires: 30,
    sameSite: 'strict',
    secure: import.meta.env.PROD
  }

  nomen!: string
  valores : string[] = ['ita', 'non']
  signator!: (valor: string) => Hoc
  auceps: (valor: Hoc) => void | Promise<void> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (valor) => window.location.reload()

  @Nuntius.futurus('Crustulum')
  async #coquatur (nomen: string, valor: string) {
    return new Promise<void>(() => setCookie(nomen, valor, Crustulum._optiones))
        .then(() => this.auceps(this.signator(valor)))
  }

  signetur(): Valor { return this.signator(this.massa) }

  #inhaesa(): string { return this.valores[0] }

  @Nuntius.captor('Crustulum')
  get massa (): string { return getCookie(this.nomen) ?? this.#inhaesa() }

  @Nuntius.modus('Crustulum')
  coctast(): boolean { return getCookie(this.nomen) !== undefined }

  @Nuntius.positor('Crustulum')
  set massa(valor: string) {
    if(this.massa !== valor && this.valores.includes(valor))
      this.#coquatur(this.nomen, valor)
  }

  @Nuntius.modus('Crustulum')
  concoctast (valor?: string): boolean | undefined { return this.massa == valor }

  @Nuntius.modus('Crustulum')
  interverteUtrum (): void {
    const valor: string = this.massa
    if ([
      this.valores.length === 2,
      this.valores.includes(valor)
    ].all()) {
      this.massa = this.valores[ +!this.valores.indexOf(valor) ]
    }
  }

  deleatur() { removeCookie(this.nomen) }
}

export class Crustula {
  readonly apices: Crustulum<boolean> = new Ignavum(Crustulum<boolean>, {
                                              nomen: 'apices',
                                              signator: (valor: string): boolean => valor === 'ita'
                                            }).hoc()
  readonly utendaU: Crustulum<boolean> = new Ignavum(Crustulum<boolean>, {
                                               nomen: 'utendaU',
                                               signator: (valor: string): boolean => valor === 'ita'
                                             }).hoc()

  readonly magnas: Crustulum<boolean> = new Ignavum(Crustulum<boolean>, {
                                              nomen: 'magnas',
                                              valores: [ 'non', 'ita' ],
                                              signator: (valor: string): boolean => valor === 'ita'
                                            }).hoc()

  readonly assensus: Crustulum<string> = new Ignavum(Crustulum<string>, {
                                               nomen: 'assensus',
                                               valores: [ '', 'assensit', 'negavit' ],
                                               signator: (valor: string): string => valor,
                                               // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                               auceps: async (valor)  => {}
                                             }).hoc()

  readonly facies: Crustulum<string> = new Ignavum(Crustulum<string>, {
                                             nomen: 'facies',
                                             valores: [ 'fusca', 'illustris' ],
                                             signator: (valor: string): string => {
                                               switch(valor) {
                                                 case 'fusca': return 'dark'
                                                 case 'illustris': return 'light'
                                                 default: return ''
                                               }
                                             }, auceps: (valor: Valor) =>
                                                    new Promise<void>(() => { useTheme().global.name.value = valor.toString() })
                                                          .then(() => window.location.reload())
                                           }).hoc()

  readonly lingua: Crustulum<string> = new Ignavum(Crustulum<string>, {
                                             nomen: 'lingua',
                                             valores: [ 'latina', 'anglica' ],
                                             signator: (valor: string): string => {
                                               switch(valor) {
                                                 case 'latina': return 'la'
                                                 case 'anglica': return 'en'
                                                 default: return ''
                                               }
                                             }, auceps: (valor: Valor) =>
                                                   i18next.changeLanguage(valor.toString())
                                                          .then(() => window.location.reload())
                                           }).hoc()

  readonly separator: Crustulum<string> = new Ignavum(Crustulum<string>, {
                                                nomen: 'separator',
                                                valores: [ 'inane', 'interpunctum', 'nullum' ],
                                                signator: (valor: string): string => {
                                                  switch(valor) {
                                                    case 'inane': return ' '
                                                    case 'interpunctum': return '·'
                                                    case 'nullum': return ''
                                                    default: return ''
                                                  }
                                                }
                                              }).hoc()

  nominaCocta(): string[] { return Object.keys(getCookies()) }
}

export const crustula = new Ignavum(Crustula)
