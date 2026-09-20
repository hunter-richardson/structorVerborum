<script lang='ts'>
  import { defineComponent, defineProps } from 'vue';
import { magister } from '../miscella/magister';

  const docendum: string = defineProps<{ docendum: string; }>().docendum;
  const doctum: string = await magister.hoc().doceatur(docendum);

  export default defineComponent({ data: (): {
      docendum: string,
      doctum: string
    } => {
      return { docendum, doctum }
    } })
</script>

<template>
  <template v-if='[ docendum, doctum ].all()'>
    <div :id="`doctum.${docendum}`">{{ doctum }}</div>
  </template>
</template>
