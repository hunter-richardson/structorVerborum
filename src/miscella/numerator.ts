import RomanNumeral from 'js-roman-numerals';
import Nuntius from './nuntius';
import { Ultimum } from './usus';
import {
  anyOf,
  buildRegExp,
  capture,
  choiceOf,
  EncodedRegex,
  endOfString,
  lookahead,
  optional,
  regex,
  RegexConstruct,
  repeat,
  startOfString,
  type CaptureOptions,
  type RepeatOptions
  } from 'ts-regex-builder';

export interface Par {
  arabicus: number
  romanus: string
}

export const minimum: Par = {
  arabicus: 0,
  romanus: 'N'
} as const

const maximum: Par = {
  arabicus: 1001.0 * (3999.0 + (11.0 / 12.0)),
  romanus: '|MMMCMXCIXS×|MMMCMXCIXS×'
} as const

type Fracti = {
  0: string,
  1: string,
  2: string,
  3: string,
  4: string,
  5: string,
  6: string,
  7: string,
  8: string,
  9: string,
  a: string,
  b: string;
};

type Fractus = keyof Fracti;

const fracti: Fracti = {
  0: '', 1: '·', 2: ':', 3: '∴', 4: '::', 5: '×',
  6: 'S', 7: 'S·', 8: 'S:', 9: 'S∴', a: 'S::', b: 'S×'
}

const claves: Fractus[] =
    (Object.keys(fracti) as Array<Fractus>)
           .filter((clavis: Fractus) => !!fracti[clavis]);

let spatium: RepeatOptions = { min: 1, max: 2 }

const deFractisMinoribus: EncodedRegex =  ///(·|∴|×|:{1,2})/
    regex([ choiceOf('·', '∴', '×', repeat(':', spatium)) ])
const deFractisMaioribus: EncodedRegex =  ///S(·|∴|×|:{1,2})?/
    regex([ 'S', optional(deFractisMinoribus) ])
const deFractis: RegexConstruct =  ///(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))/
    choiceOf(deFractisMaioribus, deFractisMinoribus)

spatium = { min: 0, max: 3 }

const litterae =
  [
    { prima: 'C', secunda: 'M', tertia: 'D' },  ///(CM|CD|D?C{0,3})/
    { prima: 'X', secunda: 'C', tertia: 'L' },  ///(XC|XL|L?X{0,3})/
    { prima: 'I', secunda: 'X', tertia: 'V' }   ///(IX|IV|V?I{0,3})/
  ]

const deIntegrisPlurimis: EncodedRegex = regex(  ///(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})/
  litterae.map((littera) =>
        choiceOf(`${littera.prima}${littera.secunda}`, `${littera.prima}${littera.tertia}`,
                 regex([ optional(littera.tertia), repeat(littera.prima, spatium) ])))
)

const deIntegris: EncodedRegex =  ///(?=[MDCLXVI])(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})/
  regex([ lookahead(anyOf('MDCLXVI')),  ///(?=[MDCLXVI])/
          repeat('M', spatium),  ///M{0,3}/
          deIntegrisPlurimis ])

const deMixtis: EncodedRegex = regex([  ///(?=[MDCLXVI])(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))?|(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))/
  choiceOf(regex([ deIntegris, optional(deFractis) ]), deFractis) ])

const integerCapiendus: CaptureOptions = { name: 'integer' }  ///(?<integer>)/
const fractusCapiendus: CaptureOptions = { name: 'fractus' }  ///(?<fractus>)/
const maiorCapiendus: CaptureOptions = { name: 'maior' }  ///(?<maior>)/
const minorCapiendus: CaptureOptions = { name: 'minor' }  ///(?<minor>)/
const nihilCapiendum: CaptureOptions = { name: 'nihil' }  ///(?<nihil>)/

const colamenMixtum: RegExp = buildRegExp([  ///^(?<integer>(?=[MDCLXVI])(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}))(?<fractus>(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))$/
  startOfString,  ///^/
  optional(capture(deIntegris, integerCapiendus)),  ///(?<integer>(?=[MDCLXVI])(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3}))/
  optional(capture(deFractis, fractusCapiendus)),   ///(?<fractus>(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))/
  endOfString ])  ///$/
const colamen: RegExp = buildRegExp([  ///^(?:\|(?<maior>)(?=[MDCLXVI])(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))?|(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))\|(?<minor>(?=[MDCLXVI])(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))?|(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2})))?)|(?<nihil>)(N)|(?=[MDCLXVI])(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))?|(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))$/
  startOfString,  ///^/
  choiceOf(regex([ '|', capture(deMixtis, maiorCapiendus), '|',  ///\|(?<maior>)(?=[MDCLXVI])(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))?|(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))\|/
    optional(capture(deMixtis, minorCapiendus)) ])),  ///(?<minor>(?=[MDCLXVI])(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))?|(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))?/
  capture('N', nihilCapiendum),  ///(?<nihil>)(N)/
  deMixtis,  ///(?=[MDCLXVI])(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))?|(S(·|∴|×|:{1,2})|(·|∴|×|:{1,2}))/
  endOfString ])  ///$/

@Ultimum @Nuntius.factum
export default class Numerator {
  static arabicusConvertibilis(arabicus: number): boolean
  { return [arabicus >= minimum.arabicus, arabicus <= maximum.arabicus].all() }

  static romanusConvertibilis(romanus: string): boolean
  { return colamen.test(romanus) }

  @Nuntius.modus
  // eslint disable complexity
  static romanus(arabicus: number): string {
    if(this.arabicusConvertibilis(arabicus)) {
      if(arabicus.toString(12.0) === minimum.arabicus.toString(12.0)) return minimum.romanus
      else if(arabicus.toString(12.0) === maximum.arabicus.toString(12.0)) return maximum.romanus
      else if(Number.isSafeInteger(arabicus)) {
        if(arabicus >= 4000.0) {
          const minor: number = arabicus % 4000.0
          const maior: number = (arabicus - minor) / 1000.0
          return `|${this.romanus(maior)}|${this.romanus(minor)}`
        } else return new RomanNumeral(arabicus).toString()
      } else {
        const integer: number = Math.floor(arabicus)
        const fractus: Fractus = (12.0 * (arabicus - integer)).toString(12.0) as Fractus
        return `${this.romanus(integer)}${fracti[ fractus ] ?? ''}`
      }
    } else return ''
  }
  // eslint enable complexity

  @Nuntius.modus
  // eslint disable complexity
  static arabicus(romanus: string): number {
    if(!romanus) return -1
    romanus = romanus.toUpperCase()
    const certamen: RegExpExecArray | undefined = colamen.exec(romanus) ?? undefined
    //  eslint-disable-next-line no-extra-boolean-cast
    if(!!certamen && !!certamen.groups) {
      //  eslint-disable-next-line no-extra-boolean-cast
      if(!!certamen.groups['nihil']) return 0
      //  eslint-disable-next-line no-extra-boolean-cast
      if(!!certamen.groups['maior'])
        return (1000.0 * this.arabicus(certamen.groups['maior'])) +
                         this.arabicus(certamen.groups['minor'] ?? 'N')
      const certamenMixtum: RegExpExecArray | undefined = colamenMixtum.exec(romanus) ?? undefined
      //  eslint-disable-next-line no-extra-boolean-cast
      if(!!certamenMixtum && !!certamenMixtum.groups) {
        const fractus: string | undefined = certamenMixtum.groups['fractus'] ?? undefined
        const integer: string = certamenMixtum.groups['integer'] ?? 'N'
        if(fractus) {
          const numerator: string = claves.first((clavis: Fractus) => (fracti[clavis] === fractus)) as string ?? '0'
          return (parseInt(numerator.toLowerCase(), 12.0) / 12.0) + this.arabicus(integer)
        } else return new RomanNumeral(integer).toInt()
      } else return new RomanNumeral(certamen.groups['minor']).toInt()
    } else return -1
  }
  // eslint enable complexity
}

// N  ->  0
// I  ->  1
// MMXXVI  ->  2026
// MMMCMXCIX  ->  3999
// |MMMCMXCIXS×|MMMCMXCIXS×  ->  (3999 + (11/12))*1001
// ∴  ->  1/4
// S  ->  1/2
// S::  ->  5/6
// XIV∴  ->  14 + (1/4)
// |C|XIV∴  ->  100014 + (1/4)
// IIII  ->  -1
// ABC  ->  -1
