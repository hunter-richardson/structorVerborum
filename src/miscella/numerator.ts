import RomanNumeral from 'js-roman-numerals';
import Nuntius from './nuntius';

type Par = {
  arabicus: number
  latinum: string
};

@Nuntius.factum('Numerator')
export default class Numerator {
  static minimus: Par = {
    arabicus: 0.0,
    latinum: 'N'
  };

  static maximus: Par = {
    arabicus: 39993999.0 + 11.0 / 12.0,
    latinum: '|MMMCMXCIX|MMMCMXCIXS×'
  };

  private static fracti (): Map<number, string> {
    const numeri: Map<number, string> = new Map();
    numeri.set(1, '·');
    numeri.set(2, ':');
    numeri.set(3, '∴');
    numeri.set(4, '::');
    numeri.set(5, '×');
    numeri.set(6, 'S');
    numeri.set(7, 'S·');
    numeri.set(8, 'S:');
    numeri.set(9, 'S∴');
    numeri.set(10, 'S::');
    numeri.set(11, 'S×');
    return numeri;
  }

  static convertibilis(arabicus: number): boolean {
    return [arabicus >= Numerator.minimus.arabicus, arabicus <= Numerator.maximus.arabicus].all();
  }

  @Nuntius.modus('Numerator')
  static romanus(arabicus: number): string {
    if (this.convertibilis(arabicus)) {
      if (arabicus === Numerator.minimus.arabicus) {
        return Numerator.minimus.latinum;
      } else if (Number.isInteger(arabicus)) {
        if (arabicus >= 4000) {
          const inferior: number = arabicus % 4000;
          const superior: number = (arabicus - inferior) / 1000;
          return `|${new RomanNumeral(superior)}|${new RomanNumeral(inferior)}`;
        } else {
          return new RomanNumeral(arabicus).toString();
        }
      } else {
        const integer: number = Math.floor(arabicus);
        const fractus: number = 12 * (arabicus - integer);
        const fractum: string | undefined = this.fracti().get(fractus);
        return fractum ? this.romanus(integer).concat(fractum) : '';
      }
    } else {
      throw new Error(`Iacta interfuturu'st valor: ${arabicus}`);
    }
  }

  @Nuntius.modus('Numerator')
  static arabicus(romanus: string): number {
    const fractus: string = [
      ...this.fracti().values()
    ].first((valor) => romanus.includes(valor))[0];
    if (fractus) {
      const numerator: number = [
        ...this.fracti().entries()
      ].first((valor) => valor[1] === fractus)[0];
      romanus = romanus.replace(fractus, '');
      return this.arabicus(romanus) + numerator / 12.0;
    } else if (romanus === 'N') {
      return 0;
    } else if (romanus.startsWith('|')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, superior, inferior] = romanus.split('|');
      return 10 * this.arabicus(superior) + this.arabicus(inferior);
    } else {
      return new RomanNumeral(romanus).toInt();
    }
  }
}
