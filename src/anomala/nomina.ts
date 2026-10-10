import Anomala, { Mantela } from './anomala';
import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import Structor from '../praebeunda/structor';
import { TabulamenNominis } from '../praebeunda/tabulamina';
import { Nomen } from '../praebeunda/verba';
import TabulaBifissa from '../tabulae/bifissa';
import TabulaCollata from '../tabulae/collata';
import TabulaIrregula from '../tabulae/irregula';
import TabulaPraefixa from '../tabulae/rescriptae/praefixa';

@Ultimum @Ignavum @Nuntius.factum
class Nomina extends Anomala<Nomen> {
  @Nuntius.captor get omnia (): Promise<string[]> {
    return new Promise(() => [
      'Athōs', 'balneum', 'dea', 'domus', 'Iēsūs', 'iūgerum', 'lexis', 'sēmidea', 'vīs'
    ].sort().unique());
  }

  @Nuntius.promittum
  protected override async numeretur(): Promise<void> {
    this.contenta['Athos'] = new Mantela(new TabulaIrregula<Nomen>(Nomen, 'Athōs'))
    this.contenta['Iesus'] = new Mantela(new TabulaIrregula<Nomen>(Nomen, 'Iēsūs'))
    this.contenta['lexis'] = new Mantela(new TabulaIrregula<Nomen>(Nomen, 'lexis'))
    this.contenta['vis'] = new Mantela(new TabulaIrregula<Nomen>(Nomen, 'vīs'))
    this.contenta['balneum'] = new Mantela(new TabulaBifissa(
        new Structor(TabulamenNominis)
              .ponatur((nomen) => (nomen.principium = 'secunda/neutra'))
              .ponatur((nomen) => (nomen.scriptura = 'numerus = pluralis: dele'))
              .ponatur((nomen) => (nomen.nominativus = 'balneum'))
              .ponatur((nomen) => (nomen.genitivus = 'balneī'))
              .struatur,
        new Structor(TabulamenNominis)
              .ponatur((nomen) => (nomen.principium = 'prima'))
              .ponatur((nomen) => (nomen.scriptura = 'numerus = singularis: dele'))
              .ponatur((nomen) => (nomen.nominativus = 'balnea'))
              .ponatur((nomen) => (nomen.genitivus = 'balneae'))
              .struatur))
    this.contenta['caelum'] = new Mantela(new TabulaBifissa(
        new Structor(TabulamenNominis)
              .ponatur((nomen) => (nomen.principium = 'secunda/neutra'))
              .ponatur((nomen) => (nomen.scriptura = 'numerus = pluralis: dele'))
              .ponatur((nomen) => (nomen.nominativus = 'caelum'))
              .ponatur((nomen) => (nomen.genitivus = 'caelī'))
              .struatur,
        new Structor(TabulamenNominis)
              .ponatur((nomen) => (nomen.principium = 'secunda/masculina'))
              .ponatur((nomen) => (nomen.scriptura = 'numerus = singularis: dele'))
              .ponatur((nomen) => (nomen.nominativus = 'caelus'))
              .ponatur((nomen) => (nomen.genitivus = 'caelī'))
              .struatur))
    this.contenta['dea'] = new Mantela(new TabulaCollata<Nomen>(
        new TabulaIrregula(Nomen, 'dea'),
        new Structor(TabulamenNominis)
              .ponatur((nomen) => nomen.principium = 'prima')
              .ponatur((nomen) => nomen.nominativus = 'dea')
              .ponatur((nomen) => nomen.genitivus = 'deae')
              .struatur))
    this.contenta['domus'] = new Mantela(new TabulaCollata<Nomen>(
        new TabulaIrregula(Nomen, 'domus'),
        new Structor(TabulamenNominis)
              .ponatur((nomen) => (nomen.principium = 'quarta'))
              .ponatur((nomen) => (nomen.nominativus = 'domus'))
              .ponatur((nomen) => (nomen.genitivus = 'domūs'))
              .struatur))
    this.contenta['iugerum'] = new Mantela(new TabulaCollata<Nomen>(
        new TabulaIrregula(Nomen, 'iūgerum'),
        new Structor(TabulamenNominis)
              .ponatur((nomen) => (nomen.principium = 'secunda/neutra'))
              .ponatur((nomen) => (nomen.nominativus = 'iūgerum'))
              .ponatur((nomen) => (nomen.genitivus = 'iūgerī'))
              .struatur))
    this.contenta['Iuppiter'] = new Mantela(new TabulaCollata<Nomen>(
        new TabulaIrregula(Nomen, 'Iuppiter'),
        new Structor(TabulamenNominis)
              .ponatur(nomen => nomen.principium = 'tertia/animata')
              .ponatur(nomen => nomen.genitivus = 'Iovis')
              .struatur))
    this.contenta['semidea'] = new Mantela(new TabulaPraefixa<Nomen>('sēmi', this.contenta['dea']))
  }
}

export const nomina: Nomina = new Nomina()
