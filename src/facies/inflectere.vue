<script setup lang="ts">
  import { ref, type Ref } from 'vue'
  import { buildRegExp, choiceOf, endOfString, startOfString } from 'ts-regex-builder'
  import { Actus, Adiectivum, Adverbium, Nomen, Numeramen, Pronomen, type TabulatorActuum } from '@/praebeunda/verba'
  import { type Referendum, Tabulator } from '@/praebeunda/interfecta'
  import Adiectivorum from '@/facies/tabulas/adiectivorum.vue'
  import { type Eventus } from '@/miscella/dictionarium'
  import Tabulare from '@/facies/tabulas/tabulare.vue'
  import Nominum from '@/facies/tabulas/nominum.vue'
  import Actuum from '@/facies/tabulas/actuum.vue'

  type TabulatorumDirectorum = Tabulator<Adverbium | Numeramen | Pronomen>

  const eventus: Ref<Eventus | undefined> = ref<Eventus | undefined>()
  const referendum: Ref<Referendum | undefined> = ref(eventus.value as Referendum)
  const categoria: string = eventus.value?.categoria ?? ''

  function aliust(): boolean {
    return buildRegExp([startOfString, choiceOf(...[Adverbium, Numeramen, Pronomen].map((classis) => classis.name.lowercase)), endOfString]).test(categoria)
  }
</script>

<template>
  <template v-if="referendum !== undefined && categoria !== undefined">
    <v-dialog
      @blur="
        referendum = undefined
        eventus = undefined
      ">
      <Actuum v-if="categoria === Actus.name.lowercase" :agendum="referendum as TabulatorActuum" />
      <Nominum v-else-if="categoria === Nomen.name.lowercase" :agendum="referendum as Tabulator<Nomen>" />
      <Adiectivorum v-else-if="categoria === Adiectivum.name.lowercase" :agendum="referendum as Tabulator<Adiectivum>" />
      <Tabulare v-else-if="aliust()" :categoria="categoria" :agendum="referendum as TabulatorumDirectorum" />
      <template v-else>
        <div />
      </template>
    </v-dialog>
  </template>
</template>
