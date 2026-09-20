import { Multiplex } from '../../praebeunda/verba';
import TabulaRescripta from './rescripta';

export default class TabulaSuffixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  suffixum!: string

  override rescriptor: (scriptum: string) => string = (scriptum: string) => `${scriptum}${this.suffixum}`

}
