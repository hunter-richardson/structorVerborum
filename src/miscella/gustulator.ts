import { setTimeout } from 'node:timers/promises'
import { Ignavum, Ultimum } from '@/miscella/usus'
import Structor from '@/praebeunda/structor'
import Nuntius from '@/miscella/nuntius'

export class Gustulus {
  vita!: number
  nuntium!: string
  color!: string

  get visibile(): boolean {
    return this.vita > 0
  }
}

type Gustulamen = Omit<Gustulus, 'color' | 'vita' | 'visibile'> &
  Partial<Pick<Gustulus, 'vita'>> & { error: boolean }

@Ignavum
@Ultimum
@Nuntius.factum
class Gustulator {
  private _gustulus?: Gustulus
  get gustulus(): Gustulus | undefined {
    return this._gustulus
  }

  private extricetur() {
    this._gustulus = undefined
  }

  #gustulust(valor: Gustulus | Gustulamen): valor is Gustulus {
    return 'vita' in valor
  }

  #gustulamenust(valor: Gustulus | Gustulamen): valor is Gustulamen {
    return 'error' in valor
  }

  async proponatur(gustulamen: Gustulamen): Promise<void>
  async proponatur(gustulus: Gustulus): Promise<void>
  async proponatur(valor: Gustulus | Gustulamen): Promise<void> {
    if (this.#gustulust(valor)) this._gustulus = valor
    else if (this.#gustulamenust(valor)) {
      const structor = new Structor(Gustulus)
        .ponatur((hoc) => (hoc.vita = valor.vita || 3000))
        .ponatur((hoc) => (hoc.color = valor.error ? 'red' : 'green'))
      if (!valor.nuntium.empty) structor.ponatur((hoc) => (hoc.nuntium = valor.nuntium))
      this._gustulus = structor.struatur
    }
    if (this.gustulus?.visibile)
      await setTimeout(this.gustulus.vita + 500).then(() => this.extricetur())
  }
}

export const gustulator: Gustulator = new Gustulator()
