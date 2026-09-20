import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import { type Verbum } from '../praebeunda/verba';
import { LectorVerbalis } from './verbalis';

@Nuntius.factum('LectorVerbi')
class LectorVerbi extends LectorVerbalis<Verbum> {
  @Nuntius.futurus('LectorVerbi')
  override async omnia(): Promise<string[]> {
    const ordo: string[] = [];
    (await super.omnia()).forEach(async (lemma) => {
      const verbum: Verbum | undefined = await super.legatur(lemma)
      if (verbum) {
        ordo.push([verbum.categoria, verbum.scriptum].join('/'))
      }
    })

    return ordo
  }
}

export const verborum = new Ignavum(LectorVerbi, {
                              scapum: '/res/lemmae/verba'
                            })
