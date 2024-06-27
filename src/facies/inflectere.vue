<script lang='ts'>
  import { defineProps, defineComponent, type ComponentOptionsWithoutProps } from 'vue';
  import tabulaActuum from './tabulam/actuum.vue';
  import tabulaAdiectivorum from './tabulam/adiectivorum.vue';
  import tabulaAdverbiorum from './tabulam/adverbiorum.vue';
  import tabulaNominum from './tabulam/nominum.vue';
  import tabulaPronominum from './tabulam/pronominum.vue';
  // import tabulaNumeraminum from './tabulam/numeraminum.vue'
  import type { Eventus } from '../miscella/dictionarium';
  import type { Referendum } from '../praebeunda/interfecta';

  const eventus: Eventus = defineProps<{ eventus: Eventus; }>().eventus;

  const componenta: ComponentOptionsWithoutProps = {
    'tabulaAdiectivorum': tabulaAdiectivorum,
    'tabulaAdverbiorum': tabulaAdverbiorum,
    // 'tabulaNumeraminum': tabulaNumeraminum
    'tabulaNominum': tabulaNominum,
    'tabulaPronominum': tabulaPronominum,
    'tabulaActuum': tabulaActuum,
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

<template lang='vue'>
  <template v-if='referendum'>
      <v-dialog @blur='referendum = undefined;'>
        <template v-if="categoria === 'actus'">
          <tabulaActuum :agendum='referendum' />
        </template>
        <template v-else-if="categoria === 'adiectivum'">
          <tabulaAdiectivorum :agendum='referendum' />
        </template>
        <template v-else-if="categoria === 'adverbium'">
          <tabulaAdverbiorum :agendum='referendum' />
        </template>
        <template v-else-if="categoria === 'nomen'">
              <tabulaNominum :agendum='referendum' />
        </template>
        <template v-else-if="categoria === 'pronomen'">
          <tabulaPronominum :agendum='referendum' />
        </template>
    </v-dialog>
  </template>
</template>
