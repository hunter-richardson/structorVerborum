import Nomina from '../anomala/nomina';
import Dictionarium, { type Lemma } from '../miscella/dictionarium';
import Numerator from '../miscella/numerator';
import PutatorActus from '../putatores/actus';
import PutatorAdiectivi from '../putatores/adiectivi';
import PutatorIncomparabilis from '../putatores/incomparabilis';
import PutatorNominis from '../putatores/nominis';
import PutatorNominisFacti from '../putatores/nominisFacti';
import TabulaAdverbii from '../tabulae/adverbii';
import TabulaNumeraminis from '../tabulae/numeraminis';
import Tabula from '../tabulae/tabula';
import * as Interfecta from './interfecta';
import Structor from './structor';
import * as Verba from './verba';

export type Agendum<Hoc extends Verba.Multiplex> = Omit<Hoc, 'categoria' | 'enclicitum' | 'unicum'>;
export type Colamen<Hoc> = Omit<Hoc, 'categoria' | 'scriptum' | 'encliticum'>;
export type Positor<Hoc extends Verba.Multiplex> = (agendum: Agendum<Hoc>) => Hoc;

export class ActusAgendus implements Interfecta.Faciendum<Verba.Actus>, Interfecta.Lectum {
  versio: string = '';
  infinitivum: string = '';
  perfectum: string = '';
  supinum: string = '';

  putetur(): Tabula<Verba.Actus> {
    return PutatorActus.se.ipse().putetur(this);
  }

  async nomen(): Promise<Interfecta.Faciendum<Verba.Nomen> | null> {
    using nomina: Nomina = Nomina.se.ipse();
    if ((await nomina.omnia()).includes(this.infinitivum)) {
      return (await nomina.feratur(this.infinitivum)) ?? null;
    } else {
      const versioNova: string = this.versio
        .split('/')
        .first()
        .concat(this.supinum?.trim() ? '' : '//prona');
      const radix: string = this.infinitivum.chop(3);
      let suffixumGeriundii: string;
      switch (this.versio.split('/').first()) {
        case 'prima':
          suffixumGeriundii = 'andum';
          break;
        case 'secunda':
        case 'tertia':
          suffixumGeriundii = 'endum';
          break;
        case 'tertiaVaria':
        case 'quarta':
          suffixumGeriundii = 'iendum';
          break;
      }

      return new Structor(() => new NomenActum)
        .ponatur((nomen) => (nomen.infinitivum = this.infinitivum))
        .ponatur((nomen) => (nomen.gerundium = radix.concat(suffixumGeriundii)))
        .ponatur((nomen) => (nomen.supinum = this.supinum))
        .ponatur((nomen) => (nomen.versio = versioNova))
        .struatur();
    }
  }

  actor(genus: string): NomenAgendum | null {
    const structor: Structor<NomenAgendum> = new Structor(() => new NomenAgendum)
          .ponatur((nomen) => (nomen.versio = 'tertiaAnimata'))
    switch (genus) {
      case 'masculinum':
        structor
          .ponatur((nomen) => (nomen.nominativum = this.supinum.replace('um$', 'or')))
          .ponatur((nomen) => (nomen.genitivum = this.supinum.replace('um$', 'ōris')));
        break;
      case 'femininum':
        structor
          .ponatur((nomen) => (nomen.nominativum = this.supinum.replace('t?um$', 'trīx')))
          .ponatur((nomen) => (nomen.genitivum = this.supinum.replace('t?um$', 'trīcis')));
        break;
      default:
        return null;
    }

    return structor.struatur();
  }
}

export class AdverbiumAgendum implements Interfecta.Faciendum<Verba.Adverbium>, Interfecta.Lectum {
  versio: string = '';
  positivum: string = '';
  comparativum: string = '';
  superlativum: string = '';

  putetur(): Tabula<Verba.Adverbium> | null {
    return new TabulaAdverbii(this);
  }
}

export class NomenAgendum implements Interfecta.Faciendum<Verba.Nomen>, Interfecta.Lectum {
  versio: string = '';
  nominativum: string = '';
  genitivum: string = '';

  putetur(): Tabula<Verba.Nomen> {
    return PutatorNominis.se.ipse().putetur(this);
  }
}

export class NomenActum implements Interfecta.Faciendum<Verba.Nomen>, Interfecta.Lectum {
  versio: string = '';
  infinitivum: string = '';
  gerundium: string = '';
  supinum: string = '';

  putetur(): Tabula<Verba.Nomen> {
    return PutatorNominisFacti.se.ipse().putetur(this);
  }

  async actus(): Promise<Interfecta.Faciendum<Verba.Actus> | null> {
    const dictionarium: Dictionarium = Dictionarium.se.ipse();
    return (
      await dictionarium.referatur({
        categoria: 'actus',
        scriptum: this.infinitivum
      })
    )?.referendum as ActusAgendus;
  }
}

export class AdiectivumAgendum implements Interfecta.Faciendum<Verba.Adiectivum>, Interfecta.Lectum {
  versio: string = '';
  positivum: string = '';
  comparativum: string = '';
  superlativum: string = '';

  putetur(): Tabula<Verba.Adiectivum> {
    return PutatorAdiectivi.se.ipse().putetur(this);
  }

  async probetur(colamen: { gradus: string; genus: string }): Promise<NomenAgendum | null> {
    let versioNova: string;
    if (colamen.gradus === 'comparativus') {
      versioNova = 'generandaTertiae';
    } else if (colamen.gradus === 'superlativus') {
      versioNova = 'generanda';
    } else {
      switch (this.versio) {
        case 'positivaAutPrimaAutSecunda':
          versioNova = 'generanda';
          break;
        case 'positivaAutPrimaAutSecunda/nominativusDirectus':
          versioNova = 'secundaMasculina/nominativusDirectus';
          break;
        case 'positivaAutPrimaAutSecunda//pluralis':
          versioNova = 'generanda//pluralis';
          break;
        case 'positivaAutPrimaAutSecunda/nominativusDirectus/pluralis':
          versioNova = 'secundaMasculina/nominativusDirectus/pluralis'
          break;
        case 'positivaAutPrimaAutSecunda/cumLitteraR':
          versioNova = 'secundaMasculina/cumLitteraR';
          break;
        case 'positivaAutPrimaAutSecunda/cumLitteraR/pluralis':
          versioNova = 'secundaMasculina/cumLitteraR/pluralis';
          break;
        case 'positivaTertia':
        case 'positivaTertia/nominativusUnigener':
          versioNova = 'generandaTertiae';
          break;
        case 'positivaTertia//pluralis':
        case 'positivaTertia/nominativusUnigener/pluralis':
          versioNova = 'generandaTertiae//pluralis';
          break;
        case 'positivaTertia/cumGenitivoVario':
        case 'positivaTertia/nominativusUnigenerCumGenitivoVario':
          versioNova = 'generandaTertiae/cumGenitivoVario';
          break;
        case 'positivaTertia/cumGenitivoVario/pluralis':
        case 'positivaTertia/nominativusUnigenerCumGenitivoVario/pluralis':
          versioNova = 'generandaTertiae/cumGenitivoVario/pluralis';
          break;
        case 'positivaTertia/cumAblativoVario':
        case 'positivaTertia/nominativusUnigenerCumAblativoVario':
          versioNova = 'generandaTertiae/cumAblativoVario';
          break;
        case 'positivaTertia/cumAblativoVario/pluralis':
        case 'positivaTertia/nominativusUnigenerCumAblativoVario/pluralis':
          versioNova = 'generandaTertiae/cumAblativoVario/pluralis';
          break;
        case 'positivaTertia/cumGenitivoAblativoqueVario':
        case 'positivaTertia/nominativusUnigenerCumGenitivoAblativoqueVario':
          versioNova = 'generandaTertiae/cumGenitivoAblativoqueVario';
          break;
        case 'positivaTertia/cumGenitivoAblativoVario/pluralis':
        case 'positivaTertia/nominativusUnigenerCumGenitivoAblativoqueVario/pluralis':
          versioNova = 'generandaTertiae/cumGenitivoAblativoqueVario/pluralis';
          break;
        case 'positivaTertia/cumTruncoVario':
        case 'positivaTertia/nominativusUnigenerCumTruncoVario':
          versioNova = 'generandaTertiae/cumTruncoVario';
          break;
        case 'positivaTertia/cumTruncoVario/pluralis':
        case 'positivaTertia/nominativusUnigenerCumTruncoVario/pluralis':
          versioNova = 'generandaTertiae/cumTruncoVario/pluralis';
          break;
        default:
          return null;
      }
    }

    switch (colamen.genus) {
      case 'neutrum':
        versioNova = versioNova
          .replace('generandaTertiae', 'tertiaNeutra')
          .replace('generanda', 'secundaNeutra');
        break;
      case 'masculinum':
        versioNova = versioNova
          .replace('generandaTertiae', 'tertiaAnimata')
          .replace('generanda', 'secundaMasculina');
        break;
      case 'femininimum':
        versioNova = versioNova
          .replace('generandaTertiae', 'tertiaAnimata')
          .replace('generanda', 'prima');
        break;
      default:
        return null;
    }

    const tabula: Tabula<Verba.Adiectivum> = this.putetur()
    if (tabula) {
      const adiectiva: Verba.Adiectivum[] = await tabula?.tabulentur();

      const nominativus: string = adiectiva.first((adiectivum) =>
        [
          (adiectivum.gradus = colamen.gradus),
          (adiectivum.genus = colamen.genus),
          (adiectivum.numerus = 'singularis'),
          (adiectivum.casus = 'nominativus')
        ].all()
      ).scriptum;

      const genitivus: string = adiectiva.first((adiectivum) =>
        [
          (adiectivum.gradus = colamen.gradus),
          (adiectivum.genus = colamen.genus),
          (adiectivum.numerus = 'singularis'),
          (adiectivum.casus = 'genitivus')
        ].all()
      ).scriptum;

      return new Structor(() => new NomenAgendum)
        .ponatur((nomen) => (nomen.nominativum = nominativus))
        .ponatur((nomen) => (nomen.genitivum = genitivus))
        .ponatur((nomen) => (nomen.versio = versioNova))
        .struatur();
    } else {
      return null;
    }
  }
}

export class Incomparabile implements Interfecta.Faciendum<Verba.Adiectivum>, Interfecta.Lectum {
  versio: string = '';
  nominativum: string = '';
  genitivum: string = '';

  putetur(): Tabula<Verba.Adiectivum> {
    return PutatorIncomparabilis.se.ipse().putetur(this);
  }

  probetur(genus: string): NomenAgendum | null {
    let versioNova: string;
    switch (this.versio) {
      case 'autPrimaAutSecunda':
        versioNova = 'generanda';
        break;
      case 'autPrimaAutSecunda//pluralis':
        versioNova = 'generanda//plualis';
        break;
      case 'autPrimaAutSecunda/nominativusDirectus':
        versioNova = 'secundaMasculina/nominativusDirectus';
        break;
      case 'autPrimaAutSecunda/cumLitteraR':
        versioNova = 'secundaMasculina/cumLitteraR';
        break;
      case 'tertia':
      case 'tertia/nominativusUnigener':
        versioNova = 'generandaTertiae';
        break;
      case 'tertia/cumGenitivoVario':
      case 'tertia/nominativusUnigenerCumGenitivoVario':
        versioNova = 'generandaTertiae/cumGenitivoVario';
        break;
      case 'tertia/cumAblativoVario':
      case 'tertia/nominativusUnigenerCumAblativoVario':
        versioNova = 'generandaTertiae/cumAblativoVario';
        break;
      case 'tertia/cumGenitivoAblativoVario':
      case 'tertia/nominativusUnigenerCumGenitivoAblativoqueVario':
        versioNova = 'generandaTertiae/cumGenitivoAblativoVario';
        break;
      case 'tertia/cumTruncoVario':
      case 'tertia/nominativusUnigenerCumTruncoVario':
        versioNova = 'generandaTertiae/cumTruncoVario';
        break;
      case 'tertia/nominativusUnigener/pluralis':
        versioNova = 'generandaTertiae//pluralis';
        break;
      case 'tertia/nominativusUnigenerCumGenitivoVario/pluralis':
        versioNova = 'generandaTertiae/cumGenitivoVario/pluralis';
        break;
      case 'tertia/nominativusUnigenerCumAblativoVario/pluralis':
        versioNova = 'generandaTertiae/cumAblativoVario/pluralis';
        break;
      case 'tertia/nominativusUnigenerCumGenitivoAblativoVario/pluralis':
        versioNova = 'generandaTertiae/cumGenitivoAblativoqueVario/pluralis';
        break;
      case 'tertia/nominativusUnigenerCumTruncoVario/pluralis':
        versioNova = 'generandaTertiae/cumTruncoVario/pluralis';
        break;
      default:
        return null;
    }

    switch (genus) {
      case 'neutrum':
        versioNova
          .replace('generandaTertae', 'tertiaNeutra')
          .replace('generanda', 'secundaNeutra');
        break;
      case 'masculinum':
        versioNova
          .replace('generandaTertae', 'tertiaAnimata')
          .replace('generanda', 'secundaMasculina');
        break;
      case 'femininum':
        versioNova
          .replace('generandaTertae', 'tertiaAnimata')
          .replace('generanda', 'prima');
        break;
      default:
        return null;
    }

    return new Structor(() => new NomenAgendum)
      .ponatur((nomen) => (nomen.nominativum = this.nominativum))
      .ponatur((nomen) => (nomen.genitivum = this.genitivum))
      .ponatur((nomen) => (nomen.versio = versioNova))
      .struatur();
  }
}

export class NumeramenAgendum implements Interfecta.Faciendum<Verba.Numeramen>, Interfecta.Lectum {
  numerus: string = '';
  ordinale: string = '';
  cardinale: string = '';
  adverbium: string = '';
  multiplicativum: string = '';
  distributivum: string = '';
  fractionale: string = '';

  putetur(): Tabula<Verba.Numeramen> {
    return new TabulaNumeraminis(this);
  }

  async referatur(referendum: string): Promise<Interfecta.Referendum | null> {
    let lemma: Lemma = {
      categoria: '',
      scriptum: ''
    };

    switch (referendum) {
      case 'numerus': {
        const anglicus: number = Numerator.arabicus(this.numerus);
        return anglicus === null ? null : Verba.Numerus.numerator(anglicus);
      }
      case 'adverbium':
        lemma = {
          categoria: 'adverbium',
          scriptum: this.adverbium
        };
        break;
      case 'fractionale':
        lemma = {
          categoria: 'nomen',
          scriptum: this.fractionale
        };
        break;
      case 'ordinale':
        lemma = {
          categoria: 'adiectivum',
          scriptum: this.ordinale
        };
        break;
      case 'cardinale':
        lemma = {
          categoria: 'adiectivum',
          scriptum: this.cardinale
        };
        break;
      case 'multiplicativum':
        lemma = {
          categoria: 'adiectivum',
          scriptum: this.multiplicativum
        };
        break;
      case 'distributivum':
        lemma = {
          categoria: 'adiectivum',
          scriptum: this.distributivum
        };
        break;
      default:
        return null;
    }

    const dictionarium: Dictionarium = Dictionarium.se.ipse();
    return dictionarium.referatur(lemma);
  }
}
