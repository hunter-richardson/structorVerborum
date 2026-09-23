import i18next, { type i18n } from 'i18next';

declare module 'i18next' {
  interface i18n {
    tf(key: string, format?: string, options?: Record<string, unknown>): string
  }
}

(i18next as any).prototype.tf = function(key: string, format?: string, options?: Record<string, unknown>): string {
  return format ? this.services.formatter.format(this.t(key, options), format, this.language)
                : this.t(key, options)
}

// eslint-disable-next-line @typescript-eslint/no-useless-empty-export
export {}

