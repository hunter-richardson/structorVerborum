type Actio<Hoc> = (hoc: Hoc) => void

export default class Structor<Hoc extends ([keyof Hoc] extends never ? never : object)> {
  private readonly _actiones: Actio<Hoc>[] = []

  constructor(private readonly _structor: new() => Hoc) {}

  ponatur(actio: Actio<Hoc>): Structor<Hoc> {
    this._actiones.push(actio)
    return this
  }

  struatur(): Hoc {
    const hoc: Hoc = new this._structor()
    this._actiones.forEach((actio) => actio(hoc))
    return hoc
  }
}
