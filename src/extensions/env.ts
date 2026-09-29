declare global {
  namespace NodeJS {
    interface ProcesEnv {
      NODE_ENV: 'production' | 'test' | 'development'
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-useless-empty-export
export {}
