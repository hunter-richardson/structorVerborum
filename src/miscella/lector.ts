import { CsvError, Options, parse } from 'csv-parse';
import fs from 'fs';
import path from 'path';
import { Writable } from 'stream';
import { buildRegExp, choiceOf } from 'ts-regex-builder';
import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import { Lectum } from '../praebeunda/interfecta';
import {
  TabulamenActus,
  TabulamenAdiectivi,
  TabulamenAdverbii,
  TabulamenFacti,
  TabulamenIncomparabilis,
  TabulamenNominis,
  TabulamenNumeraminis
  } from '../praebeunda/tabulamina';
import {
  errator,
  Lineae,
  nomina,
  Res
  } from '../praebeunda/valores';
import { Verbum } from '../praebeunda/verba';

export class Ulla<Hoc> extends Array<Hoc> {
  get unum (): Hoc { return this.first(); }
  get multa (): Hoc[] { return [ ...this ]; }

  constructor (haec?: Hoc | Hoc[])
  { super(...(haec === undefined ? [] : Array.isArray(haec) ? haec : [ haec ])) }
}

@Ignavum @Nuntius.factum
export class Lector<Hoc extends Lectum> implements Disposable {
  private haec: Hoc[] = []
  private via!: string

  private readonly scriptor: Writable = new Writable({
    objectMode: true,
    write: (res: Record<string, string>, _: any, vocator: () => void) => {
      const hoc: Hoc = new this.structor()
      for(const [ columna, crudum ] of Object.entries(res)) {
        try { this.ponatur(hoc, columna, crudum) }
        catch(error) {
          Nuntius.timeo({
            nomen: this.constructor.name,
            error: error as Error
          })
        }
      }; this.haec.push(hoc)
      return vocator()
    }
  })

  private readonly deConditis: RegExp =
      buildRegExp(choiceOf(
        /\p{Control}/u,
        /\p{Cf}/u), { global: true, unicode: true })

  private readonly optanda: Options = {
    skip_empty_lines: true,
    ignore_last_delimiters: true,
    group_columns_by_name: true,
    skip_records_with_error: true,
    columns: true, trim: true, comment: '#',
    cast: (valor: string): string | number => {
      valor = valor.replace(this.deConditis, '')
      return Number.isFinite(+valor) ? +valor : `${valor}`
    }, on_skip: (error?: CsvError, crudum?: string) => {
      let nuntium: string = error === undefined ? `Legere defectu'st lemmam ${this.via}` :
        `Invenita'st codicem ${error.code} ad ${this.via}`
      //  eslint-disable-next-line no-extra-boolean-cast
      if(!!crudum) nuntium = `${nuntium} ab ${crudum}`
      Nuntius.timeo({
        nomen: this.constructor.name,
        nuntium: nuntium,
        error: error
      }); return undefined
    }
  }

  private async aperiatur(): Promise<void> {
    this[Symbol.dispose]()
    Nuntius.noto({
      nomen: this.constructor.name,
      nuntium: `Lego lemmam ${this.via}`
    }); return new Promise(dissolvatur => {
      fs.createReadStream(this.via)
        .pipe(parse(this.optanda))
        .pipe(this.scriptor)
        .on('finish', () => {
          Nuntius.noto({
            nomen: this.constructor.name,
            nuntium: `Legere finitu'st lemmam ${this.via}`
          })
        }); dissolvatur()
    })
  }

  protected ponatur(hoc: Hoc, clavis: string, valor: string) {
    if(clavis in hoc) (hoc as unknown as { [clavis]: string })[clavis] = valor
    else throw errator({ [clavis]: valor })
  }

  @Nuntius.captor get omnia(): string[] {
    return fs.readdirSync('/path/to/your/directory')
  }

  @Nuntius.promittum async legatur(lemma: string): Promise<Ulla<Hoc>> {
    this.via = path.join(this.scapum, `${lemma}.csv`)
    await this.aperiatur()
    const numerus: number = Math.min(this.haec.length, 2)
    const eventus = {
      numerus: [ 'Nihil', 'Unum', 'Multa' ][numerus],
      haec: [ undefined, this.haec.first(), this.haec ][numerus]
    }; Nuntius.noto({
      nomen: this.constructor.name,
      nuntium: `${eventus.numerus} tulit lemma ${lemma}`
    }); return new Ulla(eventus.haec)
  }

  constructor(private scapum: string, private readonly structor: new () => Hoc)
  { this.scapum = path.join('@/res', scapum) }

  [Symbol.dispose]() { this.haec.length = 0 }
}

@Ignavum @Ultimum @Nuntius.factum export class LectorMultiplex<Hoc extends Lectum> extends Lector<Hoc> {
  private readonly positores: Record<string, (hoc: Hoc, valor: string | undefined) => void> =
    Object.fromEntries(nomina.map((nomen) => [ nomen, (hoc: Hoc, valor: string | undefined) => {
      const res = hoc as unknown as { [ nomen ]: Res<boolean, Lineae>; };
      if (!res) throw errator({ [ nomen ]: valor ?? '' });
      else res[ nomen ].valor = valor;
    } ]))

  override ponatur(hoc: Hoc, clavis: string, valor: string)
  { return this.positores[clavis]?.(hoc, valor) ?? super.ponatur(hoc, clavis, valor) }
}

export const verborum = new Lector<Verbum>('lemmae/verba', Verbum)
export const actuum = new LectorMultiplex<TabulamenActus>('lemmae/actus', TabulamenActus)
export const adiectivorum = new LectorMultiplex<TabulamenAdiectivi>('lemmae/adiectiva', TabulamenAdiectivi)
export const adverbiorum = new LectorMultiplex<TabulamenAdverbii>('lemmae/adverbia', TabulamenAdverbii)
export const incomparabilium = new LectorMultiplex<TabulamenIncomparabilis>('lemmae/adiectiva/incomparabilia', TabulamenIncomparabilis)
export const nominum = new LectorMultiplex<TabulamenNominis>('lemmae/nomina', TabulamenNominis)
export const nominumFactorum = new LectorMultiplex<TabulamenFacti>('lemmae/nomina/facta', TabulamenFacti)
export const numeraminum = new LectorMultiplex<TabulamenNumeraminis>('lemmae/numeramina', TabulamenNumeraminis)
