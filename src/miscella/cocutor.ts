import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import Ignavum from './ignavum'
import Nuntius from './nuntius'
import type { CookieAttributes } from 'node_modules/typescript-cookie/dist/types'

export type Crustulum = {
  nomen: string
  valor: string
}

@Nuntius.factum('Cocutor')
export default class Cocutor {
  static se: Ignavum<Cocutor> = new Ignavum(() => new Cocutor())

  private readonly _optiones: CookieAttributes = {
    domain: 'conans',
    expires: 30,
    sameSite: 'strict',
    secure: true
  }

  @Nuntius.modus('Cocutor')
  coquatur(crustulum: Crustulum): void {
    setCookie(crustulum.nomen, crustulum.valor, this._optiones)
  }

  @Nuntius.modus('Cocutor')
  edatur(nomen: string): string | undefined {
    return getCookie(nomen)
  }

  @Nuntius.modus('Cocutor')
  voreatur(nomen: string): string | undefined {
    const esum: string | undefined = this.edatur(nomen)
    removeCookie(nomen, {
      domain: this._optiones.domain
    })

    return esum
  }

  @Nuntius.modus('Cocutor')
  coctust(nomen: string): boolean {
    return !!this.edatur(nomen)
  }

  @Nuntius.modus('Cocutor')
  est(nomen: string): boolean | undefined {
    const valor: string | undefined = this.edatur(nomen)
    switch (valor) {
      case 'ita':
        return true
      case 'non':
        return false
      default:
        return undefined
    }
  }
}
