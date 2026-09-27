<script lang='ts'>
  import { defineProps, ref } from 'vue'
  import '../../extensions/array.ts'
  import type { Faciendum, Referendum } from '../../praebeunda/interfecta.ts'
  import { Numeramen } from '../../praebeunda/verba.ts'
  import Gustulus from '../../scriptura/gustulus.ts'
  import gustulare from '../gustulare.vue'
  import inflectere from '../inflectere.vue'
  import tabulare from '../tabulare.vue'

  export interface Forma {
    gustulus?: Gustulus,
    agendum: Faciendum<Numeramen>;
  }

  const { gustulus, agendum } = defineProps<Forma>();
  let referendum: Referendum | undefined = ref<Referendum | undefined>();

  async function refer (res: string) { referendum = await agendum.referatur(res) ?? undefined; }
</script>

<template>
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <inflectere v-if='!!referendum' :eventus='referendum' @blur='referendum = undefined' />
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <tabulare v-else :agendum='agendum' categoria='numeramen' />
</template>
