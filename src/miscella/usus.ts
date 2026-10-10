type Ullum = abstract new (...paramtetra: any[]) => any

export function Ignavum<Hoc extends Ullum> (valor: Hoc, contextus: ClassDecoratorContext): Hoc {
  if (contextus.kind === 'class') {
    const Classis = class {
      private _hoc: InstanceType<Hoc> | undefined = undefined
      constructor (...parametra: ConstructorParameters<Hoc>) {
        const hoc = (): InstanceType<Hoc> =>
          { return this._hoc ??= new (valor as any)(...parametra) }

        return new Proxy({} as InstanceType<Hoc>, {
          getPrototypeOf(): object | null { return Reflect.getPrototypeOf(hoc()) },

          ownKeys(): (symbol | string)[] { return Reflect.ownKeys(hoc()) },

          has(_: any, clavis: PropertyKey): boolean { return clavis in hoc() },

          getOwnPropertyDescriptor(_: any, clavis: PropertyKey): any
          { return Reflect.getOwnPropertyDescriptor(hoc(), clavis) },

          set(_: any, clavis: PropertyKey, valor: unknown): boolean
          { return Reflect.set(hoc(), clavis, valor) },

          get(_: any, clavis: PropertyKey, captor: any): unknown {
            const parma: InstanceType<Hoc> = hoc()
            const valor: unknown = Reflect.get(parma, clavis, captor)
            return typeof valor === 'function' ? valor.bind(parma) : valor
          }
        })
      }
    }; Object.setPrototypeOf(Classis, valor)
    return Classis as unknown as Hoc
  } else throw new TypeError('Adornandu\'st classibus @Ignavum')
}

export function Ultimum<Hoc extends { new(...parametra: any[]): {} }> (parma: Hoc) {
  return class extends parma {
    constructor (...parametra: any[]) {
      if (new.target !== parma)
        throw new TypeError(`Ne ultimum inhaereatur ${parma.name}`)
      super(...parametra)
    }
  }
}
