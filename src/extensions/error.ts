declare global {
  interface ErrorConstructor {
    isError(error: unknown): error is Error
  }
}

Error.isError =
  function(error: unknown): error is Error {
    return typeof error === 'object' &&
           error !== null &&
           'message' in error
  }

export {}
