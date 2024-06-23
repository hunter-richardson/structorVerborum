<script lang="ts">
  import { defineComponent } from 'vue'
  import Gustulus from '../scriptura/gustulus'
  import type { ModelRef } from 'vue'

  const gustulus: ModelRef<Gustulus | undefined, string> = defineModel<Gustulus>()

  export default defineComponent({
    props: [ 'gustulus' ],

    data() {
      return {
        gustulus: gustulus.value
      }
    }
  })
</script>

<template>
  <template v-if="gustulus">
    <v-snackbar
      v-model="gustulus.visibile"
      :color="gustulus.color"
      :timeout="gustulus.vita"
      :text="gustulus.nuntium"
    />
  </template>
</template>
