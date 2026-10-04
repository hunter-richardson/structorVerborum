import TabulaRescripta from './rescripta';
import { Multiplex } from '../../praebeunda/verba';

export default class TabulaSuffixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  suffixum!: string

  override rescriptor: (scriptum: string) => string = (scriptum: string) => `${scriptum}${this.suffixum}`

}
