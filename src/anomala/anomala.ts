import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import { Tabulator } from '../praebeunda/interfecta';
import { Multiplex } from '../praebeunda/verba';
import { Tabula } from '../tabulae/tabula';

@Ignavum @Ultimum @Nuntius.factum
export class Mantela<Hoc extends Multiplex> implements Tabulator<Hoc> {
  constructor(private readonly _tabula: Tabula<Hoc>) {}
  get tabula(): Tabula<Hoc> { return this._tabula }
}

export default abstract class Anomala<Hoc extends Multiplex> {
  protected readonly contenta: Record<string, Tabulator<Hoc>> = {}
  protected abstract numeretur(): Promise<void>
  abstract get omnia(): Promise<string[]>

  @Nuntius.promittum async feratur(lemma: string): Promise<Tabulator<Hoc> | undefined> {
    if (!this.contenta) await this.numeretur()
    else if(!(lemma in this.contenta)) return undefined
    return this.contenta[lemma]
  }
}
