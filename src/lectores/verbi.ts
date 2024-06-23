import LectorVerbalis from './verbalis';
import Ignavum from '../miscella/ignavum';
import Nuntius from '../miscella/nuntius';
import type { Verbum } from '../praebeunda/verba';

@Nuntius.factum('LectorVerbi')
export class LectorVerbi extends LectorVerbalis<Verbum> {
  static se: Ignavum<LectorVerbi> = new Ignavum(() => new LectorVerbi())
  private constructor() {
    super('/res/lemmae/verba')
  }

  @Nuntius.futurus('LectorVerbi')
  override async omnia(): Promise<string[]> {
    const ordo: string[] = [];
    (await super.omnia()).forEach(async (lemma) => {
      const verbum: Verbum | null = await super.legatur(lemma);
      if (verbum) {
        ordo.push([verbum.categoria, verbum.scriptum].join('/'));
      }
    })

    return ordo;
  }
}
