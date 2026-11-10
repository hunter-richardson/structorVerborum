import { Ignavum, Ultimum } from '@/miscella/usus'
import { Verbum } from '@/praebeunda/verba'
import dominus from '@/miscella/dominus'
import Nuntius from '@/miscella/nuntius'
import '@/extensions/string'
import '@/extensions/array'

function interest<Illud extends string>(verbum: Verbum, ...illa: Illud[]): boolean {
  return illa.includes(verbum.scriptum as Illud)
}

@Ultimum
@Ignavum
@Nuntius.factum
class Locutor {
  private _verba: Verbum[] = []

  @Nuntius.captor
  get verba(): Verbum[] {
    return this._verba
  }
  get locutust(): boolean {
    return this._verba.length > 0
  }

  @Nuntius.modus
  addatur(verbum: Verbum): void {
    const praevium: Verbum | undefined = this._verba.last()
    if (praevium === undefined) return
    if (praevium.categoria.valor === 'praepositio') {
      if (verbum.scriptum.startsWithVowel) {
        if (interest(praevium, 'ab', 'ex')) {
          this.removeatur(praevium.unicum)
          switch (praevium.scriptum) {
            case 'ab':
              praevium.scriptum = 'ā'
              break
            case 'ex':
              praevium.scriptum = 'ē'
              break
          }
          this.addatur(praevium)
        }
      } else if (interest(praevium, 'ā', 'ē')) {
        this.removeatur(praevium.unicum)
        switch (praevium.scriptum) {
          case 'ā':
            praevium.scriptum = 'ab'
            break
          case 'ē':
            praevium.scriptum = 'ex'
            break
        }
        this.addatur(praevium)
      }
    }
  }

  loquitur(unicum: string): boolean {
    return this.verba.some((verbum) => verbum.unicum === unicum)
  }

  removeatur(unicum: string): string {
    this._verba = this._verba.filter((verba) => verba.unicum !== unicum)
    return this.locutio
  }

  get locutio(): string {
    const locutio: string = this.verba
      .map((verba) => verba.monstretur())
      .join(dominus.separator.signum)
    return locutio[dominus.magnas.signum ? 'uppercase' : 'capitalized']
  }
}

export default new Locutor()
