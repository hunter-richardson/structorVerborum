import { Mixin } from 'ts-mixer';
import { Tabulator } from './interfecta';
import { Lectum } from './interfecta';
import {
  Actus,
  Adiectivum,
  Adverbium,
  Multiplex,
  Nomen,
  Numeramen,
  TabulatorActuum
  } from './verba';
import translation from '../extensions/i18next';
import Nuntius from '../miscella/nuntius';
import { Ultimum } from '../miscella/usus';
import { TabulaDerecta, TabulaRegula, type Tabula } from '../tabulae/tabula';
import { dictionarium, type Eventus } from '../miscella/dictionarium';

export abstract class Tabulamen<Hoc extends Multiplex> implements Lectum, Tabulator<Hoc> {
  categoria!: string
  principium!: string
  vices?: string
  scriptura?: string
  get scapum(): string
  { return translation().t(`partes.${this.categoria}_pluralis`, { la: 'la' }) }

  abstract get tabula(): Tabula<Hoc>
}

@Ultimum @Nuntius.factum export class TabulamenActus extends Mixin(Tabulamen<Actus>, TabulatorActuum) {
  override categoria = Actus.name.toLowerCase()
  praesens!: string
  perfectum!: string
  supinum!: string

  @Nuntius.captor get tabula(): Tabula<Actus>
  { return new TabulaRegula<Actus, TabulamenActus>(Actus, this) }
}

@Ultimum @Nuntius.factum export class TabulamenAdiectivi extends Tabulamen<Adiectivum> {
  override categoria = Adiectivum.name.toLowerCase()
  positivus!: string
  comparativus!: string
  superlativus!: string

  @Nuntius.captor get tabula (): Tabula<Adiectivum>
  { return new TabulaRegula<Adiectivum, TabulamenAdiectivi>(Adiectivum, this) }
}

@Ultimum @Nuntius.factum export class TabulamenAdverbii extends Tabulamen<Adverbium> {
  override categoria = Adverbium.name.toLowerCase()
  positivus!: string
  comparativus!: string
  superlativus!: string

  @Nuntius.captor get tabula (): Tabula<Adverbium>
  { return new TabulaDerecta<Adverbium, TabulamenAdverbii>(Adverbium, this) }
}

@Ultimum export class TabulamenIncomparabilis extends Tabulamen<Adiectivum> {
  override categoria = Adiectivum.name.toLowerCase()
  nominativus!: string
  genitivus!: string

  override get scapum(): string
  { return `${super.scapum}/incomparabilia` }

  @Nuntius.captor get tabula (): Tabula<Adiectivum>
  { return new TabulaRegula<Adiectivum, TabulamenIncomparabilis>(Adiectivum, this) }
}

@Ultimum @Nuntius.factum export class TabulamenNominis extends Tabulamen<Nomen> {
  override categoria = Nomen.name.toLowerCase()
  nominativus!: string
  genitivus!: string

  override get scapum(): string
  { return `${super.scapum}/facta` }

  @Nuntius.captor get tabula (): Tabula<Nomen>
  { return new TabulaRegula<Nomen, TabulamenNominis>(Nomen, this) }
}

@Ultimum @Nuntius.factum export class TabulamenFacti extends Tabulamen<Nomen> {
  override categoria = Nomen.name.toLowerCase()
  infinitivum!: string
  gerundium!: string
  supinum!: string

  async actus(): Promise<Eventus | undefined> {
    return await dictionarium.referatur({
      scriptum: this.infinitivum,
      categoria: 'actus'
    }) || undefined
  }

  @Nuntius.captor get tabula (): Tabula<Nomen>
  { return new TabulaRegula<Nomen, TabulamenFacti>(Nomen, this) }
}

@Ultimum @Nuntius.factum export class TabulamenNumeraminis extends Tabulamen<Numeramen> {
  override categoria: string = Numeramen.name.toLowerCase()
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
