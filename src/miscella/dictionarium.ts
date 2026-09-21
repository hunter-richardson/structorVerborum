import deepEqual from 'deep-equal';
import { actus } from '../anomala/actus';
import { adiectiva } from '../anomala/adiectiva';
import { nomina } from '../anomala/nomina';
import { pronomina } from '../anomala/pronomina';
import {
  actuum,
  adiectivorum,
  adverbiorum,
  incomparabilium,
  nominum,
  numeraminum
} from '../lectores/verbalis';
import { verborum } from '../lectores/verbi';
import * as Agenda from '../praebeunda/agenda';
import { type Referendum } from '../praebeunda/interfecta';
import Ignavum from './ignavum';
import Nuntius from './nuntius';

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

@Nuntius.factum('Dictionarium')
class Dictionarium {
  private readonly _relata: Relatum[] = []

  private get relata(): Promise<Relatum[]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (seratur: (valor: Relatum[]) => void): Promise<void> => {
      if (!this._relata.length) await this.perscribantur()
      return seratur(this._relata)
    })
  }

  @Nuntius.futurus('Dictionarium')
  async perscribantur(): Promise<void> {
    if (!this._relata.length) {
      (await actuum.hoc().omnia()).forEach((res: string) => {
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

      (await adverbiorum.hoc().omnia()).forEach((res: string) => {
        this._relata.push({
          categoria: 'Adverbium',
          scriptum: res,
          lecta: true
        })
      });

      (await adiectivorum.hoc().omnia()).forEach((res: string) => {
        this._relata.push({
          categoria: 'Adiectivum',
          scriptum: res,
          lecta: true
        })
      });

      (await incomparabilium.hoc().omnia()).forEach((res: string) => {
        this._relata.push({
          categoria: 'Adiectivum',
          scriptum: res,
          lecta: true
        })
      });

      (await nominum.hoc().omnia()).forEach((res: string) => {
        this._relata.push({
          categoria: 'Nomen',
          scriptum: res,
          lecta: true
        })
      });

      (await numeraminum.hoc().omnia()).forEach((res: string) => {
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

      (await actuum.hoc().omnia()).forEach((res: string) => {
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

      (await verborum.hoc().omnia()).forEach((res: string) => {
        const [categoria, scriptum] = res.split('/')
        this._relata.push({
          categoria: categoria.capitalize(),
          scriptum: scriptum,
          lecta: true
        })
      })
    }
  }

  async _referaturActus(lemma: string, lecta: boolean): Promise<Referendum | undefined>
  { return await (lecta ? actuum.hoc().legatur : actus.hoc().feratur)(lemma) }

  async _referaturAdiectivum(lemma: string, lecta: boolean): Promise<Referendum | undefined> {
    if(lecta) {
      const incomparabile: boolean = !(await adiectivorum.hoc().omnia()).includes(lemma)
      return await (incomparabile ? incomparabilium : adiectivorum).hoc().legatur(lemma)
    } else return await adiectiva.feratur(lemma)
  }

  async _referaturNomen(lemma: string, lecta: boolean): Promise<Referendum | undefined> {
    if(lecta) {
      const factum: boolean = (await actuum.hoc().omnia()).includes(lemma)
      if(factum) {
        const actus: Agenda.ActusAgendus = await actuum.hoc().legatur(lemma) as Agenda.ActusAgendus
        return await actus.nomen()
      } else return await nominum.hoc().legatur(lemma)
    } else return await nomina.feratur(lemma)
  }

  @Nuntius.futurus('Dictionarium')
  async referatur(lemma: Lemma): Promise<Eventus | null> {
    var referendum: Referendum | undefined = undefined
    const lecta: boolean =
      (await this.relata).first((relatum) => deepEqual(lemma, relatum.lemma))?.lecta ?? false
    switch (lemma.categoria.toLowerCase()) {
      case      'actus': referendum = await this._referaturActus(lemma.scriptum, lecta); break
      case 'adiectivum': referendum = await this._referaturAdiectivum(lemma.scriptum, lecta); break
      case      'nomen': referendum = await this._referaturNomen(lemma.scriptum, lecta); break
      case  'adverbium': referendum = await adverbiorum.hoc().legatur(lemma.scriptum); break
      case  'numeramen': referendum = await numeraminum.hoc().legatur(lemma.scriptum); break
      case   'promomen': referendum = await pronomina.feratur(lemma.scriptum); break
                default: referendum = await verborum.hoc().legatur(lemma.scriptum); break
    } return referendum ? { ...referendum, categoria: lemma.categoria.toLowerCase() } : null
  }

  @Nuntius.futurus('Dictionarium')
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

  @Nuntius.futurus('Dictionarium')
  async forsReferatur(quaerenda?: Quaerenda): Promise<Eventus> {
    let eventus: Eventus | null = null
    do {
      if (quaerenda) eventus = await this.referatur((await this.quaeratur(quaerenda)).random())
      else eventus = await this.referatur((await this.relata).random())
    } while (!eventus)

    return eventus
  }
}

export const dictionarium = new Ignavum(Dictionarium)
