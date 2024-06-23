import { Multiplex } from '../praebeunda/verba';

export default abstract class Tabula<Hoc extends Multiplex> {
  private _vacua: boolean;
  protected tabula: Hoc[];
  protected abstract plenetur(): Promise<void>;

  constructor() {
    this.tabula = [];
    this._vacua = true;
  }

  async tabulentur(): Promise<Hoc[]> {
    if (this._vacua) {
      await this.plenetur().then(() => (this._vacua = false));
    }

    return this.tabula;
  }
}
