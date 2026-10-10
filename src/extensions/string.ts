import './array';
import type { SortResult } from './utils';

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
    chop(length: number): string
    empty (): boolean
    startsWithConsonant(): boolean
    startsWithVowel(): boolean
    removeMacra(): string
    capitalize(): string
    isCapitalized(): boolean
    compare(other: string): SortResult
} }

String.prototype.chop = function (length: number): string { return this.slice(0, -1 * length) }

String.prototype.empty = function (): boolean { return this.length === 0 }

String.prototype.startsWithConsonant = function (): boolean {
  const first: string | undefined = this[ 0 ]
  return first !== undefined && 'bcdfgklmnpqrstxz'.includes(first.toLowerCase())
}

String.prototype.startsWithVowel = function (): boolean {
  const first: string | undefined = this[ 0 ];
  return first !== undefined && 'aeiouy'.includes(first.toLowerCase());
}

String.prototype.removeMacra = function (): string {
  if ([ ...this ].intersection(Object.values(macra)).any()) {
    // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types, @typescript-eslint/no-this-alias
    let copy: String = this;
    (Object.entries(macra))
        .forEach(([key, value]: [string, string]) => { copy = copy.replace(value, key) });
    return copy as string
  } else return this as string
}

String.prototype.capitalize = function (): string
{ return this.empty() ? '' : `${this[0].toUpperCase()}${this.slice(1)}` }

String.prototype.isCapitalized = function(): boolean
{ return !this.empty() && /[A-ZĀĒĪŌȲ]/.test(this[0]) }

String.prototype.compare = function(other: string): SortResult
{ return Math.sign(new Intl.Collator().compare(`${this}`, other)) as SortResult }

// eslint-disable-next-line @typescript-eslint/no-useless-empty-export
export {}

