import equal from 'fast-deep-equal';
import path from 'path';
import '../extensions/array';
import Caesor from '../miscella/caesor';
import { LectorMultiplex } from '../miscella/lector';
import Nuntius from '../miscella/nuntius';
import Refector from '../miscella/refector';
import { Ignavum, Ultimum } from '../miscella/usus';
import { Tabulamen } from '../praebeunda/tabulamina';
import { type Agendum, Multiplex } from '../praebeunda/verba';
import { Fultum, Res, type Lineae } from '../praebeunda/valores'
import { type Tabulator } from '../praebeunda/interfecta';

export type Par = { [ clavis: string ]: string }

export function tabulast<Hoc extends Multiplex>
(tabulendum: Tabula<Hoc> | Tabulator<Hoc>): tabulendum is Tabula<Hoc>
{ return 'haec' in tabulendum }

export function tabulatorst<Hoc extends Multiplex>
(tabulendum: Tabula<Hoc> | Tabulator<Hoc>): tabulendum is Tabulator<Hoc>
{ return 'tabula' in tabulendum }

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

  @Nuntius.captor
  get monstrentur (): string[] {
    return this._haec.map((hoc) => hoc.valores)
                     .flat().sort(Res.ordinentur)
                     .map((res) => `${res.nomen}: ${res.valor}`)
                     .unique()
  }

  colantur (radix: string): Hoc[]
  colantur (...fulta: Par[]): Hoc[]
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

  protected abstract tabulentur(): Promise<void>
}

abstract class TabulaLegans<Hoc extends Multiplex, Illud extends Tabulamen<Hoc>> extends Tabula<Hoc> {
  @Nuntius.promittum
  protected legantur (): Promise<Agendum<Hoc>[]> {
    return (async () => {
      const via: string = path.join('tabulae/principia', this.illud.scapum)
      return (await new LectorMultiplex<Agendum<Hoc>>(via, this.structor)
              .legatur(this.illud.principium)).multa
    })()
  }

  constructor(protected readonly structor: new () => Hoc,
              protected readonly illud: Illud) { super() }
}

@Ultimum @Ignavum @Nuntius.factum
export class TabulaDerecta<Hoc extends Multiplex, Illud extends Tabulamen<Hoc>> extends TabulaLegans<Hoc, Illud> {
  @Nuntius.promittum async tabulentur() {
    (await this.legantur()).forEach((agendum) =>
      this._haec.push(Multiplex.componatur(this.structor, agendum)))
  }

  constructor(structor: new () => Hoc, illud: Illud)
  { super(structor, illud); this.tabulentur() }
}

@Ultimum @Ignavum @Nuntius.factum
export class TabulaRegula<Hoc extends Multiplex, Illud extends Tabulamen<Hoc>> extends TabulaLegans<Hoc, Illud> {
  @Nuntius.promittum async tabulentur() {
    let refector: Refector<Hoc> | undefined
    if (this.illud.scriptura !== undefined && this.illud.scriptura.length > 0)
      refector = new Refector<Hoc>(this.illud.scriptura)
    const agenda: Agendum<Hoc>[] = await this.legantur();
    if (this.illud.vices !== undefined && this.illud.vices.length > 0) {
      const via: string = path.join('tabulae/vices', this.illud.scapum)
      const vicaria: Agendum<Hoc>[] =
      (await new LectorMultiplex<Agendum<Hoc>>(via, this.structor)
                   .legatur(this.illud.principium)).multa
      vicaria.forEach((vicarium) => {
        let repositum: boolean = false;
        agenda.forEach((agendum) => {
          if (equal(vicarium.valores, agendum.valores))
          { agendum.scriptum = vicarium.scriptum; repositum = true }
        }); if (!repositum) agenda.push(vicarium)
      })
    } const caesor: Caesor<Hoc, Illud> = new Caesor<Hoc, Illud>()
    agenda.forEach(async (agendum) => {
      const radix: string = await caesor.caedatur(this.illud, agendum.valores)
      agendum.scriptum = radix.length > 0 ? `${radix}${agendum.scriptum}` : ''
    }); if(refector !== undefined) refector.reficiatur(agenda)
    this._haec.push(
      ...agenda.filter((agendum) => agendum.scriptum.length > 0)
               .map((agendum) => Multiplex.componatur(this.structor, agendum)))
  }

  constructor (structor: new () => Hoc, illud: Illud)
  { super(structor, illud); this.tabulentur() }
}

export { Tabula }
