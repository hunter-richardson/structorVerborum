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
  @Nuntius.promittum
  protected override async numeretur(): Promise<void> {
    const Athos: TabulaIrregula<Nomen> = new TabulaIrregula<Nomen>(Nomen, 'Athōs')
    const Iesus: TabulaIrregula<Nomen> = new TabulaIrregula<Nomen>(Nomen, 'Iēsūs')
    const lexis: TabulaIrregula<Nomen> = new TabulaIrregula<Nomen>(Nomen, 'lexis')
    const vis: TabulaIrregula<Nomen> = new TabulaIrregula<Nomen>(Nomen, 'vīs')
    const balneum: TabulaBifissa = new TabulaBifissa(
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
              .struatur)
    const caelum: TabulaBifissa = new TabulaBifissa(
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
              .struatur)
    const dea: TabulaCollata<Nomen> = new TabulaCollata<Nomen>(
        new TabulaIrregula(Nomen, 'dea'),
        new Structor(TabulamenNominis)
              .ponatur((nomen) => nomen.principium = 'prima')
              .ponatur((nomen) => nomen.nominativus = 'dea')
              .ponatur((nomen) => nomen.genitivus = 'deae')
              .struatur)
    const domus: TabulaCollata<Nomen> = new TabulaCollata<Nomen>(
        new TabulaIrregula(Nomen, 'domus'),
        new Structor(TabulamenNominis)
              .ponatur((nomen) => (nomen.principium = 'quarta'))
              .ponatur((nomen) => (nomen.nominativus = 'domus'))
              .ponatur((nomen) => (nomen.genitivus = 'domūs'))
              .struatur)
    const iugerum: TabulaCollata<Nomen> = new TabulaCollata<Nomen>(
        new TabulaIrregula(Nomen, 'iūgerum'),
        new Structor(TabulamenNominis)
              .ponatur((nomen) => (nomen.principium = 'secunda/neutra'))
              .ponatur((nomen) => (nomen.nominativus = 'iūgerum'))
              .ponatur((nomen) => (nomen.genitivus = 'iūgerī'))
              .struatur)
    const Iuppiter: TabulaCollata<Nomen> = new TabulaCollata<Nomen>(
        new TabulaIrregula(Nomen, 'Iuppiter'),
        new Structor(TabulamenNominis)
              .ponatur(nomen => nomen.principium = 'tertia/animata')
              .ponatur(nomen => nomen.genitivus = 'Iovis')
              .struatur)
    const semidea: TabulaPraefixa<Nomen> = new TabulaPraefixa<Nomen>('semi', dea)

    this.contenta.set('Athōs', new Mantela(Athos))
    this.contenta.set('balneum', new Mantela(balneum))
    this.contenta.set('caelum', new Mantela(caelum))
    this.contenta.set('dea', new Mantela(dea))
    this.contenta.set('domus', new Mantela(domus))
    this.contenta.set('Iēsūs', new Mantela(Iesus))
    this.contenta.set('iūgerum', new Mantela(iugerum))
    this.contenta.set('Iuppiter', new Mantela(Iuppiter))
    this.contenta.set('lexis', new Mantela(lexis))
    this.contenta.set('sēmidea', new Mantela(semidea))
    this.contenta.set('vīs', new Mantela(vis))
  }
}

export const nomina: Nomina = new Nomina()
