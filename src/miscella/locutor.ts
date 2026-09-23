import { crustula } from './crustula';
import Ignavum from './ignavum';
import Nuntius from './nuntius';
import { Verbum } from '../praebeunda/verba';

@Nuntius.factum('Locutor')
export class Locutor {

  private _verba: Verbum[] = []
  private    apices?: boolean
  private   utendaU?: boolean
  private    magnas?: boolean
  private separator?: string

  constructor() { this.veliferum() }

  locutust(): boolean { return this._verba.length > 0 }

  private veliferum(): void {
    this.apices = crustula.hoc().apices.concoctast('ita')
    this.utendaU = crustula.hoc().utendaU.concoctast('ita')
    this.magnas = crustula.hoc().magnas.concoctast('ita')
    this.separator = (crustula.hoc().separator.signetur() as string | undefined) ?? ' '
  }

  get verba(): Verbum[] { return this._verba }

  @Nuntius.modus('Locutor')
  addatur(verbum: Verbum): void {
    const praevium: Verbum = this._verba.last()
    if (praevium.categoria === 'praepositio') {
      if(verbum.scriptum.startsWithVowel()){
        const adaequatur: boolean = (/^(ab|ex)$/iu).test(praevium.scriptum)
        if(adaequatur) {
          this.removeatur(praevium.unicum)
          switch(praevium.scriptum) {
            case 'ab': praevium.scriptum = 'ā'; break
            case 'ex': praevium.scriptum = 'ē'; break
          } this.addatur(praevium)
        } else {
          const adaequatur: boolean = (/^(ā|ē)$/iu).test(praevium.scriptum)
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

    this.veliferum()
    if (this.utendaU) {
      if (['Ū', 'U', 'ū', 'u'].some((littera) => verbum.scriptum.includes(littera))) {
        verbum.scriptum = verbum.scriptum.replace('Ū', 'V')
        verbum.scriptum = verbum.scriptum.replace('U', 'V')
        verbum.scriptum = verbum.scriptum.replace('ū', 'v')
        verbum.scriptum = verbum.scriptum.replace('u', 'v')
      }
    }

    if (!this.apices) verbum.scriptum = verbum.scriptum.removeMacra()
    this._verba.push(verbum)
  }

  loquitur(unicum: symbol): boolean { return this.verba.some((verbum) => verbum.unicum === unicum) }

  removeatur(unicum: symbol): string {
    this._verba = this._verba.filter((verba) => verba.unicum !== unicum)
    return this.scribantur()
  }

  scribantur(): string {
    this.veliferum()
    const locutio: string = this.verba.map((verba) => verba.scriptum).join(this.separator)
    return locutio[this.magnas ? 'toUpperCase' : 'capitalize']()
  }
}

export const locutor = new Ignavum(Locutor)
