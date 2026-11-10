import equal from 'fast-deep-equal'
import {
  actuum,
  adiectivorum,
  adverbiorum,
  incomparabilium,
  nominum,
  numeraminum,
  verborum
} from '@/miscella/lector'
import { Actus, Adiectivum, Adverbium, Nomen, Numeramen, Pronomen } from '@/praebeunda/verba'
import { actus, adiectiva, nomina, pronomina } from '@/miscella/anomala'
import type { Referendum, Tabulator } from '@/praebeunda/interfecta'
import { Ignavum, Ultimum } from '@/miscella/usus'
import Nuntius from '@/miscella/nuntius'
import '@/extensions/string'
import '@/extensions/array'

export interface Lemma {
  categoria: string
  scriptum: string
}

interface Relatum extends Lemma {
  lecta: boolean
}

export interface Quaerenda {
  pars: string
  categoriae: string[]
}

export interface Eventus extends Referendum {
  categoria: string
}

@Ultimum
@Ignavum
@Nuntius.factum
class Dictionarium {
  private readonly _relata: Relatum[] = []

  @Nuntius.modus perscribantur() {
    if (this._relata.empty) {
      pronomina.omnia.forEach((res: string) => {
        this._relata.push({
          categoria: Pronomen.name.lowercase,
          scriptum: res,
          lecta: false
        })
      })
      actus.omnia.forEach((res: string) => {
        this._relata.push({
          categoria: Actus.name.lowercase,
          scriptum: res,
          lecta: false
        })
      })
      adiectiva.omnia.forEach((res: string) => {
        this._relata.push({
          categoria: Adiectivum.name.lowercase,
          scriptum: res,
          lecta: false
        })
      })
      nomina.omnia.forEach((res: string) => {
        this._relata.push({
          categoria: Nomen.name.lowercase,
          scriptum: res,
          lecta: false
        })
      })
      actuum.omnia.forEach((res: string) => {
        this._relata.push({
          categoria: Actus.name.lowercase,
          scriptum: res,
          lecta: false
        })
      })
      adverbiorum.omnia.forEach((res: string) => {
        this._relata.push({
          categoria: Adverbium.name.lowercase,
          scriptum: res,
          lecta: true
        })
      })
      adiectivorum.omnia.forEach((res: string) => {
        this._relata.push({
          categoria: Adiectivum.name.lowercase,
          scriptum: res,
          lecta: true
        })
      })
      incomparabilium.omnia.forEach((res: string) => {
        this._relata.push({
          categoria: Adiectivum.name.lowercase,
          scriptum: res,
          lecta: true
        })
      })
      nominum.omnia.forEach((res: string) => {
        this._relata.push({
          categoria: Nomen.name.lowercase,
          scriptum: res,
          lecta: true
        })
      })
      numeraminum.omnia.forEach((res: string) => {
        this._relata.push({
          categoria: Numeramen.name.lowercase,
          scriptum: res,
          lecta: true
        })
      })
      verborum.omnia.forEach((res: string) => {
        const [categoria, scriptum] = res.split('/')
        this._relata.push({
          categoria: categoria,
          scriptum: scriptum,
          lecta: true
        })
      })
    }
  }

  private async _referaturActus(
    lemma: string,
    lecta: boolean
  ): Promise<Tabulator<Actus> | undefined> {
    return lecta ? (await actuum.legatur(lemma)).unum : await actus.feratur(lemma) //  NOSONAR:  Nil moror
  }

  private async _referaturAdiectivum(
    lemma: string,
    lecta: boolean
  ): Promise<Tabulator<Adiectivum> | undefined> {
    if (lecta) /*NOSONAR:  Nil moror*/ {
      const incomparabile: boolean = !adiectivorum.omnia.includes(lemma)
      return (await (incomparabile ? incomparabilium : adiectivorum).legatur(lemma)).unum
    } else return await adiectiva.feratur(lemma)
  }

  private async _referaturNomen(
    lemma: string,
    lecta: boolean
  ): Promise<Tabulator<Nomen> | undefined> {
    if (lecta) /*NOSONAR:  Nil moror*/ {
      const factum: boolean = actuum.omnia.includes(lemma)
      if (factum) return (await actuum.legatur(lemma)).unum?.nomen()
      else return (await nominum.legatur(lemma)).unum
    } else return await nomina.feratur(lemma)
  }

  @Nuntius.promittum async referatur(lemma: Lemma): Promise<Eventus | undefined> {
    if (this._relata.empty) this.perscribantur()
    let referendum: Referendum | undefined
    const lecta: boolean =
      this._relata.first((relatum) => equal(lemma, relatum as Lemma))?.lecta ?? false
    switch (lemma.categoria.lowercase) {
      case 'actus':
        referendum = await this._referaturActus(lemma.scriptum, lecta)
        break
      case 'adiectivum':
        referendum = await this._referaturAdiectivum(lemma.scriptum, lecta)
        break
      case 'nomen':
        referendum = await this._referaturNomen(lemma.scriptum, lecta)
        break
      case 'adverbium':
        referendum = (await adverbiorum.legatur(lemma.scriptum)).unum
        break
      case 'numeramen':
        referendum = (await numeraminum.legatur(lemma.scriptum)).unum
        break
      case 'promomen':
        referendum = await pronomina.feratur(lemma.scriptum)
        break
      default:
        referendum = (await verborum.legatur(lemma.scriptum)).unum
        break
    }
    return referendum ? { ...referendum, categoria: lemma.categoria.lowercase } : undefined
  }

  @Nuntius.modus quaeratur(quaerenda: Quaerenda): Lemma[] {
    if (this._relata.empty) this.perscribantur()
    switch (true) {
      case [!quaerenda.categoriae.empty, !quaerenda.pars.empty].all:
        return this._relata
          .filter(
            (relatum) =>
              [
                relatum.scriptum.includes(quaerenda.pars),
                quaerenda.categoriae.includes(relatum.categoria)
              ].all
          )
          .map((relatum) => relatum)
      case [!quaerenda.categoriae.empty, quaerenda.pars.empty].all:
        return this._relata
          .filter((relatum) => quaerenda.categoriae.includes(relatum.categoria))
          .map((relatum) => relatum)
      case [quaerenda.categoriae.empty, !quaerenda.pars.empty].all:
        return this._relata
          .filter((relatum) => relatum.scriptum.includes(quaerenda.pars))
          .map((relatum) => relatum)
      case [quaerenda.categoriae.empty, quaerenda.pars.empty].all:
        return this._relata.map((relatum) => relatum)
      default:
        return []
    }
  }

  @Nuntius.promittum async forsReferatur(quaerenda?: Quaerenda): Promise<Eventus> {
    if (this._relata.empty) this.perscribantur()
    let eventus: Eventus | undefined
    do {
      if (quaerenda === undefined)
        eventus = await this.referatur(this._relata.random) //  NOSONAR:  Hoc consideravi
      else eventus = await this.referatur((await this.quaeratur(quaerenda)).random) //  NOSONAR:  Hoc consideravi
    } while (eventus === undefined)
    return eventus
  }
}

export const dictionarium: Dictionarium = new Dictionarium()
