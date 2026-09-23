declare module '*.vue' {
  import { defineComponent } from 'vue';
  export default component = defineComponent<{}, {}, any>
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $tf(key: string, format?: string, options?: Record<string, unknown>): string
  }
}
