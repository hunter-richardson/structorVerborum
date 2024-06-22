type Generator<Hoc> = () => Hoc
export default class Ignavum<Hoc> {
  private _se?: Hoc
  private readonly _generator: Generator<Hoc>
  constructor(generator: Generator<Hoc>) {
    this._generator = generator
  }

  ipse(): Hoc {
    return this._se ?? (this._se = this._generator())
  }
}
