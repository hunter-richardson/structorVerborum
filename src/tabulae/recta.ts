import TabulaScapalis from './scapalis';
import Tabula from './tabula';
import Nuntius from '../miscella/nuntius';
import Ignavum from '../miscella/usus';
import { Multiplex } from '../praebeunda/verba';
import { type Faciendum } from '../praebeunda/interfecta';

type Radicator<Hoc, Illud> = (hoc: Hoc, colamen: Colamen<Illud>) => string

@Nuntius.factum
export default class TabulaRecta<Hoc extends Faciendum<Illud>, Illud extends Multiplex> extends Tabula<Illud> {
  radicator!: Radicator<Hoc, Illud>
  scapum!: string
  via!: string
  hoc!: Hoc

  @Nuntius.promittum
  async plenetur(): Promise<void> {
    const scapalis: Ignavum<TabulaScapalis<Illud>> =
                new Ignavum(TabulaScapalis, {
                      scapum: this.scapum,
                      via: this.via
                    })

    this.tabula = (await scapalis.hoc.tabulentur()).map((illud) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { scriptum, categoria, ...valores } = illud
      illud.scriptum = `${this.radicator(this.hoc, valores as any)}${scriptum}`
      return illud
    })
  }
}
