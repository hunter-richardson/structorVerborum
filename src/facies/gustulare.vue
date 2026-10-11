<script setup lang="ts">
  import { onMounted } from 'vue';
  import { Gustulus, gustulator } from '../miscella/gustulator'
  import { setTimeout } from 'timers/promises';

  const gustulus: Gustulus | undefined = gustulator.gustulus

  const aetas: Promise<void> =
    gustulus === undefined || gustulus?.visibile === true ? Promise.resolve() :
      setTimeout(gustulus.vita).then(() => (gustulator.extricetur()))

  onMounted(async () => await aetas)
</script>

<template>
  <v-snackbar v-if='gustulus !== undefined'
              v-model='gustulus.visibile'
              :color='gustulus.color'
              :timeout='gustulus.vita'
              :text='gustulus.nuntium' />
</template>
