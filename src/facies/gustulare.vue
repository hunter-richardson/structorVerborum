<script setup lang='ts'>
  import { Gustulus, gustulator } from '@/miscella/gustulator'
  const gustulus: Gustulus | undefined = gustulator.gustulus

  const emittatur = defineEmits<{ (eventus: 'operi'): void }>()
  const operiatur = () => { emittatur('operi') }
</script>

<template>
  <v-snackbar v-if='gustulus !== undefined'
              v-model='gustulus.visibile'
              :timeout='gustulus.vita'
              :text='gustulus.nuntium'
              :color='gustulus.color'
              @update:model-value='operiatur' />
</template>
