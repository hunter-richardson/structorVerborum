import file from 'file-fetch';
import path from 'path';
import Nuntius from '../miscella/nuntius';
import * as Verba from '../praebeunda/verba';
import type { Agendum } from '../praebeunda/agenda';

export function LectorAgendorum<Illud extends Verba.Multiplex>(
  scapum?: string
): Lector<Agendum<Illud>[]> {
  return new Lector<Agendum<Illud>[]>(scapum)
}

@Nuntius.factum('Lector')
export default class Lector<Hoc> {
  protected readonly _scapum: string

  constructor(scapum: string = '') {
    if (scapum.startsWith('/res')) {
      this._scapum = scapum
    } else {
      this._scapum = path.join('/res', scapum)
    }
  }

  protected viator(via: string): string {
    return this._scapum ? path.join(this._scapum, via.concat('.csv')) : via.concat('.csv')
  }

  private async aperiatur(via: string): Promise<string> {
    const corpus: Body = await file(new URL(this.viator(via)))
    return (corpus as Response).ok ? (await corpus.text()).trim() : ''
  }

  @Nuntius.futurus('Lector')
  async legatur(lemma: string): Promise<Hoc | null> {
    const data: string = await this.aperiatur(lemma)
    if (data) {
      const { parse } = require('comma-separated-values')
      try {
        const hoc: Hoc = parse(data, { header: true }) as Hoc;
        if (hoc) {
          Nuntius.plusGarrio({
            nomen: 'Lector',
            nuntium: `Lemma invenita'st ${lemma} `
          });

          return hoc;
        }
      } catch (error) {
        Nuntius.timeo({
          nomen: 'Lector',
          error: error as Error
        });
      }
    }

    Nuntius.plusGarrio({
      nomen: 'Lector',
      nuntium: `Lemma nulla'st  ${lemma}`
    });

    return null;
  }
}
