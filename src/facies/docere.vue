<script lang='ts'>
  import { defineComponent, defineProps } from 'vue';
  import Magister from '../miscella/magister';

  const magister: Magister = Magister.se.ipse();
  const docendum: string = defineProps<{ docendum: string; }>().docendum;
  const doctum: string = await magister.doceatur(docendum);

  const data = (): {
    docendum: string,
    doctum: string;
  } => {
    return { docendum, doctum };
  };

  export default defineComponent({ data: data });
</script>

<template>
  <template v-if='[ docendum, doctum ].all()'>
    <div :id="`doctum.${docendum}`">{{ doctum }}</div>
  </template>
</template>
