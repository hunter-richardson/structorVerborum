import { Multiplex } from '../../praebeunda/verba';
import TabulaRescripta from './rescripta';

export default class TabulaCircumfixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  praefixum!: string
  suffixum!: string
  override rescriptor: (scriptum: string) => string = (scriptum: string) => `${this.praefixum}${scriptum}${this.suffixum}`
}
