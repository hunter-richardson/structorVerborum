import '../extensions/array';
import '../extensions/string';
import Nuntius from '../miscella/nuntius';
import { type SortResult, comparison } from '../extensions/utils'

export enum Encliticus {
  nullus = '',
  interrogans = 'ne',
  coniugans = 'que',
  eligens = 've'
}

export const enclitici: string[] = Object.keys(Encliticus)

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

type linea<littera extends string> = littera extends '' ? never : littera

export type Lineae = readonly [ linea<string>, ...linea<string>[] ]

export type Valor<Vexillum extends boolean, Valores extends Lineae> =
  Vexillum extends true ? Valores[ number ] : Valores[ number ] | undefined

export const errator: (res: { [ clavis: PropertyKey ]: string }) => Error =
  (res: { [ clavis: PropertyKey ]: string }) => {
    const [ clavis, valor ] = Object.entries(res)[ 0 ]
    return new Error(`Vetatu'st { ${clavis}: '${valor}' }`)
  }

export abstract class Res<Vexillum extends boolean, Valores extends Lineae> {
  static ordinentur: <Hoc extends Res<boolean, Lineae>>(primum: Hoc, secundum: Hoc) => SortResult =
    comparison([
      (hoc) => hoc.nomen, (hoc) => `${hoc.valor}`
    ])

  private _valor: Valor<Vexillum, Valores>

  private get inhaesus (): Valor<Vexillum, Valores>
  { return (this._fultum ? this._valores[ 0 ] : undefined) as Valor<Vexillum, Valores> }

  private valet (valor: string): valor is Valores[ number ] { return valor in this._valores }

  get inhaesust (): boolean { return this._valor === this.inhaesus }

  aequatur (valor: string): valor is Valores[ number ] { return this._valor === valor }

  reponatur (res: Res<Vexillum, Valores>) { this.valor = res.valor || this.inhaesus }

  get nomen (): string { return this.constructor.name.toLowerCase() }

  get valor (): Valor<Vexillum, Valores> {
    Nuntius.noto({
      nomen: this.nomen,
      nuntium: `Reddo rem { ${this.nomen}: ${this._valor} }`
    }); return this._valor
  }

  set valor (valor: string | undefined) {
    Nuntius.noto({
      nomen: this.nomen,
      nuntium: `Initu'st positor ${this.nomen}`
    }); if (!valor || this.valet(valor)) {
      this._valor = valor || this.inhaesus
      Nuntius.noto({
        nomen: this.nomen,
        nuntium: `Posui rem { ${this.nomen}: ${this._valor} }`
      })
    } else {
      Nuntius.timeo({
        nomen: this.nomen,
        nuntium: `Invalidu'st { ${this.nomen}: ${this._valor} }`
      }); throw errator({ [ this.nomen ]: valor })
    }
  }

  get valores (): Valores { return this._valores }

  constructor (private readonly _fultum: Vexillum,
               protected readonly _valores: Valores) {
    this._valor = this.inhaesus
    Object.defineProperty(this, this.nomen,
      { value: this._valor, enumerable: true, writable: true })
  }
}

export class Fultum<Valores extends Lineae> extends Res<true, Valores> {
  constructor (_valores: Valores) { super(true, _valores) }
}

class Fictum<Valores extends Lineae> extends Res<false, Valores> {
  constructor (_valores: Valores) { super(false, _valores) }
}

type FultiStructor<Hoc extends Fultum<Lineae>> = new (valores: Lineae) => Hoc

export class Fulta extends Array<Fultum<Lineae>> {
  private nominatur<Hoc extends FultiStructor<Fultum<Lineae>>> (hoc: unknown, parma: Hoc): hoc is InstanceType<Hoc> { return hoc instanceof parma }

  inveni (nomen: string): Fultum<Lineae> | undefined
  inveni<Hoc extends FultiStructor<Fultum<Lineae>>> (parma: Hoc): InstanceType<Hoc>
  inveni<Hoc extends FultiStructor<Fultum<Lineae>>> (valor: string | Hoc): (InstanceType<Hoc> | Fultum<Lineae> | undefined) {
    let fultum: Fultum<Lineae> | undefined = undefined
    if (typeof valor === 'string') {
      fultum = this.find((fultum) => fultum.nomen === valor)
      if (!fultum) throw new TypeError(`Nullu'st fultum nomine ${valor}`)
    } else {
      fultum = this.find((fultum) => fultum.nomen === valor.name.toLowerCase())
      if (!fultum) throw new TypeError(`Nullu'st fultum nomine ${valor.name}`)
      if (!this.nominatur(fultum, valor))
        throw new TypeError(`Malu'st fultum ${fultum.nomen} in classem ${valor.name}`)
    } return fultum
  }

  constructor (prima: Fultum<Lineae>, ...fulta: Fultum<Lineae>[]) { super(prima, ...fulta) }
}

export const categoriae: Lineae = [
  'actus', 'adiectivum', 'adverbium', 'coniunctio', 'nomen', 'numerale', 'numeramen', 'praepositio', 'pronomen'
] as const
export const casus: Lineae = [
  'derectus', 'nominativus', 'genitivus', 'dativus', 'accusativus', 'ablativus', 'vocativus', 'locativus'
] as const
export const modi: Lineae = [
  'infinitivus', 'indicativus', 'subiunctivus', 'imperativus', 'participium'
] as const
export const relaturi: Lineae = [
  'numerus', 'ordinale', 'cardinale', 'adverbium', 'multiplicativum', 'distributivum', 'fractionale'
] as const
export const tempora: Lineae = [
  'nullum', 'praesens', 'infectum', 'futurum', 'perfectum', 'plusquamperfectum', 'exigendum'
] as const
export const genera: Lineae = [ 'neutrum', 'masculinum', 'femininum' ] as const
export const gradus: Lineae = [ 'positivus', 'comparativus', 'superlativus' ] as const
export const personae: Lineae = [ 'nulla', 'prima', 'secunda', 'tertia' ] as const
export const numeri: Lineae = [ 'nullus', 'singularis', 'pluralis' ] as const
export const voces: Lineae = [ 'nulla', 'activa', 'passiva' ] as const
export const facti: Lineae = [ 'nullus', 'infinitivus', 'gerundius', 'supinus' ] as const
export const nomina: string[] = [
  'casus', 'categoria', 'factus', 'genus', 'gradus', 'modus', 'numerus', 'persona', 'relaturus', 'tempus', 'vox'
] as const
export const valores: string[] = [ ...new Set([ casus, facti, genera, gradus, modi, numeri, personae, relaturi, voces ]) ].flat()

export function inflectenda (categoria: string) {
  return [
    'coniunctio', 'numerale', 'praepositio'
  ].excludes(categoria)
}

export class Categoria extends Fictum<typeof categoriae> {
  static categoria (valor: string): Categoria {
    const temporalis: Categoria = new Categoria
    temporalis.valor = valor
    return temporalis
  }

  get inflectenda (): boolean { return inflectenda(this.valor ?? '') }
  constructor () { super(categoriae) }
}

export class Casus extends Fultum<typeof casus> {
  static casus (valor: string): Casus {
    const temporalis: Casus = new Casus
    temporalis.valor = valor
    return temporalis
  }

  constructor () { super(casus) }
}
export class Modus extends Fultum<typeof modi> {
  static modus (valor: string): Modus {
    const temporalis: Modus = new Modus
    temporalis.valor = valor
    return temporalis
  }

  constructor () { super(modi) }
}
export class Genus extends Fultum<typeof genera> {
  static genus (valor: string): Genus {
    const temporale: Genus = new Genus
    temporale.valor = valor
    return temporale
  }

  constructor () { super(genera) }
}
export class Gradus extends Fultum<typeof gradus> {
  static gradus (valor: string): Gradus {
    const temporalis: Gradus = new Gradus
    temporalis.valor = valor
    return temporalis
  }

  constructor () { super(gradus) }
}
export class Factus extends Fultum<typeof facti> {
  static factus (valor: string): Factus {
    const temporale: Factus = new Factus
    temporale.valor = valor
    return temporale
  }

  constructor () { super(facti) }
}

export class Numerus extends Fultum<typeof numeri> {
  static numerus (valor: string) {
    const temporalis: Numerus = new Numerus
    temporalis.valor = valor
    return temporalis
  }

  constructor () { super(numeri) }
}

export class Persona extends Fultum<typeof personae> {
  static persona (valor: string): Persona {
    const temporalis: Persona = new Persona
    temporalis.valor = valor
    return temporalis
  }

  constructor () { super(personae) }
}
export class Relaturus extends Fultum<typeof relaturi> {
  static referendum (valor: string): Relaturus {
    const temporale: Relaturus = new Relaturus
    temporale.valor = valor
    return temporale
  }

  constructor () { super(relaturi) }
}

export class Tempus extends Fultum<typeof tempora> {
  static tempus (valor: string): Tempus {
    const temporale: Tempus = new Tempus
    temporale.valor = valor
    return temporale
  }

  constructor () { super(tempora) }
}

export class Vox extends Fultum<typeof voces> {
  static vox (valor: string): Vox {
    const temporalis: Vox = new Vox
    temporalis.valor = valor
    return temporalis
  }

  constructor () { super(voces) }
}

export const inflectendae: linea<string>[] =
  categoriae.filter((categoria) => inflectenda(categoria))

export class Categoricum { categoria: Categoria = new Categoria }

export class Encliticum { protected _encliticus: Encliticus = Encliticus.nullus }

export class Casuale { casus: Casus = new Casus }

export class Factum { factus: Factus = new Factus }

export class Gradale { gradus: Gradus = new Gradus }

export class Generale { genus: Genus = new Genus }

export class Numeratum { numerus: Numerus = new Numerus }

export class Modestum { modus: Modus = new Modus }

export class Personale { persona: Persona = new Persona }

export class Relaturum { relaturus: Relaturus = new Relaturus }

export class Temporale { tempus: Tempus = new Tempus }

export class Vocale { vox: Vox = new Vox }
