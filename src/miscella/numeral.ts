import RomanNumeral from 'js-roman-numerals';

type Par = {
  anglicus: number,
  latinum: string;
};

export default class Numeral {
  static minimus: Par = {
    anglicus: 0.0,
    latinum: 'N'
  };

  static maximus: Par = {
    anglicus: 39993999.0 + (11.0 / 12.0),
    latinum: '|MMMCMXCIX|MMMCMXCIXS×'
  };

  static fracti (): Map<number, string> {
    const numeri: Map<number, string> = new Map;
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

  static convertibilis (anglicus: number): boolean {
    return [
      anglicus >= Numeral.minimus.anglicus,
      anglicus <= Numeral.maximus.anglicus
    ].all();
  }

  static romanus (anglicus: number): string {
    if (this.convertibilis(anglicus)) {
      if (anglicus === Numeral.minimus.anglicus) {
        return Numeral.minimus.latinum;
      } else if (Number.isInteger(anglicus)) {
        if (anglicus >= 4000) {
          const inferior: number = anglicus % 4000;
          const superior: number = (anglicus - inferior) / 1000;
          return `|${new RomanNumeral(superior)}|${new RomanNumeral(inferior)}`;
        } else {
          return new RomanNumeral(anglicus).toString();
        }
      } else {
        const integer: number = Math.floor(anglicus);
        const fractus: number = 12 * (anglicus - integer);
        const fractum: string | undefined = this.fracti().get(fractus);
        return fractum ? this.romanus(integer).concat(fractum) : '';
      }
    } else {
      throw new Error(`Iacta interfuturu'st valor: ${anglicus}`);
    }
  }

  static anglicus (romanus: string): number {
    const fractus: string = [
      ...this.fracti().values()
    ].first(valor => romanus.includes(valor))[0];
    if (fractus) {
      const numerator: number = [
        ...this.fracti().entries()
      ].first(valor => valor[ 1 ] === fractus)[0];
      romanus = romanus.replace(fractus, '');
      return this.anglicus(romanus) + (numerator / 12.0);
    } else if (romanus === 'N') {
      return 0;
    } else if (romanus.startsWith('|')) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [ _, superior, inferior ] = romanus.split('|');
      return (10 * this.anglicus(superior)) + this.anglicus(inferior);
    } else {
      return new RomanNumeral(romanus).toInt();
    }
  }
}
