import Ignavum from '../miscella/ignavum.ts';
import Nuntius from '../miscella/nuntius.ts';
import { Multiplex } from '../praebeunda/verba.ts';
import { type Faciendum } from '../praebeunda/interfecta.ts';
import type Tabula from '../tabulae/tabula.ts';

export class Mantela<Hoc extends Multiplex> implements Faciendum<Hoc> {
  constructor(private readonly _tabula: Ignavum<Tabula<Hoc>>) {}
  putetur(): Ignavum<Tabula<Hoc>> { return this._tabula }
}

export default abstract class Anomala<Hoc extends Multiplex> implements Disposable {
  protected readonly contenta: Map<string, Mantela<Hoc>> = new Map
  protected abstract numeretur(): Promise<void>

  @Nuntius.futurus('Anomala')
  async omnia(): Promise<string[]> {
    if (!this.contenta.size) this.numeretur()
    return [...this.contenta.keys()].sort()
  }

  @Nuntius.futurus('Anomala')
  async feratur(lemma: string): Promise<Mantela<Hoc> | undefined> {
    if (!this.contenta.size) this.numeretur()
    return this.contenta.get(lemma)
  }

  @Nuntius.finitus('Anomala')
  [Symbol.dispose](): void { this.contenta.clear() }
}
