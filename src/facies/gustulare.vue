<script setup lang="ts">
  import { defineProps } from 'vue'
  import Gustulus from '../scriptura/gustulus.ts'

  const gustulus: Gustulus | undefined = defineProps<{ gustulus: Gustulus | undefined }>()
</script>

<template>
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <v-snackbar v-if='!!gustulus'
              v-model="gustulus.visibile"
              :color="gustulus.color"
              :timeout="gustulus.vita"
              :text="gustulus.nuntium" />
</template>
