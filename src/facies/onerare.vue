<script lang='ts'>
  import { defineComponent, defineProps } from 'vue'
  import { numerus } from '../miscella/enumerationes'
  import i18next from 'i18next'

  const { onerans, pittacium } = defineProps<{
    onerans: boolean,
    pittacium: string,
    numuers: numerus
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
    <v-skeleton-loader :loading-text="i18next.t(`scripta.onerare.onerans${numerus}`, { pittacium: pittacium })"
                       :loading='onerans' type='table-tbody' />
  </template>
</template>
