import Nuntius from './nuntius';
import { Ignavum, Ultimum } from './usus';
import Structor from '../praebeunda/structor';

export class Gustulus {
  vita!: number
  nuntium!: string
  color!: string

  get visibile (): boolean { return this.vita > 0 }
}

type Gustulamen =
    Omit<Gustulus, 'color' | 'vita' | 'visibile'> &
    Partial<Pick<Gustulus, 'vita'>> &
    { error: boolean }

@Ignavum @Ultimum @Nuntius.factum
class Gustulator {
  private _gustulus?: Gustulus
  get gustulus(): Gustulus | undefined { return this._gustulus }

  extricetur() { this._gustulus = undefined }

  #gustulust(valor: Gustulus | Gustulamen):
  valor is Gustulus { return 'vita' in valor }

  #gustulamenust (valor: Gustulus | Gustulamen):
  valor is Gustulamen { return 'error' in valor; }

  proponatur(gustulamen: Gustulamen): void
  proponatur(gustulus: Gustulus): void
  proponatur(valor: Gustulus | Gustulamen) {
    if(this.#gustulust(valor)) this._gustulus = valor
    else if(this.#gustulamenust(valor)) {
      const structor = new Structor(Gustulus)
              .ponatur((hoc) => (hoc.vita = valor.vita || 3000))
              .ponatur((hoc) => (hoc.color = valor.error ? 'red' : 'green'));
      if (valor.nuntium.length > 0)
        structor.ponatur((hoc) => (hoc.nuntium = valor.nuntium));
      this._gustulus = structor.struatur
    }
  }
}

export const gustulator: Gustulator = new Gustulator
