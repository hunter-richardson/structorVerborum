import { LectorVerbalis } from './verbalis';
import Nuntius from '../miscella/nuntius';
import { Ignavum, Ultimum } from '../miscella/usus';
import { type Verbum } from '../praebeunda/verba';

@Ultimum @Ignavum @Nuntius.factum
class LectorVerbi extends LectorVerbalis<Verbum> {
  @Nuntius.promittum
  override async omnia(): Promise<string[]> {
    const ordo: string[] = [];
    (await super.omnia()).forEach(async (lemma) => {
      const verba: Verbum[] = await super.legatur(lemma)
      verba.forEach((verbum) =>
          ordo.push([verbum.categoria.valor, verbum.scriptum].join('/')))
    }); return ordo
  }
}

export const verborum: LectorVerbi = new LectorVerbi('/res/lemmae/verba')
