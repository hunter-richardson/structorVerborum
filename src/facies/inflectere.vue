<script setup lang='ts'>
  import { ref, type Ref } from 'vue'
  import { type Eventus } from '../miscella/dictionarium'
  import type { Referendum, Tabulator } from '../praebeunda/interfecta'
  import { Adiectivum, Adverbium, Nomen, Numeramen, Pronomen, type TabulatorActuum } from '../praebeunda/verba'
  import Actuum from './tabulam/actuum.vue'
  import Adiectivorum from './tabulam/adiectivorum.vue'
  import Nominum from './tabulam/nominum.vue'
  import Tabulare from './tabulare.vue'

  const eventus: Ref<Eventus | undefined> = ref<Eventus | undefined>()

  const categoria: string = eventus.value?.categoria ?? ''
  const referendum: Ref<Referendum | undefined> = ref<Referendum | undefined>(eventus as Referendum)
</script>

<template>
  <template v-if='referendum !== undefined'>
    <v-dialog @blur='referendum = undefined; eventus = undefined'>
      <Actuum v-if="categoria === 'actus'"
              :agendum='referendum as TabulatorActuum' />
      <Nominum v-else-if="categoria === 'nomen'"
               :agendum='referendum as Tabulator<Nomen>' />
      <Adiectivorum v-else-if="categoria === 'adiectivum'"
                    :agendum='referendum as Tabulator<Adiectivum>' />
      <Tabulare v-else-if="/^(adverium|(numera|prono)men)$/.test(categoria ?? '')"
                :agendum='referendum as Tabulator<Adverbium | Numeramen | Pronomen>'
                :categoria='categoria' />
      <template v-else><div /></template>
    </v-dialog>
  </template>
</template>
