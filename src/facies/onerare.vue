<script lang='ts'>
  import { defineComponent, defineProps } from 'vue';
  import { anglicum } from '../miscella/enumerationes';
  import Cocutor from '../miscella/cocutor';

  const { onerans, pittacium } = defineProps<{
    onerans: boolean, pittacium: string;
  }>();

  const anglica: boolean = Cocutor.se.ipse().edatur('lingua') === 'anglica';
  const scriptum: string = anglica ? `Loading ${anglicum(pittacium).toUpperCase()}...` : `${pittacium.toUpperCase()} onerantur...`;

  export default defineComponent({
    data (): {
      onerans: boolean,
      scriptum: string;
    } {
      return {
        onerans: onerans,
        scriptum: scriptum
      };
    }
  });
</script>

<template lang='vue'>
	<template v-if='onerans'>
		<v-skeleton-loader :loading-text='scriptum' :loading='onerans' type='table-tbody' />
	</template>
</template>
