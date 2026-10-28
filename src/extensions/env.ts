declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace -- This allows seamless integration among code environments
  namespace NodeJS {
    interface ProcesEnv {
      NODE_ENV: 'production' | 'test' | 'development'
    }
  }
}

export {}
