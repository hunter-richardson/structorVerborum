<script lang='ts'>
  import { defineProps, defineComponent } from 'vue';
  import tabulaActuum from './tabulam/actuum.vue';
  import tabulaAdiectivorum from './tabulam/adiectivorum.vue';
  import tabulaAdverbiorum from './tabulam/adverbiorum.vue';
  import tabulaNominum from './tabulam/nominum.vue';
  import tabulaPronominum from './tabulam/pronominum.vue';
  // import tabulaNumeraminum from './tabulam/numeraminum.vue'
  import type { Eventus } from '../miscella/dictionarium';
  import type { Referendum } from '../praebeunda/interfecta';

  const eventus: Eventus = defineProps<{ eventus: Eventus; }>().eventus;

  export default defineComponent({
    components: {
      tabulaActuum,
      tabulaAdiectivorum,
      tabulaAdverbiorum,
      tabulaNominum,
      tabulaPronominum
    }, data (): {
      referendum: Referendum | undefined,
      categoria: string
    } {
      return {
        referendum: eventus.referendum,
        categoria: eventus.categoria
      };
    }
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
