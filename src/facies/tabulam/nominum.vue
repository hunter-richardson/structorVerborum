<script setup lang='ts'>
  import { defineProps, ref, type Ref } from 'vue'
  import '../../extensions/array.ts'
  import { NomenActum } from '../../praebeunda/agenda.ts'
  import { type Faciendum } from '../../praebeunda/interfecta.ts'
  import { Actus, Nomen } from '../../praebeunda/verba.ts'
  import inflectere from '../inflectere.vue'
  import tabulare from '../tabulare.vue'

  const { agendum } = defineProps<{ agendum: Faciendum<Nomen> }>();
  const factum: boolean = agendum instanceof NomenActum;
  const actus: Ref<Faciendum<Actus> | undefined> = ref<Faciendum<Actus> | undefined>(undefined);

  async function refer ()
  { actus.value = await (agendum as NomenActum).actus() ?? undefined; }
</script>

<template>
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <inflectere v-if='!!actus' :agendum='actus' @blur='actus = undefined' />
  <tabulare v-else :agendum='agendum' categoria='nomen' />
  <v-btn v-if='factum' append-icon='sprint' id='actus' @click='refer()'
         :text="$t('categoria.actus.singularis', 'capitalize')" />
</template>
