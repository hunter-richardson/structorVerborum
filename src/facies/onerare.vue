<script setup lang='ts'>
  const { onerans, pittacium } = defineProps<{
    onerans: boolean,
    pittacium: string;
  }>()
</script>

<template>
  <v-skeleton-loader v-if='onerans' :loading='onerans' type='table-tbody'
                     :loading-text="$t('scripta.onerare.onerans', { pittacium: pittacium })" />
</template>
