import '../extensions/array';
import '../extensions/string';
import { Verbum } from '../praebeunda/verba';
import { dominus } from './dominus';
import Ignavum from './ignavum';
import Nuntius from './nuntius';

@Nuntius.factum('Locutor')
export class Locutor {

  private _verba: Verbum[] = []

  locutust(): boolean { return this._verba.length > 0 }

  get verba(): Verbum[] { return this._verba }

  @Nuntius.modus('Locutor')
  addatur(verbum: Verbum): void {
    const praevium: Verbum = this._verba.last()
    if (praevium.categoria === 'praepositio') {
      if(verbum.scriptum.startsWithVowel()){
        const adaequatur: boolean = /^(ab|ex)$/iu.test(praevium.scriptum)
        if(adaequatur) {
          this.removeatur(praevium.unicum)
          switch(praevium.scriptum) {
            case 'ab': praevium.scriptum = 'ā'; break
            case 'ex': praevium.scriptum = 'ē'; break
          } this.addatur(praevium)
        } else {
          const adaequatur: boolean = /^(ā|ē)$/iu.test(praevium.scriptum)
          if (adaequatur) {
            this.removeatur(praevium.unicum)
            switch (praevium.scriptum) {
              case 'ā': praevium.scriptum = 'ab'; break
              case 'ē': praevium.scriptum = 'ex'; break
            } this.addatur(praevium)
          }
        }
      }
    }
  }

  loquitur(unicum: symbol): boolean { return this.verba.some((verbum) => verbum.unicum === unicum) }

  removeatur(unicum: symbol): string {
    this._verba = this._verba.filter((verba) => verba.unicum !== unicum)
    return this.scribantur()
  }

  scribantur(): string {
    const locutio: string = this.verba.map((verba) => verba.monstretur()).join(dominus.hoc().separator.signetur())
    return locutio[dominus.hoc().magnas.signetur() ? 'toUpperCase' : 'capitalize']()
  }
}

export const locutor = new Ignavum(Locutor)
