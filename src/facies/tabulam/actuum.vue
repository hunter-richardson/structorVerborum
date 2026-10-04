<script setup lang='ts'>
  import { defineProps, ref, type Ref } from 'vue'
  import '../../extensions/array'
  import { ActusAgendus } from '../../praebeunda/agenda'
  import type { Faciendum, Referendum } from '../../praebeunda/interfecta'
  import { Actus } from '../../praebeunda/verba'
  import inflectere from '../inflectere.vue'
  import tabulare from '../tabulare.vue'

  const { agendum } = defineProps<{ agendum: Faciendum<Actus> }>();
  const lectum: boolean = agendum instanceof ActusAgendus;
  const referendum: Ref<Referendum | undefined> = ref<Referendum | undefined>();
</script>

<template>
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <inflectere v-if='!!referendum' :agendum='referendum' @blur='referendum = undefined' />
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <tabulare v-else-if='!!agendum' :agendum='agendum' categoria='actus' />
  <v-btn-toggle v-if='lectum'>
    <v-btn :text="$tf('partes.gerundium_singularis', 'capitalize')" id='nomen'
            append-icon='subject' @click='referendum = (agendum as ActusAgendus).nomen()' />
    <v-btn :text="$tf('scripta.inflectere.actus.actor', 'capitalize')" id='actor'
            append-icon='man'
            @click="referendum = (agendum as ActusAgendus).actor('masculinum') " />
    <v-btn :text="$tf('scripta.inflectere.actus.actrix', 'capitalize')" id='actrix'
            append-icon='woman'
            @click="referendum = (agendum as ActusAgendus).actor('femininum')" />
  </v-btn-toggle>
</template>
