import Tabula from './tabula'
import { referenda } from '../miscella/enumerationes'
import Nuntius from '../miscella/nuntius'
import { NumeramenAgendum } from '../praebeunda/agenda'
import { Numeramen } from '../praebeunda/verba'

@Nuntius.factum('TabulaNumeraminis')
export default class TabulaNumeraminis extends Tabula<Numeramen> {
  private readonly _agendum: NumeramenAgendum

  constructor(agendum: NumeramenAgendum) {
    super()
    this._agendum = agendum
  }

  @Nuntius.futurus('TabulaNumeraminis')
  async plenetur(): Promise<void> {
    referenda.forEach((referendum) => {
      let scriptum: string = ''
      switch (referendum) {
        case 'numerus':
          scriptum = this._agendum.numerus
          break
        case 'ordinale':
          scriptum = this._agendum.ordinale
          break
        case 'cardinale':
          scriptum = this._agendum.cardinale
          break
        case 'adverbium':
          scriptum = this._agendum.adverbium
          break
        case 'multiplicativum':
          scriptum = this._agendum.multiplicativum
          break
        case 'distributivum':
          scriptum = this._agendum.distributivum
          break
        case 'fractionale':
          scriptum = this._agendum.fractionale
          break
      }

      if (scriptum) {
        this.tabula.push(
          Object.assign({}, {
            referendum: referendum,
            scriptum: scriptum
          } as any)
        )
      }
    })
  }
}
