<script setup lang='ts'>
  import { defineProps, ref, type Ref } from 'vue'
  import '@/extensions/array'
  import { type Referendum } from '@/praebeunda/interfecta'
  import { TabulatorActuum } from '@/praebeunda/verba'
  import inflectere from '@/facies/inflectere.vue'
  import tabulare from '@/facies/tabulare.vue'

  const { agendum } = defineProps<{ agendum: TabulatorActuum }>()
  const referendum: Ref<Referendum | undefined> = ref<Referendum | undefined>()

  async function refer(hoc: Promise<Referendum | undefined>)
  { referendum.value = await hoc }
</script>

<template>
  <inflectere v-if='referendum !== undefined' :agendum='referendum' @blur='referendum = undefined' />
  <tabulare v-else-if='agendum !== undefined' :agendum='agendum' categoria='actus' />
  <v-btn-toggle>
    <v-btn id='nomen' append-icon='subject' @click='refer(agendum.nomen())'
           :text="$tf('partes.gerundium_singularis', 'capitalize')" />
    <v-btn id='actor' append-icon='man' @click="refer(agendum.actor('masculinum'))"
           :text="$tf('scripta.inflectere.actus.actor', 'capitalize')" />
    <v-btn id='actrix' append-icon='woman' @click="refer(agendum.actor('femininum'))"
           :text="$tf('scripta.inflectere.actus.actrix', 'capitalize')" />
  </v-btn-toggle>
</template>
