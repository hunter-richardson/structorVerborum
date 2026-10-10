<script setup lang="ts">
  import { defineProps } from 'vue'
  import Gustulus from '../scriptura/gustulus'

  const gustulus: Gustulus | undefined = defineProps<{ gustulus: Gustulus | undefined }>()
</script>

<template>
  <v-snackbar v-if='gustulus !== undefined'
              v-model="gustulus.visibile"
              :color="gustulus.color"
              :timeout="gustulus.vita"
              :text="gustulus.nuntium" />
</template>
