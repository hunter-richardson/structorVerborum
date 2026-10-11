// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Alendae structoribus generalibus parametrae arbitrariae sunt
type Ullum = abstract new (...paramtetra: any[]) => any

export function Ignavum<Hoc extends Ullum> (res: Hoc, contextus: ClassDecoratorContext): Hoc {
  if (contextus.kind === 'class') {
    const Classis = class {
      private _hoc: InstanceType<Hoc> | undefined
      constructor (...parametra: ConstructorParameters<Hoc>) {
        const hoc = (): InstanceType<Hoc> =>
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Alendae structoribus generalibus parametrae arbitrariae sunt
          { return this._hoc ??= new (res as any)(...parametra) }

        const vicarium = new Proxy({} as object, {
          getPrototypeOf(): object | null { return Reflect.getPrototypeOf(hoc()) },

          ownKeys(): (symbol | string)[] { return Reflect.ownKeys(hoc()) },

          has(_: unknown, clavis: PropertyKey): boolean { return clavis in hoc() },

          getOwnPropertyDescriptor(_: unknown, clavis: PropertyKey): PropertyDescriptor | undefined
          { return Reflect.getOwnPropertyDescriptor(hoc(), clavis) },

          set(_: unknown, clavis: PropertyKey, valor: unknown): boolean
          { return Reflect.set(hoc(), clavis, valor) },

          get(_: unknown, clavis: PropertyKey, captor: unknown): unknown {
            const parma: InstanceType<Hoc> = hoc()
            const valor: unknown = Reflect.get(parma, clavis, captor)
            return typeof valor === 'function' ? valor.bind(parma) : valor
        } }) as InstanceType<Hoc>; return vicarium
    } }; Object.setPrototypeOf(Classis, res)
    return Classis as unknown as Hoc
  } else throw new TypeError('Adornandu\'st classibus @Ignavum')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Alendae structoribus generalibus parametrae arbitrariae sunt
export function Ultimum<Hoc extends { new(...parametra: any[]): object }> (parma: Hoc) {
  return class extends parma {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Alendae structoribus generalibus parametrae arbitrariae sunt
    constructor (...parametra: any[]) {
      if (new.target !== parma)
        throw new TypeError(`Ne ultimum inhaereatur ${parma.name}`)
      super(...parametra)
} } }
