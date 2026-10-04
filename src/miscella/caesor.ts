import { Ultimum } from './usus';
import '../extensions/array';
import '../extensions/string';
import { omit } from '../extensions/utils';
import {
  Casus,
  Factus,
  Fulta,
  Genus,
  Gradus,
  Modus,
  Numerus,
  Tempus,
  Vox
  } from '../praebeunda/valores';
import {
  Elementum,
  ElementumActus,
  ElementumAdiectivi,
  ElementumNominis,
  ElementumNominisFacti,
  type ElementumIncomparabilis
  } from '../praebeunda/elementa'
import { Multiplex, type Actus, type Adiectivum, type Nomen } from '../praebeunda/verba'

export abstract class Caesor<Hoc extends Multiplex, Illud extends Elementum<Hoc>> {
  protected erratust: (illud: Illud) => Error =
      (illud: Illud) => new Error(`Malu'st ${omit(illud, 'versio')}`)
  abstract caedatur (illud: Illud, fulta: Fulta): string
}

@Ultimum class CaesorActuum extends Caesor<Actus, ElementumActus> {
  caedatur (actus: ElementumActus, fulta: Fulta): string {
    const modus: Modus = fulta.inveni(Modus)
    const tempus: Tempus = fulta.inveni(Tempus)
    if (!modus || !tempus) throw this.erratust(actus)
    else if (modus.valor === 'participium') {
      const vox: Vox = fulta.inveni(Vox)
      if (!vox) throw this.erratust(actus)
      switch (`${vox.valor}_${tempus.valor}`) {
        case 'activa_praesens': case 'passiva_futurum':
          return actus.praesens.chop(3)
        case 'activa_futurum': case 'passiva_perfectum':
          return actus.supinum.chop(2)
      }
    } switch(tempus.valor) {
      case 'perfectum': case 'plusquamperfectum': case 'exigendum':
        return actus.perfectum.chop(2)
      case 'praesens': case 'infectum': case 'futurum':
        return actus.praesens.chop(3)
      default: return ''
    }
  }
}

@Ultimum class CaesorAdiectivorum extends Caesor<Adiectivum, ElementumAdiectivi> {
  caedatur (adiectivum: ElementumAdiectivi, fulta: Fulta): string {
    const gradus: Gradus = fulta.inveni(Gradus)
    if (!gradus) throw this.erratust(adiectivum)
    switch (gradus.valor) {
      case 'superlativus': return adiectivum.superlativus.chop(2)
      case 'comparativus': return adiectivum.comparativus.chop(3)
      default: {
        if (adiectivum.versio.split('/').first() === 'positivaTertia') {
          const numerus: Numerus = fulta.inveni(Numerus)
          if (!numerus) throw this.erratust(adiectivum)
          if (numerus.valor === 'singularis') {
            const casus: Casus = fulta.inveni(Casus)
            const genus: Genus = fulta.inveni(Genus)
            if (!casus || !genus) throw this.erratust(adiectivum)
            switch (casus.valor) {
              case 'derectus': case 'nominativus':
              case 'vocativus': return adiectivum.positivus
              case 'accusativus':
                { if (genus.valor === 'neutrum') return adiectivum.positivus }
            }
          }
        } return adiectivum.positivus.chop(2)
      }
    }
  }
}

@Ultimum class CaesorIncomparabilium extends Caesor<Adiectivum, ElementumIncomparabilis> {
  caedatur (adiectivum: ElementumIncomparabilis, fulta: Fulta): string {
    if (adiectivum.versio.split('/').first() === 'tertia') {
      const numerus: Numerus = fulta.inveni(Numerus)
      if (!numerus) throw this.erratust(adiectivum)
      if (numerus.valor === 'singularis') {
        const casus: Casus = fulta.inveni(Casus)
        const genus: Genus = fulta.inveni(Genus)
        if (!casus || !genus) throw this.erratust(adiectivum)
        switch (casus.valor) {
          case 'derectus': case 'nominativus':
          case 'vocativus': return adiectivum.nominativus
          case 'accusativus':
            { if (genus.valor === 'neutrum') return adiectivum.nominativus }
        }
      } return adiectivum.genitivus.chop(2)
    } else return adiectivum.nominativus.chop(2)
  }
}

@Ultimum class CaesorNominum extends Caesor<Nomen, ElementumNominis> {
  caedatur (nomen: ElementumNominis, fulta: Fulta): string {
    switch (nomen.versio.split('/').first()) {
      case 'prima': return nomen.nominativus.chop(1)
      case 'quarta': return nomen.nominativus.chop(nomen.versio.includes('varia') ? 2 : 1)
      case 'tertia': {
        const casus: Casus = fulta.inveni(Casus)
        const genus: Genus = fulta.inveni(Genus)
        if (!casus) throw this.erratust(nomen)
        switch (casus.valor) {
          case 'derectus': case 'nominativus':
          case 'vocativus': return nomen.nominativus
          case 'accusativus':
            { if (genus.valor === 'neutrum') return nomen.nominativus }
        } return nomen.genitivus.chop(2)
      }
      default: return nomen.nominativus.chop(2)
    }
  }
}

@Ultimum class CaesorNominumFactorum extends Caesor<Nomen, ElementumNominisFacti> {
  caedatur (factum: ElementumNominisFacti, fulta: Fulta): string {
    const factus: Factus = fulta.inveni(Factus)
    if (!factus) throw this.erratust(factum)
    switch(factus.valor) {
      case 'nullus': return ''
      case 'indicativus': return factum.indicativum
      default: return factum[factus.valor as keyof ElementumNominisFacti].chop(2)
    }
  }
}

export const caesorActuum: CaesorActuum = new CaesorActuum
export const caesorAdiectivorum: CaesorAdiectivorum = new CaesorAdiectivorum
export const caesorIncomparabilium: CaesorIncomparabilium = new CaesorIncomparabilium
export const caesorNominum: CaesorNominum = new CaesorNominum
export const caesorNominumFactorum: CaesorNominumFactorum = new CaesorNominumFactorum
