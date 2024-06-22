import deepEqual from 'deep-equal'
import Tabula from './tabula'
import Ignavum from '../miscella/ignavum'
import Nuntius from '../miscella/nuntius'
import { Multiplex } from '../praebeunda/verba'
import { type Agendum } from '../praebeunda/agenda'

export function valedictor<Hoc extends Multiplex>(hoc: Hoc): Agendum<Hoc> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { scriptum: scriptum, categoria: categoria, ...valores } = hoc
  return valores as any
}

@Nuntius.factum('TabulaCollata')
export default class TabulaCollata<Hoc extends Multiplex> extends Tabula<Hoc> {
  private readonly _relatae: Ignavum<Tabula<Hoc>>[]

  constructor(...relatae: Ignavum<Tabula<Hoc>>[]) {
    super()
    this._relatae = relatae
  }

  @Nuntius.futurus('TabulaCollata')
  async plenetur(): Promise<void> {
    this._relatae.forEach(async (res) => {
      const ulla: Tabula<Hoc> = res.ipse()
      ;(await ulla.tabulentur()).forEach((hoc) => {
        if (this.tabula.none((illud) => deepEqual(valedictor(hoc), valedictor(illud)))) {
          this.tabula.push(hoc)
        }
      })
    })
  }
}
