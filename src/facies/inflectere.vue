<script lang='ts'>
  import { defineProps, defineComponent, type ComponentOptionsWithoutProps } from 'vue';
  import actuum from './tabulam/actuum.vue';
  import adiectivorum from './tabulam/adiectivorum.vue';
  import adverbiorum from './tabulam/adverbiorum.vue';
  import nominum from './tabulam/nominum.vue';
  import numeraminum from './tabulam/numeraminum.vue';
  import pronominum from './tabulam/pronominum.vue';
  import type { Eventus } from '../miscella/dictionarium';
  import type { Referendum } from '../praebeunda/interfecta';

  const eventus: Eventus = defineProps<{ eventus: Eventus; }>().eventus;

  const componenta: ComponentOptionsWithoutProps = {
    actuum, adiectivorum, adverbiorum, numeraminum, nominum, pronominum
  };

  const data = (): {
    referendum: Referendum | undefined,
    categoria: string
  } => {
    return {
      referendum: eventus.referendum,
      categoria: eventus.categoria
    };
  };

  export default defineComponent({
    components: componenta,
    data: data
  });
</script>

<template>
  <template v-if='referendum'>
    <v-dialog @blur='referendum = undefined;'>
      <template v-if="categoria === 'actus'">
        <actuum :agendum='referendum' />
      </template>
      <template v-else-if="categoria === 'adiectivum'">
        <adiectivorum :agendum='referendum' />
      </template>
      <template v-else-if="categoria === 'adverbium'">
        <adverbiorum :agendum='referendum' />
      </template>
      <template v-else-if="categoria === 'nomen'">
        <nominum :agendum='referendum' />
      </template>
      <template v-else-if="categoria === 'numeramen'">
        <numeraminum :agendum='referendum' />
      </template>
      <template v-else-if="categoria === 'pronomen'">
        <pronominum :agendum='referendum' />
      </template>
    </v-dialog>
  </template>
</template>
