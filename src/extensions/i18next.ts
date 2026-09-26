import { useTranslation } from 'i18next-vue';

export default function translation() {
  const { t, i18next } = useTranslation()
  const tf: (key: string, format?: string, options?: Record<string, unknown>) => string =
      (key: string, format?: string, options?: Record<string, unknown>): string => {
        if(!!format && i18next.services.formatter)
          return i18next.services.formatter?.format(
                     i18next.t(key, options), format, i18next.language)
         else return i18next.t(key, options)
      }

  return { t, tf, i18next }
}
