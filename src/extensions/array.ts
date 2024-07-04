export {  }

declare global {
  interface Array<T> {
    first(predicate?: (param: any) => boolean): T;
    last(predicate?: (param: any) => boolean): T;
    random(): T;
    none(predicate?: (param: any) => boolean): boolean;
    all(): boolean;
    any(): boolean;
    intersection (withThese: T[]): T[];
    except (these: T[]): T[];
  }
}

Array.prototype.first = function <T>(predicate?: (param: any) => boolean): T {
  if (predicate) {
    const copy: T[] = this.filter(predicate);
    return copy[0];
  } else {
    return this[0];
  }
};

Array.prototype.last = function <T>(predicate?: (param: any) => boolean): T {
  if (predicate) {
    const copy: T[] = this.filter(predicate);
    return copy.at(-1) ?? copy[this.length - 1];
  } else {
    return this.at(-1) ?? this[this.length - 1];
  }
};

Array.prototype.random = function (): any {
  return this[Math.floor(Math.random() * this.length)];
}

Array.prototype.none = function (predicate?: (param: any) => boolean): boolean {
  if (predicate) {
    return !this.some(predicate);
  } else {
    return !this.some((status) => !!status);
  }
};

Array.prototype.all = function (): boolean {
  return this.every((status) => !!status);
};

Array.prototype.any = function (): boolean {
  return this.some((status) => !!status);
};

Array.prototype.intersection = function <T> (withThese: T[]): T[] {
  return this.filter(value => withThese.includes(value));
};

Array.prototype.except = function <T> (these: T[]): T[] {
  return this.filter(value => !these.includes(value));
};
