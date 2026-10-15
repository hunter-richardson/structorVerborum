import translation from '@/extensions/i18next';
import Nuntius from '@/miscella/nuntius';
import { Ultimum } from '@/miscella/usus';
import {
  Actus,
  Adiectivum,
  Adverbium,
  Multiplex,
  Nomen,
  Numeramen,
  TabulatorActuum,
  TabulatorAdiectivorum
  } from '@/praebeunda/verba';
import { Mixin } from 'ts-mixer';
import { LEGIBILE, Tabulator } from './interfecta';
import { TabulaDerecta, TabulaRegula, type Tabula } from '@/tabulae/tabula';
import { dictionarium, type Eventus } from '@/miscella/dictionarium';

export abstract class Tabulamen<Hoc extends Multiplex> extends Tabulator<Hoc> {
  readonly [ LEGIBILE ] = true as const
  categoria!: string
  principium!: string
  vices?: string
  scriptura?: string
  get scapum(): string
  { return translation().t(`partes.${this.categoria}_pluralis`, { la: 'la' }) }
}

@Ultimum @Nuntius.factum export class TabulamenActus extends Mixin(Tabulamen<Actus>, TabulatorActuum) {
  override categoria = Actus.name.lowercase
  praesens!: string
  perfectum!: string
  supinum!: string

  @Nuntius.captor get tabula(): Tabula<Actus>
  { return new TabulaRegula<Actus, TabulamenActus>(Actus, this) }
}

@Ultimum @Nuntius.factum export class TabulamenAdiectivi extends Mixin(Tabulamen<Adiectivum>, TabulatorAdiectivorum) {
  override categoria = Adiectivum.name.lowercase
  positivus!: string
  comparativus!: string
  superlativus!: string

  @Nuntius.captor get tabula (): Tabula<Adiectivum>
  { return new TabulaRegula<Adiectivum, TabulamenAdiectivi>(Adiectivum, this) }
}

@Ultimum @Nuntius.factum export class TabulamenAdverbii extends Tabulamen<Adverbium> {
  override categoria = Adverbium.name.lowercase
  positivus!: string
  comparativus!: string
  superlativus!: string

  @Nuntius.captor get tabula (): Tabula<Adverbium>
  { return new TabulaDerecta<Adverbium, TabulamenAdverbii>(Adverbium, this) }
}

@Ultimum export class TabulamenIncomparabilis extends Mixin(Tabulamen<Adiectivum>, TabulatorAdiectivorum) {
  override categoria = Adiectivum.name.lowercase
  nominativus!: string
  genitivus!: string

  override get scapum(): string
  { return `${super.scapum}/incomparabilia` }

  @Nuntius.captor get tabula (): Tabula<Adiectivum>
  { return new TabulaRegula<Adiectivum, TabulamenIncomparabilis>(Adiectivum, this) }
}

@Ultimum @Nuntius.factum export class TabulamenNominis extends Tabulamen<Nomen> {
  override categoria = Nomen.name.lowercase
  nominativus!: string
  genitivus!: string

  override get scapum(): string
  { return `${super.scapum}/facta` }

  @Nuntius.captor get tabula (): Tabula<Nomen>
  { return new TabulaRegula<Nomen, TabulamenNominis>(Nomen, this) }
}

@Ultimum @Nuntius.factum export class TabulamenFacti extends Tabulamen<Nomen> {
  override categoria = Nomen.name.lowercase
  infinitivum!: string
  gerundium!: string
  supinum!: string

  @Nuntius.promittum async actus(): Promise<Eventus | undefined> {
    return await dictionarium.referatur({
      scriptum: this.infinitivum,
      categoria: 'actus'
    }) || undefined
  }

  @Nuntius.captor get tabula (): Tabula<Nomen>
  { return new TabulaRegula<Nomen, TabulamenFacti>(Nomen, this) }
}

@Ultimum @Nuntius.factum export class TabulamenNumeraminis extends Tabulamen<Numeramen> {
  override categoria: string = Numeramen.name.lowercase
  multiplicativum?: string;
  distributivum?: string;
  fractionale?: string;
  cardinale?: string;
  adverbium?: string;
  ordinale?: string;
  numerus!: string;


  @Nuntius.captor get tabula (): Tabula<Numeramen>
  { return new TabulaDerecta<Numeramen, TabulamenNumeraminis>(Numeramen, this) }
}
