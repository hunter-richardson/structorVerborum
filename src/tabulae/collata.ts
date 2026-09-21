import deepEqual from 'deep-equal';
import type Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import { type Agendum } from '../praebeunda/agenda';
import { type Faciendum } from '../praebeunda/interfecta';
import type Structor from '../praebeunda/structor';
import { Multiplex } from '../praebeunda/verba';
import Tabula from './tabula';

export function valedictor<Hoc extends Multiplex>(hoc: Hoc): Agendum<Hoc> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { scriptum: scriptum, categoria: categoria, ...valores } = hoc
  return valores as any
}

type Relata<Hoc extends Multiplex> = Ignavum<Tabula<Hoc>> | Structor<Faciendum<Hoc>> | undefined

@Nuntius.factum('TabulaCollata')
export default class TabulaCollata<Hoc extends Multiplex> extends Tabula<Hoc> {
  public relatae!: (Relata<Hoc>)[]

  #structorest (relata: Relata<Hoc>): relata is Structor<Faciendum<Hoc>> {
    return typeof (relata as any).struatur === 'function'
  }

  #ignavust (relata: Relata<Hoc>): relata is Ignavum<Tabula<Hoc>> {
    return typeof (relata as any).hoc === 'function'
  }

  @Nuntius.futurus('TabulaCollata')
  async plenetur(): Promise<void> {
    this.relatae.forEach(async (relata) => {
      if(this.#structorest(relata)) relata = relata.struatur().putetur()
      if(this.#ignavust(relata))
        (await relata.hoc().tabulentur()).forEach((hoc: Hoc) => {
          if (this.tabula.none((illud) => deepEqual(valedictor(hoc), valedictor(illud)))) this.tabula.push(hoc)
        })
    })
  }
}
