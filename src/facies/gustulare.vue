<script lang="ts">
  import { defineComponent, defineProps, type Ref, ref } from 'vue'
  import Gustulus from '../scriptura/gustulus'

  const gustulus: Gustulus = defineProps<{ gustulus: Gustulus; }>().gustulus;
  const data = (): {
    gustulus: Ref<Gustulus>;
  } => {
    return { gustulus: ref(gustulus) };
  };

  export default defineComponent({ data: data });
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
