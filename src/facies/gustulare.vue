<script lang="ts">
  import { defineComponent } from 'vue'
  import Gustulus from '../scriptura/gustulus'

  export default defineComponent({ props: { gustulus: Gustulus } })
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
