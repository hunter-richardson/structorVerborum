<script setup lang='ts'>
  import { ref, type Ref } from 'vue'
  import { type Eventus } from '@/miscella/dictionarium'
  import { type Referendum, Tabulator } from '@/praebeunda/interfecta'
  import { Actus, Adiectivum, Adverbium, Nomen, Numeramen, Pronomen, type TabulatorActuum } from '@/praebeunda/verba'
  import Actuum from '@/facies/tabulam/actuum.vue'
  import Adiectivorum from '@/facies/tabulam/adiectivorum.vue'
  import Nominum from '@/facies/tabulam/nominum.vue'
  import Tabulare from '@/facies/tabulare.vue'
  import { buildRegExp, choiceOf, endOfString, startOfString } from 'ts-regex-builder';

  type TabulatorumDirectorum = Tabulator<Adverbium | Numeramen | Pronomen>

  function aliust (): boolean {
    return buildRegExp([
      startOfString,
      choiceOf(...[
        Adverbium, Numeramen, Pronomen
      ].map(classis => classis.name.toLowerCase())),
      endOfString ]).test(categoria);
  }

  const eventus: Ref<Eventus | undefined> = ref<Eventus | undefined>()

  const categoria: string = eventus.value?.categoria ?? ''
  const referendum: Ref<Referendum | undefined> = ref(eventus.value as Referendum)
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
                :agendum='referendum as TabulatorumDirectorum' />
      <template v-else>
        <div />
      </template>
    </v-dialog>
  </template>
</template>
