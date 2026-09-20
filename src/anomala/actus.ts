import Anomala, { Mantela } from './anomala';
import Ignavum from '../miscella/ignavum';
import { ActusAgendus } from '../praebeunda/agenda';
import Structor from '../praebeunda/structor';
import { Actus as Anomalon } from '../praebeunda/verba';
import TabulaCollata from '../tabulae/collata';
import TabulaImpersonalis from '../tabulae/defectae/impersonalis';
import TabulaPerfecta from '../tabulae/defectae/perfecta';
import TabulaFissa from '../tabulae/fissa';
import TabulaPraefixa from '../tabulae/rescriptae/praefixa';
import TabulaRescripta from '../tabulae/rescriptae/rescripta';
import TabulaSuffixa from '../tabulae/rescriptae/suffixa';
import TabulaScapalis from '../tabulae/scapalis';
import type Tabula from '../tabulae/tabula'

class Actus extends Anomala<Anomalon> {
  protected override async numeretur(): Promise<void> {
    const aiere: Ignavum<TabulaScapalis<Anomalon>> =
             new Ignavum(TabulaScapalis<Anomalon>, {
                   via: '/res/scapales/actus/aiere',
                   positor: Anomalon.positor
                 })
    const esse: Ignavum<TabulaScapalis<Anomalon>> =
            new Ignavum(TabulaScapalis<Anomalon>, {
                  via: '/res/scapales/actus/esse',
                  positor: Anomalon.positor
                })
    const fieri: Ignavum<TabulaScapalis<Anomalon>> =
             new Ignavum(TabulaScapalis<Anomalon>, {
                   via: '/res/scapales/actus/fierī',
                   positor: Anomalon.positor
                 })
    const infieri: Ignavum<TabulaScapalis<Anomalon>> =
               new Ignavum(TabulaScapalis<Anomalon>, {
                      via: '/res/scapales/actus/īnfierī',
                      positor: Anomalon.positor
                    })
    const inquii: Ignavum<TabulaScapalis<Anomalon>> =
              new Ignavum(TabulaScapalis<Anomalon>, {
                    via: '/res/scapales/actus/inquiī',
                    positor: Anomalon.positor
                  })
    const coesse: Ignavum<TabulaCollata<Anomalon>> =
              new Ignavum(TabulaCollata<Anomalon>, {
                    relatae: [
                      new Ignavum(TabulaScapalis<Anomalon>, {
                            via: '/res/scapales/actus/coepisse',
                            positor: Anomalon.positor
                          }),
                      new Ignavum(TabulaFissa<Anomalon>, {
                            relata: new Ignavum(TabulaRescripta<Anomalon>, {
                                          relata: esse,
                                          rescriptor: (scriptum) =>
                                                   `${(scriptum.startsWith('f') ? 'cōn' : 'co')}${scriptum}`
                                        }), colamina: TabulaPerfecta.apponatur()
                          })
                    ]
                  })
    const dare: Ignavum<TabulaCollata<Anomalon>> =
            new Ignavum(TabulaCollata<Anomalon>, {
                  relatae: [
                    new Ignavum(TabulaScapalis<Anomalon>, {
                          via: '/res/scapales/actus/dare',
                          positor: Anomalon.positor
                        }),
                    new Structor(ActusAgendus)
                          .ponatur((actus) => (actus.infinitivum = 'dare'))
                          .ponatur((actus) => (actus.perfectum = 'dedisse'))
                          .ponatur((actus) => (actus.supinum = 'dātum'))
                          .ponatur((actus) => (actus.versio = 'prima'))
                  ]
                })
    const ferre: Ignavum<TabulaCollata<Anomalon>> =
             new Ignavum(TabulaCollata<Anomalon>, {
                   relatae: [
                     new Ignavum(TabulaScapalis<Anomalon>, {
                                   via: '/res/scapales/actus/ferre',
                                   positor: Anomalon.positor
                                 }),
                      new Structor(ActusAgendus)
                            .ponatur((actus) => (actus.infinitivum = 'ferere'))
                            .ponatur((actus) => (actus.perfectum = 'tulisse'))
                            .ponatur((actus) => (actus.supinum = 'lātum'))
                            .ponatur((actus) => (actus.versio = 'tertia/cumImperativoBrevi'))]
                   ]
                 })
    const facere: Ignavum<TabulaCollata<Anomalon>> =
              new Ignavum(TabulaCollata<Anomalon>, {
                    relatae: [
                      new Ignavum(TabulaScapalis<Anomalon>, {
                            via: '/res/scapales/actus/facere',
                            positor: Anomalon.positor
                          }),
                      new Structor(ActusAgendus)
                            .ponatur((actus) => (actus.infinitivus = 'facere'))
                            .ponatur((actus) => (actus.perfectum = 'fēcisse'))
                            .ponatur((actus) => (actus.supinum = 'factum'))
                            .ponatur((actus) => (actus.versio = 'tertaVaria/cumImperativoBrevi'))
                    ]
                  })
    const ire: Ignavum<TabulaScapalis<Anomalon>> =
           new Ignavum(TabulaScapalis<Anomalon>, {
                 via: '/res/scapales/actus/īre',
                 positor: Anomalon.positor
               })
    const perire: Ignavum<TabulaFissa<Anomalon>> =
              new Ignavum(TabulaFissa<Anomalon>, {
                    relata: new Ignavum(TabulaPraefixa<Anomalon>, {
                                  relata: ire,
                                  praefixum: 'per'
                                }), colamina: TabulaImpersonalis.apponatur('passivo')
                  })
    const velle: Ignavum<TabulaCollata<Anomalon>> =
             new Ignavum(TabulaCollata<Anomalon>, {
                   relatae: [
                     new Ignavum(TabulaScapalis<Anomalon>, {
                           via: '/res/scapales/actus/velle',
                           positor: Anomalon.positor
                         }),
                     new Structor(ActusAgendus)
                           .ponatur((actus) => (actus.infinitivum = 'volere'))
                           .ponatur((actus) => (actus.perfectum = 'voluisse'))
                           .ponatur((actus) => (actus.versio = 'tertia//semideponens'))
                   ]
                 })
    const malle: Ignavum<TabulaCollata<Anomalon>> =
             new Ignavum(TabulaCollata<Anomalon>, {
                   relatae: [
                     new Ignavum(TabulaScapalis<Anomalon>, {
                           via: '/res/scapales/actus/mālle',
                           positor: Anomalon.positor
                         }),
                     new Ignavum(TabulaRescripta<Anomalon>, {
                           relata: velle,
                           rescriptor: (scriptum: string) => scriptum.replace('ve', 'mā')
                         })
                   ]
                 })
    const meminisse: Ignavum<TabulaCollata<Anomalon>> =
                 new Ignavum(TabulaCollata<Anomalon>, {
                       relatae: [
                         new Ignavum(TabulaScapalis<Anomalon>, {
                               via: '/res/scapales/actus/meminisse',
                               positor: Anomalon.positor
                             }),
                         new Structor(ActusAgendus)
                               .ponatur((actus) => (actus.perfectum = 'meminisse'))
                               .ponatur((actus) => (actus.versio = 'tertia//perfecta'))
                       ]
                     })
    const abdare: Ignavum<TabulaPraefixa<Anomalon>> =
              new Ignavum(TabulaPraefixa<Anomalon>, {
                    relata: dare,
                    praefixum: 'ab'
                  })
    const abesse: Ignavum<TabulaRescripta<Anomalon>> =
              new Ignavum(TabulaRescripta<Anomalon>, {
                    relata: esse,
                    rescriptor: (scriptum: string) => `${scriptum.startsWith('f') ? 'ā' : 'ab'}${scriptum}`
              })
    const abire: Ignavum<TabulaPraefixa<Anomalon>> =
             new Ignavum(TabulaPraefixa<Anomalon>, {
                   relata: ire,
                   praefixum: 'ab'
                 })
    const afferre: Ignavum<TabulaRescripta<Anomalon>> =
               new Ignavum(TabulaRescripta<Anomalon>, {
                     relata: ferre,
                     rescriptor: (scriptum: string) => `a${scriptum[0]}${scriptum}`
               })
    const auferre: Ignavum<TabulaRescripta<Anomalon>> =
               new Ignavum(TabulaRescripta<Anomalon>, {
                     relata: ferre,
                     rescriptor: (scriptum: string) => {
                       switch(scriptum[0]) {
                         case 'f': return `au${scriptum}`
                         case 'l': return `abs${scriptum}`
                         case 't': return `ab${scriptum}`
                         default: return ''
                       }
                     }
                   })
    const nolle: Ignavum<TabulaCollata<Anomalon>> =
             new Ignavum(TabulaCollata<Anomalon>, {
                   relatae: [
                     new Ignavum(TabulaScapalis<Anomalon>, {
                           via: '/res/scapales/actus/nōlle',
                           positor: Anomalon.positor
                         }),
                     new Ignavum(TabulaRescripta<Anomalon>, {
                           relata: velle,
                           rescriptor(scriptum: string): string {
                             switch(scriptum) {
                               case 'vīs':
                               case 'vult':
                               case 'vultis':
                                 return ''
                               default:
                                 return scriptum.replace('ve', 'nō')
                             }
                           }
                     })
                   ]
                 })
    const coepisse: Ignavum<TabulaCollata<Anomalon>> =
                new Ignavum(TabulaCollata<Anomalon>, {
                      relatae: [
                        new Ignavum(TabulaScapalis<Anomalon>, {
                              via: '/res/scapales/actus/coepisse',
                              positor: Anomalon.positor
                            }),
                        new Structor(ActusAgendus)
                              .ponatur((actus) => (actus.perfectum = 'coepisse'))
                              .ponatur((actus) => (actus.versio = 'tertia//pefecta'))
                      ]
                })
    const coire: Ignavum<TabulaPraefixa<Anomalon>> =
             new Ignavum(TabulaPraefixa<Anomalon>, {
                   relata: ire,
                   praefixum: 'co'
                 })
    const collabefieri: Ignavum<TabulaPraefixa<Anomalon>> =
                    new Ignavum(TabulaPraefixa<Anomalon>, {
                          relata: fieri,
                          praefixum: 'collabe'
                        })
    const confieri: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: fieri,
                      praefixum: 'cōn'
                    })

    const conferre: Ignavum<TabulaRescripta<Anomalon>> =
                new Ignavum(TabulaRescripta<Anomalon>, {
                      relata: ferre,
                      rescriptor(scriptum: string): string {
                        switch(scriptum[0]) {
                          case 'f': return `cōn${scriptum}`
                          case 't': return `con${scriptum}`
                          case 'l': return `col${scriptum}`
                          default: return scriptum
                        }
                      }
                    })
    const dedare: Ignavum<TabulaPraefixa<Anomalon>> =
              new Ignavum(TabulaPraefixa<Anomalon>, {
                    relata: dare,
                    praefixum: 'dē'
                  })
    const deesse: Ignavum<TabulaPraefixa<Anomalon>> =
              new Ignavum(TabulaPraefixa<Anomalon>, {
                    relata: esse,
                    praefixum: 'dē'
                  })
    const deferre: Ignavum<TabulaPraefixa<Anomalon>> =
               new Ignavum(TabulaPraefixa<Anomalon>, {
                     relata: ferre,
                     praefixum: 'dē'
                   })
    const defieri: Ignavum<TabulaPraefixa<Anomalon>> =
               new Ignavum(TabulaPraefixa<Anomalon>, {
                     relata: fieri,
                     praefixum: 'dē'
                   })
    const deire: Ignavum<TabulaPraefixa<Anomalon>> =
             new Ignavum(TabulaPraefixa<Anomalon>, {
                   relata: ire,
                   praefixum: 'de'
                 })
    const differre: Ignavum<TabulaRescripta<Anomalon>> =
                new Ignavum(TabulaRescripta<Anomalon>, {
                      relata: ferre,
                      rescriptor(scriptum: string): string {
                        switch(scriptum[0]) {
                          case 'f': return `dif${scriptum}`
                          case 't': return `dis${scriptum}`
                          case 'l': return `dī${scriptum}`
                          default: return scriptum
                        }
                      }
                    })
    const disperire: Ignavum<TabulaPraefixa<Anomalon>> =
                 new Ignavum(TabulaPraefixa<Anomalon>, {
                       relata: ire,
                       praefixum: 'disper'
                     })
    const didare: Ignavum<TabulaPraefixa<Anomalon>> =
                      new Ignavum(TabulaPraefixa<Anomalon>, {
                            relata: dare,
                            praefixum: 'dī'
                          })
    const efferre: Ignavum<TabulaRescripta<Anomalon>> =
               new Ignavum(TabulaRescripta<Anomalon>, {
                     relata: ferre,
                     rescriptor(scriptum: string): string {
                      switch(scriptum[0]) {
                        case 'f': return `ef${scriptum}`
                        case 't': return `ex${scriptum}`
                        case 'l': return `ē${scriptum}`
                        default: return scriptum
                      }
                     }
                   })
    const exire: Ignavum<TabulaPraefixa<Anomalon>> =
             new Ignavum(TabulaPraefixa<Anomalon>, {
                   relata: ire,
                   praefixum: 'ex'
                 })
    const inesse: Ignavum<TabulaPraefixa<Anomalon>> =
              new Ignavum(TabulaPraefixa<Anomalon>, {
                    relata: esse,
                    rescriptor: (scriptum: string): string => `${(scriptum.startsWith('e') ? 'in' : 'īn')}${scriptum}`
                  })

    const inferre: Ignavum<TabulaRescripta<Anomalon>> =
               new Ignavum(TabulaRescripta<Anomalon>, {
                     relata: ferre,
                     rescriptor(scriptum: string): string {
                       switch(scriptum[0]) {
                         case 'f': return `īn${scriptum}`
                         case 't': return `in${scriptum}`
                         case 'l': return `il${scriptum}`
                         default: return scriptum
                       }
                     }
                   })

    const interesse: Ignavum<TabulaPraefixa<Anomalon>> =
                 new Ignavum(TabulaPraefixa<Anomalon>, {
                       relata: esse,
                       praefixum: 'inter'
                     })
    const interferre: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: ferre,
                        praefixum: 'inter'
                      })
    const introferre: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: ferre,
                        praefixum: 'intrō'
                      })
    const inire: Ignavum<TabulaPraefixa<Anomalon>> =
             new Ignavum(TabulaPraefixa<Anomalon>, {
                   relata: ire,
                   praefixum: 'in'
                 })
    const interire: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: ire,
                      praefixum: 'inter'
                    })
    const introire: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: ire,
                      praefixum: 'intro'
                    })
    const nequire: Ignavum<TabulaPraefixa<Anomalon>> =
               new Ignavum(TabulaPraefixa<Anomalon>, {
                     relata: ire,
                     praefixum: 'nequ'
                   })
    const obesse: Ignavum<TabulaPraefixa<Anomalon>> =
              new Ignavum(TabulaPraefixa<Anomalon>, {
                    relata: esse,
                    praefixum: 'ob'
                  })
    const obire: Ignavum<TabulaPraefixa<Anomalon>> =
             new Ignavum(TabulaPraefixa<Anomalon>, {
                   relata: ire,
                   praefixa: 'ob'
                 })
    const obsolefieri: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: fieri,
                         praefixum: 'obsole'
                       })
    const odisse: Ignavum<TabulaCollata<Anomalon>> =
              new Ignavum(TabulaCollata<Anomalon>, {
                    relatae: [
                      new Ignavum(TabulaScapalis<Anomalon>, {
                            via: '/res/scapales/actus/ōdisse',
                            positor: Anomalon.positor
                          }),
                      new Structor(ActusAgendus)
                            .ponatur((actus) => (actus.perfectum 'ōdisse'))
                            .ponatur((actus) => (actus.perfectum 'quarta//perfecta'))
                    ]
                  })
    const offerre: Ignavum<TabulaRescripta<Anomalon>> =
               new Ignavum(TabulaRescripta<Anomalon>, {
                     relata: ferre,
                     rescriptor: (scriptum: string): string => `${scriptum.startsWith('f') ? 'of' : 'ob'}${scriptum}`
                   })
    const perferre: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: ferre,
                      praefixum: 'per'
                    })
    const pervelle: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: velle,
                      praefixum: 'per'
                    })
    const posse: Ignavum<TabulaRescripta<Anomalon>> =
             new Ignavum(TabulaRescripta<Anomalon>, {
                   relata: esse,
                   rescriptor(scriptum: string): string {
                     switch(true) {
                       case scriptum === 'esse': return 'posse'
                       case scriptum === 'estō': return ''
                       case scriptum.startsWith('s'): return `pos${scriptum}`
                       case scriptum.startsWith('e'): return `pot${scriptum}`
                       case scriptum.startsWith('f'): return `pot${scriptum.substring(1)}`
                       default: return ''
                     }
                   }
                 })
    const postferre: Ignavum<TabulaPraefixa<Anomalon>> =
                 new Ignavum(TabulaPraefixa<Anomalon>, {
                       relata: ferre,
                       praefixum: 'post'
                     })
    const praeesse: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: esse,
                      praefixum: 'prae'
                    })
    const praeterferre: Ignavum<TabulaPraefixa<Anomalon>> =
                    new Ignavum(TabulaPraefixa<Anomalon>, {
                          relata: ferre,
                          praefixum: 'praeter'
                        })
    const prodesse: Ignavum<TabulaRescripta<Anomalon>> =
                new Ignavum(TabulaRescripta<Anomalon>, {
                      relata: esse,
                      rescriptor: (scriptum: string): string => `${scriptum.startsWith('e' ? 'prō' : 'prōd')}${scriptum}`
                    })
    const prodire: Ignavum<TabulaPraefixa<Anomalon>> =
               new Ignavum(TabulaPraefixa<Anomalon>, {
                     relata: ire,
                     praefixum: 'prōd'
                   })
    const proferre: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: ferre,
                      praefixum: 'prō'
                    })
    const quire: Ignavum<TabulaPraefixa<Anomalon>> =
             new Ignavum(TabulaPraefixa<Anomalon>, {
                   relata: ire,
                   praefixum: 'qu'
                 })
    const redire: Ignavum<TabulaPraefixa<Anomalon>> =
              new Ignavum(TabulaPraefixa<Anomalon>, {
                    relata: ire,
                    praefixum: 'red'
                  })
    const referre: Ignavum<TabulaRescripta<Anomalon>> =
               new Ignavum(TabulaRescripta<Anomalon>, {
                     relata: esse,
                     rescriptor: (scriptum: string): string => `${scriptum.startsWith('t') ? 'ret' : 're'}${scriptum}`
                   })
    const subesse: Ignavum<TabulaPraefixa<Anomalon>> =
               new Ignavum(TabulaPraefixa<Anomalon>, {
                     relata: esse,
                     praefixum: 'sub'
                   })
    const subire: Ignavum<TabulaPraefixa<Anomalon>> =
              new Ignavum(TabulaPraefixa<Anomalon>, {
                    relata: ire,
                    praefixum: 'sub'
                  })
    const sufferre: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: ferre,
                      praefixum: 'suf'
                    })
    const superesse: Ignavum<TabulaPraefixa<Anomalon>> =
                 new Ignavum(TabulaPraefixa<Anomalon>, {
                       relata: esse,
                       praefixum: 'super'
                     })
    const suffieri: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: fieri,
                      praefixum: 'suf'
                    })
    const superfieri: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: fieri,
                        praefixum: 'super'
                      })
    const transabire: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: ire,
                        praefixum: 'trānsab'
                      })
    const transire: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: ire,
                      praefixum: 'trāns'
                    })
    const venire: Ignavum<TabulaPraefixa<Anomalon>> =
              new Ignavum(TabulaPraefixa<Anomalon>, {
                    relata: ire,
                    praefixum: 'vēn'
                  })
    const venireRectum: Ignavum<Tabula<Anomalon>> =
                    new Structor(ActusAgendus)
                          .ponatur((actus) => (actus.infinitivum = 'venīre'))
                          .ponatur((actus) => (actus.perfectum = 'vēnīsse'))
                          .ponatur((actus) => (actus.supinum = 'ventum'))
                          .ponatur((actus) => (actus.versio = 'quartus//impersonalis//passivo'))
                          .struatur().putetur()
    const facereFalsum: Ignavnum<TabulaRescripta<Anomalon>> =
                    new Ignavum(TabulaRescripta<Anomalon>, {
                          relata: facere
                          rescriptor: (scriptum: string): string => scriptum === 'fac' ? 'face' : scriptum
                        })
    const arefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                 new Ignavum(TabulaPraefixa<Anomalon>, {
                       relata: facereFalsum,
                       praefixum: 'āre'
                     })
    const arfacere: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: facereFalsum,
                      praefixum: 'ār'
                    })
    const benefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: facereFalsum,
                        praefixum: 'bene'
                      })
    const calfacere: Ignavum<TabulaPraefixa<Anomalon>> =
                 new Ignavum(TabulaPraefixa<Anomalon>, {
                       relata: facereFalsum,
                       praefixum: 'cal'
                     })
    const calefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: facereFalsum,
                        praefixum: 'cale'
                      })
    const commonefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                     new Ignavum(TabulaPraefixa<Anomalon>, {
                           relata: facereFalsum,
                           praefixum: 'commone'
                         })
    const condocfacere: Ignavum<TabulaPraefixa<Anomalon>> =
                    new Ignavum(TabulaPraefixa<Anomalon>, {
                          relata: facereFalsum,
                          praefixum: 'condoce'
                        })
    const consuefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                    new Ignavum(TabulaPraefixa<Anomalon>, {
                          relata: facereFalsum,
                          praefixum: 'cōnsuē'
                        })
    const expergefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                     new Ignavum(TabulaPraefixa<Anomalon>, {
                           relata: facereFalsum,
                           praefixum: 'expergē'
                         })
    const fervefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: facereFalsum,
                         praefixum: 'fervē'
                       })
    const infervefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                     new Ignavum(TabulaPraefixa<Anomalon>, {
                           relata: facereFalsum,
                           praefixum: 'inferve'
                         })
    const labefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: facereFalsum,
                        praefixum: 'labe'
                      })
    const liquifacere: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: facereFalsum,
                         praefixum: 'liqui'
                       })
    const madefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: facereFalsum,
                        praefixum: 'made'
                      })
    const malefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: facereFalsum,
                        praefixum: 'male'
                      })
    const mollifacere: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: facereFalsum,
                         praefixum: 'molli'
                       })
    const multifacere: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: facereFalsum,
                         praefixum: 'multi'
                       })
    const mansuefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                    new Ignavum(TabulaPraefixa<Anomalon>, {
                          relata: facereFalsum,
                          praefixum: 'mansuē'
                        })
    const olfacere: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: facereFalsum,
                      praefixum: 'ol'
                    })
    const patefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: facereFalsum,
                        praefixum: 'pate'
                      })
    const pavefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: facereFalsum,
                        praefixum: 'pave'
                      })
    const putrefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: facereFalsum,
                         praefixum: 'putre'
                       })
    const satisfacere: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: facereFalsum,
                         praefixum: 'satis'
                       })
    const stupefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: facereFalsum,
                         praefixum: 'stupe'
                       })
    const tepefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: facereFalsum,
                        praefixum: 'tepe'
                      })
    const tremefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: facereFalsum,
                         praefixum: 'treme'
                       })
    const tumefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: facereFalsum,
                        praefixum: 'tume'
                      })
    const vacuefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: facereFalsum,
                         praefixum: 'vacuē'
                       })
    const incalfacere: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: calfacere,
                         praefixum: 'in'
                       })
    const percalfacere: Ignavum<TabulaPraefixa<Anomalon>> =
                    new Ignavum(TabulaPraefixa<Anomalon>, {
                          relata: calfacere,
                          praefixum: 'per'
                        })

    const recalfacere: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: calfacere,
                         praefixum: 're'
                       })
    const permadefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                     new Ignavum(TabulaPraefixa<Anomalon>, {
                           relata: madefacere,
                           praefixum: 'per'
                         })
    const subolfacere: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: olfacere,
                         praefixum: 'sub'
                       })
    const confervefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                      new Ignavum(TabulaPraefixa<Anomalon>, {
                            relata: fervefacere,
                            praefixum: 'con'
                          })

    const defervefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                     new Ignavum(TabulaPraefixa<Anomalon>, {
                           relata: fervefacere,
                           praefixum: 'dē'
                         })
    const obstupefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                     new Ignavum(TabulaPraefixa<Anomalon>, {
                           relata: stupefacere,
                           praefixum: 'ob'
                         })

    const rarefacere: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: arefacere,
                        praefixum: 'r'
                      })

    const advenire: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: venireRectum,
                      praefixum: 'ad'
                    })
    const adinvenire: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: venireRectum,
                        praefixum: 'adin'
                      })
    const antevenire: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: venireRectum,
                        praefixum: 'ante'
                      })
    const circumvenire: Ignavum<TabulaPraefixa<Anomalon>> =
                    new Ignavum(TabulaPraefixa<Anomalon>, {
                          relata: venireRectum,
                          praefixum: 'circum'
                        })
    const convenire: Ignavum<TabulaPraefixa<Anomalon>> =
                 new Ignavum(TabulaPraefixa<Anomalon>, {
                       relata: venireRectum,
                       praefixum: 'con'
                     })
    const contravenire: Ignavum<TabulaPraefixa<Anomalon>> =
                    new Ignavum(TabulaPraefixa<Anomalon>. {
                          relata: venireRectum,
                          praefixum: 'contrā'
                        })
    const disconvenire: Ignavum<TabulaPraefixa<Anomalon>> =
                    new Ignavum(TabularPraefixa<Anomalon>, {
                          relata: venireRectum,
                          praefixa: 'discon'
                        })
    const devenire: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: venireRectum,
                      praefixa: 'dē'
                    })
    const evenire: Ignavum<TabulaPraefixa<Anomalon>> =
               new Ignavum(TabulaPraefixa<Anomalon>, {
                     relata: venireRectum,
                     praefixa: 'ē'
                   })
    const invenire: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: venireRectum,
                      praefixa: 'in'
                    })
    const intervenire: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: venireRectum,
                         praefixum: 'inter'
                       })
    const obvenire: Ignavum<TabulaPraefixa<Anomalon>> =
                new Ignavum(TabulaPraefixa<Anomalon>, {
                      relata: venireRectum,
                      praefixa: 'ob'
                    })
    const pervenire: Ignavum<TabulaPraefixa<Anomalon>> =
                 new Ignavum(TabulaPraefixa<Anomalon>, {
                       relata: venireRectum,
                       praefixa: 'per'
                     })
    const praevenire: Ignavum<TabulaPraefixa<Anomalon>> =
                  new Ignavum(TabulaPraefixa<Anomalon>, {
                        relata: venireRectum,
                        praefixa: 'prae'
                      })
    const provenire: Ignavum<TabulaPraefixa<Anomalon>> =
                 new Ignavum(TabulaPraefixa<Anomalon>, {
                       relata: venireRectum,
                       praefixa: 'prō'
                     })
    const subvenire: Ignavum<TabulaPraefixa<Anomalon>> =
                 new Ignavum(TabulaPraefixa<Anomalon>, {
                       relata: venireRectum,
                       praefixa: 'sub'
                     })
    const supervenire: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa<Anomalon>, {
                         relata: venireRectum,
                         praefixa: 'super'
                       })
    const transvenire: Ignavum<TabulaPraefixa<Anomalon>> =
                   new Ignavum(TabulaPraefixa, {
                         relata: venireRectum,
                         praefixa: 'trāns'
                       })

    this.contenta.set('abdare', new Mantela(abdare))
    this.contenta.set('abesse', new Mantela(abesse))
    this.contenta.set('advenīre', new Mantela(advenire))
    this.contenta.set('adinvenīre', new Mantela(adinvenire))
    this.contenta.set('afferre', new Mantela(afferre))
    this.contenta.set('antevenīre', new Mantela(antevenire))
    this.contenta.set('ārefacere', new Mantela(arefacere))
    this.contenta.set('ārfacere', new Mantela(arfacere))
    this.contenta.set('auferre', new Mantela(auferre))
    this.contenta.set('abīre', new Mantela(abire))
    this.contenta.set('aiere', new Mantela(aiere))
    this.contenta.set('benefacere', new Mantela(benefacere))
    this.contenta.set('calfacere', new Mantela(calfacere))
    this.contenta.set('calefacere', new Mantela(calefacere))
    this.contenta.set('circumvenīre', new Mantela(circumvenire))
    this.contenta.set('coepisse', new Mantela(coepisse))
    this.contenta.set('coesse', new Mantela(coesse))
    this.contenta.set('coīre', new Mantela(coire))
    this.contenta.set('collabefierī', new Mantela(collabefieri))
    this.contenta.set('commonefacere', new Mantela(commonefacere))
    this.contenta.set('condocefacere', new Mantela(condocfacere))
    this.contenta.set('confervēfacere', new Mantela(confervefacere))
    this.contenta.set('cōnsuēfacere', new Mantela(consuefacere))
    this.contenta.set('conferre', new Mantela(conferre))
    this.contenta.set('cōnfierī', new Mantela(confieri))
    this.contenta.set('convenīre', new Mantela(convenire))
    this.contenta.set('contrāvenīre', new Mantela(contravenire))
    this.contenta.set('dare', new Mantela(dare))
    this.contenta.set('dēdare', new Mantela(dedare))
    this.contenta.set('dēferre', new Mantela(deferre))
    this.contenta.set('dēfervēfacere', new Mantela(defervefacere))
    this.contenta.set('dēfierī', new Mantela(defieri))
    this.contenta.set('dēesse', new Mantela(deesse))
    this.contenta.set('dēīre', new Mantela(deire))
    this.contenta.set('dēvenīre', new Mantela(devenire))
    this.contenta.set('dīdare', new Mantela(didare))
    this.contenta.set('differre', new Mantela(differre))
    this.contenta.set('disconvenīre', new Mantela(disconvenire))
    this.contenta.set('disperīre', new Mantela(disperire))
    this.contenta.set('diferre', new Mantela(differre))
    this.contenta.set('efferre', new Mantela(efferre))
    this.contenta.set('esse', new Mantela(esse))
    this.contenta.set('ēvenīre', new Mantela(evenire))
    this.contenta.set('expergēfacere', new Mantela(expergefacere))
    this.contenta.set('exīre', new Mantela(exire))
    this.contenta.set('facere', new Mantela(facere))
    this.contenta.set('ferre', new Mantela(ferre))
    this.contenta.set('fervēfacere', new Mantela(fervefacere))
    this.contenta.set('fierī', new Mantela(fieri))
    this.contenta.set('incalfacere', new Mantela(incalfacere))
    this.contenta.set('infervefacere', new Mantela(infervefacere))
    this.contenta.set('īnfierī', new Mantela(infieri))
    this.contenta.set('inquiī', new Mantela(inquii))
    this.contenta.set('interesse', new Mantela(interesse))
    this.contenta.set('interferre', new Mantela(interferre))
    this.contenta.set('intrōferre', new Mantela(introferre))
    this.contenta.set('īnesse', new Mantela(inesse))
    this.contenta.set('īnferre', new Mantela(inferre))
    this.contenta.set('inīre', new Mantela(inire))
    this.contenta.set('interīre', new Mantela(interire))
    this.contenta.set('introīre', new Mantela(introire))
    this.contenta.set('invenīre', new Mantela(invenire))
    this.contenta.set('intervenīre', new Mantela(intervenire))
    this.contenta.set('īre', new Mantela(ire))
    this.contenta.set('labefacere', new Mantela(labefacere))
    this.contenta.set('liquifacere', new Mantela(liquifacere))
    this.contenta.set('madefacere', new Mantela(madefacere))
    this.contenta.set('malefacere', new Mantela(malefacere))
    this.contenta.set('mālle', new Mantela(malle))
    this.contenta.set('mānsuēfacere', new Mantela(mansuefacere))
    this.contenta.set('meminisse', new Mantela(meminisse))
    this.contenta.set('mollifacere', new Mantela(mollifacere))
    this.contenta.set('multifacere', new Mantela(multifacere))
    this.contenta.set('nōlle', new Mantela(nolle))
    this.contenta.set('nequīre', new Mantela(nequire))
    this.contenta.set('obesse', new Mantela(obesse))
    this.contenta.set('obīre', new Mantela(obire))
    this.contenta.set('obstupefacere', new Mantela(obstupefacere))
    this.contenta.set('obvenīre', new Mantela(obvenire))
    this.contenta.set('ōdisse', new Mantela(odisse))
    this.contenta.set('offerre', new Mantela(offerre))
    this.contenta.set('olfacere', new Mantela(olfacere))
    this.contenta.set('obsolefierī', new Mantela(obsolefieri))
    this.contenta.set('patefacere', new Mantela(patefacere))
    this.contenta.set('pavefacere', new Mantela(pavefacere))
    this.contenta.set('percalfacere', new Mantela(percalfacere))
    this.contenta.set('perferre', new Mantela(perferre))
    this.contenta.set('perīre', new Mantela(perire))
    this.contenta.set('permadefacere', new Mantela(permadefacere))
    this.contenta.set('pervelle', new Mantela(pervelle))
    this.contenta.set('pervenīre', new Mantela(pervenire))
    this.contenta.set('posse', new Mantela(posse))
    this.contenta.set('postferre', new Mantela(postferre))
    this.contenta.set('praeesse', new Mantela(praeesse))
    this.contenta.set('praeterferre', new Mantela(praeterferre))
    this.contenta.set('praevenīre', new Mantela(praevenire))
    this.contenta.set('prōdesse', new Mantela(prodesse))
    this.contenta.set('prōferre', new Mantela(proferre))
    this.contenta.set('prōdīre', new Mantela(prodire))
    this.contenta.set('prōvenīre', new Mantela(provenire))
    this.contenta.set('putrefacere', new Mantela(putrefacere))
    this.contenta.set('quīre', new Mantela(quire))
    this.contenta.set('rārefacere', new Mantela(rarefacere))
    this.contenta.set('redīre', new Mantela(redire))
    this.contenta.set('referre', new Mantela(referre))
    this.contenta.set('recalfacere', new Mantela(recalfacere))
    this.contenta.set('satisfacere', new Mantela(satisfacere))
    this.contenta.set('stupefacere', new Mantela(stupefacere))
    this.contenta.set('subesse', new Mantela(subesse))
    this.contenta.set('subīre', new Mantela(subire))
    this.contenta.set('subolfacere', new Mantela(subolfacere))
    this.contenta.set('subvenīre', new Mantela(subvenire))
    this.contenta.set('sufferre', new Mantela(sufferre))
    this.contenta.set('suffierī', new Mantela(suffieri))
    this.contenta.set('superesse', new Mantela(superesse))
    this.contenta.set('superfierī', new Mantela(superfieri))
    this.contenta.set('supervenīre', new Mantela(supervenire))
    this.contenta.set('tepefacere', new Mantela(tepefacere))
    this.contenta.set('trānsabīre', new Mantela(transabire))
    this.contenta.set('trānsīre', new Mantela(transire))
    this.contenta.set('trānsvenīre', new Mantela(transvenire))
    this.contenta.set('tremefacere', new Mantela(tremefacere))
    this.contenta.set('tumefacere', new Mantela(tumefacere))
    this.contenta.set('vacuēfacere', new Mantela(vacuefacere))
    this.contenta.set('velle', new Mantela(velle))
    this.contenta.set('vēnīre', new Mantela(venire))
    this.contenta.set('venīre', new Mantela(venireRectum))
  }
}

export const actus = new Ignavum(Actus)
