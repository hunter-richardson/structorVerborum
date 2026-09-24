<script lang='ts'>
  import { defineComponent, defineProps } from 'vue'
  import { type numerus } from '../miscella/enumerationes'

  const { onerans, pittacium, numerus } = defineProps<{
    onerans: boolean,
    pittacium: string,
    numerus: numerus
  }>()

  export default defineComponent({
    data: (): {
        onerans: boolean,
        pittacium: string,
        numerus: numerus
      } => { return {
        onerans: onerans,
        pittacium: pittacium,
        numerus: numerus
      } }
    })
</script>

<template>
  <template v-if='onerans'>
    <v-skeleton-loader :loading-text="$t(`scripta.onerare.onerans${numerus}`, { pittacium: pittacium })"
                       :loading='onerans' type='table-tbody' />
  </template>
</template>
