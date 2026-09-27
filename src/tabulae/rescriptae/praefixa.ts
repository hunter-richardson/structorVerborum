import TabulaRescripta from './rescripta.ts';
import { Multiplex } from '../../praebeunda/verba.ts';

export default class TabulaPraefixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  praefixum!: string

  override rescriptor: (scriptum: string) => string = (scriptum: string) => `${this.praefixum}${scriptum}`
}
