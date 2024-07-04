import { Encliticum } from '../miscella/enumerationes';
import Ignavum from '../miscella/ignavum';
import { AdiectivumAgendum, Incomparabile } from '../praebeunda/agenda';
import Structor from '../praebeunda/structor';
import { Adiectivum } from '../praebeunda/verba';
import TabulaCollata from '../tabulae/collata';
import TabulaConiuncta from '../tabulae/coniuncta';
import TabulaRescripta from '../tabulae/rescriptae/rescripta';
import TabulaSuffixa from '../tabulae/rescriptae/suffixa';
import TabulaScapalis from '../tabulae/scapalis';
import Anomala, { Mantela } from './anomala';

export default class Adiectiva extends Anomala<Adiectivum> {
  static se: Ignavum<Adiectiva> = new Ignavum(() => new Adiectiva)

  protected override async numeretur(): Promise<void> {
    const frugi: Ignavum<TabulaScapalis<Adiectivum>> = new Ignavum(
      () =>
        new TabulaScapalis({
          via: '/res/scapales/adiectiva/frūgī',
          positor: Adiectivum.positor
        })
    )

    const mille: Ignavum<TabulaScapalis<Adiectivum>> = new Ignavum(
      () =>
        new TabulaScapalis({
          via: '/res/scapales/adiectiva/mīlle',
          positor: Adiectivum.positor
        })
    )

    const nequam: Ignavum<TabulaScapalis<Adiectivum>> = new Ignavum(
      () =>
        new TabulaScapalis({
          via: '/res/scapales/adiectiva/nēquam',
          positor: Adiectivum.positor
        })
    )

    const satis: Ignavum<TabulaScapalis<Adiectivum>> = new Ignavum(
      () =>
        new TabulaScapalis({
          via: '/res/scapales/adiectiva/satis',
          positor: Adiectivum.positor
        })
    )

    const decimum: Ignavum<Incomparabile> = new Ignavum(() =>
      new Structor(() => new Incomparabile)
        .ponatur((adiectivum) => (adiectivum.nominativum = 'decimum'))
        .ponatur((adiectivum) => (adiectivum.nominativum = 'decimī'))
        .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda'))
        .struatur()
    )

    const utrum: Ignavum<Incomparabile> = new Ignavum(() =>
      new Structor(() => new Incomparabile)
        .ponatur((adiectivum) => (adiectivum.nominativum = 'utrum'))
        .ponatur((adiectivum) => (adiectivum.nominativum = 'utrī'))
        .ponatur((adiectivum) => (adiectivum.versio = 'pronominalis//cumLitteraR'))
        .struatur()
    )

    const aliud: Ignavum<TabulaCollata<Adiectivum>> = new Ignavum(
      () =>
        new TabulaCollata(
          new Ignavum(
            () =>
              new TabulaScapalis({
                via: '/res/scapales/adiectiva/aliud',
                positor: Adiectivum.positor
              })
          ),
          new Ignavum(() =>
            new Structor(() => new Incomparabile)
              .ponatur((adiectivum) => (adiectivum.nominativum = 'alium'))
              .ponatur((adiectivum) => (adiectivum.nominativum = 'aliī'))
              .ponatur((adiectivum) => (adiectivum.versio = 'pronominalis'))
              .struatur()
              .putetur()
          )
        )
    )

    const ambo: Ignavum<TabulaCollata<Adiectivum>> = new Ignavum(
      () =>
        new TabulaCollata(
          new Ignavum(
            () =>
              new TabulaScapalis({
                via: '/res/scapales/adiectiva/ambō',
                positor: Adiectivum.positor
              })
          ),
          new Ignavum(() =>
            new Structor(() => new Incomparabile)
              .ponatur((adiectivum) => (adiectivum.nominativum = 'ambum'))
              .ponatur((adiectivum) => (adiectivum.nominativum = 'ambī'))
              .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda//pluralis'))
              .struatur()
              .putetur()
          )
        )
    )

    const meum: Ignavum<TabulaCollata<Adiectivum>> = new Ignavum(
      () =>
        new TabulaCollata(
          new Ignavum(
            () =>
              new TabulaScapalis({
                via: '/res/scapales/adiectiva/meum',
                positor: Adiectivum.positor
              })
          ),
          new Ignavum(() =>
            new Structor(() => new Incomparabile)
              .ponatur((adiectivum) => (adiectivum.nominativum = 'meum'))
              .ponatur((adiectivum) => (adiectivum.nominativum = 'meī'))
              .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda'))
              .struatur()
              .putetur()
          )
        )
    )

    const multum: Ignavum<TabulaCollata<Adiectivum>> = new Ignavum(
      () =>
        new TabulaCollata(
          new Ignavum(
            () =>
              new TabulaScapalis({
                via: '/res/scapales/adiectiva/multum',
                positor: Adiectivum.positor
              })
          ),
          new Ignavum(() =>
            new Structor(() => new AdiectivumAgendum)
              .ponatur((adiectivum) => (adiectivum.positivum = 'multum'))
              .ponatur((adiectivum) => (adiectivum.superlativum = 'maximum'))
              .ponatur((adiectivum) => (adiectivum.versio = 'positivaAutPrimaAutSecunda'))
              .struatur()
              .putetur()
          )
        )
    )

    const nonumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> = new Ignavum(
      () =>
        new TabulaConiuncta({
          positor: Adiectivum.positor,
          prima: new Ignavum(() =>
            new Structor(() => new Incomparabile)
              .ponatur((adiectivum) => (adiectivum.nominativum = 'nōnum'))
              .ponatur((adiectivum) => (adiectivum.nominativum = 'nōnī'))
              .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda'))
              .struatur()
              .putetur()
          ),
          secunda: new Ignavum(() => decimum.ipse().putetur())
        })
    )

    const octavumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> = new Ignavum(
      () =>
        new TabulaConiuncta({
          positor: Adiectivum.positor,
          prima: new Ignavum(() =>
            new Structor(() => new Incomparabile)
              .ponatur((adiectivum) => (adiectivum.nominativum = 'octāvum'))
              .ponatur((adiectivum) => (adiectivum.nominativum = 'octāvī'))
              .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda'))
              .struatur()
              .putetur()
          ),
          secunda: new Ignavum(() => decimum.ipse().putetur())
        })
    )

    const quartumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> = new Ignavum(
      () =>
        new TabulaConiuncta({
          positor: Adiectivum.positor,
          prima: new Ignavum(() =>
            new Structor(() => new Incomparabile)
              .ponatur((adiectivum) => (adiectivum.nominativum = 'quārtum'))
              .ponatur((adiectivum) => (adiectivum.nominativum = 'quārtī'))
              .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda'))
              .struatur()
              .putetur()
          ),
          secunda: new Ignavum(() => decimum.ipse().putetur())
        })
    )

    const quintumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> = new Ignavum(
      () =>
        new TabulaConiuncta({
          positor: Adiectivum.positor,
          prima: new Ignavum(() =>
            new Structor(() => new Incomparabile)
              .ponatur((adiectivum) => (adiectivum.nominativum = 'quīntum'))
              .ponatur((adiectivum) => (adiectivum.nominativum = 'quīntī'))
              .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda'))
              .struatur()
              .putetur()
          ),
          secunda: new Ignavum(() => decimum.ipse().putetur())
        })
    )

    const septimumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> = new Ignavum(
      () =>
        new TabulaConiuncta({
          positor: Adiectivum.positor,
          prima: new Ignavum(() =>
            new Structor(() => new Incomparabile)
              .ponatur((adiectivum) => (adiectivum.nominativum = 'septimum'))
              .ponatur((adiectivum) => (adiectivum.nominativum = 'septimī'))
              .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda'))
              .struatur()
              .putetur()
          ),
          secunda: new Ignavum(() => decimum.ipse().putetur())
        })
    )

    const sextumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> = new Ignavum(
      () =>
        new TabulaConiuncta({
          positor: Adiectivum.positor,
          prima: new Ignavum(() =>
            new Structor(() => new Incomparabile)
              .ponatur((adiectivum) => (adiectivum.nominativum = 'sextum'))
              .ponatur((adiectivum) => (adiectivum.nominativum = 'sextī'))
              .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda'))
              .struatur()
              .putetur()
          ),
          secunda: new Ignavum(() => decimum.ipse().putetur())
        })
    )

    const tertiumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> = new Ignavum(
      () =>
        new TabulaConiuncta({
          positor: Adiectivum.positor,
          prima: new Ignavum(() =>
            new Structor(() => new Incomparabile)
              .ponatur((adiectivum) => (adiectivum.nominativum = 'tertium'))
              .ponatur((adiectivum) => (adiectivum.nominativum = 'tertiī'))
              .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda'))
              .struatur()
              .putetur()
          ),
          secunda: new Ignavum(() => decimum.ipse().putetur())
        })
    )

    const duo: Ignavum<TabulaRescripta<Adiectivum>> = new Ignavum(
      () =>
        new TabulaRescripta({
          relata: ambo,
          rescriptor: (scriptum) => scriptum.replace('amb', 'du')
        })
    )

    const utrumque: Ignavum<TabulaSuffixa<Adiectivum>> = new Ignavum(
      () =>
        new TabulaSuffixa({
          relata: new Ignavum(() => utrum.ipse()?.putetur()),
          suffixum: Encliticum.Coniugans
        })
    )

    const utrumcumque: Ignavum<TabulaSuffixa<Adiectivum>> = new Ignavum(
      () =>
        new TabulaSuffixa({
          relata: new Ignavum(() => utrum.ipse()?.putetur()),
          suffixum: 'cum'.concat(Encliticum.Coniugans.concat())
        })
    )

    const utrumvis: Ignavum<TabulaSuffixa<Adiectivum>> = new Ignavum(
      () =>
        new TabulaSuffixa({
          relata: new Ignavum(() => utrum.ipse()?.putetur()),
          suffixum: 'vīs'
        })
    )

    this.contenta.set('aliud', new Mantela(aliud))
    this.contenta.set('ambō', new Mantela(ambo))
    this.contenta.set('duō', new Mantela(duo))
    this.contenta.set('frūgī', new Mantela(frugi))
    this.contenta.set('meum', new Mantela(meum))
    this.contenta.set('mīlle', new Mantela(mille))
    this.contenta.set('multum', new Mantela(multum))
    this.contenta.set('nēquam', new Mantela(nequam))
    this.contenta.set('nōnumdecimum', new Mantela(nonumdecimum))
    this.contenta.set('octāvumdecimum', new Mantela(octavumdecimum))
    this.contenta.set('quārtumdecimum', new Mantela(quartumdecimum))
    this.contenta.set('quīntumdecimum', new Mantela(quintumdecimum))
    this.contenta.set('satis', new Mantela(satis))
    this.contenta.set('septimumdecimum', new Mantela(septimumdecimum))
    this.contenta.set('sextumdecimum', new Mantela(sextumdecimum))
    this.contenta.set('tertiumdecimum', new Mantela(tertiumdecimum))
    this.contenta.set('utrumcumque', new Mantela(utrumcumque))
    this.contenta.set('utrumque', new Mantela(utrumque))
    this.contenta.set('utrumvīs', new Mantela(utrumvis))
  }
}
