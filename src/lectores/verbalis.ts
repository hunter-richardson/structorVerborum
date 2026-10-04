import listFiles from 'list-files-in-dir';
import path from 'path';
import Lector from './lector';
import Nuntius from '../miscella/nuntius';
import { Ignavum } from '../miscella/usus';
import * as Agenda from '../praebeunda/agenda';
import { type Lectum } from '../praebeunda/interfecta';

@Ignavum @Nuntius.factum
export class LectorVerbalis<Hoc extends Lectum> extends Lector<Hoc> {
  @Nuntius.promittum
  async omnia(): Promise<string[]> {
    return (await listFiles.listFiles(this.seratur(), 'csv'))
                           .map((res) => path.parse(res).name)
                           .sort()
  }
}

export const actuum =
    new LectorVerbalis<Agenda.ActusAgendus>('/res/lemmae/actus')
export const adverbiorum =
    new LectorVerbalis<Agenda.AdverbiumAgendum>('/res/lemmae/adverbia')
export const numeraminum =
    new LectorVerbalis<Agenda.NumeramenAgendum>('/res/lemmae/numeramina')
export const adiectivorum =
    new LectorVerbalis<Agenda.AdiectivumAgendum>('/res/lemmae/adiectiva')
export const incomparabilium =
    new LectorVerbalis<Agenda.Incomparabile>('/res/lemmae/adiectiva/incomparabilia')
export const nominum =
    new LectorVerbalis<Agenda.NomenAgendum>('/res/lemmae/nomina')
export const nominumFactorum =
    new LectorVerbalis<Agenda.NomenActum>('/res/lemmae/nomina/facta')

