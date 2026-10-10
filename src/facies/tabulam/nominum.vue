<script setup lang='ts'>
  import { defineProps, ref, type Ref } from 'vue'
  import '../../extensions/array'
  import { NomenActum } from '../../praebeunda/agenda'
  import { type Tabulator } from '../../praebeunda/interfecta'
  import { Actus, Nomen } from '../../praebeunda/verba'
  import inflectere from '../inflectere.vue'
  import tabulare from '../tabulare.vue'

  const { agendum } = defineProps<{ agendum: Tabulator<Nomen> }>();
  const factum: boolean = agendum instanceof NomenActum;
  let actus: Ref<Tabulator<Actus> | undefined> = ref<Tabulator<Actus> | undefined>(undefined);

  async function refer ()
  { actus.value = await (agendum as NomenActum).actus() ?? undefined; }
</script>

<template>
  <inflectere v-if='actus !== undefined' :agendum='actus' @blur='actus = undefined' />
  <tabulare v-else :agendum='agendum' categoria='nomen' />
  <v-btn v-if='factum' append-icon='sprint' id='actus' @click='refer()'
         :text="$t('categoria.actus.singularis', 'capitalize')" />
</template>
