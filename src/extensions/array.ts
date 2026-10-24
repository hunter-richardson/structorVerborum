import type { Comparator, SortResult } from '@/extensions/utils';

declare global {
  interface Array<T> {
    get empty(): boolean
    get random(): T
    get all(): boolean
    get any(): boolean
    get unique(): T[]

    first(predicate?: (param: T) => boolean): T | undefined
    last(predicate?: (param: T) => boolean): T | undefined
    none (predicate?: (param: T) => boolean): boolean
    count(predicate?: (param: T) => boolean): number
    union(...these: T[]): T[]
    intersection (these: T[]): T[]
    except (...these: T[]): T[]
    excludes(these?: T): boolean
    sortRecursive(...comparators: Comparator<T>[]): T[]
    clear(): void
} }

Array.prototype.first = function<T>(predicate?: (param: T) => boolean): T | undefined
{ return predicate === undefined ? this[0] : this.find(predicate) }

Array.prototype.last = function<T>(predicate?: (param: T) => boolean): T | undefined {
  if(!predicate) return this[this.length - 1]
  for(let index = this.length - 1; index >= 0; index--)
  { if(predicate(this[index])) return this[index] }
  return undefined
}

Array.prototype.none = function<T> (predicate?: (param: T) => boolean): boolean
{ return !(predicate ? this.some(predicate) : this.any) }

Array.prototype.intersection = function<T> (these: T[]): T[]
{ return this.filter((value: T) => these.includes(value)) }

Array.prototype.union = function <T> (these: T[]): T[]
{ return [...new Set([ ...this, ...these ])] }

Array.prototype.except = function <T> (...these: T[]): T[]
{ return this.filter((value: T) => !these.includes(value)) }

Array.prototype.excludes = function<T>(that?: T): boolean
{ return that === undefined || !this.includes(that) }

Array.prototype.count = function<T>(predicate?: (param: T) => boolean): number {
  return predicate ? this.reduce((count: number, item: T): number =>
        count + (predicate(item) ? 1 : 0), 0) : this.length
}

Array.prototype.sortRecursive = function <T> (...comparators: Comparator<T>[]): T[] {
  const compare = (first: T, second: T): SortResult => {
    for(const comparator of comparators) {
      const result: SortResult = comparator(first, second)
      if(result !== 0) return result
    } return 0
  }; return this.sort(compare)
}

Array.prototype.clear = function() { this.length = 0 }

Object.defineProperty(Array.prototype, 'empty', {
  configurable: true, enumerable: false,
  get: function(): boolean { return this.length === 0 }
})

Object.defineProperty(Array.prototype, 'random', {
  configurable: true, enumerable: false,
  get: function<T>(): T
  { return this[ Math.floor(Math.random() * this.length) ] }  //  nosonar: Math.random is safe here; this is for general array picking
})

Object.defineProperty(Array.prototype, 'all', {
  configurable: true, enumerable: false,
  get: function<T>(): boolean
  { return this.every((value: T) => !!value) }
})

Object.defineProperty(Array.prototype, 'any', {
  configurable: true, enumerable: false,
  get: function<T>(): boolean
  { return this.some((value: T)=> !!value) }
})

Object.defineProperty(Array.prototype, 'unique', {
  configurable: true, enumerable: false,
  get: function<T>(): T[]
  { return [ ...new Set(this) ] as T[] }
})

export {}

