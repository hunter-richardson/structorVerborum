<script lang="ts">
  import { defineComponent, defineProps, type Ref, ref } from 'vue';
  import Gustulus from '../scriptura/gustulus';

  const gustulus: Gustulus = defineProps<{ gustulus: Gustulus }>().gustulus

  export default defineComponent({
    data: (): {
      gustulus: Ref<Gustulus>
    } => {
      return { gustulus: ref(gustulus) }
    } })
</script>

<template>
  <template v-if="gustulus">
    <v-snackbar
      v-model="gustulus.visibile"
      :color="gustulus.color"
      :timeout="gustulus.vita"
      :text="gustulus.nuntium" />
  </template>
</template>
