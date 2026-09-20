import { Multiplex } from '../praebeunda/verba';

export default abstract class Tabula<Hoc extends Multiplex> {
  private _vacua: boolean = true
  protected tabula: Hoc[] = []
  protected abstract plenetur(): Promise<void>

  async tabulentur(): Promise<Hoc[]> {
    if (this._vacua) {
      await this.plenetur().then(() => (this._vacua = false))
    }

    return this.tabula
  }
}
