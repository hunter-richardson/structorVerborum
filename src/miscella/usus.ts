// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Alendae structoribus generalibus parametrae arbitrariae sunt
type Ullum = abstract new (...paramtetra: any[]) => any

export function Ignavum<Hoc extends Ullum>(res: Hoc, contextus: ClassDecoratorContext): Hoc {
  if (contextus.kind === 'class') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Alendae structoribus generalibus parametrae arbitrariae sunt
    const Sagum = function (this: any, ...parametra: ConstructorParameters<Hoc>) {
      let _hoc: InstanceType<Hoc> | undefined
      const hoc = (): InstanceType<Hoc> => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Alendae structoribus generalibus parametrae arbitrariae sunt
        return (_hoc ??= new (res as any)(...parametra)) //  NOSONAR: nil moror
      }
      return new Proxy({} as object, {
        getPrototypeOf(): object | null {
          return Reflect.getPrototypeOf(hoc())
        },
        ownKeys(): (symbol | string)[] {
          return Reflect.ownKeys(hoc())
        },
        has(_: unknown, clavis: PropertyKey): clavis is keyof Hoc {
          return clavis in hoc()
        },
        getOwnPropertyDescriptor(_: unknown, clavis: PropertyKey): PropertyDescriptor | undefined {
          return Reflect.getOwnPropertyDescriptor(hoc(), clavis)
        },
        set(_: unknown, clavis: PropertyKey, valor: unknown): boolean {
          return Reflect.set(hoc(), clavis, valor)
        },
        get(_: unknown, clavis: PropertyKey, captor: unknown): unknown {
          const parma: InstanceType<Hoc> = hoc()
          const valor: unknown = Reflect.get(parma, clavis, captor)
          return typeof valor === 'function' ? valor.bind(parma) : valor
        }
      }) as InstanceType<Hoc>
    }
    Object.setPrototypeOf(Sagum, res)
    Sagum.prototype = res.prototype
    return Sagum as unknown as Hoc
  } else throw new TypeError("Adornandu'st classibus @Ignavum")
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Alendae structoribus generalibus parametrae arbitrariae sunt
export function Ultimum<Hoc extends new (...parametra: any[]) => any>(parma: Hoc) {
  return class extends parma {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Alendae structoribus generalibus parametrae arbitrariae sunt
    constructor(...parametra: any[]) {
      if (new.target !== parma) throw new TypeError(`Ne ultimum inhaereatur ${parma.name}`)
      super(...parametra)
    }
  }
}
