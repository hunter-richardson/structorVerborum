import listFiles from 'list-files-in-dir';
import path from 'path';
import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import * as Agenda from '../praebeunda/agenda';
import { type Lectum } from '../praebeunda/interfecta';
import Lector from './lector';

@Nuntius.factum('LectorVerbalis')
export class LectorVerbalis<Hoc extends Lectum> extends Lector<Hoc> {
  @Nuntius.futurus('LectorVerbalis')
  async omnia(): Promise<string[]> {
    return (await listFiles.listFiles(this.seratur(), 'csv'))
      .map((res) => path.parse(res).name)
      .sort()
  }
}

export const actuum = new Ignavum(LectorVerbalis<Agenda.ActusAgendus>, {
                            scapum: '/res/lemmae/actus'
                          })
export const adverbiorum = new Ignavum(LectorVerbalis<Agenda.AdverbiumAgendum>, {
                                 scapum: '/res/lemmae/adverbia'
                               })
export const numeraminum = new Ignavum(LectorVerbalis<Agenda.NumeramenAgendum>, {
                                 scapum: '/res/lemmae/numeramina'
                               })
export const adiectivorum = new Ignavum(LectorVerbalis<Agenda.AdiectivumAgendum>, {
                                  scapum: '/res/lemmae/adiectiva'
                                })
export const incomparabilium = new Ignavum(LectorVerbalis<Agenda.Incomparabile>, {
                                     scapum: '/res/lemmae/adiectiva/incomparabilia'
                                   })
export const nominum = new Ignavum(LectorVerbalis<Agenda.NomenAgendum>, {
                             scapum: '/res/lemmae/nomina'
                           })
export const nominumFactorum = new Ignavum(LectorVerbalis<Agenda.NomenActum>, {
                                     scapum: '/res/lemmae/nomina/facta'
                                   })

