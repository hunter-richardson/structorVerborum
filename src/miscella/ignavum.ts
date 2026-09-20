type Ista<Hoc> = {
  [ Clavis in keyof Hoc]: [Clavis, Hoc[Clavis]]
}[keyof Hoc][]

export default class Ignavum<Hoc extends ([keyof Hoc] extends never ? never : object)> {
  private _hoc?: Hoc

  constructor(private readonly _structor: new() => Hoc,
              private readonly _ista?: Partial<Hoc>) {}

  #ista(hoc: Hoc): Ista<Hoc> {
    if(!this._ista) { return [] }
    return (Object.entries(this._ista) as Ista<Hoc>)
                  .filter(([, valor]) => valor != null && valor != undefined)
                  .filter(([clavis, ]) => hoc[clavis] === undefined)
  }

  structum(): boolean {
    return !!this._hoc
  }

  hoc(): Hoc {
    if(!this._hoc) {
      const illud: Hoc = new this._structor
      for(const [ clavis, valor ] of this.#ista(illud)) {
        (illud as any)[ clavis ] = valor
      } this._hoc = illud
    } return this._hoc
  }
}
