import Nuntius from '@/miscella/nuntius';
import { Ignavum, Ultimum } from '@/miscella/usus';
import {
  TabulamenActus,
  TabulamenAdiectivi,
  TabulamenAdverbii,
  TabulamenFacti,
  TabulamenIncomparabilis,
  TabulamenNominis,
  TabulamenNumeraminis
  } from '@/praebeunda/tabulamina';
import { Verbum } from '@/praebeunda/verba';
import fs from 'fs';
import path from 'path';
import { buildRegExp, choiceOf } from 'ts-regex-builder';
import { type Lectum } from '@/praebeunda/interfecta';
import {
  errator,
  type Lineae,
  nomina,
  Res
  } from '@/praebeunda/valores';
import { CsvError, type Options, parse, type Parser } from 'csv-parse';
import { pipeline, type PipelineCallback } from 'node:stream';

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

  private readonly deConditis: RegExp =  //\p{Control}|\p{Cf}/gu
      buildRegExp([
        choiceOf(/\p{Control}/u, /\p{Cf}/u)
      ], { global: true, unicode: true })

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
      if(crudum !== undefined) nuntium = `${nuntium} ab ${crudum}`
      Nuntius.timeo({
        nomen: this.constructor.name,
        nuntium: nuntium,
        error: error
      }); return undefined
  } }

  private async aperiatur(): Promise<void> {
    this[Symbol.dispose]()
    Nuntius.noto({
      nomen: this.constructor.name,
      nuntium: `Lego lemmam ${this.via}`
    }); const vocator: PipelineCallback<Parser> = (error: Error | null, res?: Record<string, string>) => {
      if(error !== null) {
        Nuntius.timeo({
          nomen: this.constructor.name,
          error: error
        }); throw error
      } else if(res !== undefined) {
        const hoc: Hoc = new this.structor();
        for (const [ columna, crudum ] of Object.entries(res)) {
          try { this.ponatur(hoc, columna, crudum); }
          catch (error) {
            Nuntius.timeo({
              nomen: this.constructor.name,
              error: error as Error
            });
          }
        } this.haec.push(hoc)
      }
    }; await pipeline(fs.createReadStream(this.via, { flags: 'r' }),
                      parse(this.optanda), vocator)
    Nuntius.noto({
      nomen: this.constructor.name,
      nuntium: `Legere finitu'st lemmam ${this.via}`
    })
  }

  protected ponatur(hoc: Hoc, clavis: string, valor: string) {
    if(clavis in hoc) (hoc as unknown as { [clavis]: string })[clavis] = valor
    else throw errator({ [clavis]: valor })
  }

  @Nuntius.captor get omnia(): string[] {
    const omnia: string[] = []
    fs.readdir(this.scapum, {
      encoding: 'utf-8',
      recursive: false
    }, () => (error: Error | null, valores: string[]) =>{
        if(valores.length > 0)
          valores.forEach((valor: string) => omnia.push(valor))
        if(error !== null) {
          Nuntius.timeo({
            nomen: this.constructor.name,
            error: error
          }); throw error
        }
      })
    return omnia
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
  { this.scapum = path.join('@res', scapum) }

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
