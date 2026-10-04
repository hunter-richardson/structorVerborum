import Structor from './structor';
import {
  Actus,
  Adiectivum,
  Adverbium,
  Nomen,
  Numerale,
  Numeramen
  } from './verba';
import { actus as actusAnomali } from '../anomala/actus';
import { nomina } from '../anomala/nomina';
import '../extensions/array';
import '../extensions/string';
import { actuum } from '../lectores/verbalis';
import Numerator from '../miscella/numerator';
import { actus } from '../putatores/actus';
import { adiectivi } from '../putatores/adiectivi';
import { incomparabilis } from '../putatores/incomparabilis';
import { nominis } from '../putatores/nominis';
import { nominisFacti } from '../putatores/nominisFacti';
import TabulaAdverbii from '../tabulae/adverbii';
import TabulaNumeraminis from '../tabulae/numeraminis';
import Tabula from '../tabulae/tabula';
import type { Faciendum, Lectum, Referendum } from './interfecta';
import { dictionarium, type Lemma } from '../miscella/dictionarium';

export class ActusAgendus implements Faciendum<Actus>, Lectum {
  versio!: string
  infinitivum?: string
  perfectum?: string
  supinum?: string

  putetur(): Tabula<Actus> { return actus.putetur(this) }

  async nomen(): Promise<Faciendum<Nomen> | undefined> {
    if ((await nomina.omnia()).includes(this.infinitivum ?? '')) {
      return (await nomina.feratur(this.infinitivum ?? ''))
    } else {
      const versioNova: string = `${this.versio.split('/')[0]}${this.supinum?.trim() ? '//prona' : ''}`
      const radix: string = this.infinitivum?.chop(3) ?? ''
      let suffixumGeriundii: string
      switch (this.versio.split('/')[0]) {
        case 'prima':
          suffixumGeriundii = 'andum'
          break
        case 'secunda':
        case 'tertia':
          suffixumGeriundii = 'endum'
          break
        case 'tertiaVaria':
        case 'quarta':
          suffixumGeriundii = 'iendum'
          break
      }

      return new Structor(NomenActum)
                   .ponatur((nomen) => (nomen.infinitivum = this.infinitivum ?? ''))
                   .ponatur((nomen) => (nomen.gerundium = `${radix}${suffixumGeriundii}`))
                   .ponatur((nomen) => (nomen.supinum = this.supinum ?? ''))
                   .ponatur((nomen) => (nomen.versio = versioNova))
                   .struatur()
    }
  }

  actor(genus: string): NomenAgendum | undefined {
    const structor: Structor<NomenAgendum> = new Structor(NomenAgendum)
                      .ponatur((nomen) => (nomen.versio = 'tertiaAnimata'))
    switch (genus) {
      case 'masculinum':
        structor.ponatur((nomen) =>
                    (nomen.nominativum = this.supinum?.replace('um$', 'or') ?? ''))
                .ponatur((nomen) =>
                    (nomen.genitivum = this.supinum?.replace('um$', 'ōris') ?? ''))
        break
      case 'femininum':
        structor.ponatur((nomen) =>
                    (nomen.nominativum = this.supinum?.replace('t?um$', 'trīx') ?? ''))
                .ponatur((nomen) =>
                    (nomen.genitivum = this.supinum?.replace('t?um$', 'trīcis') ?? ''))
        break
      default:
        return undefined
    } return structor.struatur()
  }
}

export class AdverbiumAgendum implements Faciendum<Adverbium>, Lectum {
  versio!: string
  positivum!: string
  comparativum!: string
  superlativum!: string

  putetur(): Tabula<Adverbium> | undefined
  { return new TabulaAdverbii(this) }
}

export class NomenAgendum implements Faciendum<Nomen>, Lectum {
  versio!: string
  nominativum!: string
  genitivum!: string

  putetur(): Tabula<Nomen> | undefined
  { return nominis.putetur(this) }
}

export class NomenActum implements Faciendum<Nomen>, Lectum {
  versio!: string
  infinitivum!: string
  gerundium!: string
  supinum!: string

  putetur(): Tabula<Nomen> | undefined
  { return nominisFacti.putetur(this) }

  async actus(): Promise<Faciendum<Actus> | undefined> {
    return await ((await actuum.omnia()).includes(this.infinitivum) ?
                         actuum.legatur : actusAnomali.feratur)(this.infinitivum)
  }
}

export class AdiectivumAgendum implements Faciendum<Adiectivum>, Lectum {
  versio!: string
  positivum!: string
  comparativum!: string
  superlativum!: string

  putetur(): Tabula<Adiectivum> | undefined
  { return adiectivi.putetur(this) }

  async probetur(colamen: {
    gradus: string
     genus: string
  }): Promise<NomenAgendum | null> {
    let versioNova: string
    switch(colamen.gradus) {
      case 'comparativus': versioNova = 'generandaTertiae'; break
      case 'superlativus': versioNova = 'generanda'; break
      default:
        switch (this.versio) {
          case 'positivaAutPrimaAutSecunda':
            versioNova = 'generanda'; break
          case 'positivaAutPrimaAutSecunda/nominativusDirectus':
            versioNova = 'secundaMasculina/nominativusDirectus'; break
          case 'positivaAutPrimaAutSecunda//pluralis':
            versioNova = 'generanda//pluralis'; break
          case 'positivaAutPrimaAutSecunda/nominativusDirectus/pluralis':
            versioNova = 'secundaMasculina/nominativusDirectus/pluralis'; break
          case 'positivaAutPrimaAutSecunda/cumLitteraR':
            versioNova = 'secundaMasculina/cumLitteraR'; break
          case 'positivaAutPrimaAutSecunda/cumLitteraR/pluralis':
            versioNova = 'secundaMasculina/cumLitteraR/pluralis'; break
          case 'positivaTertia':
          case 'positivaTertia/nominativusUnigener':
            versioNova = 'generandaTertiae'; break
          case 'positivaTertia//pluralis':
          case 'positivaTertia/nominativusUnigener/pluralis':
            versioNova = 'generandaTertiae//pluralis'; break
          case 'positivaTertia/cumGenitivoVario':
          case 'positivaTertia/nominativusUnigenerCumGenitivoVario':
            versioNova = 'generandaTertiae/cumGenitivoVario'; break
          case 'positivaTertia/cumGenitivoVario/pluralis':
          case 'positivaTertia/nominativusUnigenerCumGenitivoVario/pluralis':
            versioNova = 'generandaTertiae/cumGenitivoVario/pluralis'; break
          case 'positivaTertia/cumAblativoVario':
          case 'positivaTertia/nominativusUnigenerCumAblativoVario':
            versioNova = 'generandaTertiae/cumAblativoVario'; break
          case 'positivaTertia/cumAblativoVario/pluralis':
          case 'positivaTertia/nominativusUnigenerCumAblativoVario/pluralis':
            versioNova = 'generandaTertiae/cumAblativoVario/pluralis'; break
          case 'positivaTertia/cumGenitivoAblativoqueVario':
          case 'positivaTertia/nominativusUnigenerCumGenitivoAblativoqueVario':
            versioNova = 'generandaTertiae/cumGenitivoAblativoqueVario'; break
          case 'positivaTertia/cumGenitivoAblativoVario/pluralis':
          case 'positivaTertia/nominativusUnigenerCumGenitivoAblativoqueVario/pluralis':
            versioNova = 'generandaTertiae/cumGenitivoAblativoqueVario/pluralis'; break
          case 'positivaTertia/cumTruncoVario':
          case 'positivaTertia/nominativusUnigenerCumTruncoVario':
            versioNova = 'generandaTertiae/cumTruncoVario'; break
          case 'positivaTertia/cumTruncoVario/pluralis':
          case 'positivaTertia/nominativusUnigenerCumTruncoVario/pluralis':
            versioNova = 'generandaTertiae/cumTruncoVario/pluralis'; break
          default:
            return null
        }
    }

    switch (colamen.genus) {
      case 'neutrum':
        versioNova = versioNova
                       .replace('generandaTertiae', 'tertiaNeutra')
                       .replace('generanda', 'secundaNeutra')
        break
      case 'masculinum':
        versioNova = versioNova
                       .replace('generandaTertiae', 'tertiaAnimata')
                       .replace('generanda', 'secundaMasculina')
        break
      case 'femininimum':
        versioNova = versioNova
                       .replace('generandaTertiae', 'tertiaAnimata')
                       .replace('generanda', 'prima')
        break
      default:
        return null
    }

    const tabula: Tabula<Adiectivum> | undefined = this.putetur()
    if (tabula) {
      const adiectiva: Adiectivum[] = await tabula.tabulentur()

      const nominativus: string | undefined = adiectiva.first((adiectivum) =>
        [
          (adiectivum.gradus .valor = colamen.gradus),
          (adiectivum.genus  .valor = colamen.genus),
          (adiectivum.numerus.valor = 'singularis'),
          (adiectivum.casus  .valor = 'nominativus')
        ].all()
      ).scriptum

      const genitivus: string | undefined = adiectiva.first((adiectivum) =>
        [
          (adiectivum.gradus .valor = colamen.gradus),
          (adiectivum.genus  .valor = colamen.genus),
          (adiectivum.numerus.valor = 'singularis'),
          (adiectivum.casus  .valor = 'genitivus')
        ].all()
      ).scriptum

      return new Structor(NomenAgendum)
                   .ponatur((nomen) => (nomen.nominativum = nominativus ?? ''))
                   .ponatur((nomen) => (nomen.genitivum = genitivus ?? ''))
                   .ponatur((nomen) => (nomen.versio = versioNova ?? ''))
                   .struatur()
    } else return null
  }
}

export class Incomparabile implements Faciendum<Adiectivum>, Lectum {
  versio!: string
  nominativum!: string
  genitivum!: string

  putetur(): Tabula<Adiectivum> | undefined
  { return incomparabilis.putetur(this) }

  probetur(genus: string): NomenAgendum | null {
    let versioNova: string
    switch (this.versio) {
      case 'autPrimaAutSecunda':
        versioNova = 'generanda'; break
      case 'autPrimaAutSecunda//pluralis':
        versioNova = 'generanda//plualis'; break
      case 'autPrimaAutSecunda/nominativusDirectus':
        versioNova = 'secundaMasculina/nominativusDirectus'; break
      case 'autPrimaAutSecunda/cumLitteraR':
        versioNova = 'secundaMasculina/cumLitteraR'; break
      case 'tertia':
      case 'tertia/nominativusUnigener':
        versioNova = 'generandaTertiae'; break
      case 'tertia/cumGenitivoVario':
      case 'tertia/nominativusUnigenerCumGenitivoVario':
        versioNova = 'generandaTertiae/cumGenitivoVario'; break
      case 'tertia/cumAblativoVario':
      case 'tertia/nominativusUnigenerCumAblativoVario':
        versioNova = 'generandaTertiae/cumAblativoVario'; break
      case 'tertia/cumGenitivoAblativoVario':
      case 'tertia/nominativusUnigenerCumGenitivoAblativoqueVario':
        versioNova = 'generandaTertiae/cumGenitivoAblativoVario'; break
      case 'tertia/cumTruncoVario':
      case 'tertia/nominativusUnigenerCumTruncoVario':
        versioNova = 'generandaTertiae/cumTruncoVario'; break
      case 'tertia/nominativusUnigener/pluralis':
        versioNova = 'generandaTertiae//pluralis'; break
      case 'tertia/nominativusUnigenerCumGenitivoVario/pluralis':
        versioNova = 'generandaTertiae/cumGenitivoVario/pluralis'; break
      case 'tertia/nominativusUnigenerCumAblativoVario/pluralis':
        versioNova = 'generandaTertiae/cumAblativoVario/pluralis'; break
      case 'tertia/nominativusUnigenerCumGenitivoAblativoVario/pluralis':
        versioNova = 'generandaTertiae/cumGenitivoAblativoqueVario/pluralis'; break
      case 'tertia/nominativusUnigenerCumTruncoVario/pluralis':
        versioNova = 'generandaTertiae/cumTruncoVario/pluralis'; break
      default:
        return null
    }

    switch (genus) {
      case 'neutrum':
        versioNova.replace('generandaTertae', 'tertiaNeutra')
                  .replace('generanda', 'secundaNeutra'); break
      case 'masculinum':
        versioNova.replace('generandaTertae', 'tertiaAnimata')
                  .replace('generanda', 'secundaMasculina'); break
      case 'femininum':
        versioNova.replace('generandaTertae', 'tertiaAnimata')
                  .replace('generanda', 'prima'); break
      default:
        return null
    }

    return new Structor(NomenAgendum)
                 .ponatur((nomen) => (nomen.nominativum = this.nominativum))
                 .ponatur((nomen) => (nomen.genitivum = this.genitivum))
                 .ponatur((nomen) => (nomen.versio = versioNova))
                 .struatur()
  }
}

export class NumeramenAgendum implements Faciendum<Numeramen>, Lectum {
  multiplicativum?: string
  distributivum?: string
  fractionale?: string
  cardinale?: string
  adverbium?: string
  ordinale?: string
  numerus!: string

  putetur(): Tabula<Numeramen> | undefined
  { return new TabulaNumeraminis(this) }

  async referatur(referendum: string): Promise<Referendum | undefined> {
    let lemma: Lemma = { categoria: '', scriptum: '' }

    switch (referendum) {
      case 'numerale': {
        const anglicus: number = Numerator.arabicus(this.numerus)
        return Numerale.numerator(anglicus)
      }
      case 'adverbium':
        lemma = {
          categoria: 'adverbium',
          scriptum: this.adverbium ?? ''
        }
        break
      case 'fractionale':
        lemma = {
          categoria: 'nomen',
          scriptum: this.fractionale ?? ''
        }
        break
      case 'ordinale':
        lemma = {
          categoria: 'adiectivum',
          scriptum: this.ordinale ?? ''
        }
        break
      case 'cardinale':
        lemma = {
          categoria: 'adiectivum',
          scriptum: this.cardinale ?? ''
        }
        break
      case 'multiplicativum':
        lemma = {
          categoria: 'adiectivum',
          scriptum: this.multiplicativum ?? ''
        }
        break
      case 'distributivum':
        lemma = {
          categoria: 'adiectivum',
          scriptum: this.distributivum ?? ''
        }
        break
      default: return undefined
    }

    return await dictionarium.referatur(lemma) ?? undefined
  }
}
