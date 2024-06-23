import TabulaRescripta from './rescripta';
import Ignavum from '../../miscella/ignavum';
import { Multiplex } from '../../praebeunda/verba';
import Tabula from '../tabula';

type Optanda<Hoc extends Multiplex> = {
  relata: Ignavum<Tabula<Hoc>>,
  praefixum: string
};

export default class TabulaPraefixa<Hoc extends Multiplex> extends TabulaRescripta<Hoc> {
  constructor(optanda: Optanda<Hoc>) {
    super({
      relata: optanda.relata,
      rescriptor: (scriptum: string): string => optanda.praefixum.concat(scriptum)
    });
  }
}
