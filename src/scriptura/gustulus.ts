interface Optanda {
  nuntium?: string
  vita?: number
  color?: string,
}

const Please = require('pleasejs');

export default class Gustulus {
  private _vita: number = 0
  public nuntium: string = ''
  public color: string = Please.make_color()
  public visibile: boolean = this._vita > 0

  public get vita() {
    return this._vita
  }

  public set vita(valor: number) {
    this.vita = valor
    this.visibile = this.vita > 0
  }
}
