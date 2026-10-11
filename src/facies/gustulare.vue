<script setup lang="ts">
  import { ref, type Ref } from 'vue'
  import Gustulus from '../scriptura/gustulus'

  const gustulus: Ref<Gustulus | undefined> = ref()
</script>

<template>
  <v-snackbar v-if='gustulus !== undefined'
              v-model="gustulus.visibile"
              :color="gustulus.color"
              :timeout="gustulus.vita"
              :text="gustulus.nuntium" />
</template>
