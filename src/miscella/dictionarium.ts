import '@/extensions/array';
import '@/extensions/string';
import {
  actus,
  adiectiva,
  nomina,
  pronomina
  } from '@/miscella/anomala';
import {
  actuum,
  adiectivorum,
  adverbiorum,
  incomparabilium,
  nominum,
  numeraminum,
  verborum
  } from '@/miscella/lector';
import Nuntius from '@/miscella/nuntius';
import { Ignavum, Ultimum } from '@/miscella/usus';
import {
  Actus,
  Adiectivum,
  Adverbium,
  Nomen,
  Numeramen,
  Pronomen
  } from '@/praebeunda/verba';
import equal from 'fast-deep-equal';
import type { Referendum, Tabulator } from '@/praebeunda/interfecta';

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
    return new Promise((seratur: (valor: Relatum[]) => void) => {
      if (this._relata.empty) this.perscribantur()
      seratur(this._relata)
  } )}

  @Nuntius.promittum async perscribantur(): Promise<void> {
    if (this._relata.empty) {
      (adverbiorum.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: Adverbium.name.lowercase,
          scriptum: res,
          lecta: true
      })}); (adiectivorum.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: Adiectivum.name.lowercase,
          scriptum: res,
          lecta: true
      })}); (incomparabilium.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: Adiectivum.name.lowercase,
          scriptum: res,
          lecta: true
      })}); (nominum.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: Nomen.name.lowercase,
          scriptum: res,
          lecta: true
      })}); (numeraminum.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: Numeramen.name.lowercase,
          scriptum: res,
          lecta: true
      })}); (pronomina.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: Pronomen.name.lowercase,
          scriptum: res,
          lecta: false
      })}); (actuum.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: Actus.name.lowercase,
          scriptum: res,
          lecta: false
      })}); (actus.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: Actus.name.lowercase,
          scriptum: res,
          lecta: false
      })}); (adiectiva.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: Adiectivum.name.lowercase,
          scriptum: res,
          lecta: false
      })}); (nomina.omnia).forEach((res: string) => {
        this._relata.push({
          categoria: Nomen.name.lowercase,
          scriptum: res,
          lecta: false
      })}); (verborum.omnia).forEach((res: string) => {
        const [categoria, scriptum] = res.split('/')
        this._relata.push({
          categoria: categoria,
          scriptum: scriptum,
          lecta: true
  })} )} }

  private async _referaturActus(lemma: string, lecta: boolean): Promise<Tabulator<Actus> | undefined>
  { return lecta ? (await actuum.legatur(lemma)).unum : await actus.feratur(lemma) }

  private async _referaturAdiectivum(lemma: string, lecta: boolean): Promise<Tabulator<Adiectivum> | undefined> {
    if(lecta) {
      const incomparabile: boolean = !(await adiectivorum.omnia).includes(lemma)
      return (await (incomparabile ? incomparabilium : adiectivorum).legatur(lemma)).unum
    } else return await adiectiva.feratur(lemma)
  }

  private async _referaturNomen(lemma: string, lecta: boolean): Promise<Tabulator<Nomen> | undefined> {
    if(lecta) {
      const factum: boolean = (await actuum.omnia).includes(lemma)
      if(factum)
           return (await actuum .legatur(lemma)).unum?.nomen()
      else return (await nominum.legatur(lemma)).unum
    } else return  await nomina .feratur(lemma)
  }

  @Nuntius.promittum async referatur(lemma: Lemma): Promise<Eventus | undefined> {
    let referendum: Referendum | undefined
    const lecta: boolean =
      (await this.relata).first((relatum) => equal(lemma, relatum as Lemma))?.lecta ?? false
    switch (lemma.categoria.lowercase) {
      case      'actus': referendum =  await this._referaturActus(lemma.scriptum, lecta); break
      case 'adiectivum': referendum =  await this._referaturAdiectivum(lemma.scriptum, lecta); break
      case      'nomen': referendum =  await this._referaturNomen(lemma.scriptum, lecta); break
      case  'adverbium': referendum = (await adverbiorum.legatur(lemma.scriptum)).unum; break
      case  'numeramen': referendum = (await numeraminum.legatur(lemma.scriptum)).unum; break
      case   'promomen': referendum =  await pronomina.feratur(lemma.scriptum); break
      default          : referendum = (await verborum.legatur(lemma.scriptum)).unum; break
    } return referendum ? { ...referendum, categoria: lemma.categoria.lowercase } : undefined
  }

  @Nuntius.promittum async quaeratur(quaerenda: Quaerenda): Promise<Lemma[]> {
    switch (true) {
      case [
            !quaerenda.categoriae.empty,
            !quaerenda.      pars.empty
          ].all:
        return (await this.relata)
          .filter((relatum) => [
              relatum.scriptum.includes(quaerenda.pars),
              quaerenda.categoriae.includes(relatum.categoria)
            ].all
          ).map((relatum) => relatum)
      case [
            !quaerenda.categoriae.empty,
             quaerenda.      pars.empty
          ].all:
        return (await this.relata)
          .filter((relatum) => quaerenda.categoriae.includes(relatum.categoria))
          .map((relatum) => relatum)
      case [
             quaerenda.categoriae.empty,
            !quaerenda.      pars.empty
          ].all:
        return (await this.relata)
          .filter((relatum) => relatum.scriptum.includes(quaerenda.pars))
          .map((relatum) => relatum)
      case [
            quaerenda.categoriae.empty,
            quaerenda.      pars.empty
          ].all:
        return (await this.relata).map((relatum) => relatum)
      default: return []
  } }

  @Nuntius.promittum async forsReferatur(quaerenda?: Quaerenda): Promise<Eventus> {
    let eventus: Eventus | undefined
    do {
      if (quaerenda) eventus = await this.referatur((await this.quaeratur(quaerenda)).random)
      else eventus = await this.referatur((await this.relata).random)
    } while (!eventus)
    return eventus
} }

export const dictionarium: Dictionarium = new Dictionarium
