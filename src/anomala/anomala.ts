import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import { Multiplex } from '../praebeunda/verba';
import type { Faciendum } from '../praebeunda/interfecta';
import type Tabula from '../tabulae/tabula';

export class Mantela<Hoc extends Multiplex> implements Faciendum<Hoc> {
  private readonly _tabula: Ignavum<Tabula<Hoc>>;
  constructor (tabula: Ignavum<Tabula<Hoc>>) {
    this._tabula = tabula;
  }

  putetur (): Tabula<Hoc> {
    return this._tabula.ipse();
  }
}

export default abstract class Anomala<Hoc extends Multiplex> implements Disposable {
  protected readonly contenta: Map<string, Mantela<Hoc>> = new Map;
  protected abstract numeretur (): Promise<void>;

  @Nuntius.futurus('Anomala')
  async omnia (): Promise<string[]> {
    if (!this.contenta.size) {
      this.numeretur();
    }

    return [ ...this.contenta.keys() ].sort();
  }

  @Nuntius.futurus('Anomala')
  async feratur (lemma: string): Promise<Mantela<Hoc> | undefined> {
    if (!this.contenta.size) {
      this.numeretur();
    }

    return this.contenta.get(lemma);
  }

  @Nuntius.finitus('Anomala')
  [ Symbol.dispose ] (): void {
    this.contenta.clear();
  }
}
