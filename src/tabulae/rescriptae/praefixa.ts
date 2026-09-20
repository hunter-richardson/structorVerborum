import { Multiplex } from '../../praebeunda/verba';
import TabulaRescripta from './rescripta';

export default class TabulaPraefixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  praefixum!: string

  override rescriptor: (scriptum: string) => string = (scriptum: string) => `${this.praefixum}${scriptum}`
}
