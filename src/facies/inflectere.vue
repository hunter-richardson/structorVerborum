<script lang='ts'>
  import { defineComponent, defineProps } from 'vue';
import { type Eventus } from '../miscella/dictionarium';
import { type Referendum } from '../praebeunda/interfecta';
import actuum from './tabulam/actuum.vue';
import adiectivorum from './tabulam/adiectivorum.vue';
import adverbiorum from './tabulam/adverbiorum.vue';
import nominum from './tabulam/nominum.vue';
import numeraminum from './tabulam/numeraminum.vue';
import pronominum from './tabulam/pronominum.vue';

  const eventus: Eventus = defineProps<{ eventus: Eventus }>().eventus

  export default defineComponent({
    components: { actuum, adiectivorum, adverbiorum, numeraminum, nominum, pronominum },
    data: (): {
      referendum: Referendum | undefined,
      categoria: string
    } => {
      return {
        referendum: eventus.referendum,
        categoria: eventus.categoria
      }
    }
  })
</script>

<template>
  <template v-if='referendum'>
    <v-dialog @blur='referendum = undefined'>
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
