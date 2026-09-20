import { type encliticum } from '../miscella/enumerationes';
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

class Adiectiva extends Anomala<Adiectivum> {
  protected override async numeretur(): Promise<void> {
    const frugi: Ignavum<TabulaScapalis<Adiectivum>> =
             new Ignavum(TabulaScapalis<Adiectivum>, {
                   via: '/res/scapales/adiectiva/frūgī',
                   positor: Adiectivum.positor
                 })
    const mille: Ignavum<TabulaScapalis<Adiectivum>> =
             new Ignavum(TabulaScapalis<Adiectivum>, {
                   via: '/res/scapales/adiectiva/mīlle',
                   positor: Adiectivum.positor
                 })
    const nequam: Ignavum<TabulaScapalis<Adiectivum>> =
              new Ignavum(TabulaScapalis, {
                    via: '/res/scapales/adiectiva/nēquam',
                    positor: Adiectivum.positor
                  })
    const satis: Ignavum<TabulaScapalis<Adiectivum>> =
             new Ignavum(TabulaScapalis, {
                   via: '/res/scapales/adiectiva/satis',
                   positor: Adiectivum.positor
                 })
    const decimum: Structor<Incomparabile> =
               new Structor(Incomparabile)
                     .ponatur((adiectivum) => (adiectivum.nominativum = 'decimum'))
                     .ponatur((adiectivum) => (adiectivum.nominativum = 'decimī'))
                     .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda'))
    const utrum: Structor<Incomparabile> =
             new Structor(() => new Incomparabile)
                   .ponatur((adiectivum) => (adiectivum.nominativum = 'utrum'))
                   .ponatur((adiectivum) => (adiectivum.nominativum = 'utrī'))
                   .ponatur((adiectivum) => (adiectivum.versio = 'pronominalis//cumLitteraR'))
    const aliud: Ignavum<TabulaCollata<Adiectivum>> =
             new Ignavum(TabulaCollata<Adiectivum>, {
                   relatae: [
                     new Ignavum(TabulaScapalis<Adiectivum>, {
                           via: '/res/scapales/adiectiva/aliud',
                           positor: Adiectivum.positor
                         }),
                     new Structor(Incomparabile)
                           .ponatur((adiectivum) => (adiectivum.nominativum = 'alium'))
                           .ponatur((adiectivum) => (adiectivum.genitivum = 'aliī'))
                           .ponatur((adiectivum) => (adiectivum.versio = 'pronominalis'))
                   ]
                 })
    const ambo: Ignavum<TabulaCollata<Adiectivum>> =
            new Ignavum(TabulaCollata<Adiectivum>, {
                  relatae: [
                    new Ignavum(TabulaScapalis<Adiectivum>, {
                          via: '/res/scapales/adiectiva/ambō',
                          positor: Adiectivum.positor
                        }),
                    new Structor(Incomparabile)
                          .ponatur((adiectivum) => (adiectivum.nominativum = 'ambum'))
                          .ponatur((adiectivum) => (adiectivum.nominativum = 'ambī'))
                          .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda//pluralis'))
                  ]
                })
    const meum: Ignavum<TabulaCollata<Adiectivum>> =
            new Ignavum(TabulaCollata<Adiectivum>, {
                  relatae: [
                    new Ignavum(TabulaScapalis<Adiectivum, {
                          via: '/res/scapales/adiectiva/meum',
                          positor: Adiectiva.positor
                        }),
                    new Structor(Incomparabile)
                          .ponatur((adiectivum) => (adiectivum.nominativum = 'meum'))
                          .ponatur((adiectivum) => (adiectivum.nominativum = 'meī'))
                          .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda'))
                  ]
                })
    const multum: Ignavum<TabulaCollata<Adiectivum>> =
              new Ignavum(TabulaCollata<Adiectivum>, {
                    relatae: [
                      new Ignavum(TabulaScapalis, {
                            via: '/res/scapales/adiectiva/multum',
                            positor: Adiectiva.positor
                      }),
                      new Structor(AdiectivumAgendum)
                            .ponatur((adiectivum) => (adiectivum.positivum = 'multum'))
                            .ponatur((adiectivum) => (adiectivum.superlativum = 'maximum'))
                            .ponatur((adiectivum) => (adiectivum.versio = 'positivaAutPrimaAutSecunda'))
                    ]
                  })
    const nonumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> =
                    new Ignavum(TabulaConiuncta<Adiectivum>, {
                          prima: new Structor(Incomparabile)
                                       .ponatur((adiectivum) => (adiectivum.nominativum = 'nōnum'))
                                       .ponatur((adiectivum) => (adiectivum.nominativum = 'nōnī'))
                                       .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda')),
                          secunda: decimum
                        })
    const octavumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> =
                      new Ignavum(TabulaConiuncta<Adiectivum>, {
                            prima: new Structor(Incomparabile)
                                         .ponatur((adiectivum) => (adiectivum.nominativum = 'octāvum'))
                                         .ponatur((adiectivum) => (adiectivum.nominativum = 'octāvī'))
                                         .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda')),
                            secunda: decimum
                      })
    const quartumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> =
                      new Ignavum(TabulaConiuncta<Adiectivum>, {
                            prima: new Structor(Incomparabile)
                                         .ponatur((adiectivum) => (adiectivum.nominativum = 'quārtum'))
                                         .ponatur((adiectivum) => (adiectivum.nominativum = 'quārtī'))
                                         .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda')),
                            secunda: decimum
                      })
    const quintumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> =
                      new Ignavum(TabulaConiuncta<Adiectivum>, {
                            prima: new Structor(Incomparabile)
                                         .ponatur((adiectivum) => (adiectivum.nominativum = 'quīntum'))
                                         .ponatur((adiectivum) => (adiectivum.nominativum = 'quīntī'))
                                         .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda')),
                            secunda: decimum
                      })
    const septimumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> =
                       new Ignavum(TabulaConiuncta<Adiectivum>, {
                             prima: new Structor(Incomparabile)
                                          .ponatur((adiectivum) => (adiectivum.nominativum = 'septimum'))
                                          .ponatur((adiectivum) => (adiectivum.nominativum = 'septimī'))
                                          .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda')),
                             secunda: decimum
                      })
    const sextumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> =
                     new Ignavum(TabulaConiuncta<Adiectivum>, {
                           prima: new Structor(Incomparabile)
                                        .ponatur((adiectivum) => (adiectivum.nominativum = 'sextum'))
                                        .ponatur((adiectivum) => (adiectivum.nominativum = 'sextī'))
                                         .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda')),
                           secunda: decimum
                      })
    const tertiumdecimum: Ignavum<TabulaConiuncta<Adiectivum>> =
                      new Ignavum(TabulaConiuncta<Adiectivum>, {
                            prima: new Structor(Incomparabile)
                                         .ponatur((adiectivum) => (adiectivum.nominativum = 'sextum'))
                                         .ponatur((adiectivum) => (adiectivum.nominativum = 'sextī'))
                                         .ponatur((adiectivum) => (adiectivum.versio = 'autPrimaAutSecunda')),
                            secunda: decimum
                      })
    const duo: Ignavum<TabulaRescripta<Adiectivum>> =
           new Ignavum(TabulaRescripta<Adiectivum>, {
                 relata: ambo,
                 rescriptor: (scriptum: string): string => scriptum.replace('amb', 'du')
               })
    const utrumque: Ignavum<TabulaSuffixa<Adiectivum>> =
                new Ignavum(TabulaSuffixa<Adiectivum>, {
                      relata: utrum,
                      suffixum: encliticum.coniugans
                    })
    const utrumcumque: Ignavum<TabulaSuffixa<Adiectivum>> =
                   new Ignavum(TabulaSuffixa<Adiectivum>, {
                      relata: utrum,
                      suffixum: `cum${encliticum.coniugans}`
                    })
    const utrumvis: Ignavum<TabulaSuffixa<Adiectivum>> =
                new Ignavum(TabulaSuffixa<Adiectivum>, {
                      relata: utrum,
                      suffixum: 'vīs'
                    })

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

export const adiectiva = new Adiectiva()
