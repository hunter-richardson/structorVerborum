<script setup lang='ts'>
  import { ref, type Ref } from 'vue'
  import { type Eventus } from '../miscella/dictionarium.ts'
  import { type Faciendum, type Referendum } from '../praebeunda/interfecta.ts'
  import type { Actus, Adiectivum, Adverbium, Nomen, Numeramen, Pronomen } from '../praebeunda/verba.ts'
  import actuum from './tabulam/actuum.vue'
  import adiectivorum from './tabulam/adiectivorum.vue'
  import nominum from './tabulam/nominum.vue'

  const eventus: Ref<Eventus | undefined> = ref<Eventus | undefined>()

  const categoria: string = eventus.value?.categoria ?? ''
  const referendum: Ref<Referendum | undefined> = ref<Referendum | undefined>(eventus as Referendum)
</script>

<template>
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <template v-if='!!referendum'>
    <v-dialog @blur='referendum = undefined; eventus = undefined'>
      <actuum v-if="categoria === 'actus'"
              :agendum='referendum as Faciendum<Actus>' />
      <nominum v-else-if="categoria === 'nomen'"
               :agendum='referendum as Faciendum<Nomen>' />
      <adiectivorum v-else-if="categoria === 'adiectivum'"
                    :agendum='referendum as Faciendum<Adiectivum>' />
      <tabulare v-else-if="/^(adverium|(numera|prono)men)$/.test(categoria ?? '')"
                :agendum='referendum as Faciendum<Adverbium | Numeramen | Pronomen>'
                :categoria='categoria' />
      <template v-else><div /></template>
    </v-dialog>
  </template>
</template>
