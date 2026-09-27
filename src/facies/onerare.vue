<script setup lang='ts'>
  import { defineProps } from 'vue'

  export interface Forma {
    onerans: boolean,
    pittacium: string
  }

  const { onerans, pittacium } = defineProps<Forma>()
</script>

<template>
  <v-skeleton-loader v-if='onerans'
                     :loading-text="$t('scripta.onerare.onerans', { pittacium: pittacium })"
                     :loading='onerans' type='table-tbody' />
</template>
