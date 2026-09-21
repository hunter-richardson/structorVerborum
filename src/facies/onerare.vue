<script lang='ts'>
  import { defineComponent, defineProps } from 'vue';
import { crustula } from '../miscella/crustula';
import { anglicum } from '../miscella/enumerationes';

  const { onerans, pittacium } = defineProps<{
    onerans: boolean,
    pittacium: string
  }>()

  const anglica: boolean = crustula.hoc().lingua.est('anglica') ?? false
  const scriptum: string = anglica ? `Loading ${anglicum(pittacium).toUpperCase()}...` :
                                     `${pittacium.toUpperCase()} onerantur...`

  export default defineComponent({
    data: (): {
        onerans: boolean,
        scriptum: string
      } => { return { onerans, scriptum } }
    })
</script>

<template>
  <template v-if='onerans'>
    <v-skeleton-loader :loading-text='scriptum' :loading='onerans' type='table-tbody' />
  </template>
</template>
