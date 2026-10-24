import '@/extensions/array';
import { type SortResult } from '@/extensions/utils';

const macra = {
  A: 'Ā',
  E: 'Ē',
  I: 'Ī',
  O: 'Ō',
  U: 'Ū',
  V: 'V̄',
  Y: 'Ȳ',
  a: 'ā',
  e: 'ē',
  i: 'ī',
  o: 'ō',
  u: 'ū',
  v: 'v̄',
  y: 'ȳ'
} as const

declare global {
  interface String {
    get empty(): boolean
    get startsWithConsonant (): boolean
    get startsWithVowel (): boolean
    get removeMacra (): string
    get lowercase(): string
    get uppercase(): string
    get capitalized (): string
    get isCapitalized (): boolean

    chop(length: number): string
    compare(other: string): SortResult
} }

String.prototype.chop = function (length: number): string { return this.slice(0, -1 * length) }

String.prototype.compare = function (other: string): SortResult { return Math.sign(new Intl.Collator().compare(`${this}`, other)) as SortResult; }

Object.defineProperty(String.prototype, 'empty', {
  configurable: true, enumerable: false,
  get: function(): boolean { return this.length === 0 }
})

Object.defineProperty(String.prototype, 'lowercase', {
  configurable: true, enumerable: false,
  get: function(): string { return this.toLowerCase() }
})

Object.defineProperty(String.prototype, 'uppercase', {
  configurable: true, enumerable: false,
  get: function(): string { return this.toUpperCase() }
})

Object.defineProperty(String.prototype, 'capitalized', {
  configurable: true, enumerable: false,
  get: function(): string {
    if(this.empty) return ''
    return `${this[0].uppercase}${this.slice(1).lowercase}`
  }
})

Object.defineProperty(String.prototype, 'isCapitalized', {
  configurable: true, enumerable: false,
  get: function(): boolean
  { return !this.empty && this[0] !== this[0].lowercase }
})

Object.defineProperty(String.prototype, 'startsWithConsonant', {
  configurable: true, enumerable: false,
  get: function(): boolean {
    if(this.empty) return false
    const first: string = this[0].lowercase
    if('ij'.includes(first)) return this.slice(1).startsWithConsonant
    else if('bcdfgklmnpqrstxz'.includes(first)) return true
    else return true
  }
})

Object.defineProperty(String.prototype, 'startsWithVowel', {
  configurable: true, enumerable: false,
  get: function(): boolean
  { return !this.empty && !this.startsWithConsonant }
})

Object.defineProperty(String.prototype, 'removeMacra', {
  configurable: true, enumerable: false,
  get: function(): string {
    if ([ ...this ].intersection(Object.values(macra)).any) {
      // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types, @typescript-eslint/no-this-alias -- This allows copying the string
      let copy: String = this;  //  nosonar: This allows copying the string
      (Object.entries(macra))
        .forEach(([ key, value ]: [ string, string ]) =>
          { copy = copy.replace(value, key); });
      return copy as string;
    } else return this as string
  }
})

export {}

