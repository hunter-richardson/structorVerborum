import path from 'path';
import {
  anyOf,
  buildRegExp,
  capture,
  choiceOf,
  endOfString,
  oneOrMore,
  optional,
  regex,
  startOfString,
  whitespace
  } from 'ts-regex-builder';
import { LectorMultiplex } from './lector';
import Nuntius from './nuntius';
import { Ignavum, Ultimum } from './usus';
import '../extensions/array';
import '../extensions/string';
import { Multiplex } from '../praebeunda/verba';
import {
  errator,
  Fulta,
  nomina,
  valores,
  type Fultum,
  type Lineae
  } from '../praebeunda/valores';
import type { Tabulamen } from '../praebeunda/tabulamina';

type Cretor = (fulta: Fulta) => boolean

class Caesamen {
  readonly status!: Cretor
  readonly clavis!: string
  readonly mensura!: number
}

class Crudum extends (Caesamen as new () => Omit<Caesamen, 'status'>) {
  readonly status!: string
}

@Ignavum @Ultimum @Nuntius.factum
export default class Caesor<Hoc extends Multiplex, Illud extends Tabulamen<Hoc>> {
  private readonly deSpatiis: RegExp =  //\s+/g
    buildRegExp([ oneOrMore(whitespace) ], { global: true })
  private readonly colamen: RegExp =  ///^(?<nomen>(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox))(?<operator>[<!=>]=?)(?<quaerendus>(?:ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus))$/
    buildRegExp([
      startOfString,  //^/
      capture(choiceOf(...nomina.except([ 'categoria' ])), { name: 'nomen' }),  ///(?<nomen>(?:casus|factus|genus|gradus|modus|numerus|persona|relaturus|tempus|vox))/
      capture(choiceOf(anyOf('!='), regex([ anyOf('<>'), optional('=') ]))),  ///(?<operator>[<!=>]=?)/
      capture(choiceOf(...valores), { name: 'quaerendus' }),  ///(?<quaerendus>ablativus|accusativus|activa|adverbium|cardinale|comparativus|derectus|distributium|exigendum|fractionale|futurum|genitivus|gerundius|imperativus|indicativus|infectum|infinitivus|locativus|multiplicativum|nominativus|nulla|nullum|nullus|numerus|ordinale|participium|passiva|perfectum|pluralis|plusquamperfectum|positivus|praesens|prima|secunda|singularis|subiuntivus|superlativus|supinus|tertia|vocativus))$/
      endOfString  //$/
    ])

  @Nuntius.modus praedicatur(status: string): Cretor {
    if(status.length == 0) return (_: Fulta) => true
    const certamen: RegExpExecArray | undefined = this.colamen.exec(status) ?? undefined
    if(!certamen || !certamen.groups) throw errator({ status: status })
    const { nomen, operator, quaerendus } = certamen.groups
    if(!nomen || !operator || !quaerendus) throw errator({ status: status })
    return (fulta: Fulta) => {
      const fultum: Fultum<Lineae> | undefined = fulta.inveni(nomen)
      if(!fultum) return false
      const quaerendi: number = fultum.valores.indexOf(quaerendus)
      const valoris: number = fultum.valores.indexOf(fultum.valor)
      switch(operator) {
        case '=' : return valoris === quaerendi
        case '!' : return valoris !== quaerendi
        case '<' : return valoris  <  quaerendi
        case '>' : return valoris  >  quaerendi
        case '<=': return valoris  <= quaerendi
        case '>=': return valoris  >= quaerendi
        default: return false
      }
    }
  }

  @Nuntius.modus praedicantur(status: string): Cretor {
    status = status.replace(this.deSpatiis, '')
    if(status.length == 0) return (_: Fulta) => true
    else return (fulta: Fulta) =>
        status.split('&').every((ullus) =>
          this.praedicantur(ullus)(fulta))
  }

  @Nuntius.promittum async caedatur(illud: Illud, fulta: Fulta): Promise<string> {
    const caesamina: Caesamen[] = await this.oneratur(illud)
    const caesamen: Caesamen | undefined =
        caesamina.find((caesamen) => caesamen.status(fulta))
    return !!caesamen && caesamen.clavis in illud ?
        (illud[caesamen.clavis as keyof Illud] as string).chop(caesamen.mensura) : ''
  }

  @Nuntius.promittum async oneratur(illud: Illud): Promise<Caesamen[]> {
    let via: string = path.join('caesamina', illud.scapum)
    let filum: string = illud.principium
    if(illud.categoria === 'actus')
    { via = 'caesamina'; filum = 'actus' }
    else if(illud.categoria === 'nomen' && illud.scapum.includes('secunda'))
    { via = 'caesamina/nomina'; filum = 'secunda' }
    return (await new LectorMultiplex<Crudum>(via, Crudum).legatur(filum)).multa
      .map((crudum) => ({
        status: this.praedicantur(crudum.status),
        clavis: crudum.clavis, mensura: crudum.mensura
      }))
  }
}
