declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- Hoc transgressionem sine suturis inter modos mundi licet
  namespace NodeJS {
    interface ProcesEnv {
      NODE_ENV: 'production' | 'test' | 'development'
    }
  }
}

export {}
