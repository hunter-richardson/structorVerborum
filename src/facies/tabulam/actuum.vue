<script setup lang='ts'>
  import { ref, type Ref } from 'vue'
  import '@/extensions/array'
  import { type Referendum } from '@/praebeunda/interfecta'
  import { Actus, Nomen, TabulatorActuum } from '@/praebeunda/verba'
  import inflectere from '@/facies/inflectere.vue'
  import tabulare from '@/facies/tabulare.vue'

  const { agendum } = defineProps<{ agendum: TabulatorActuum }>()
  const referendum: Ref<Referendum | undefined> = ref<Referendum | undefined>()

  const tria= [
    {
      actus: () => refer(agendum.nomen()),
      scriptum: 'partes.gerundium_singularis',
      ipsum: Nomen.name.toLowerCase(),
      icon: 'subject'
    }, {
      actus: () => refer(agendum.actor('masculinum')),
      scriptum: 'scripta.inflectere.actus.actor',
      ipsum: 'actor',
      icon: 'man'
    }, {
      actus: () => refer(agendum.actor('femininum')),
      scriptum: 'scripta.inflectere.actus.actrix',
      ipsum: 'actrix',
      icon: 'woman'
    }
  ]

  async function refer(hoc: Promise<Referendum | undefined>)
  { referendum.value = await hoc }
</script>

<template>
  <inflectere v-if='referendum !== undefined' :agendum='referendum'
              @blur='referendum = undefined' />
  <tabulare v-else-if='agendum !== undefined' :agendum='agendum'
            :categoria='Actus.name.toLowerCase()' />
  <v-btn-toggle>
    <v-btn v-for='res in tria' :id='res.ipsum' :key='res.ipsum'
           :text="$tf(res.scriptum, 'capitalize')"
           @click='res.actus()' />
  </v-btn-toggle>
</template>
