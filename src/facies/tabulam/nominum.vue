<script lang='ts'>
  import { defineProps, ref } from 'vue'
  import '../../extensions/array.ts'
  import { NomenActum } from '../../praebeunda/agenda.ts'
  import { type Faciendum } from '../../praebeunda/interfecta.ts'
  import { Actus, Nomen } from '../../praebeunda/verba.ts'
  import Gustulus from '../../scriptura/gustulus.ts'
  import gustulare from '../gustulare.vue'
  import inflectere from '../inflectere.vue'
  import tabulare from '../tabulare.vue'

  export interface Forma {
    gustulus?: Gustulus,
    agendum: Faciendum<Nomen>;
  }

  const { gustulus, agendum } = defineProps<Forma>();
  const actum: boolean = agendum instanceof NomenActum;
  let actus: Faciendum<Actus> | undefined = ref<Faciendum<Actus> | undefined>();

  async function refer () { actus = await (agendum as NomenActum).actus() ?? undefined; }
</script>

<template>
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <gustulare v-if='!!gustulus' :gustulus='gustulus' />
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <inflectere v-else-if='!!actus' :agendum='actus' @blur='actus = undefined' />
  <tabulare v-else :agendum='agendum' categoria='nomen' />
  <v-btn v-if='actum' :text="$t('categoria.actus.singularis', 'capitalize')" append-icon='sprint'
         id='actus' @click='refer()' />
</template>
