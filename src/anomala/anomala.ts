import Nuntius from '../miscella/nuntius';
import { Multiplex } from '../praebeunda/verba';
import { Tabula } from '../tabulae/tabula';
import { type Faciendum } from '../praebeunda/interfecta';

export class Mantela<Hoc extends Multiplex> implements Faciendum<Hoc> {
  constructor(private readonly _tabula: Tabula<Hoc>) {}
  putetur(): Tabula<Hoc> { return this._tabula }
}

export default abstract class Anomala<Hoc extends Multiplex> implements Disposable {
  protected readonly contenta: Map<string, Mantela<Hoc>> = new Map
  protected abstract numeretur(): Promise<void>

  @Nuntius.promittum
  async omnia(): Promise<string[]> {
    if (!this.contenta.size) this.numeretur()
    return [...this.contenta.keys()].sort()
  }

  @Nuntius.promittum
  async feratur(lemma: string): Promise<Mantela<Hoc> | undefined> {
    if (!this.contenta.size) this.numeretur()
    return this.contenta.get(lemma)
  }

  @Nuntius.exutor
  [Symbol.dispose](): void { this.contenta.clear() }
}
