import deepEqual from 'deep-equal';
import Nuntius from './nuntius';
import { Ignavum, Ultimum } from './usus';
import { actus } from '../anomala/actus';
import { adiectiva } from '../anomala/adiectiva';
import { nomina } from '../anomala/nomina';
import { pronomina } from '../anomala/pronomina';
import '../extensions/array';
import '../extensions/string';
import {
  actuum,
  adiectivorum,
  adverbiorum,
  incomparabilium,
  nominum,
  numeraminum,
  verborum,
  type Ulla
  } from './lector';
import { type Referendum, type Tabulator } from '../praebeunda/interfecta';
import type { TabulamenActus } from '../praebeunda/tabulamina';
import type { Actus, Adiectivum, Nomen } from '../praebeunda/verba';

export interface Lemma {
  categoria: string
   scriptum: string
}

export interface Relatum extends Lemma {
  lecta: boolean
}

export interface Quaerenda {
        pars: string
  categoriae: string[]
}

export interface Eventus extends Referendum {
  categoria: string
}

@Ultimum @Ignavum @Nuntius.factum
class Dictionarium {
  private readonly _relata: Relatum[] = []

  private get relata(): Promise<Relatum[]> {
    return new Promise(async (seratur: (valor: Relatum[]) => void): Promise<void> => {
      if (!this._relata.length) this.perscribantur()
      return seratur(this._relata)
    })
  }

  @Nuntius.promittum
  async perscribantur(): Promise<void> {
    if (!this._relata.length) {
      (actuum.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: 'Actus',
          scriptum: res,
          lecta: true
        })

        this._relata.push({
          categoria: 'Nomen',
          scriptum: res,
          lecta: true
        })
      });

      (adverbiorum.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: 'Adverbium',
          scriptum: res,
          lecta: true
        })
      });

      (adiectivorum.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: 'Adiectivum',
          scriptum: res,
          lecta: true
        })
      });

      (incomparabilium.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: 'Adiectivum',
          scriptum: res,
          lecta: true
        })
      });

      (nominum.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: 'Nomen',
          scriptum: res,
          lecta: true
        })
      });

      (numeraminum.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: 'Numeramen',
          scriptum: res,
          lecta: true
        })
      });

      (await pronomina.omnia()).forEach((res: string) => {
        this._relata.push({
          categoria: 'Pronomen',
          scriptum: res,
          lecta: false
        })
      });

      (actuum.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: 'Actus',
          scriptum: res,
          lecta: false
        })
      });

      (await adiectiva.omnia()).forEach((res: string) => {
        this._relata.push({
          categoria: 'Adiectivum',
          scriptum: res,
          lecta: false
        })
      });

      (await nomina.omnia()).forEach((res: string) => {
        this._relata.push({
          categoria: 'Nomen',
          scriptum: res,
          lecta: false
        })
      });

      (verborum.omnia).forEach((res: string) => {
        const [categoria, scriptum] = res.split('/')
        this._relata.push({
          categoria: categoria.capitalize(),
          scriptum: scriptum,
          lecta: true
        })
      })
    }
  }

  private async _referaturActus(lemma: string, lecta: boolean): Promise<Tabulator<Actus> | undefined>
  { return lecta ? (await actuum.legatur(lemma)).unum : await actus.feratur(lemma) }

  private async _referaturAdiectivum(lemma: string, lecta: boolean): Promise<Tabulator<Adiectivum> | undefined> {
    if(lecta) {
      const incomparabile: boolean = !(adiectivorum.omnia).includes(lemma)
      return (await (incomparabile ? incomparabilium : adiectivorum).legatur(lemma)).unum
    } else return await adiectiva.feratur(lemma)
  }

  private async _referaturNomen(lemma: string, lecta: boolean): Promise<Tabulator<Nomen> | undefined> {
    if(lecta) {
      const factum: boolean = (actuum.omnia).includes(lemma)
      if(factum)
           return (await actuum .legatur(lemma)).unum?.nomen()
      else return (await nominum.legatur(lemma)).unum
    } else return  await nomina .feratur(lemma)
  }

  @Nuntius.promittum
  async referatur(lemma: Lemma): Promise<Eventus | null> {
    var referendum: Referendum | undefined = undefined
    const lecta: boolean =
      (await this.relata).first((relatum) => deepEqual(lemma, relatum as Lemma))?.lecta ?? false
    switch (lemma.categoria.toLowerCase()) {
      case      'actus': referendum = await this._referaturActus(lemma.scriptum, lecta); break
      case 'adiectivum': referendum = await this._referaturAdiectivum(lemma.scriptum, lecta); break
      case      'nomen': referendum = await this._referaturNomen(lemma.scriptum, lecta); break
      case  'adverbium': referendum = await adverbiorum.legatur(lemma.scriptum); break
      case  'numeramen': referendum = await numeraminum.legatur(lemma.scriptum); break
      case   'promomen': referendum = await pronomina.feratur(lemma.scriptum); break
                default: referendum = await verborum.legatur(lemma.scriptum); break
    } return referendum ? { ...referendum, categoria: lemma.categoria.toLowerCase() } : null
  }

  @Nuntius.promittum
  async quaeratur(quaerenda: Quaerenda): Promise<Lemma[]> {
    switch (true) {
      case [!!quaerenda.categoriae, !!quaerenda.pars].all():
        return (await this.relata)
          .filter((relatum) =>
            [
              relatum.scriptum.includes(quaerenda.pars),
              quaerenda.categoriae.includes(relatum.categoria)
            ].all()
          )
          .map((relatum) => relatum)
      case [!!quaerenda.categoriae, !quaerenda.pars].all():
        return (await this.relata)
          .filter((relatum) => quaerenda.categoriae.includes(relatum.categoria))
          .map((relatum) => relatum)
      case [!quaerenda.categoriae, !!quaerenda.pars].all():
        return (await this.relata)
          .filter((relatum) => relatum.scriptum.includes(quaerenda.pars))
          .map((relatum) => relatum)
      case [!quaerenda.categoriae, !quaerenda.pars].all():
        return (await this.relata).map((relatum) => relatum)
      default: return []
    }
  }

  @Nuntius.promittum
  async forsReferatur(quaerenda?: Quaerenda): Promise<Eventus> {
    let eventus: Eventus | null = null
    do {
      if (quaerenda) eventus = await this.referatur((await this.quaeratur(quaerenda)).random())
      else eventus = await this.referatur((await this.relata).random())
    } while (!eventus)

    return eventus
  }
}

export const dictionarium: Dictionarium = new Dictionarium
