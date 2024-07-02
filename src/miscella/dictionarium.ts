import deepEqual from 'deep-equal';
import Actus from '../anomala/actus';
import Adiectiva from '../anomala/adiectiva';
import { Mantela } from '../anomala/anomala';
import Nomina from '../anomala/nomina';
import Pronomina from '../anomala/pronomina';
import LectorVerbalis from '../lectores/verbalis';
import { LectorVerbi } from '../lectores/verbi';
import * as Agenda from '../praebeunda/agenda';
import type { Referendum } from '../praebeunda/interfecta';
import type { Pronomen, Verbum } from '../praebeunda/verba';
import Ignavum from './ignavum';
import Nuntius from './nuntius';

export type Lemma = {
  categoria: string
  scriptum: string
};

export type Relatum = {
  lemma: Lemma
  lecta: boolean
};

export type Quaerenda = {
  pars: string
  categoriae: string[]
};

export type Eventus = {
  referendum: Referendum
  categoria: string
};

@Nuntius.factum('Dictionarium')
export default class Dictionarium {
  static se: Ignavum<Dictionarium> = new Ignavum(() => new Dictionarium);

  private readonly _lectorActuum: Ignavum<LectorVerbalis<Agenda.ActusAgendus>> =
    LectorVerbalis.Actuum;
  private readonly _lectorAdverbiorum: Ignavum<LectorVerbalis<Agenda.AdverbiumAgendum>> =
    LectorVerbalis.Adverbiorum;
  private readonly _lectorAdiectivorum: Ignavum<LectorVerbalis<Agenda.AdiectivumAgendum>> =
    LectorVerbalis.Adiectivorum;
  private readonly _lectorIncomparabilium: Ignavum<LectorVerbalis<Agenda.Incomparabile>> =
    LectorVerbalis.Incomparabilium;
  private readonly _lectorNominis: Ignavum<LectorVerbalis<Agenda.NomenAgendum>> =
    LectorVerbalis.Nominum;
  private readonly _lectorNumeraminis: Ignavum<LectorVerbalis<Agenda.NumeramenAgendum>> =
    LectorVerbalis.Numeraminum;
  private readonly _lector: Ignavum<LectorVerbi> = LectorVerbi.se;

  private readonly _pronomina: Ignavum<Pronomina> = Pronomina.se;
  private readonly _actus: Ignavum<Actus> = Actus.se;
  private readonly _adiectiva: Ignavum<Adiectiva> = Adiectiva.se;
  private readonly _nomina: Ignavum<Nomina> = Nomina.se;

  private readonly _relata: Relatum[] = [];

  private get relata(): Promise<Relatum[]> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (seratur: (valor: Relatum[]) => void): Promise<void> => {
      if (!this._relata.length) {
        await this.perscribantur();
      }

      return seratur(this._relata);
    });
  }

  @Nuntius.futurus('Dictionarium')
  async perscribantur(): Promise<void> {
    if (!this._relata.length) {
      const lectorActus: LectorVerbalis<Agenda.ActusAgendus> = this._lectorActuum.ipse();
      (await lectorActus.omnia()).forEach((res) => {
        this._relata.push({
          lemma: {
            categoria: 'Actus',
            scriptum: res
          },
          lecta: true
        });

        this._relata.push({
          lemma: {
            categoria: 'Nomen',
            scriptum: res
          },
          lecta: true
        });
      });

      const lectorAdverbiorum: LectorVerbalis<Agenda.AdverbiumAgendum> =
        this._lectorAdverbiorum.ipse();
      (await lectorAdverbiorum.omnia()).forEach((res) => {
        this._relata.push({
          lemma: {
            categoria: 'Adverbium',
            scriptum: res
          },
          lecta: true
        });
      });

      const lectorAdiectivorum: LectorVerbalis<Agenda.AdiectivumAgendum> =
        this._lectorAdiectivorum.ipse();
      (await lectorAdiectivorum.omnia()).forEach((res) => {
        this._relata.push({
          lemma: {
            categoria: 'Adiectivum',
            scriptum: res
          },
          lecta: true
        });
      });

      const lectorIncomparabilium: LectorVerbalis<Agenda.Incomparabile> =
        this._lectorIncomparabilium.ipse();
      (await lectorIncomparabilium.omnia()).forEach((res) => {
        this._relata.push({
          lemma: {
            categoria: 'Adiectivum',
            scriptum: res
          },
          lecta: true
        });
      });

      const lectorNominis: LectorVerbalis<Agenda.NomenAgendum> = this._lectorNominis.ipse();
      (await lectorNominis.omnia()).forEach((res) => {
        this._relata.push({
          lemma: {
            categoria: 'Nomen',
            scriptum: res
          },
          lecta: true
        });
      });

      const lectorNumeraminis: LectorVerbalis<Agenda.NumeramenAgendum> =
        this._lectorNumeraminis.ipse();
      (await lectorNumeraminis.omnia()).forEach((res) => {
        this._relata.push({
          lemma: {
            categoria: 'Numeramen',
            scriptum: res
          },
          lecta: true
        });
      });

      const pronomina: Pronomina = this._pronomina.ipse();
      (await pronomina.omnia()).forEach((res) => {
        this._relata.push({
          lemma: {
            categoria: 'Pronomen',
            scriptum: res
          },
          lecta: false
        });
      });

      const actus: Actus = this._actus.ipse();
      (await actus.omnia()).forEach((res) => {
        this._relata.push({
          lemma: {
            categoria: 'Actus',
            scriptum: res
          },
          lecta: false
        });
      });

      const adiectiva: Adiectiva = this._adiectiva.ipse();
      (await adiectiva.omnia()).forEach((res) => {
        this._relata.push({
          lemma: {
            categoria: 'Adiectivum',
            scriptum: res
          },
          lecta: false
        });
      });

      const nomina: Nomina = this._nomina.ipse();
      (await nomina.omnia()).forEach((res) => {
        this._relata.push({
          lemma: {
            categoria: 'Nomen',
            scriptum: res
          },
          lecta: false
        });
      });

      const lector: LectorVerbalis<Verbum> = this._lector.ipse();
      (await lector.omnia()).forEach((res) => {
        const [categoria, scriptum] = res.split('/')
        this._relata.push({
          lemma: {
            categoria: categoria,
            scriptum: scriptum
          },
          lecta: true
        });
      });
    }
  }

  @Nuntius.futurus('Dictionarium')
  async referatur(lemma: Lemma): Promise<Eventus | null> {
    const lecta: boolean =
      (await this.relata).first((relatum) => deepEqual(lemma, relatum.lemma))?.lecta ?? false;
    switch (lemma.categoria.toLowerCase()) {
      case 'actus': {
        if (lecta) {
          const lectorActuum: LectorVerbalis<Agenda.ActusAgendus> = this._lectorActuum.ipse();
          const actus: Referendum | null = await lectorActuum.legatur(lemma.scriptum);
          return actus
            ? {
                referendum: actus,
                categoria: lemma.categoria.toLowerCase()
              }
            : null;
        } else {
          using actus: Actus = this._actus.ipse();
          const referendum: Referendum | null = (await actus.feratur(lemma.scriptum)) ?? null;
          return referendum
            ? {
                referendum: referendum,
                categoria: lemma.categoria.toLowerCase()
              }
            : null;
        }
      }
      case 'adiectivum': {
        if (lecta) {
          const lectorAdiectivorum: LectorVerbalis<Agenda.AdiectivumAgendum> = this._lectorAdiectivorum.ipse();
          if ((await lectorAdiectivorum.omnia()).includes(lemma.scriptum)) {
            const adiectivum: Referendum | null = await lectorAdiectivorum.legatur(lemma.scriptum);
            return adiectivum
              ? {
                  referendum: adiectivum,
                  categoria: lemma.categoria.toLowerCase()
                }
              : null;
          } else {
            const lectorIncomparabilium: LectorVerbalis<Agenda.Incomparabile> = this._lectorIncomparabilium.ipse();
            const incomparabile: Referendum | null = await lectorIncomparabilium.legatur(lemma.scriptum);
            return incomparabile
              ? {
                  referendum: incomparabile,
                  categoria: lemma.categoria.toLowerCase()
                }
              : null;
          }
        } else {
          using adiectiva: Adiectiva = this._adiectiva.ipse();
          const referendum: Referendum | null = (await adiectiva.feratur(lemma.scriptum)) ?? null;
          return referendum
            ? {
                referendum: referendum,
                categoria: lemma.categoria.toLowerCase()
              }
            : null;
        }
      }
      case 'adverbium': {
        const lectorAdverbium: LectorVerbalis<Agenda.AdverbiumAgendum> = this._lectorAdverbiorum.ipse();
        const adverbium: Referendum | null = await lectorAdverbium.legatur(lemma.scriptum);
        return adverbium
          ? {
              referendum: adverbium,
              categoria: lemma.categoria.toLowerCase()
            }
          : null;
      }
      case 'nomen': {
        if (lecta) {
          const lectorActuum: LectorVerbalis<Agenda.ActusAgendus> = this._lectorActuum.ipse();
          if ((await lectorActuum.omnia()).includes(lemma.scriptum)) {
            const nomen: Referendum | null = (await (await lectorActuum.legatur(lemma.scriptum))?.nomen()) ?? null;
            return nomen
              ? {
                  referendum: nomen,
                  categoria: lemma.categoria.toLowerCase()
                }
              : null;
          } else {
            const lectorNominis: LectorVerbalis<Agenda.NomenAgendum> = this._lectorNominis.ipse();
            const nomen: Referendum | null = await lectorNominis.legatur(lemma.scriptum);
            return nomen
              ? {
                  referendum: nomen,
                  categoria: lemma.categoria.toLowerCase()
                }
              : null;
          }
        } else {
          using nomina: Nomina = this._nomina.ipse();
          const nomen: Referendum | null = (await nomina.feratur(lemma.scriptum)) ?? null;
          return nomen
            ? {
                referendum: nomen,
                categoria: lemma.categoria.toLowerCase()
              }
            : null;
        }
      }
      case 'numeramen': {
        const lectorNumeraminis: LectorVerbalis<Agenda.NumeramenAgendum> = this._lectorNumeraminis.ipse();
        const numeramen: Referendum | null = await lectorNumeraminis.legatur(lemma.scriptum);
        return numeramen
          ? {
              referendum: numeramen,
              categoria: lemma.categoria.toLowerCase()
            }
          : null;
      }
      case 'promomen': {
        using pronomina: Pronomina = this._pronomina.ipse();
        const pronomen: Mantela<Pronomen> | null = (await pronomina.feratur(lemma.scriptum)) ?? null;
        return pronomen
          ? {
              referendum: pronomen,
              categoria: lemma.categoria.toLowerCase()
            }
          : null;
      }
      default: {
        const lector: LectorVerbalis<Verbum> = this._lector.ipse();
        const verbum: Verbum | null = await lector.legatur(lemma.scriptum);
        return verbum
          ? {
              referendum: verbum,
              categoria: lemma.categoria.toLowerCase()
            }
          : null;
      }
    }
  }

  @Nuntius.futurus('Dictionarium')
  async quaeratur(quaerenda: Quaerenda): Promise<Lemma[]> {
    switch (true) {
      case [!!quaerenda.categoriae, !!quaerenda.pars].all():
        return (await this.relata)
          .filter((relatum) =>
            [
              relatum.lemma.scriptum.includes(quaerenda.pars),
              quaerenda.categoriae.includes(relatum.lemma.categoria)
            ].all()
          )
          .map((relatum) => relatum.lemma);
      case [!!quaerenda.categoriae, !quaerenda.pars].all():
        return (await this.relata)
          .filter((relatum) => quaerenda.categoriae.includes(relatum.lemma.categoria))
          .map((relatum) => relatum.lemma);
      case [!quaerenda.categoriae, !!quaerenda.pars].all():
        return (await this.relata)
          .filter((relatum) => relatum.lemma.scriptum.includes(quaerenda.pars))
          .map((relatum) => relatum.lemma);
      case [!quaerenda.categoriae, !quaerenda.pars].all():
        return (await this.relata).map((relatum) => relatum.lemma);
      default:
        return [];
    }
  }

  @Nuntius.futurus('Dictionarium')
  async forsReferatur(quaerenda?: Quaerenda): Promise<Eventus> {
    let eventus: Eventus | null = null;
    do {
      if (quaerenda) {
        eventus = await this.referatur((await this.quaeratur(quaerenda)).random());
      } else {
        eventus = await this.referatur((await this.relata).random().lemma);
      }
    } while (!eventus);

    return eventus;
  }
}
