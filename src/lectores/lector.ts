import file from 'file-fetch';
import path from 'path';
import Nuntius from '../miscella/nuntius';
import { Ignavum } from '../miscella/usus';
import { Multiplex } from '../praebeunda/verba';
import { type Agendum } from '../praebeunda/verba'

export function agendorum<Illud extends Multiplex>(
  scapum: string
): Lector<Agendum<Illud>> {
  return new Lector<Agendum<Illud>>(scapum)
}

@Ignavum @Nuntius.factum
export default class Lector<Hoc> {
  protected seratur(): string {
    if(!this.scapum.startsWith('/res'))
    { this.scapum = path.join('/res', this.scapum) }
    return this.scapum
  }

  protected viator(via: string): string {
    if(!via.endsWith('.csv')) via = `${via}.csv`
    return path.join(this.seratur(), via)
  }

  private async aperiatur(via: string): Promise<string> {
    const corpus: Body = await file(new URL(this.viator(via)))
    return (corpus as Response).ok ? (await corpus.text()).trim() : ''
  }

  @Nuntius.promittum
  async legatur(lemma: string): Promise<Hoc[]> {
    const data: string = await this.aperiatur(lemma)
    if (data) {
      const { parse } = require('comma-separated-values')
      try {
        const haec: Hoc[] = parse(data, { header: true })
        if(haec.length > 0) {
          Nuntius.noto({
            nomen: 'Lector',
            nuntium: `Lemma invenita'st ${lemma}`
          }); return haec
        }
      } catch (error) {
        Nuntius.timeo({
          nomen: 'Lector',
          error: error as Error
        })
      }
    }; Nuntius.noto({
      nomen: 'Lector',
      nuntium: `Lemma nulla'st ${lemma}`
    }); return []
  }

  constructor(protected  scapum: string) {}
}
