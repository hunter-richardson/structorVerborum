import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $tf(clavis: string, forma?: string, optanda?: Record<string, unknown>): string
  }
}
