<script lang="ts">
  import { defineComponent } from 'vue'
  import Gustulus from '../scriptura/gustulus'

  defineProps({ gustulus: Gustulus });
  export default defineComponent({ props: [ 'gustulus' ] })
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
