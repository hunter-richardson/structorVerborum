import Ignavum from '../miscella/ignavum';
import { NomenActum, NomenAgendum } from '../praebeunda/agenda';
import Structor from '../praebeunda/structor';
import { Nomen } from '../praebeunda/verba';
import TabulaBifissa from '../tabulae/bifissa';
import TabulaCollata from '../tabulae/collata';
import TabulaPraefixa from '../tabulae/rescriptae/praefixa';
import TabulaScapalis from '../tabulae/scapalis';
import Anomala, { Mantela } from './anomala';

class Nomina extends Anomala<Nomen> {
  protected override async numeretur(): Promise<void> {
    const Athos: Ignavum<TabulaScapalis<Nomen>> =
             new Ignavum(TabulaScapalis<Nomen>, {
                   via: '/res/scapales/nomina/Athōs',
                   positor: Nomen.positor
                 })
    const dare: Ignavum<TabulaScapalis<Nomen>> =
            new Ignavum(TabulaScapalis<Nomen>, {
                   via: '/res/scapales/nomina/dare',
                   positor: Nomen.positor
                 })
    const Iesus: Ignavum<TabulaScapalis<Nomen>> =
            new Ignavum(TabulaScapalis<Nomen>, {
                   via: '/res/scapales/nomina/Iēsūs',
                   positor: Nomen.positor
                 })
    const ire: Ignavum<TabulaScapalis<Nomen>> =
            new Ignavum(TabulaScapalis<Nomen>, {
                   via: '/res/scapales/nomina/īre',
                   positor: Nomen.positor
                 })
    const lexis: Ignavum<TabulaScapalis<Nomen>> =
            new Ignavum(TabulaScapalis<Nomen>, {
                   via: '/res/scapales/nomina/lexis',
                   positor: Nomen.positor
                 })
    const vices: Ignavum<TabulaScapalis<Nomen>> =
            new Ignavum(TabulaScapalis<Nomen>, {
                   via: '/res/scapales/nomina/vicēs',
                   positor: Nomen.positor
                 })
    const vis: Ignavum<TabulaScapalis<Nomen>> =
            new Ignavum(TabulaScapalis<Nomen>, {
                   via: '/res/scapales/nomina/vīs',
                   positor: Nomen.positor
                 })
    const balneum: Ignavum<TabulaBifissa> =
               new Ignavum(TabulaBifissa, {
                     singularis: new Structor(NomenAgendum)
                                       .ponatur((nomen) => (nomen.nominativum = 'balneum'))
                                       .ponatur((nomen) => (nomen.genitivum = 'balneī'))
                                       .ponatur((nomen) => (nomen.versio = 'secundaNeutra')),
                     pluralis: new Structor(NomenAgendum)
                                     .ponatur((nomen) => (nomen.nominativum = 'balnea'))
                                     .ponatur((nomen) => (nomen.genitivum = 'balneae'))
                                     .ponatur((nomen) => (nomen.versio = 'prima'))
                   })
    const caelum: Ignavum<TabulaBifissa> =
              new Ignavum(TabulaBifissa, {
                    singularis: new Structor(NomenAgendum)
                                      .ponatur((nomen) => (nomen.nominativum = 'caelum'))
                                      .ponatur((nomen) => (nomen.genitivum = 'caelī'))
                                      .ponatur((nomen) => (nomen.versio = 'secundaNeutra')),
                    pluralis: new Structor(NomenAgendum)
                                    .ponatur((nomen) => (nomen.nominativum = 'caelus'))
                                    .ponatur((nomen) => (nomen.genitivum = 'caelī'))
                                    .ponatur((nomen) => (nomen.versio = 'secundaMasculina'))
              })
    const dea: Ignavum<TabulaCollata<Nomen>> =
           new Ignavum(TabulaCollata<Nomen>, {
                 relatae: [
                   new Ignavum(TabulaScapalis, {
                         via: '/res/scapales/nomina/dea',
                         positor: Nomen.positor
                       }),
                   new Structor(NomenAgendum)
                         .ponatur((nomen) => nomen.nominativum = 'dea')
                         .ponatur((nomen) => nomen.genitivum = 'deae')
                         .ponatur((nomen) => nomen.versio = 'prima')
                 ]
               })
    const domus: Ignavum<TabulaCollata<Nomen>> =
             new Ignavum(TabulaCollata<Nomen>, {
               relatae: [
                 new Ignavum(TabulaScapalis, {
                       via: '/res/scapales/nomina/domus',
                       positor: Nomen.positor
                     }),
                 new Structor(NomenAgendum)
                       .ponatur((nomen) => (nomen.nominativum = 'domus'))
                       .ponatur((nomen) => (nomen.genitivum = 'domūs'))
                       .ponatur((nomen) => (nomen.versio = 'quarta'))
               ]
             })
    const iugerum: Ignavum<TabulaCollata<Nomen>> =
               new Ignavum(TabulaCollata<Nomen>, {
                     relata: [
                       new Ignavum(TabulaScapalis, {
                             via: '/res/scapales/nomina/iūgerum',
                             positor: Nomen.positor
                           }),
                       new Structor(NomenAgendum)
                             .ponatur((nomen) => (nomen.nominativum = 'iūgerum'))
                             .ponatur((nomen) => (nomen.genitivum = 'iūgerī'))
                             .ponatur((nomen) => (nomen.versio = 'secundaNeutra'))
                     ]
                   })
    const Iuppiter: Ignavum<TabulaCollata<Nomen>> =
                new Ignavum(TabulaCollata<Nomen>, {
                      relatae: [
                        new Ignavum(TabulaScapalis, {
                              via: '/res/scapales/nomina/Iuppiter',
                              positor: Nomen.positor
                            }),
                        new Structor(NomenAgendum)
                              .ponatur(nomen => nomen.genitivum = 'Iovis')
                              .ponatur(nomen => nomen.versio = 'tertiaAnimata')
                      ]
                    })
    const semidea: Ignavum<TabulaPraefixa<Nomen>> =
               new Ignavum(TabulaPraefixa<Nomen>, {
                     relata: dea,
                     praefixum: 'sēmi'
                   })
    const abire: Ignavum<TabulaPraefixa<Nomen>> =
             new Ignavum(TabulaPraefixa<Nomen>, {
                     relata: ire,
                     praefixum: 'ab'
                   })
    const circumire: Ignavum<TabulaPraefixa<Nomen>> =
                 new Ignavum(TabulaPraefixa<Nomen>, {
                       relata: ire,
                       praefixum: 'circum'
                     })
    const coire: Ignavum<TabulaPraefixa<Nomen>> =
             new Ignavum(TabulaPraefixa<Nomen>, {
                   relata: ire,
                   praefixum: 'co'
                 })
    const deire: Ignavum<TabulaPraefixa<Nomen>> =
             new Ignavum(TabulaPraefixa<Nomen>, {
                   relata: ire,
                   praefixum: 'de'
                 })
    const disperire: Ignavum<TabulaPraefixa<Nomen>> =
                 new Ignavum(TabulaPraefixa<Nomen>, {
                       relata: ire,
                       praefixum: 'disper'
                     })
    const exire: Ignavum<TabulaPraefixa<Nomen>> =
             new Ignavum(TabulaPraefixa<Nomen>, {
                   relata: ire,
                   praefixum: 'ex'
                  })
    const inire: Ignavum<TabulaPraefixa<Nomen>> =
             new Ignavum(TabulaPraefixa<Nomen>, {
                   relata: ire,
                   praefixum: 'in'
                 })
    const interire: Ignavum<TabulaPraefixa<Nomen>> =
                new Ignavum(TabulaPraefixa<Nomen>, {
                      relata: ire,
                      praefixum: 'inter'
                    })
    const introire: Ignavum<TabulaPraefixa<Nomen>> =
                new Ignavum(TabulaPraefixa<Nomen>, {
                      relata: ire,
                      praefixum: 'intro'
                    })
    const nequire: Ignavum<TabulaPraefixa<Nomen>> =
               new Ignavum(TabulaPraefixa<Nomen>, {
                     relata: ire,
                     praefixum: 'nequ'
                   })
    const obire: Ignavum<TabulaPraefixa<Nomen>> =
             new Ignavum(TabulaPraefixa<Nomen>, {
                   relata: ire,
                   praefixum: 'ob'
                 })
    const perire: Ignavum<TabulaPraefixa<Nomen>> =
              new Ignavum(TabulaPraefixa<Nomen>, {
                    relata: ire,
                    praefixum: 'per'
                  })
    const prodire: Ignavum<TabulaPraefixa<Nomen>> =
               new Ignavum(TabulaPraefixa<Nomen>, {
                     relata: ire,
                     praefixum: 'prōd'
                   })
    const quire: Ignavum<TabulaPraefixa<Nomen>> =
             new Ignavum(TabulaPraefixa<Nomen>, {
                   relata: ire,
                   praefixum: 'qu'
                 })
    const redire: Ignavum<TabulaPraefixa<Nomen>> =
             new Ignavum(TabulaPraefixa<Nomen>, {
                   relata: ire,
                   praefixum: 'red'
                 })
    const subire: Ignavum<TabulaPraefixa<Nomen>> =
              new Ignavum(TabulaPraefixa<Nomen>, {
                    relata: ire,
                    praefixum: 'sub'
                  })
    const transabire: Ignavum<TabulaPraefixa<Nomen>> =
                  new Ignavum(TabulaPraefixa<Nomen>, {
                        relata: ire,
                        praefixum: 'trānsab'
                      })
    const transire: Ignavum<TabulaPraefixa<Nomen>> =
                new Ignavum(TabulaPraefixa<Nomen>, {
                      relata: ire,
                      praefixum: 'trāns'
                    })
    const venire: Ignavum<TabulaPraefixa<Nomen>> =
              new Ignavum(TabulaPraefixa<Nomen>, {
                    relata: ire,
                    praefixum: 'vēn'
                  })
    const dedare: Ignavum<TabulaPraefixa<Nomen>> =
              new Ignavum(TabulaPraefixa<Nomen>, {
                    relata: dare,
                    praefixum: 'dē'
                  })
    const edare: Ignavum<TabulaPraefixa<Nomen>> =
             new Ignavum(TabulaPraefixa<Nomen>, {
                  relata: dare,
                  praefixum: 'ē'
                 })

    const venireRectum: Structor<NomenActum> =
                    new Structor(NomenActum)
                          .ponatur((nomen) => (nomen.infinitivum = 'venīre'))
                          .ponatur((nomen) => (nomen.supinum = 'ventum'))
                          .ponatur((nomen) => (nomen.versio = 'quartus'))
    const advenire: Ignavum<TabulaPraefixa<Nomen>> =
                new Ignavum(TabulaPraefixa<Nomen>, {
                      relata: venireRectum,
                      praefixum: 'ad'
                    })
    const adinvenire: Ignavum<TabulaPraefixa<Nomen>> =
                  new Ignavum(TabulaPraefixa<Nomen>, {
                        relata: venireRectum,
                        praefixum: 'adin'
                      })
    const antevenire: Ignavum<TabulaPraefixa<Nomen>> =
                  new Ignavum(TabulaPraefixa<Nomen>, {
                        relata: venireRectum,
                        praefixum: 'ante'
                      })
    const circumvenire: Ignavum<TabulaPraefixa<Nomen>> =
                    new Ignavum(TabulaPraefixa<Nomen>, {
                          relata: venireRectum,
                          praefixum: 'circum'
                        })
    const convenire: Ignavum<TabulaPraefixa<Nomen>> =
                 new Ignavum(TabulaPraefixa<Nomen>, {
                       relata: venireRectum,
                       praefixum: 'con'
                     })
    const contravenire: Ignavum<TabulaPraefixa<Nomen>> =
                    new Ignavum(TabulaPraefixa<Nomen>, {
                          relata: venireRectum,
                          praefixum: 'contrā'
                        })
    const disconvenire: Ignavum<TabulaPraefixa<Nomen>> =
                    new Ignavum(TabulaPraefixa<Nomen>, {
                          relata: venireRectum,
                          praefixum: 'discon'
                        })
    const devenire: Ignavum<TabulaPraefixa<Nomen>> =
                new Ignavum(TabulaPraefixa<Nomen>, {
                      relata: venireRectum,
                      praefixum: 'dē'
                    })
    const evenire: Ignavum<TabulaPraefixa<Nomen>> =
               new Ignavum(TabulaPraefixa<Nomen>, {
                     relata: venireRectum,
                     praefixum: 'ē'
                   })
    const invenire: Ignavum<TabulaPraefixa<Nomen>> =
                new Ignavum(TabulaPraefixa<Nomen>, {
                      relata: venireRectum,
                      praefixum: 'in'
                    })
    const intervenire: Ignavum<TabulaPraefixa<Nomen>> =
                   new Ignavum(TabulaPraefixa<Nomen>, {
                         relata: venireRectum,
                         praefixum: 'inter'
                       })
    const obvenire: Ignavum<TabulaPraefixa<Nomen>> =
                new Ignavum(TabulaPraefixa<Nomen>, {
                      relata: venireRectum,
                      praefixum: 'ob'
                    })
    const pervenire: Ignavum<TabulaPraefixa<Nomen>> =
                 new Ignavum(TabulaPraefixa<Nomen>, {
                       relata: venireRectum,
                       praefixum: 'per'
                     })
    const praevenire: Ignavum<TabulaPraefixa<Nomen>> =
                  new Ignavum(TabulaPraefixa<Nomen>, {
                        relata: venireRectum,
                        praefixum: 'prae'
                      })
    const provenire: Ignavum<TabulaPraefixa<Nomen>> =
                 new Ignavum(TabulaPraefixa<Nomen>, {
                       relata: venireRectum,
                       praefixum: 'prō'
                     })
    const subvenire: Ignavum<TabulaPraefixa<Nomen>> =
                 new Ignavum(TabulaPraefixa<Nomen>, {
                       relata: venireRectum,
                       praefixum: 'sub'
                     })
    const supervenire: Ignavum<TabulaPraefixa<Nomen>> =
                   new Ignavum(TabulaPraefixa<Nomen>, {
                         relata: venireRectum,
                         praefixum: 'super'
                       })

    const transvenire: Ignavum<TabulaPraefixa<Nomen>> =
                   new Ignavum(TabulaPraefixa<Nomen>, {
                         relata: venireRectum,
                         praefixum: 'trāns'
                       })

    this.contenta.set('abīre', new Mantela(abire))
    this.contenta.set('advenīre', new Mantela(advenire))
    this.contenta.set('adinvenīre', new Mantela(adinvenire))
    this.contenta.set('antevenīre', new Mantela(antevenire))
    this.contenta.set('Athōs', new Mantela(Athos))
    this.contenta.set('balneum', new Mantela(balneum))
    this.contenta.set('caelum', new Mantela(caelum))
    this.contenta.set('circumīre', new Mantela(circumire))
    this.contenta.set('circumvenīre', new Mantela(circumvenire))
    this.contenta.set('coīre', new Mantela(coire))
    this.contenta.set('convenīre', new Mantela(convenire))
    this.contenta.set('contrāvenīre', new Mantela(contravenire))
    this.contenta.set('dare', new Mantela(dare))
    this.contenta.set('dēdare', new Mantela(dedare))
    this.contenta.set('dea', new Mantela(dea))
    this.contenta.set('deīre', new Mantela(deire))
    this.contenta.set('dēvenīre', new Mantela(devenire))
    this.contenta.set('disconvenīre', new Mantela(disconvenire))
    this.contenta.set('disperīre', new Mantela(disperire))
    this.contenta.set('domus', new Mantela(domus))
    this.contenta.set('ēdare', new Mantela(edare))
    this.contenta.set('ēvenīre', new Mantela(evenire))
    this.contenta.set('exīre', new Mantela(exire))
    this.contenta.set('Iēsūs', new Mantela(Iesus))
    this.contenta.set('inīre', new Mantela(inire))
    this.contenta.set('interīre', new Mantela(interire))
    this.contenta.set('intervenīre', new Mantela(intervenire))
    this.contenta.set('invenīre', new Mantela(invenire))
    this.contenta.set('introīre', new Mantela(introire))
    this.contenta.set('īre', new Mantela(ire))
    this.contenta.set('iūgerum', new Mantela(iugerum))
    this.contenta.set('Iuppiter', new Mantela(Iuppiter))
    this.contenta.set('lexis', new Mantela(lexis))
    this.contenta.set('nequīre', new Mantela(nequire))
    this.contenta.set('obīre', new Mantela(obire))
    this.contenta.set('obvenīre', new Mantela(obvenire))
    this.contenta.set('perīre', new Mantela(perire))
    this.contenta.set('prōvenīre', new Mantela(provenire))
    this.contenta.set('prōdīre', new Mantela(prodire))
    this.contenta.set('pervenīre', new Mantela(pervenire))
    this.contenta.set('praevenīre', new Mantela(praevenire))
    this.contenta.set('quīre', new Mantela(quire))
    this.contenta.set('redīre', new Mantela(redire))
    this.contenta.set('sēmidea', new Mantela(semidea))
    this.contenta.set('subīre', new Mantela(subire))
    this.contenta.set('subvenīre', new Mantela(subvenire))
    this.contenta.set('supervenīre', new Mantela(supervenire))
    this.contenta.set('trānsabīre', new Mantela(transabire))
    this.contenta.set('trānsīre', new Mantela(transire))
    this.contenta.set('trānsvenīre', new Mantela(transvenire))
    this.contenta.set('venīre', new Mantela(venireRectum))
    this.contenta.set('vēnīre', new Mantela(venire))
    this.contenta.set('vicēs', new Mantela(vices))
    this.contenta.set('vīs', new Mantela(vis))
  }
}

export const nomina = new Nomina()
