import { Ultimum } from '../miscella/usus.ts';

@Ultimum export class NumberRange {
  min (): number { return Math.min(this.num1, this.num2); }
  max (): number { return Math.max(this.num1, this.num2); }
  in (value: number): boolean { return value >= this.min() && value <= this.max(); }
  clamp (value: number): number { return Math.min(Math.max(value, this.min()), this.max()); }
  constructor (public readonly num1: number, public readonly num2: number) { }
}
