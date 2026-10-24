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
import { Tabula } from '@/tabulae/tabula';
import { Mixin } from 'ts-mixer';
import { LEGIBILE, Tabulator } from './interfecta';
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

  @Nuntius.captor get tabula(): Promise<Tabula<Actus>>
  { return Tabula.regula(Actus, this) }
}

@Ultimum @Nuntius.factum export class TabulamenAdiectivi extends Mixin(Tabulamen<Adiectivum>, TabulatorAdiectivorum) {
  override categoria = Adiectivum.name.lowercase
  positivus!: string
  comparativus!: string
  superlativus!: string

  @Nuntius.captor get tabula (): Promise<Tabula<Adiectivum>>
  { return Tabula.regula(Adiectivum, this) }
}

@Ultimum @Nuntius.factum export class TabulamenAdverbii extends Tabulamen<Adverbium> {
  override categoria = Adverbium.name.lowercase
  positivus!: string
  comparativus!: string
  superlativus!: string

  @Nuntius.captor get tabula (): Promise<Tabula<Adverbium>>
  { return Tabula.derecta(Adverbium, this) }
}

@Ultimum export class TabulamenIncomparabilis extends Mixin(Tabulamen<Adiectivum>, TabulatorAdiectivorum) {
  override categoria = Adiectivum.name.lowercase
  nominativus!: string
  genitivus!: string

  override get scapum(): string
  { return `${super.scapum}/incomparabilia` }

  @Nuntius.captor get tabula (): Promise<Tabula<Adiectivum>>
  { return Tabula.regula(Adiectivum, this) }
}

@Ultimum @Nuntius.factum export class TabulamenNominis extends Tabulamen<Nomen> {
  override categoria = Nomen.name.lowercase
  nominativus!: string
  genitivus!: string

  override get scapum(): string
  { return `${super.scapum}/facta` }

  @Nuntius.captor get tabula (): Promise<Tabula<Nomen>>
  { return Tabula.regula(Nomen, this) }
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

  @Nuntius.captor get tabula (): Promise<Tabula<Nomen>>
  { return Tabula.regula(Nomen, this) }
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


  @Nuntius.captor get tabula (): Promise<Tabula<Numeramen>>
  { return Tabula.derecta(Numeramen, this) }
}
