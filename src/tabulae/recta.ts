import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import type { Colamen, Positor } from '../praebeunda/agenda';
import { type Faciendum } from '../praebeunda/interfecta';
import { Multiplex } from '../praebeunda/verba';
import TabulaScapalis from './scapalis';
import Tabula from './tabula';

type Radicator<Hoc, Illud> = (hoc: Hoc, colamen: Colamen<Illud>) => string

@Nuntius.factum('TabulaRecta')
export default class TabulaRecta<Hoc extends Faciendum<Illud>, Illud extends Multiplex> extends Tabula<Illud> {
  radicator!: Radicator<Hoc, Illud>
  positor!: Positor<Illud>
  scapum!: string
  via!: string
  hoc!: Hoc

  @Nuntius.futurus('TabulaRecta')
  async plenetur(): Promise<void> {
    const scapalis: Ignavum<TabulaScapalis<Illud>> =
                new Ignavum(TabulaScapalis, {
                      positor: this.positor as Positor<Multiplex>,
                      scapum: this.scapum,
                      via: this.via
                    })

    this.tabula = (await scapalis.hoc().tabulentur()).map((illud) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { scriptum, categoria, ...valores } = illud
      illud.scriptum = `${this.radicator(this.hoc, valores as any)}${scriptum}`
      return illud
    })
  }
}
