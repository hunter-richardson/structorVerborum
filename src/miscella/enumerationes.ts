import Nuntius from './nuntius.ts';
import '../extensions/array.ts';
import '../extensions/string.ts';

export enum Encliticum {
  nullum = '',
  interrogans = 'ne',
  coniugans = 'que',
  eligens = 've'
}

export const enclitica: string[] = Object.keys(Encliticum);

export enum Mensa {
  Ianuarius,
  Februarius,
  Mars,
  Aprilis,
  Maius,
  Iunius,
  Iulius,
  Augustus,
  September,
  October,
  November,
  December
}

type linea<littera extends string> = littera extends '' ? never : littera;

type Valor<Fultum extends boolean, Valores extends readonly [ linea<string>, ...linea<string>[] ]> =
  Fultum extends true ? Valores[ number ] : Valores[ number ] | undefined;

export const errator: (res: Record<linea<string>, linea<string>>) => Error = (res: Record<string, string>) => {
  const [ clavis, valor ] = Object.entries(res)[ 0 ];
  return new Error(`Vetatu'st { ${clavis}: '${valor}' }`);
};

abstract class Res<Fultum extends boolean, Valores extends readonly [ linea<string>, ...linea<string>[] ]> {
  private _valor: Valor<Fultum, Valores>;

  private inhaesus (): Valor<Fultum, Valores> { return (this._fultum ? this.valores[ 0 ] : undefined) as Valor<Fultum, Valores>; }

  private valet (valor: string): valor is Valores[ number ] { return valor in this.valores; }

  inhaesust (): boolean { return this._valor === this.inhaesus(); }

  aequatur (valor: string): valor is Valores[ number ] { return this._valor === valor; }

  get valor (): Valor<Fultum, Valores> {
    Nuntius.noto({
      nomen: this.nomen,
      nuntium: `Reddo rem { ${this.nomen}: ${this._valor} }`
    }); return this._valor;
  }

  set valor (valor: string) {
    Nuntius.noto({
      nomen: this.nomen,
      nuntium: `Initu'st positor ${this.nomen}`
    }); if (this.valet(valor)) {
      this._valor = valor;
      Nuntius.noto({
        nomen: this.nomen,
        nuntium: `Posui rem { ${this.nomen}: ${this._valor} }`
      });
    } else {
      Nuntius.timeo({
        nomen: this.nomen,
        nuntium: `Invalidu'st { ${this.nomen}: ${this._valor} }`
      }); throw errator({ [ this.nomen ]: valor });
    }
  }

  constructor (private readonly _fultum: Fultum,
    protected readonly nomen: string,
    protected readonly valores: Valores) {
    this._valor = this.inhaesus();
    Object.defineProperty(this, this.nomen,
      { value: this._valor, enumerable: true, writable: true });
  }
}

class Fultum<Valores extends readonly [ string, ...string[] ]> extends Res<true, Valores> {
  constructor (_nomen: string, _valores: Valores) { super(true, _nomen, _valores); }
}

class Fictum<Valores extends readonly [ string, ...string[] ]> extends Res<false, Valores> {
  constructor (_nomen: string, _valores: Valores) { super(false, _nomen, _valores); }
}

export const categoriae: [ linea<string>, ...linea<string>[] ] =
  [ 'actus', 'adiectivum', 'adverbium', 'coniunctio', 'nomen', 'numerale', 'numeramen', 'praepositio', 'pronomen' ] as const;
export const casus: [ linea<string>, ...linea<string>[] ] =
  [ 'derectus', 'nominativus', 'genitivus', 'dativus', 'accusativus', 'ablativus', 'vocativus', 'locativus' ] as const;
export const modi: [ linea<string>, ...linea<string>[] ] =
  [ 'infinitivus', 'indicativus', 'subiunctivus', 'imperativus', 'participium' ] as const;
export const referenda: [ linea<string>, ...linea<string>[] ] =
  [ 'numerus', 'ordinale', 'cardinale', 'adverbium', 'multiplicativum', 'distributivum', 'fractionale' ] as const;
export const tempora: [ linea<string>, ...linea<string>[] ] =
  [ 'nullum', 'praesens', 'infectum', 'futurum', 'perfectum', 'plusquamperfectum', 'exigendum' ] as const;
export const genera: [ linea<string>, ...linea<string>[] ] =
  [ 'neutrum', 'masculinum', 'femininum' ] as const;
export const gradus: [ linea<string>, ...linea<string>[] ] =
  [ 'positivus', 'comparativus', 'superlativus' ] as const;
export const personae: [ linea<string>, ...linea<string>[] ] =
  [ 'nulla', 'prima', 'secunda', 'tertia' ] as const;
export const numeri: [ linea<string>, ...linea<string>[] ] =
  [ 'nullus', 'singularis', 'pluralis' ] as const;
export const voces: [ linea<string>, ...linea<string>[] ] =
  [ 'nulla', 'activa', 'passiva' ] as const;
export const facta: [ linea<string>, ...linea<string>[] ] =
  [ 'nullum', 'infinitivum', 'gerundium', 'supinum' ] as const;

export function inflectenda (categoria: string) {
  return [
    'coniunctio',
    'numerale',
    'praepositio'
  ].excludes(categoria);
}

export class Categoria extends Fictum<typeof categoriae> {
  static categoria(valor: string): Categoria {
    const temporalis: Categoria = new Categoria
    temporalis.valor = valor
    return temporalis
  }

  inflectenda (): boolean { return inflectenda(this.valor ?? ''); }
  constructor () { super('categoria', categoriae); }
}

export class Casus extends Fultum<typeof casus> {
  static casus(valor: string): Casus {
    const temporalis: Casus = new Casus
    temporalis.valor = valor
    return temporalis
  }

  constructor () { super('casus', casus); }
}
export class Modus extends Fultum<typeof modi> {
  static modus(valor: string): Modus {
    const temporalis: Modus = new Modus
    temporalis.valor = valor;
    return temporalis
  }

  constructor () { super('modus', modi); }
}
export class Genus extends Fultum<typeof genera> {
  static genus(valor: string): Genus {
    const temporale: Genus = new Genus
    temporale.valor = valor
    return temporale
  }

  constructor () { super('genus', genera); }
}
export class Gradus extends Fultum<typeof gradus> {
  static gradus(valor: string): Gradus {
    const temporalis: Gradus = new Gradus
    temporalis.valor = valor
    return temporalis
  }

  constructor () { super('gradus', gradus); }
}
export class Factum extends Fultum<typeof facta> {
  static factum(valor: string): Factum {
    const temporale: Factum = new Factum
    temporale.valor = valor;
    return temporale
  }

  constructor () { super('factum', facta); }
}

export class Numerus extends Fultum<typeof numeri> {
  static numerus(valor: string) {
    const temporalis: Numerus = new Numerus
    temporalis.valor = valor
    return temporalis
  }

  constructor () { super('numerus', numeri); }
}

export class Persona extends Fultum<typeof personae> {
  static persona(valor: string): Persona {
    const temporalis: Persona = new Persona
    temporalis.valor = valor
    return temporalis
  }

  constructor () { super('persona', personae); }
}
export class Referendum extends Fultum<typeof referenda> {
  static referendum(valor: string): Referendum {
    const temporale: Referendum = new Referendum
    temporale.valor = valor;
    return temporale
  }

  constructor () { super('referendum', referenda); }
}

export class Tempus extends Fultum<typeof tempora> {
  static tempus(valor: string): Tempus {
    const temporale: Tempus = new Tempus
    temporale.valor = valor
    return temporale
  }

  constructor () { super('tempus', tempora); }
}

export class Vox extends Fultum<typeof voces> {
  static vox(valor: string): Vox {
    const temporalis: Vox = new Vox
    temporalis.valor = valor
    return temporalis
  }

  constructor () { super('vox', voces); }
}

export const inflectendae: linea<string>[] =
  categoriae.filter((categoria) => inflectenda(categoria));
