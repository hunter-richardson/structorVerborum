type Generator<Hoc> = () => Hoc;
type Actio<Hoc> = (hoc: Hoc) => void;

export default class Structor<Hoc extends object> {
  private readonly _actiones: Actio<Hoc>[] = [];
  private readonly _generator: Generator<Hoc>;

  constructor(generator: Generator<Hoc>) {
    this._generator = generator;
  }

  ponatur(actio: Actio<Hoc>): Structor<Hoc> {
    this._actiones.push(actio);
    return this;
  }

  struatur(): Hoc {
    const hoc: Hoc = this._generator();
    this._actiones.forEach((actio) => actio(hoc));
    return hoc;
  }
}
