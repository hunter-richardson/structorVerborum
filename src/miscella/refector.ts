import {
  anyOf,
  buildRegExp,
  capture,
  CaptureOptions,
  choiceOf,
  EncodedRegex,
  endOfString,
  optional,
  regex,
  startOfString,
  whitespace,
  zeroOrMore
  } from 'ts-regex-builder';
import '../extensions/array';
import { SortResult } from '../extensions/utils';
import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import {
  errator,
  Fultum,
  Lineae,
  nomina,
  valores
  } from '../praebeunda/valores';
import { Agendum, Multiplex } from '../praebeunda/verba.ts';

enum Actus {
  Dele = 'dele',
  Pone = 'pone'
}

type Praedicendum<Hoc extends Multiplex> = (agendum: Agendum<Hoc>) => boolean
type Opus<Hoc extends Multiplex> = (agenda: Agendum<Hoc>[], numerus: number) => void

type Istud<Hoc extends Multiplex> = {
  praedicendum: Praedicendum<Hoc>,
  opus: Opus<Hoc>
}

const statusCapiendus: CaptureOptions = { name: 'status' }  ///(?<status>)/
const opusCapiendum: CaptureOptions = { name: 'opus' }  ///(?<opus>)/
const nomenCapiendum: CaptureOptions = { name: 'nomen' }  ///(?<nomen>)/
const operatorCapiendus: CaptureOptions = { name: 'operator' }  ///(?<operator>)/
const quaerendusCapiendus: CaptureOptions = { name: 'quaerendus' }  ///(?<quaerendus>)/
const actusCapiendus: CaptureOptions = { name: 'actus' }  ///(?<actus>)/
const nomenNoviCapienum: CaptureOptions = { name: 'nomenNovi' }  ///(?<nomenNovi>)/
const valorNoviCapiendus: CaptureOptions = { name: 'valorNovi' }  ///(?<valorNovi>)/

const deNominibus: EncodedRegex = choiceOf(nomina.except([ 'categoria' ]))
    ///(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox)/
const deOperatoribus: EncodedRegex =  ///(?:[!=]|[<>]=?)/
    choiceOf(anyOf('!='), regex([ anyOf('<>'), optional('=') ]))
const deQuaerendis: EncodedRegex =  ///(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus)/
    choiceOf(...valores)
const deStatu: EncodedRegex = regex([  ///(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox)(?:[!=]|[<>]=?)(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus)/
  deNominibus,  ///(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox)/
  deOperatoribus,  ///(?:[!=]|[<>]=?)/
  deQuaerendis ])  ///(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus)/
const deActus: EncodedRegex = choiceOf(...Object.keys(Actus) as string[])  ///(?:dele|pone)/
const deOpere: EncodedRegex =  ///\(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox)(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus)(\)/
    regex([
      deActus,  ///(?:dele|pone)/
      '(',  ///\(/
      deNominibus,  ///(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox)/
      ':',  ///:/
      deQuaerendis,  ///(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus)/
      ')' ])  ///\)/

const colamenStatus: RegExp = buildRegExp([  ///^(?<nomen>(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox))(?<operator>[<!=>]=?)(?<quaerendus>(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus))$/
  startOfString,  ///^/
  capture(deNominibus, nomenCapiendum),  ///(?<nomen>(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox))/
  capture(deOperatoribus, operatorCapiendus),  ///(?<operator>[<!=>]=?)/
  capture(deQuaerendis, quaerendusCapiendus),  ///(?<quaerendus>(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus))/
  endOfString  ///$/
])
const colamenOperis: RegExp = buildRegExp([  ///^(?<actus>(?:dele|pone))\((?<nomenNovi>(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox)):(?<valorNovi>(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus))\)$/
  startOfString,  ///^/
  capture(deActus, actusCapiendus),  ///(?<actus>(?:dele|pone))/
  '(',  ///\(/
  capture(deNominibus, nomenNoviCapienum),  ///(?<nomenNovi>(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox))/
  ':',  ///:/
  capture(deQuaerendis, valorNoviCapiendus),  ///(?<valorNovi>(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus))/
  ')',  ////)/
  endOfString ])  ///$/

const colamen: RegExp = buildRegExp([  ///^(?<status>(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox)(?:[!=]|[<>]=?)(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus)(?:&((?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox)(?:[!=]|[<>]=?)(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus)))*)(?<opus>(?:dele|pone)\(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox)(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus)(\))$/
  startOfString,  ///^/
  capture(regex([
    deStatu,  ///(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox)(?:[!=]|[<>]=?)(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus)/
    zeroOrMore(regex(['&', deStatu])) ]),  ///(?:&(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox)(?:[!=]|[<>]=?)(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus))*/
    statusCapiendus),  ///(?<status>)/
  ':',  ///:/
  capture(deOpere, opusCapiendum),  ///(?<opus>(?:dele|pone)\(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox)(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus)\))/
  endOfString ])  ///$/

@Ignavum @Ultimum @Nuntius.factum
export default class Refector<Hoc extends Multiplex> {
  private ista: Istud<Hoc>[] = []

  private praedicatur(nomen: string, operator: string, quaerendus: string): Praedicendum<Hoc> {
    return (agendum: Agendum<Hoc>): boolean => {
      const fultum: Fultum<Lineae> | undefined = agendum.valores.inveni(nomen)
      if(!fultum) throw new Error(`Nullum ${nomen} in ${agendum}`)
      const valoris: number = fultum.valores.indexOf(fultum.valor)
      const quaerendi: number = fultum.valores.indexOf(quaerendus)
      if(valoris == -1) throw errator({ [nomen]: fultum.valor })
      if(quaerendi == -1) throw errator({ [nomen]: quaerendus })
      const comparatum: SortResult = Math.sign(valoris - quaerendi) as SortResult
      switch(operator) {
        case '=': return comparatum == 0
        case '!': return comparatum != 0
        case '<=': return comparatum <= 0
        case '>=': return comparatum >= 0
        case '<': return comparatum < 0
        case '>': return comparatum > 0
        default: throw errator({ operator: operator })
      }
    }
  }

  private praedicantur(status: string): Praedicendum<Hoc> {
    return (agendum: Agendum<Hoc>) => {
      const praedicenda: Praedicendum<Hoc>[] = []
      const omnes: string[] = status.split('&')
      omnes.forEach((ullus) => {
        const certamenStatus: RegExpExecArray | undefined = colamenStatus.exec(ullus) ?? undefined
        //  eslint-disable-next-line no-extra-boolean-cast
        if (!!certamenStatus && certamenStatus.groups) {
          const { nomen, operator, quaerendus } = certamenStatus.groups
          //  eslint-disable-next-line no-extra-boolean-cast
          if (!!nomen && !!operator && !!quaerendus)
            praedicenda.push(this.praedicatur(nomen, operator, quaerendus))
        }
      }); return praedicenda.every((praedicendum) => praedicendum(agendum))
    }
  }

  private agatur(actus: Actus, nomen?: string, novus?: string): Opus<Hoc> {
    switch(actus) {
      case Actus.Dele:
        return (agenda: Agendum<Hoc>[], numerus: number) =>
            agenda.slice(numerus--, 1)
      case Actus.Pone:
        return (agenda: Agendum<Hoc>[], numerus: number) => {
          if(!!nomen && !!novus) {
            const fultum: Fultum<Lineae> | undefined = agenda[numerus].valores.inveni(nomen)
            if(!fultum) throw new Error(`Nullum ${nomen} in ${agenda[numerus]}`)
            fultum.valor = novus
          }
        }
    }
  }

  reficiatur(agenda: Agendum<Hoc>[]) {
    for(let numerus = 0; numerus < agenda.length; numerus++) {
      this.ista.forEach((istud) => {
        if(istud.praedicendum(agenda[numerus]))
          istud.opus(agenda, numerus)
      })
    }
  }

  constructor(readonly scriptura: string) {
    const scripturae: string[] =
      scriptura.replace(whitespace.pattern, '')
               .split(';')
    scripturae.forEach((scriptura: string) => {
      const certamen: RegExpExecArray | undefined = colamen.exec(scriptura) ?? undefined
      if (certamen && certamen.groups) {
        const { status, opus } = certamen.groups
        //  eslint-disable-next-line no-extra-boolean-cast
        if (!!status && !!opus) {
          const certamenOperis: RegExpExecArray | undefined = colamenOperis.exec(opus) ?? undefined
          //  eslint-disable-next-line no-extra-boolean-cast
          if (!!certamenOperis && !!certamenOperis.groups) {
            const { actus, nomenNovi, valorNovi } = certamenOperis.groups
            //  eslint-disable-next-line no-extra-boolean-cast
            if (!!actus && !!nomenNovi && !!valorNovi)
              this.ista.push({
                praedicendum: this.praedicantur(status),
                opus: this.agatur(actus as Actus, nomenNovi, valorNovi)
              })
          }
        }
      }
    })
  }
}
