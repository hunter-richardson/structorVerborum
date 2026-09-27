<script setup lang='ts'>
  import { defineProps } from 'vue'
  import { magister } from '../miscella/magister.ts'

  const docendum: string = defineProps<{ docendum: string; }>();
</script>

<template>
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <div v-if='!!docendum' :id="`doctum.${docendum}`">{{ await magister.hoc().doceatur(docendum) }}</div>
</template>
