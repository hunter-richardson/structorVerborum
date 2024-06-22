import listFiles from 'list-files-in-dir'
import path from 'path'
import Lector from './lector'
import Ignavum from '../miscella/ignavum'
import Nuntius from '../miscella/nuntius'
import * as Agenda from '../praebeunda/agenda'
import { type Lectum } from '../praebeunda/interfecta'

@Nuntius.factum('LectorVerbalis')
export default class LectorVerbalis<Hoc extends Lectum> extends Lector<Hoc> {
  static Actuum: Ignavum<LectorVerbalis<Agenda.ActusAgendus>> = new Ignavum(
    () => new LectorVerbalis<Agenda.ActusAgendus>('/res/lemmae/actus')
  )
  static Adverbiorum: Ignavum<LectorVerbalis<Agenda.AdverbiumAgendum>> = new Ignavum(
    () => new LectorVerbalis<Agenda.AdverbiumAgendum>('/res/lemmae/adverbia')
  )
  static Numeraminum: Ignavum<LectorVerbalis<Agenda.NumeramenAgendum>> = new Ignavum(
    () => new LectorVerbalis<Agenda.NumeramenAgendum>('/res/lemmae/numeramina')
  )

  static Adiectivorum: Ignavum<LectorVerbalis<Agenda.AdiectivumAgendum>> = new Ignavum(
    () => new LectorVerbalis<Agenda.AdiectivumAgendum>('/res/lemmae/adiectiva')
  )
  static Incomparabilium: Ignavum<LectorVerbalis<Agenda.Incomparabile>> = new Ignavum(
    () => new LectorVerbalis<Agenda.Incomparabile>('/res/lemmae/adiectiva/incomparabilia')
  )

  static Nominum: Ignavum<LectorVerbalis<Agenda.NomenAgendum>> = new Ignavum(
    () => new LectorVerbalis<Agenda.NomenAgendum>('/res/lemmae/nomina')
  )
  static NominumFactorum: Ignavum<LectorVerbalis<Agenda.NomenActum>> = new Ignavum(
    () => new LectorVerbalis<Agenda.NomenActum>('/res/lemmae/nomina/facta')
  )

  protected constructor(scapum?: string) {
    super(scapum)
  }

  @Nuntius.futurus('LectorVerbalis')
  async omnia(): Promise<string[]> {
    return (await listFiles.listFiles(this._scapum, 'csv'))
      .map((res) => path.parse(res).name)
      .sort()
  }
}
