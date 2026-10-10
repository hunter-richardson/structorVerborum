import equal from 'fast-deep-equal';
import isEqualWith from 'lodash.isequalwith';
import './array';
import './string';

export type Comparator<T> = (first: T, second: T) => SortResult

export type SortResult  = -1 | 0 | 1

type Extractor<T> = ((obj: T) => number) | ((obj: T) => string)

function compareResults<T extends number | string>(first: T, second: T): SortResult {
  if(typeof first === 'number' && typeof second === 'number')
      return Math.sign(first - second) as SortResult
  else if(typeof first === 'string' && typeof second === 'string')
      return first.compare(second)
  else throw TypeError('Types must match!')
}

type Customizer = NonNullable<Parameters<typeof isEqualWith>[ 2 ]>

export function comparison<T>(...extractors: Extractor<T>[]): Comparator<T> {
  return (first: T, second: T): SortResult => {
    for(const extractor of extractors) {
      const result: SortResult = compareResults(extractor(first), extractor(second))
      if(result !== 0) return result
    } return 0
} }

export function deepEqualExcept(objThis: unknown, objThat: unknown, ...keys: PropertyKey[]): boolean {
  if(keys.length > 0) {
    const ignored: Set<PropertyKey> = new Set(keys)
    const customizer: Customizer =
        (_: unknown, __: unknown, key: PropertyKey | undefined): true | undefined =>
            key !== undefined && ignored.has(key) || undefined
    return isEqualWith(objThis, objThat, customizer)
  } else return equal(objThis, objThat)
}

export function omit<T extends object, K extends keyof T> (obj: T, ...keys: K[]): Omit<T, K> {
  const result: T = { ...obj };
  keys.forEach(key => delete result[ key ]);
  return result as Omit<T, K>;
}
