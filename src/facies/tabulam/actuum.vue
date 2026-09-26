<script setup lang='ts'>
  import { defineProps, ref } from 'vue';
import '../../extensions/array.ts';
import { ActusAgendus } from '../../praebeunda/agenda';
import type { Faciendum, Referendum } from '../../praebeunda/interfecta';
import { Actus } from '../../praebeunda/verba';
import Gustulus from '../../scriptura/gustulus';
import inflectere from '../inflectere.vue';
import tabulare from '../tabulare.vue';

  export interface Forma {
    gustulus: Gustulus,
    agendum: Faciendum<Actus>;
  }

  const { gustulus, agendum } = defineProps<Forma>();
  const lectum: boolean = agendum instanceof ActusAgendus;
  const referendum: Referendum | undefined = ref<Referendum | undefined>();
</script>

<template>
  <inflectere if='referendum' :agendum='referendum' @blur='referendum = undefined' />
  <tabulare v-else :agendum='agendum' categoria='actus' />
  <template if='actua.length > 1'>
    <v-btn-toggle v-if='lectum'>
      <v-btn :text="$tf('partes.gerundium_singularis', 'capitalize')" id='nomen'
             append-icon='subject' @click='referendum = (agendum as ActusAgendus).nomen()' />
      <v-btn :text="$tf('scripta.inflectere.actus.actor', 'capitalize')" id='actor'
             append-icon='man'
             @click="referendum = (agendum as ActusAgendus).actor('masculinum')" />
      <v-btn :text="$tf('scripta.inflectere.actus.actrix', 'capitalize')" id='actrix'
             append-icon='woman'
             @click="referendum = (agendum as ActusAgendus).actor('femininum')" />
    </v-btn-toggle>
  </template>
</template>
