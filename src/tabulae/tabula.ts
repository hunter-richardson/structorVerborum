import equal from 'fast-deep-equal'
import path from 'path'
import { Fultum, Res, type Lineae, type Numeratum } from '@/praebeunda/valores'
import { type Agendum, Multiplex } from '@/praebeunda/verba'
import { TabulaCircumfixa } from '@/tabulae/circumfixa'
import { TabulaConiuncta } from '@/tabulae/coniuncta'
import { LectorMultiplex } from '@/miscella/lector'
import { Tabulator } from '@/praebeunda/interfecta'
import { Tabulamen } from '@/praebeunda/tabulamina'
import { TabulaPraefixa } from '@/tabulae/praefixa'
import { Ignavum, Ultimum } from '@/miscella/usus'
import { TabulaCollata } from '@/tabulae/collata'
import TabulaRescripta from '@/tabulae/rescripta'
import { TabulaSuffixa } from '@/tabulae/suffixa'
import TabulaIrregula from '@/tabulae/irregula'
import { TabulaFissa } from '@/tabulae/fissa'
import TabulaBifissa from '@/tabulae/bifissa'
import Refector from '@/miscella/refector'
import Nuntius from '@/miscella/nuntius'
import Caesor from '@/miscella/caesor'
import '@/extensions/array'

type Par = { [clavis: string]: string }

export function tabulast<Hoc extends Multiplex>(tabulendum: Tabula<Hoc> | Tabulator<Hoc>): tabulendum is Tabula<Hoc> {
  return 'haec' in tabulendum
}

export function tabulatorst<Hoc extends Multiplex>(tabulendum: Tabula<Hoc> | Tabulator<Hoc>): tabulendum is Tabulator<Hoc> {
  return 'tabula' in tabulendum
}

@Ignavum
abstract class Tabula<Hoc extends Multiplex> {
  static async regula<Hoc extends Multiplex, Illud extends Tabulamen<Hoc>>(structor: new () => Hoc, illud: Illud): Promise<TabulaRegula<Hoc, Illud>> {
    const ista = new TabulaRegula(structor, illud)
    await ista.tabulentur()
    return ista
  }

  static async derecta<Hoc extends Multiplex, Illud extends Tabulamen<Hoc>>(structor: new () => Hoc, illud: Illud): Promise<TabulaDerecta<Hoc, Illud>> {
    const ista = new TabulaDerecta(structor, illud)
    await ista.tabulentur()
    return ista
  }

  static async bifissa<Hoc extends Multiplex & Numeratum>(singularis: Tabula<Hoc> | Tabulator<Hoc>, pluralis: Tabula<Hoc> | Tabulator<Hoc>): Promise<TabulaBifissa<Hoc>> {
    const ista = new TabulaBifissa(singularis, pluralis)
    await ista.tabulentur()
    return ista
  }

  static async collata<Hoc extends Multiplex>(...colligenda: (Tabula<Hoc> | Tabulator<Hoc>)[]): Promise<TabulaCollata<Hoc>> {
    const ista = new TabulaCollata(colligenda)
    await ista.tabulentur()
    return ista
  }

  static async coniuncta<Hoc extends Multiplex>(prima: Tabula<Hoc> | Tabulator<Hoc>, secunda: Tabula<Hoc> | Tabulator<Hoc>): Promise<TabulaConiuncta<Hoc>> {
    const ista = new TabulaConiuncta(prima, secunda)
    await ista.tabulentur()
    return ista
  }

  static async fissa<Hoc extends Multiplex>(relata: Tabula<Hoc> | Tabulator<Hoc>, scriptura: string) {
    const ista = new TabulaFissa(relata, scriptura)
    await ista.tabulentur()
    return ista
  }

  static async rescripta<Hoc extends Multiplex>(relata: Tabula<Hoc> | Tabulator<Hoc>, rescriptor: (scriptum: string) => string): Promise<TabulaRescripta<Hoc>> {
    const ista = new TabulaRescripta(relata, rescriptor)
    await ista.tabulentur()
    return ista
  }

  static async irregula<Hoc extends Multiplex>(structor: new () => Hoc, lemma: string): Promise<TabulaIrregula<Hoc>> {
    const ista = new TabulaIrregula(structor, lemma)
    await ista.tabulentur()
    return ista
  }

  static async praefixa<Hoc extends Multiplex>(praefixum: string, relata: Tabula<Hoc> | Tabulator<Hoc>): Promise<TabulaPraefixa<Hoc>> {
    const ista = new TabulaPraefixa(praefixum, relata)
    await ista.tabulentur()
    return ista
  }

  static async suffixa<Hoc extends Multiplex>(relata: Tabula<Hoc> | Tabulator<Hoc>, suffixum: string): Promise<TabulaSuffixa<Hoc>> {
    const ista = new TabulaSuffixa(relata, suffixum)
    await ista.tabulentur()
    return ista
  }

  static async circumfixa<Hoc extends Multiplex>(praefixum: string, relata: Tabula<Hoc> | Tabulator<Hoc>, suffixum: string): Promise<TabulaCircumfixa<Hoc>> {
    const ista = new TabulaCircumfixa(praefixum, relata, suffixum)
    await ista.tabulentur()
    return ista
  }

  private static aequantur(par: Par, fultum: Fultum<Lineae>): boolean {
    const [clavis, valor]: string[] = Object.entries(par)[0]
    return [clavis === fultum.nomen, valor === fultum.valor].all
  }

  private static cola<Istud extends Multiplex>(
    ista: Istud[],
    parametra: {
      radix: string
      fulta: Record<string, string>
    },
  ): Istud[] {
    return ista.filter((istud) => [istud.scriptum.startsWith(parametra.radix), istud.valores.every((valor) => Object.entries(parametra.fulta).every(([clavis, clavus]) => Tabula.aequantur({ [clavis]: clavus }, valor)))].all)
  }

  protected _haec: Hoc[] = []
  get haec(): Hoc[] {
    return this._haec
  }

  @Nuntius.captor get monstrentur(): string[] {
    return this._haec
      .map((hoc) => hoc.valores)
      .flat()
      .sort(Res.ordinentur)
      .map((res) => `${res.nomen}: ${res.valor}`).unique
  }

  @Nuntius.modus colantur(parametra: { radix: string; fulta: Record<string, string> }): Hoc[] {
    this._haec.clear()
    Tabula.cola(this._haec, parametra).forEach((hoc) => this._haec.push(hoc))
    return this._haec
  }

  protected abstract tabulentur(): Promise<void>
}

abstract class TabulaLegans<Hoc extends Multiplex, Illud extends Tabulamen<Hoc>> extends Tabula<Hoc> {
  @Nuntius.promittum protected legantur(): Promise<Agendum<Hoc>[]> {
    return (async () => {
      const via: string = path.join('tabulae/principia', this.illud.scapum)
      return (await new LectorMultiplex<Agendum<Hoc>>(via, this.structor).legatur(this.illud.principium)).multa
    })()
  }

  constructor(
    protected readonly structor: new () => Hoc,
    protected readonly illud: Illud,
  ) {
    super()
  }
}

@Ultimum
@Ignavum
@Nuntius.factum
export class TabulaDerecta<Hoc extends Multiplex, Illud extends Tabulamen<Hoc>> extends TabulaLegans<Hoc, Illud> {
  @Nuntius.promittum async tabulentur() {
    ;(await this.legantur()).forEach((agendum) => this._haec.push(Multiplex.componatur(this.structor, agendum)))
  }

  constructor(structor: new () => Hoc, illud: Illud) {
    super(structor, illud)
    this.tabulentur()
  }
}

@Ultimum
@Ignavum
@Nuntius.factum
export class TabulaRegula<Hoc extends Multiplex, Illud extends Tabulamen<Hoc>> extends TabulaLegans<Hoc, Illud> {
  @Nuntius.promittum async tabulentur() {
    let refector: Refector<Hoc> | undefined
    if (this.illud.scriptura !== undefined && !this.illud.scriptura.empty) refector = new Refector<Hoc>(this.illud.scriptura)
    const agenda: Agendum<Hoc>[] = await this.legantur()
    if (this.illud.vices !== undefined && !this.illud.vices.empty) {
      const via: string = path.join('tabulae/vices', this.illud.scapum)
      const vicaria: Agendum<Hoc>[] = (await new LectorMultiplex<Agendum<Hoc>>(via, this.structor).legatur(this.illud.principium)).multa
      vicaria.forEach((vicarium) => {
        let repositum: boolean = false
        agenda.forEach((agendum) => {
          if (equal(vicarium.valores, agendum.valores)) {
            agendum.scriptum = vicarium.scriptum
            repositum = true
          }
        })
        if (!repositum) agenda.push(vicarium)
      })
    }
    const caesor: Caesor<Hoc, Illud> = new Caesor<Hoc, Illud>()
    agenda.forEach(async (agendum) => {
      const radix: string = await caesor.caedatur(this.illud, agendum.valores)
      agendum.scriptum = radix.empty ? '' : `${radix}${agendum.scriptum}`
    })
    if (refector !== undefined) refector.reficiatur(agenda)
    this._haec.push(...agenda.filter((agendum) => !agendum.scriptum.empty).map((agendum) => Multiplex.componatur(this.structor, agendum)))
  }

  constructor(structor: new () => Hoc, illud: Illud) {
    super(structor, illud)
    this.tabulentur()
  }
}

export { Tabula }
