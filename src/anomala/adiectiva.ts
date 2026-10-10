import Anomala, { Mantela } from './anomala';
import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import Structor from '../praebeunda/structor';
import { TabulamenIncomparabilis } from '../praebeunda/tabulamina';
import { Encliticus } from '../praebeunda/valores';
import { Adiectivum } from '../praebeunda/verba';
import TabulaCollata from '../tabulae/collata';
import TabulaConiuncta from '../tabulae/coniuncta';
import TabulaIrregula from '../tabulae/irregula';
import TabulaRescripta from '../tabulae/rescriptae/rescripta';
import TabulaSuffixa from '../tabulae/rescriptae/suffixa';

@Ultimum @Ignavum @Nuntius.factum
class Adiectiva extends Anomala<Adiectivum> {
  @Nuntius.captor get omnia(): Promise<string[]> {
    return new Promise(() => [
      'aliud', 'ambō', 'duō', 'mīlle', 'meum', 'nōnumdecimum', 'octāvumdecimum', 'quārtumdecimum', 'quīntumdecimum', 'septimumdecimum', 'sextumdecimum', 'utrumque', 'utrumcumque', 'utrumvīs'
    ].sort().unique())
  }

  @Nuntius.promittum
  protected override async numeretur(): Promise<void> {
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

    this.contenta['mille'] = new Mantela(new TabulaIrregula<Adiectivum>(Adiectivum, 'mīlle'))
    this.contenta['aliud'] = new Mantela(new TabulaCollata<Adiectivum>(
        new TabulaIrregula<Adiectivum>(Adiectivum, 'aliud'),
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'pronominalis'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'alium'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'aliī'))
              .struatur))
    this.contenta['ambo'] = new Mantela(new TabulaCollata<Adiectivum>(
        new TabulaIrregula<Adiectivum>(Adiectivum, 'ambō'),
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda/pluralis'))
              .ponatur((adiectivum) => (adiectivum.scriptura = 'numerus = singularis: dele'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'ambum'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'ambī'))
              .struatur))
    this.contenta['meum'] = new Mantela(new TabulaCollata<Adiectivum>(
        new TabulaIrregula<Adiectivum>(Adiectivum, 'meum'),
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'meum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'meī'))
              .struatur))
    this.contenta['nonumdecimum'] = new Mantela(new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'nōnum'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'nōnī'))
              .struatur, decimum))
    this.contenta['octavumdecimum'] = new Mantela(new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'octāvum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'octāvī'))
              .struatur, decimum))
    this.contenta['quartumdecimum'] = new Mantela(new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'quārtum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'quārtī'))
              .struatur, decimum))
    this.contenta['quintumdecimum'] = new Mantela(new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'quīntum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'quīntī'))
              .struatur, decimum))
    this.contenta['septimumdecimum'] = new Mantela(new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'septimum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'septimī'))
              .struatur, decimum))
    this.contenta['sextumdecimum'] = new Mantela(new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'sextum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'sextī'))
              .struatur, decimum))
    this.contenta['tertiumdecimum'] = new Mantela(new TabulaConiuncta<Adiectivum>(
        new Structor(TabulamenIncomparabilis)
              .ponatur((adiectivum) => (adiectivum.principium = 'generanda'))
              .ponatur((adiectivum) => (adiectivum.nominativus = 'sextum'))
              .ponatur((adiectivum) => (adiectivum.genitivus = 'sextī'))
              .struatur, decimum))
    this.contenta['duo'] = new Mantela(new TabulaRescripta<Adiectivum>(this.contenta['ambo'],
        (scriptum: string): string => scriptum.replace('amb', 'du')))
    this.contenta['utrumque'] = new Mantela(new TabulaSuffixa<Adiectivum>(utrum, Encliticus.coniugans))
    this.contenta['utrumcumque'] = new Mantela(new TabulaSuffixa<Adiectivum>(utrum, `cum${Encliticus.coniugans}`))
    this.contenta['utrumvis'] = new Mantela(new TabulaSuffixa<Adiectivum>(utrum, 'vīs'))
  }
}

export const adiectiva: Adiectiva = new Adiectiva()
