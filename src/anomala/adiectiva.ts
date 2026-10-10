import Anomala, { Mantela } from './anomala';
import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import Structor from '../praebeunda/structor';
import { TabulamenAdiectivi, TabulamenIncomparabilis } from '../praebeunda/tabulamina';
import { Encliticus } from '../praebeunda/valores';
import { Adiectivum } from '../praebeunda/verba';
import TabulaCollata from '../tabulae/collata';
import TabulaConiuncta from '../tabulae/coniuncta';
import TabulaIrregula from '../tabulae/irregula';
import TabulaRescripta from '../tabulae/rescriptae/rescripta';
import TabulaSuffixa from '../tabulae/rescriptae/suffixa';

@Ultimum @Ignavum @Nuntius.factum
class Adiectiva extends Anomala<Adiectivum> {
  @Nuntius.promittum
  protected override async numeretur(): Promise<void> {
    const mille: TabulaIrregula<Adiectivum> = new TabulaIrregula<Adiectivum>(Adiectivum, 'mīlle')
    const decimum: TabulamenIncomparabilis = new Structor(TabulamenIncomparabilis)
                     .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
                     .ponatur((adiectivum) => (adiectivum.nominativus = 'decimum'))
                     .ponatur((adiectivum) => (adiectivum.nominativus = 'decimī'))
                     .struatur
    const utrum: TabulamenIncomparabilis = new Structor(TabulamenIncomparabilis)
                   .ponatur((adiectivum) => (adiectivum.principium = 'pronominalis/cumLitteraR'))
                   .ponatur((adiectivum) => (adiectivum.nominativus = 'utrum'))
                   .ponatur((adiectivum) => (adiectivum.genitivus = 'utrī'))
                   .struatur
    const aliud: TabulaCollata<Adiectivum> = new TabulaCollata<Adiectivum>(
        new TabulaIrregula<Adiectivum>(Adiectivum, 'aliud'),
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'pronominalis'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'alium'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'aliī'))
              .struatur)
    const ambo: TabulaCollata<Adiectivum> = new TabulaCollata<Adiectivum>(
        new TabulaIrregula<Adiectivum>(Adiectivum, 'ambō'),
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda/pluralis'))
              .ponatur((adiectivum) => (adiectivum.scriptura = 'numerus = singularis: dele'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'ambum'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'ambī'))
              .struatur)
    const meum: TabulaCollata<Adiectivum> = new TabulaCollata<Adiectivum>(
        new TabulaIrregula<Adiectivum>(Adiectivum, 'meum'),
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'meum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'meī'))
              .struatur)
    const nonumdecimum: TabulaConiuncta<Adiectivum> = new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'nōnum'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'nōnī'))
              .struatur, decimum)
    const octavumdecimum: TabulaConiuncta<Adiectivum> = new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'octāvum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'octāvī'))
              .struatur, decimum)
    const quartumdecimum: TabulaConiuncta<Adiectivum> = new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'quārtum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'quārtī'))
              .struatur, decimum)
    const quintumdecimum: TabulaConiuncta<Adiectivum> = new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'quīntum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'quīntī'))
              .struatur, decimum)
    const septimumdecimum: TabulaConiuncta<Adiectivum> = new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'septimum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'septimī'))
              .struatur, decimum)
    const sextumdecimum: TabulaConiuncta<Adiectivum> = new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'sextum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'sextī'))
              .struatur, decimum)
    const tertiumdecimum: TabulaConiuncta<Adiectivum> = new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'sextum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'sextī'))
              .struatur, decimum)
    const duo: TabulaRescripta<Adiectivum> = new TabulaRescripta<Adiectivum>(ambo,
        (scriptum: string): string => scriptum.replace('amb', 'du'))
    const utrumque: TabulaSuffixa<Adiectivum> = new TabulaSuffixa<Adiectivum>(utrum, Encliticus.coniugans)
    const utrumcumque: TabulaSuffixa<Adiectivum> = new TabulaSuffixa<Adiectivum>(utrum, `cum${Encliticus.coniugans}`)
    const utrumvis: TabulaSuffixa<Adiectivum> = new TabulaSuffixa<Adiectivum>(utrum, 'vīs')

    this.contenta.set('aliud', new Mantela(aliud))
    this.contenta.set('ambō', new Mantela(ambo))
    this.contenta.set('duō', new Mantela(duo))
    this.contenta.set('meum', new Mantela(meum))
    this.contenta.set('mīlle', new Mantela(mille))
    this.contenta.set('nōnumdecimum', new Mantela(nonumdecimum))
    this.contenta.set('octāvumdecimum', new Mantela(octavumdecimum))
    this.contenta.set('quārtumdecimum', new Mantela(quartumdecimum))
    this.contenta.set('quīntumdecimum', new Mantela(quintumdecimum))
    this.contenta.set('septimumdecimum', new Mantela(septimumdecimum))
    this.contenta.set('sextumdecimum', new Mantela(sextumdecimum))
    this.contenta.set('tertiumdecimum', new Mantela(tertiumdecimum))
    this.contenta.set('utrumcumque', new Mantela(utrumcumque))
    this.contenta.set('utrumque', new Mantela(utrumque))
    this.contenta.set('utrumvīs', new Mantela(utrumvis))
  }
}

export const adiectiva: Adiectiva = new Adiectiva()
