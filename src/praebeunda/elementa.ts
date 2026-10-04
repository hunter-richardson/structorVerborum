import { Lectum } from './interfecta';
import {
  Actus,
  Adiectivum,
  Multiplex,
  Nomen
  } from './verba';
import { Ultimum } from '../miscella/usus';
// import { delator } from '../miscella/delator';

//  eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Elementum<Hoc extends Multiplex> implements Lectum {
  versio!: string
  scapum!: string
  // deferar(): Promise<Ignavum<Tabula<Hoc>> | undefined>
  // { return delator.hoc.deferatur(this) }
}

@Ultimum export class ElementumActus extends Elementum<Actus> {
  praesens!: string;
  perfectum!: string;
  supinum!: string;
  override scapum: string = '/res/tabulae/actus';
}

@Ultimum export class ElementumAdiectivi extends Elementum<Adiectivum> {
  positivus!: string;
  comparativus!: string;
  superlativus!: string;
  override scapum: string = '/res/tabulae/adiectiva';
}

@Ultimum export class ElementumIncomparabilis extends Elementum<Adiectivum> {
  nominativus!: string;
  genitivus!: string;
  override scapum: string = '/res/tabulae/adiectiva/incomparabilia';
}

@Ultimum export class ElementumNominis extends Elementum<Nomen> {
  nominativus!: string;
  genitivus!: string;
  override scapum: string = '/res/tabulae/nomina';
}

@Ultimum export class ElementumNominisFacti extends Elementum<Nomen> {
  indicativum!: string;
  gerundium!: string;
  supinum!: string;
  override scapum: string = '/res/tabulae/nomina/facta';
}
