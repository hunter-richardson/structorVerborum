import type { CookieAttributes } from 'node_modules/typescript-cookie/dist/types';
import { getCookie, setCookie } from 'typescript-cookie';
import Ignavum from './ignavum';
import Nuntius from './nuntius';

type Optanda = {
  nomen: string,
  inhaesus?: string,
  possibiles?: string[];
};

@Nuntius.factum('Crustulum')
class Crustulum {
  private static readonly _optiones: CookieAttributes = {
    domain: 'conans',
    expires: 30,
    sameSite: 'strict',
    secure: true
  };

  readonly nomen: string;
  readonly possibiles: string[];
  readonly inhaesus: string;

  constructor (optanda: Optanda) {
    this.nomen = optanda.nomen;
    this.possibiles = optanda.possibiles ?? [ 'ita', 'non' ];
    this.inhaesus = optanda.inhaesus ?? this.possibiles.first();
  }

  @Nuntius.modus('Crustulum')
  edatur (): string {
    return getCookie(this.nomen) ?? this.inhaesus;
  }

  @Nuntius.modus('Crustulum')
  cocutust (): boolean {
    return !!getCookie(this.nomen);
  }

  @Nuntius.modus('Crustulum')
  coquatur (valor?: string): void {
    const inhaerendus: boolean = ![ valor && this.possibiles.includes(valor) ].all();
    setCookie(this.nomen, inhaerendus ? this.inhaesus : valor, Crustulum._optiones);
  }

  @Nuntius.modus('Crustulum')
  est (valor?: string): boolean | undefined {
    if (valor) {
      return valor === this.edatur();
    } else {
      switch (this.edatur()) {
        case 'ita':
          return true;
        case 'non':
          return false;
        default:
          return undefined;
      }
    }
  }

  @Nuntius.modus('Crustulum')
  interverteUtrum (): void {
    const valor: string = this.edatur();
    if ([
      this.possibiles.length === 2,
      this.possibiles.includes(valor)
    ].all()) {
      this.coquatur(this.possibiles[ +!this.possibiles.indexOf(valor) ]);
    }
  }
}

class Separator extends Crustulum {
  private readonly _res: Map<string, string> = new Map([
    {
      clavis: 'inane',
      valor: ' '
    }, {
      clavis: 'interpunctum',
      valor: '·'
    }, {
      clavis: 'nullum',
      valor: ''
    },
  ].map(res => [ res.clavis, res.valor ]));

  constructor () {
    super({
      nomen: 'separator',
      possibiles: [ 'inane', 'interpunctum', 'nullum' ]
    });
  }

  littera (): string {
    return this._res.get(this.edatur()) ?? ' ';
  }
}

export default class Crustula {
  static readonly se: Ignavum<Crustula> = new Ignavum(() => new Crustula);

  readonly apices: Crustulum = new Crustulum({ nomen: 'apices' });
  readonly utendaU: Crustulum = new Crustulum({ nomen: 'utendaU' });

  readonly magnas: Crustulum = new Crustulum({
    nomen: 'magnas',
    inhaesus: 'non'
  });

  readonly assensus: Crustulum = new Crustulum({
    nomen: 'assensus',
    possibiles: [ '', 'assensit', 'negavit' ]
  });

  readonly facies: Crustulum = new Crustulum({
    nomen: 'facies',
    possibiles: [ 'fusca', 'illustris' ]
  });

  readonly lingua: Crustulum = new Crustulum({
    nomen: 'lingua',
    possibiles: [ 'latina', 'anglica' ]
  });

  readonly separator: Separator = new Separator;
}
