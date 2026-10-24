<script setup lang='ts'>
  import translation from '@/extensions/i18next';
  const { t } = translation()
  const { onerans, pittacium } = defineProps<{
    onerans: boolean,
    pittacium: string;
  }>()
</script>

<template>
  <v-skeleton-loader v-if='onerans' :loading='onerans' type='table-tbody'
                     :loading-text="t('scripta.onerare.onerans', { pittacium: pittacium })" />
</template>
