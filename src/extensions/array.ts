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
  }
}

Array.prototype.first = function <T>(predicate?: (param: T) => boolean): T {
  if (predicate) {
    const copy: T[] = this.filter(predicate)
    return copy[0]
  } else return this[0]
}

Array.prototype.last = function <T>(predicate?: (param: T) => boolean): T {
  if (predicate) {
    const copy: T[] = this.filter(predicate)
    return copy[copy.length - 1]
  } else return this[this.length - 1]
}

Array.prototype.random = function<T> (): T
{ return this[Math.floor(Math.random() * this.length)] }

Array.prototype.none = function<T> (predicate?: (param: T) => boolean): boolean
{ return !(predicate ? this.some(predicate) : this.any()) }

//  eslint-disable-next-line no-extra-boolean-cast
Array.prototype.all = function (): boolean
{ return this.every((status) => !!status) }

//  eslint-disable-next-line no-extra-boolean-cast
Array.prototype.any = function (): boolean
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

// eslint-disable-next-line @typescript-eslint/no-useless-empty-export
export {}

