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

  function aliust(): boolean {
    buildRegExp([
      startOfString,
      choiceOf(...[
        Adverbium, Numeramen, Pronomen
      ].map(classis => classis.name.toLowerCase()) ),
      endOfString ]).test(categoria)
  }
</script>

<template>
  <template v-if='referendum !== undefined && categoria !== undefined'>
    <v-dialog @blur='referendum = undefined; eventus = undefined'>
      <Actuum v-if='categoria === Actus.name.toLowerCase()'
              :agendum='referendum as TabulatorActuum' />
      <Nominum v-else-if='categoria === Nomen.name.toLowerCase()'
               :agendum='referendum as Tabulator<Nomen>' />
      <Adiectivorum v-else-if='categoria === Adiectivum.name.toLowerCase()'
                    :agendum='referendum as Tabulator<Adiectivum>' />
      <Tabulare v-else-if='aliust()' :categoria='categoria'
                :agendum='referendum as Tabulator<Adverbium | Numeramen | Pronomen>' />
      <template v-else><div /></template>
    </v-dialog>
  </template>
</template>
