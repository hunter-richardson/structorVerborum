<script lang='ts'>
  import { defineComponent, defineProps } from 'vue';
  import { anglicum } from '../miscella/enumerationes';
  import Crustula from '../miscella/crustula';

  const { onerans, pittacium } = defineProps<{
    onerans: boolean, pittacium: string;
  }>();

  const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;
  const scriptum: string = anglica ?
    `Loading ${anglicum(pittacium).toUpperCase()}...` :
    `${pittacium.toUpperCase()} onerantur...`;

  const data = (): {
    onerans: boolean,
    scriptum: string;
  } => {
    return { onerans, scriptum };
  }

  export default defineComponent({ data: data });
</script>

<template>
  <template v-if='onerans'>
    <v-skeleton-loader :loading-text='scriptum' :loading='onerans' type='table-tbody' />
  </template>
</template>
