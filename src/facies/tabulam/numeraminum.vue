<script lang='ts'>
  import { defineProps, ref } from 'vue';
import '../../extensions/array.ts';
import type { Faciendum, Referendum } from '../../praebeunda/interfecta';
import { Numeramen } from '../../praebeunda/verba';
import Gustulus from '../../scriptura/gustulus';
import gustulare from '../gustulare.vue';
import inflectere from '../inflectere.vue';
import tabulare from '../tabulare.vue';

  export interface Forma {
    gustulus?: Gustulus,
    agendum: Faciendum<Numeramen>;
  }

  const { gustulus, agendum } = defineProps<Forma>();
  let referendum: Referendum | undefined = ref<Referendum | undefined>();

  async function refer (res: string) { referendum = await agendum.referatur(res) ?? undefined; }
</script>

<template>
  <gustulare v-if='!!gustulus' :gustulus='gustulus' />
  <inflectere v-if='referendum' :eventus='referendum' @blur='referendum = undefined' />
  <tabulare v-else :agendum='agendum' categoria='numeramen' />
</template>
