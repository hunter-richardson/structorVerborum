import Ignavum from '../miscella/ignavum';
import { NomenActum, NomenAgendum } from '../praebeunda/agenda';
import Structor from '../praebeunda/structor';
import { Nomen } from '../praebeunda/verba';
import TabulaBifissa from '../tabulae/bifissa';
import TabulaCollata from '../tabulae/collata';
import TabulaPraefixa from '../tabulae/rescriptae/praefixa';
import TabulaScapalis from '../tabulae/scapalis';
import type Tabula from '../tabulae/tabula';
import Anomala, { Mantela } from './anomala';

export default class Nomina extends Anomala<Nomen> {
  static se: Ignavum<Nomina> = new Ignavum(() => new Nomina)
  protected override async numeretur(): Promise<void> {
    const Athos: Ignavum<TabulaScapalis<Nomen>> = new Ignavum(
      () => new TabulaScapalis<Nomen>({ via: '/res/scapales/nomina/Athōs', positor: Nomen.positor })
    )
    const dare: Ignavum<TabulaScapalis<Nomen>> = new Ignavum(
      () => new TabulaScapalis<Nomen>({ via: '/res/scapales/nomina/dare', positor: Nomen.positor })
    )
    const Iesus: Ignavum<TabulaScapalis<Nomen>> = new Ignavum(
      () => new TabulaScapalis<Nomen>({ via: '/res/scapales/nomina/Iēsūs', positor: Nomen.positor })
    )
    const ire: Ignavum<TabulaScapalis<Nomen>> = new Ignavum(
      () => new TabulaScapalis<Nomen>({ via: '/res/scapales/nomina/ire', positor: Nomen.positor })
    )
    const lexis: Ignavum<TabulaScapalis<Nomen>> = new Ignavum(
      () => new TabulaScapalis<Nomen>({ via: '/res/scapales/nomina/lexis', positor: Nomen.positor })
    )
    const vices: Ignavum<TabulaScapalis<Nomen>> = new Ignavum(
      () => new TabulaScapalis<Nomen>({ via: '/res/scapales/nomina/vices', positor: Nomen.positor })
    )
    const vis: Ignavum<TabulaScapalis<Nomen>> = new Ignavum(
      () => new TabulaScapalis({ via: '/res/scapales/nomina/vis', positor: Nomen.positor })
    )

    const balneum: Ignavum<TabulaBifissa> = new Ignavum(
      () =>
        new TabulaBifissa({
          singularis: new Structor(() => new NomenAgendum)
            .ponatur((nomen) => (nomen.nominativum = 'balneum'))
            .ponatur((nomen) => (nomen.genitivum = 'balneī'))
            .ponatur((nomen) => (nomen.versio = 'secundaNeutra'))
            .struatur(),
          pluralis: new Structor(() => new NomenAgendum)
            .ponatur((nomen) => (nomen.nominativum = 'balnea'))
            .ponatur((nomen) => (nomen.genitivum = 'balneae'))
            .ponatur((nomen) => (nomen.versio = 'prima'))
            .struatur()
        })
    )

    const caelum: Ignavum<TabulaBifissa> = new Ignavum(
      () =>
        new TabulaBifissa({
          singularis: new Structor(() => new NomenAgendum)
            .ponatur((nomen) => (nomen.nominativum = 'caelum'))
            .ponatur((nomen) => (nomen.genitivum = 'caelī'))
            .ponatur((nomen) => (nomen.versio = 'secundaNeutra'))
            .struatur(),
          pluralis: new Structor(() => new NomenAgendum)
            .ponatur((nomen) => (nomen.nominativum = 'caelus'))
            .ponatur((nomen) => (nomen.genitivum = 'caelī'))
            .ponatur((nomen) => (nomen.versio = 'secundaMasculina'))
            .struatur()
        })
    )

    const dea: Ignavum<TabulaCollata<Nomen>> = new Ignavum(
      () =>
        new TabulaCollata(
          new Ignavum(
            () =>
              new TabulaScapalis<Nomen>({ via: '/res/scapales/nomina/dea', positor: Nomen.positor })
          ),
          new Ignavum(() =>
            new Structor(() => new NomenAgendum)
              .ponatur((nomen) => (nomen.nominativum = 'dea'))
              .ponatur((nomen) => (nomen.genitivum = 'deae'))
              .ponatur((nomen) => (nomen.versio = 'prima'))
              .struatur()
              .putetur()
          )
        )
    )

    const domus: Ignavum<TabulaCollata<Nomen>> = new Ignavum(
      () =>
        new TabulaCollata(
          new Ignavum(
            () =>
              new TabulaScapalis({
                via: '/res/scapales/nomina/domus',
                positor: Nomen.positor
              })
          ),
          new Ignavum(() =>
            new Structor(() => new NomenAgendum)
              .ponatur((nomen) => (nomen.nominativum = 'domus'))
              .ponatur((nomen) => (nomen.genitivum = 'domūs'))
              .ponatur((nomen) => (nomen.versio = 'quarta'))
              .struatur()
              .putetur()
          )
        )
    )

    const iugerum: Ignavum<TabulaCollata<Nomen>> = new Ignavum(
      () =>
        new TabulaCollata(
          new Ignavum(
            () =>
              new TabulaScapalis({
                via: '/res/scapales/nomina/iūgerum',
                positor: Nomen.positor
              })
          ),
          new Ignavum(() =>
            new Structor(() => new NomenAgendum)
              .ponatur((nomen) => (nomen.nominativum = 'iūgerum'))
              .ponatur((nomen) => (nomen.genitivum = 'iūgerī'))
              .ponatur((nomen) => (nomen.versio = 'secundaNeutra'))
              .struatur()
              .putetur()
          )
        )
    )

    const semidea: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: dea, praefixum: 'sēmi' })
    )

    const abire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'ab' })
    )
    const circumire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'circum' })
    )
    const coire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'co' })
    )
    const deire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'de' })
    )
    const disperire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'disper' })
    )
    const exire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'ex' })
    )
    const inire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'in' })
    )
    const interire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'inter' })
    )
    const introire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'intro' })
    )
    const nequire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'nequ' })
    )
    const obire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'ob' })
    )
    const perire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'per' })
    )
    const prodire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'prōd' })
    )
    const quire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'qu' })
    )
    const redire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'red' })
    )
    const subire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'sub' })
    )
    const transabire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'trānsab' })
    )
    const transire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'trāns' })
    )
    const venire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: ire, praefixum: 'vēn' })
    )
    const dedare: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: dare, praefixum: 'dē' })
    )
    const edare: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () => new TabulaPraefixa({ relata: dare, praefixum: 'ē' })
    )

    const venireRectum: Ignavum<Tabula<Nomen>> = new Ignavum(() =>
      new Structor(() => new NomenActum)
        .ponatur((nomen) => (nomen.infinitivum = 'venīre'))
        .ponatur((nomen) => (nomen.supinum = 'ventum'))
        .ponatur((nomen) => (nomen.versio = 'quartus'))
        .struatur()
        .putetur()
    )

    const advenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'ad'
        })
    )

    const adinvenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'adin'
        })
    )

    const antevenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'ante'
        })
    )

    const circumvenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'circum'
        })
    )

    const convenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'con'
        })
    )

    const contravenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'contrā'
        })
    )

    const disconvenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'discon'
        })
    )

    const devenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'dē'
        })
    )

    const evenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'ē'
        })
    )

    const invenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'in'
        })
    )

    const intervenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'inter'
        })
    )

    const obvenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'ob'
        })
    )

    const pervenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'per'
        })
    )

    const praevenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'prae'
        })
    )

    const provenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'prō'
        })
    )

    const subvenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'sub'
        })
    )

    const supervenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'super'
        })
    )

    const transvenire: Ignavum<TabulaPraefixa<Nomen>> = new Ignavum(
      () =>
        new TabulaPraefixa({
          relata: new Ignavum(() => venireRectum.ipse()),
          praefixum: 'trāns'
        })
    )

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
