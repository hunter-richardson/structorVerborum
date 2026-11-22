import { useTranslation } from 'i18next-vue'
import { type TOptions } from 'i18next'
import '@/extensions/string'

export default function translation() {
  const { t, i18next } = useTranslation()
  const tf: (key: string, format?: string, options?: TOptions) => string = (
    key: string,
    format?: string,
    options?: TOptions
  ): string => {
    const translated: string = options === undefined ? i18next.t(key) : i18next.t(key, options)
    return format?.empty === false && i18next.services.formatter
      ? i18next.services.formatter.format(translated, format, i18next.language)
      : translated
  }
  return { t, tf, i18next }
}
