<script setup lang='ts'>
  import { defineProps, ref, type Ref } from 'vue'
  import '../../extensions/array'
  import { TabulamenNominis, type TabulamenFacti } from '../../praebeunda/tabulamina'
  import { type Tabulator } from '../../praebeunda/interfecta'
  import { Nomen } from '../../praebeunda/verba'
  import inflectere from '../inflectere.vue'
  import tabulare from '../tabulare.vue'
import type { Eventus } from '../../miscella/dictionarium';

  const { agendum } = defineProps<{ agendum: Tabulator<Nomen> }>();
  const factum: boolean = agendum instanceof TabulamenNominis;
  const actus: Ref<Eventus | undefined> = ref(undefined);

  async function refer ()
  { actus.value = await (agendum as TabulamenFacti).actus() ?? undefined; }
</script>

<template>
  <inflectere v-if='actus !== undefined' :agendum='actus' @blur='actus = undefined' />
  <tabulare v-else :agendum='agendum' categoria='nomen' />
  <v-btn v-if='factum' append-icon='sprint' id='actus' @click='refer()'
         :text="$t('categoria.actus.singularis', 'capitalize')" />
</template>
