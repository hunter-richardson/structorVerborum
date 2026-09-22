import i18next from 'i18next'

declare global {
  interface i18next {
    tf(key: string, format?: string, options?: Record<string, unknown>): string
  }
}

i18next.tf = function(key: string, format?: string, options?: Record<string, unknown>): string {
  return format ? this.services.formatter.format(this.t(key, options), format, this.language)
                : this.t(key, options)
}

export {}
