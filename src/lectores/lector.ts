import file from 'file-fetch';
import path from 'path';
import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import * as Verba from '../praebeunda/verba';
import { type Agendum } from '../praebeunda/agenda'

export function LectorAgendorum<Illud extends Verba.Multiplex>(
  scapum: string
): Ignavum<Lector<Agendum<Illud>[]>> {
  return new Ignavum(Lector<Agendum<Illud>[]>, { scapum: scapum })
}

@Nuntius.factum('Lector')
export default class Lector<Hoc> {
  public scapum!: string

  protected seratur(): string {
    if(!this.scapum.startsWith('/res')) {
      this.scapum = path.join('/res', this.scapum)
    } return this.scapum
  }

  protected viator(via: string): string {
    if(!via.endsWith('.csv')) {
      via = `${via}.csv`
    } return path.join(this.seratur(), via)
  }

  private async aperiatur(via: string): Promise<string> {
    const corpus: Body = await file(new URL(this.viator(via)))
    return (corpus as Response).ok ? (await corpus.text()).trim() : ''
  }

  @Nuntius.futurus('Lector')
  async legatur(lemma: string): Promise<Hoc | undefined> {
    const data: string = await this.aperiatur(lemma)
    if (data) {
      const { parse } = require('comma-separated-values')
      try {
        const hoc: Hoc | undefined = parse(data, { header: true })
        if (hoc) {
          Nuntius.plusGarrio({
            nomen: 'Lector',
            nuntium: `Lemma invenita'st ${lemma}`
          }); return hoc
        }
      } catch (error) {
        Nuntius.timeo({
          nomen: 'Lector',
          error: error as Error
        })
      }
    }

    Nuntius.plusGarrio({
      nomen: 'Lector',
      nuntium: `Lemma nulla'st ${lemma}`
    }); return undefined
  }
}
