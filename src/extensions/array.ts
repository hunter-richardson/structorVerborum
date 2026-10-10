import type { Comparator, SortResult } from './utils';

declare global {
  interface Array<T> {
    first(predicate?: (param: T) => boolean): T
    last(predicate?: (param: T) => boolean): T
    none (predicate?: (param: T) => boolean): boolean
    count(predicate?: (param: T) => boolean): number
    random(): T
    all(): boolean
    any(): boolean
    union(these: T[]): T[]
    intersection (withThese: T[]): T[]
    except (these: T[]): T[]
    excludes(these?: T): boolean
    sortRecursive(...comparators: Comparator<T>[]): T[]
    clear(): void
    unique(): T[]
} }

Array.prototype.first = function <T>(predicate?: (param: T) => boolean): T
{ return predicate !== undefined ? this.find(predicate) : this[0] }

Array.prototype.last = function <T>(predicate?: (param: T) => boolean): T | undefined {
  if(!predicate) return this[this.length - 1]
  for(let index = this.length - 1; index >= 0; index--)
  { if(predicate(this[index])) return this[index] }
  return undefined
}

Array.prototype.random = function<T> (): T
{ return this[Math.floor(Math.random() * this.length)] }

Array.prototype.none = function<T> (predicate?: (param: T) => boolean): boolean
{ return !(predicate ? this.some(predicate) : this.any()) }

Array.prototype.all = function (): boolean
//  eslint-disable-next-line no-extra-boolean-cast
{ return this.every((status) => !!status) }

Array.prototype.any = function (): boolean
//  eslint-disable-next-line no-extra-boolean-cast
{ return this.some((status) => !!status) }

Array.prototype.intersection = function <T> (withThese: T[]): T[]
{ return this.filter(value => withThese.includes(value)) }

Array.prototype.union = function<T> (these: T[]): T[]
{ return [...new Set([...this, ...these])] }

Array.prototype.except = function <T> (these: T[]): T[]
{ return this.filter(value => !these.includes(value)) }

Array.prototype.excludes = function<T>(these?: T): boolean
{ return !this.includes(these ?? []) }

Array.prototype.count = function<T>(predicate?: (param: T) => boolean): number {
  return predicate ? this.reduce((count: number, item: T): number =>
        count + (predicate(item) ? 1 : 0), 0) : this.length
}

Array.prototype.sortRecursive = function<T>(...comparators: Comparator<T>[]): T[] {
  const compare = (first: T, second: T): SortResult => {
    for(const comparator of comparators) {
      const result: SortResult = comparator(first, second)
      if(result !== 0) return result
    } return 0
  }; return this.sort(compare)
}

Array.prototype.clear = function() { this.length = 0 }

Array.prototype.unique = function<T>(): T[] { return [ ...new Set(this) ] }

// eslint-disable-next-line @typescript-eslint/no-useless-empty-export
export {}

