import TabulaRescripta from './rescripta.ts';
import { Multiplex } from '../../praebeunda/verba.ts';

export default class TabulaCircumfixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  praefixum!: string
   suffixum!: string
  override rescriptor: (scriptum: string) => string = (scriptum: string) => `${this.praefixum}${scriptum}${this.suffixum}`
}
