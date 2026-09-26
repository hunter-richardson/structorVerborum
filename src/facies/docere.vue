<script setup lang='ts'>
  import { defineProps } from 'vue';
import { magister } from '../miscella/magister';

  const docendum: string = defineProps<{ docendum: string; }>();
</script>

<template>
  <template v-if='!!docendum'>
    <div :id="`doctum.${docendum}`">{{ await magister.hoc().doceatur(docendum) }}</div>
  </template>
</template>
