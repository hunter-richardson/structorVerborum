import TabulaRescripta from './rescripta';
import Nuntius from '../../miscella/nuntius';
import { Ignavum, Ultimum } from '../../miscella/usus';
import { Multiplex } from '../../praebeunda/verba';
import { Tabula } from '../tabula';
import { type Tabulator } from '../../praebeunda/interfecta';

@Ultimum @Ignavum @Nuntius.factum
export default class TabulaCircumfixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  constructor(private readonly praefixum: string,
              relata: Tabula<Hoc> | Tabulator<Hoc>,
              private readonly suffixum: string) {
    super(relata, (scriptum: string) => `${this.praefixum}${scriptum}${this.suffixum}`)
  }
}
