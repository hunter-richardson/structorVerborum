import { Caesor } from './caesor';
import Nuntius from './nuntius';
import '../extensions/array';
import { agendorum } from '../lectores/lector';
import { Ignavum, Ultimum } from '../miscella/usus';
import { Elementum } from '../praebeunda/elementa';
import { Agendum, Multiplex } from '../praebeunda/verba';
import { Fultum, type Lineae } from '../praebeunda/valores'
import type { Refector } from '../refectores/refector';

export type Par = { [ clavis: string ]: string }

@Ignavum abstract class Tabula<Hoc extends Multiplex> {
  private static aequantur (par: Par, fultum: Fultum<Lineae>): boolean {
    const [ clavis, valor ]: string[] = Object.entries(par)[ 0 ]
    return [ clavis === fultum.nomen, valor === fultum.valor ].all()
  }

  private static cola<Istud extends Multiplex> (ista: Istud[],
    parametra: {
      radix?: string,
      fulta: Par[]
    }): Istud[] {
    return ista.filter((istud) => [
      istud.scriptum.startsWith(parametra.radix ?? ''),
      istud.valores.every((valor) =>
        parametra.fulta.every((fultum) => Tabula.aequantur(fultum, valor)))
    ].all())
  }

  protected _haec: Hoc[] = []
  get haec (): Hoc[] { return this._haec }

  @Nuntius.modus
  monstrentur (): string[] {
    return [
      ...new Set(this._haec.map((hoc) =>
        hoc.valores.map(valor =>
          `${valor.nomen}: ${valor.valor}`))
        .flat().sort())
    ]
  }

  colantur (radix: string): Hoc[];
  colantur (...fulta: Par[]): Hoc[];
  colantur (radix: string, ...fulta: Par[]): Hoc[]

  @Nuntius.modus
  colantur (valor?: (string | Par), ...cetera: Par[]): Hoc[] {
    const temporalia: Hoc[] =
      Tabula.cola(this._haec,
        typeof valor === 'string' ?
          { radix: valor, fulta: cetera } :
          { fulta: [ valor as Par, ...cetera ] })
    this._haec.clear()
    temporalia.forEach((hoc) => this._haec.push(hoc))
    return this._haec
  }

  protected abstract tabularentur(): Promise<void>

  constructor() { this.tabularentur() }
}

abstract class TabulaLegans<Hoc extends Multiplex, Illud extends Elementum<Hoc>> extends Tabula<Hoc> {
  @Nuntius.promittum
  protected legantur (): Promise<Agendum<Hoc>[]> {
    return (async () => {
      return agendorum<Hoc>(this.illud.scapum).legatur(this.illud.versio) ?? []
    })()
  }

  constructor(protected readonly structor: new () => Hoc,
              protected readonly illud: Illud) { super() }
}

@Ultimum @Ignavum @Nuntius.factum
export class TabulaDerecta<Hoc extends Multiplex, Illud extends Elementum<Hoc>> extends TabulaLegans<Hoc, Illud> {
  static readonly nomina: string[] = ['structor', 'illud' ] as const

  @Nuntius.modus
  async tabularentur() {
    (await this.legantur()).forEach((agendum) =>
      this._haec.push(Multiplex.componatur(this.structor, agendum)))
  }

  constructor(structor: new () => Hoc, illud: Illud) { super(structor, illud) }
}

@Ultimum @Ignavum @Nuntius.factum
export class TabulaRegula<Hoc extends Multiplex, Illud extends Elementum<Hoc>> extends TabulaLegans<Hoc, Illud> {
  static readonly nomina: string[] = [ 'structor', 'illud', 'caesor', 'refector' ] as const

  @Nuntius.modus
  async tabularentur() {
    const agenda: Agendum<Hoc>[] = await this.legantur()
    if(this.refector) this.refector.frangentur(agenda)
    for (let numerus: number = 0; numerus < agenda.length; numerus++) {
      const radix: string = this.caesor.caedatur(this.illud, agenda[ numerus ].valores)
      if (!radix) agenda.slice(numerus, 1)
      else agenda[ numerus ].scriptum = `${radix}${agenda[ numerus ].scriptum}`
      this._haec.push(Multiplex.componatur(this.structor, agenda[ numerus ]))
    }
  }

  constructor (structor: new () => Hoc, illud: Illud,
               private readonly caesor: Caesor<Hoc, Illud>,
               private readonly refector: Refector<Hoc> | null = null)
  { super(structor, illud); }
}

export { Tabula }
