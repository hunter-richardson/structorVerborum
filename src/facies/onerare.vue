<script setup lang='ts'>
  import { defineProps } from 'vue';

  export interface Forma {
    onerans: boolean,
    pittacium: string
  }

  const { onerans, pittacium } = defineProps<Forma>()
</script>

<template>
  <template v-if='onerans'>
    <v-skeleton-loader :loading-text="$t('scripta.onerare.onerans', { pittacium: pittacium })"
                       :loading='onerans' type='table-tbody' />
  </template>
</template>
