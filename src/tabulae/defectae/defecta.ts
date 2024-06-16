import Ignavum from '../../miscella/ignavum';
import Nuntius from '../../miscella/nuntius';
import { Multiplex } from '../../praebeunda/verba';
import Tabula from '../tabula';
import { type Percolamen } from '../../praebeunda/agenda';

@Nuntius.factum('TabulaDefecta')
export default abstract class TabulaDefecta<Hoc extends Multiplex> extends Tabula<Hoc> {
  private readonly _relata: Ignavum<Tabula<Hoc>>;

  protected abstract referatur (colamen: Percolamen<Hoc>): Percolamen<Hoc> | null;

  constructor (relata: Ignavum<Tabula<Hoc>>) {
    super();
    this._relata = relata;
  }

  @Nuntius.futurus('TabulaDefecta')
  async plenetur (): Promise<void> {
    const relata: Tabula<Hoc> = this._relata.ipse();
    (await relata.tabulentur()).forEach(hoc => {
      const { scriptum, categoria, ...ista } = hoc;
      const illa: Percolamen<Hoc> | null = this.referatur(ista as any);
      if (illa) {
        this.tabula.push({
          ...illa,
          scriptum, categoria
        } as Hoc);
      }
    });
  }
}
