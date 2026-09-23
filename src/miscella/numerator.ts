import RomanNumeral from 'js-roman-numerals';
import Nuntius from './nuntius';

const source = (re: RegExp) => re.source

interface Par {
  arabicus: number
  romanus: string
}

const minimum: Par = {
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

const deFractisMinoribus: RegExp = /(?:·|∴|×|:{1,2})/;
const deFractisMaioribus: RegExp = new RegExp(`S(?:${source(deFractisMinoribus)})?`);
const deFractis: RegExp = new RegExp(`(?:${source(deFractisMaioribus)})|(?:${source(deFractisMinoribus)})`);

const deIntegris: RegExp = /(?=[MDCLXVI])M{0,3}(?:CM|CD|D?C{0,3})(?:XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3})/;
const deMixtis: RegExp = new RegExp(`(?:${source(deIntegris)}(?:${source(deFractis)})?|${source(deFractis)})`);

const colamenMixtum: RegExp = new RegExp(`^(?<integer>${source(deIntegris)})?(?<fractus>${source(deFractis)})?$`);
const colamen: RegExp = new RegExp(`^(?:(?:\\|(?<maior>${source(deMixtis)})\\|(?<minor>${source(deMixtis)})?)|(?<nihil>(N))|(?:${source(deMixtis)}))$`)

@Nuntius.factum('Numerator')
export default class Numerator {
  static arabicusConvertibilis(arabicus: number): boolean {
    return [arabicus >= minimum.arabicus, arabicus <= maximum.arabicus].all()
  }

  static romanusConvertibilis(romanus: string): boolean {
    return colamen.test(romanus)
  }

  @Nuntius.modus('Numerator')
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
    } return ''
  }

  @Nuntius.modus('Numerator')
  static arabicus(romanus: string): number {
    if(!romanus) return -1
    romanus = romanus.toUpperCase()
    const certamen: RegExpExecArray | undefined = colamen.exec(romanus) ?? undefined
    if(certamen && certamen.groups) {
      if(certamen.groups.nihil) return 0
      if(certamen.groups.maior)
        return (1000.0 * this.arabicus(certamen.groups.maior)) +
                         this.arabicus(certamen.groups.minor ?? 'N')
      const certamenMixtum: RegExpExecArray | undefined = colamenMixtum.exec(romanus) ?? undefined
      if(certamenMixtum && certamenMixtum.groups) {
        const fractus: string | undefined = certamenMixtum.groups.fractus ?? undefined
        const integer: string = certamenMixtum.groups.integer ?? 'N'
        if(fractus) {
          const numerator: string = claves.first((clavis: Fractus) => (fracti[clavis] === fractus)) as string ?? '0'
          return (parseInt(numerator.toLowerCase(), 12.0) / 12.0) + this.arabicus(integer)
        } else return new RomanNumeral(integer).toInt()
      } else return new RomanNumeral(certamen.groups.minor).toInt()
    } return -1
  }
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
