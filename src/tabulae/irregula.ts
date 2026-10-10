import path from 'path';
import { Tabula } from './tabula';
import i18n from '../i18n';
import { LectorMultiplex } from '../miscella/lector';
import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import { Agendum, Multiplex } from '../praebeunda/verba';

@Ignavum @Ultimum @Nuntius.factum export default class TabulaIrregula<Hoc extends Multiplex> extends Tabula<Hoc> {
  @Nuntius.promittum async tabulentur() {
    const categoria: string = this.structor.name.toLowerCase()
    const pluralis: string = i18n.t(`partes.${categoria}_pluralis`, { lng: 'la' })
    const via: string = path.join('tabulae/irregulae', pluralis)
    const agenda: Agendum<Hoc>[] = (await new LectorMultiplex<Agendum<Hoc>>(via, this.structor).legatur(this.lemma)).multa
    agenda.forEach((agendum) => this._haec.push(Multiplex.componatur(this.structor, agendum)))
  }

  constructor(private readonly structor: new () => Hoc,
              private readonly lemma: string)
  { super(); this.tabulentur() }
}
