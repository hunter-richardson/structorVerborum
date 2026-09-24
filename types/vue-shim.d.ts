declare module '*.vue' {
  import { defineComponent } from 'vue';
  export default component = defineComponent<{}, {}, any>
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $tf(clavis: string, forma?: string, optanda?: Record<string, unknown>): string
  }
}
