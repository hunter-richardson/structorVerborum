export {  }

const apices: Map<string, string> = new Map();
apices.set('Ā', 'A');
apices.set('Ē', 'E');
apices.set('Ī', 'I');
apices.set('Ō', 'O');
apices.set('Ū', 'U');
apices.set('Ȳ', 'Y');
apices.set('ā', 'a');
apices.set('ē', 'e');
apices.set('ī', 'i');
apices.set('ō', 'o');
apices.set('ū', 'u');
apices.set('ȳ', 'y');

declare global {
  interface String {
    chop(length: number): string;
    startsWithConsonant(): boolean;
    startsWithVowel(): boolean;
    removeMacra(): string;
    capitalize(): string;
    isCapitalized(): boolean;
  }
}

String.prototype.chop = function (length: number): string {
  return this.slice(0, -1 * length);
};

String.prototype.startsWithConsonant = function (): boolean {
  const first: string | undefined = this.at(0);
  return !!first && 'bcdfgklmnpqrstxz'.includes(first.toLowerCase());
};

String.prototype.startsWithVowel = function (): boolean {
  return !this.startsWithConsonant();
};

String.prototype.removeMacra = function (): string {
  if ([...this].some((letter) => apices.has(letter))) {
    let copy: String = this;
    apices.forEach((entry) => (copy = copy.replace(entry[0], entry[1])));
    return copy as string;
  } else {
    return this as string;
  }
};

String.prototype.capitalize = function (): string {
  return (this.at(0) ?? '').toUpperCase().concat(this.slice(1));
};

String.prototype.isCapitalized = function(): boolean {
  return /[A-ZĀĒĪŌȲ]/.test(this.at(0) ?? '');
}
