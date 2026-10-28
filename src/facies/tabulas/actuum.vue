<script setup lang="ts">
  import { ref, type Ref } from 'vue'
  import { Actus, Nomen, TabulatorActuum } from '@/praebeunda/verba'
  import { type Referendum } from '@/praebeunda/interfecta'
  import Tabulare from '@/facies/tabulas/tabulare.vue'
  import Inflectere from '@/facies/inflectere.vue'
  import '@/extensions/array'

  const { agendum } = defineProps<{ agendum: TabulatorActuum }>()
  const referendum: Ref<Referendum | undefined> = ref<Referendum | undefined>()

  const tria = [
    {
      actus: () => refer(agendum.nomen()),
      scriptum: 'partes.gerundium_singularis',
      ipsum: Nomen.name.lowercase,
      icon: 'subject',
    },
    {
      actus: () => refer(agendum.actor('masculinum')),
      scriptum: 'scripta.inflectere.actus.actor',
      ipsum: 'actor',
      icon: 'man',
    },
    {
      actus: () => refer(agendum.actor('femininum')),
      scriptum: 'scripta.inflectere.actus.actrix',
      ipsum: 'actrix',
      icon: 'woman',
    },
  ]

  async function refer(hoc: Promise<Referendum | undefined>) {
    referendum.value = await hoc
  }
</script>

<template>
  <Inflectere v-if="referendum !== undefined" :agendum="referendum" @blur="referendum = undefined" />
  <template v-else-if="agendum !== undefined">
    <Tabulare :agendum="agendum" :categoria="Actus.name.lowercase" />
    <v-btn-toggle>
      <v-btn v-for="res in tria" :id="res.ipsum" :key="res.ipsum" :text="$tf(res.scriptum, 'capitalize')" @click="res.actus()" />
    </v-btn-toggle>
  </template>
</template>
