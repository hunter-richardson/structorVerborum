<script setup lang='ts'>
  import { defineProps, ref, type Ref } from 'vue'
  import '../../extensions/array'
  import { type Referendum } from '../../praebeunda/interfecta'
  import { type TabulatorActuum } from '../../praebeunda/verba'
  import inflectere from '../inflectere.vue'
  import tabulare from '../tabulare.vue'
  import { TabulamenActus } from '../../praebeunda/tabulamina';

  const { agendum } = defineProps<{ agendum: TabulatorActuum }>();
  const lectum: boolean = agendum instanceof TabulamenActus;
  const referendum: Ref<Referendum | undefined> = ref<Referendum | undefined>();
</script>

<template>
  <inflectere v-if='referendum !== undefined' :agendum='referendum' @blur='referendum = undefined' />
  <tabulare v-else-if='agendum !== undefined' :agendum='agendum' categoria='actus' />
  <v-btn-toggle v-if='lectum'>
    <v-btn :text="$tf('partes.gerundium_singularis', 'capitalize')" id='nomen'
            append-icon='subject' @click='referendum = (agendum as TabulatorActuum).nomen()' />
    <v-btn :text="$tf('scripta.inflectere.actus.actor', 'capitalize')" id='actor'
            append-icon='man'
            @click="referendum = (agendum as TabulatorActuum).actor('masculinum') " />
    <v-btn :text="$tf('scripta.inflectere.actus.actrix', 'capitalize')" id='actrix'
            append-icon='woman'
            @click="referendum = (agendum as TabulatorActuum).actor('femininum')" />
  </v-btn-toggle>
</template>
