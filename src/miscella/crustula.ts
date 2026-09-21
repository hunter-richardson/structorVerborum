import { getCookie, setCookie } from 'typescript-cookie';
import Ignavum from './ignavum';
import Nuntius from './nuntius';

@Nuntius.factum('Crustulum')
class Crustulum {
  private static readonly _optiones: {
    domain: 'conans',
    expires: 30,
    sameSite: 'strict',
    secure: true
  }

  public      nomen!: string
  public possibiles : string[] = ['ita', 'non']
  public inhaesus(): string { return this.possibiles[0] }

  @Nuntius.modus('Crustulum')
  edatur (): string { return getCookie(this.nomen) ?? this.inhaesus() }

  @Nuntius.modus('Crustulum')
  cocutust (): boolean { return !!getCookie(this.nomen) }

  @Nuntius.modus('Crustulum')
  coquatur (valor?: string): void {
    const inhaerendus: boolean = ![ valor && this.possibiles.includes(valor) ].all()
    setCookie(this.nomen, inhaerendus ? this.inhaesus() : valor, Crustulum._optiones)
  }

  @Nuntius.modus('Crustulum')
  est (valor?: string): boolean | undefined {
    if (valor) return valor === this.edatur()
    else {
      switch (this.edatur()) {
        case 'ita':
          return true
        case 'non':
          return false
        default:
          return undefined
      }
    }
  }

  @Nuntius.modus('Crustulum')
  interverteUtrum (): void {
    const valor: string = this.edatur()
    if ([
      this.possibiles.length === 2,
      this.possibiles.includes(valor)
    ].all()) {
      this.coquatur(this.possibiles[ +!this.possibiles.indexOf(valor) ])
    }
  }
}

class Separator extends Crustulum {
  private readonly _res: Map<string, string> = new Map([
    { clavis: 'inane',        valor: ' ' },
    { clavis: 'interpunctum', valor: '•' },
    { clavis: 'nullum',       valor: ''  },
  ].map(res => [ res.clavis, res.valor ]))

  override nomen: string = 'separator'
  override possibiles: string[] = [ 'inane', 'interpunctum', 'nullum' ]

  littera (): string { return this._res.get(this.edatur()) ?? ' ' }
}

export class Crustula {
  readonly apices: Crustulum = new Ignavum(Crustulum, { nomen: 'apices' }).hoc()
  readonly utendaU: Crustulum = new Ignavum(Crustulum, { nomen: 'utendaU' }).hoc()

  readonly magnas: Crustulum = new Ignavum(Crustulum, {
                                     nomen: 'magnas',
                                     possibiles: [ 'non', 'ita' ]
                                   }).hoc()

  readonly assensus: Crustulum = new Ignavum(Crustulum, {
                                       nomen: 'assensus',
                                       possibiles: [ '', 'assensit', 'negavit' ]
                                     }).hoc()

  readonly facies: Crustulum = new Ignavum(Crustulum, {
                                     nomen: 'facies',
                                     possibiles: [ 'fusca', 'illustris' ]
                                   }).hoc()

  readonly lingua: Crustulum = new Ignavum(Crustulum, {
                                     nomen: 'lingua',
                                     possibiles: [ 'latina', 'anglica' ]
                                   }).hoc()

  readonly separator: Separator = new Separator
}

export const crustula = new Ignavum(Crustula)
