import { LectorVerbalis } from './verbalis.ts';
import Ignavum from '../miscella/ignavum.ts';
import Nuntius from '../miscella/nuntius.ts';
import { type Verbum } from '../praebeunda/verba.ts';

@Nuntius.factum('LectorVerbi')
class LectorVerbi extends LectorVerbalis<Verbum> {
  @Nuntius.promittum('LectorVerbi')
  override async omnia(): Promise<string[]> {
    const ordo: string[] = [];
    (await super.omnia()).forEach(async (lemma) => {
      const verbum: Verbum | undefined = await super.legatur(lemma)
      if (verbum) ordo.push([verbum.categoria, verbum.scriptum].join('/'))
    }); return ordo
  }
}

export const verborum = new Ignavum(LectorVerbi, { scapum: '/res/lemmae/verba' })
