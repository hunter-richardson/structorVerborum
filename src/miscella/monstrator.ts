import fileFetch from 'file-fetch';
import path from 'path';
import Ignavum from './ignavum';
import Nuntius from './nuntius';

export type Monstrandum = {
  unicum: string
  nuntium: string
}

export type Monstranda = Monstrandum[]

class Monstrator {
  private viator(via: string): string {
    return path.join('/res/monstranda/', `${via}.csv`)
  }

  private async aperiatur (via: string): Promise<string> {
    const corpus: Body = await fileFetch(new URL(this.viator(via)));
    return (corpus as Response).ok ? (await corpus.text()).trim() : '';
  }

  async monstrentur(via: string): Promise<Monstranda> {
    const data: string = await this.aperiatur(via)
    if(data) {
      const { parse } = require('comma-separated-values')
      try {
        const monstrandum: Monstranda = parse(data, { header: true })
        if(monstrandum) {
          Nuntius.plusGarrio({
            nomen: 'Monstrator',
            nuntium: `Viam invenita'st ${via}`
          }); return monstrandum
        }
      } catch(error) {
        Nuntius.timeo({
          nomen: 'Monstrator',
          error: error as Error
        })
      }
    }

    Nuntius.plusGarrio({
      nomen: 'Lector',
      nuntium: `Via nil adducat  ${via}`
    }); return []
  }
}

export const monstrator = new Ignavum(Monstrator)
