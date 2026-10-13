<script setup lang='ts'>
  import { Gustulus, gustulator } from '@/miscella/gustulator'
  const gustulus: Gustulus | undefined = gustulator.gustulus
</script>

<template>
  <v-snackbar v-if='gustulus !== undefined'
              v-model='gustulus.visibile'
              :color='gustulus.color'
              :timeout='gustulus.vita'
              :text='gustulus.nuntium' />
</template>
