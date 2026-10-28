<script setup lang="ts">
  import { ref, type Ref } from 'vue'
  import { TabulamenAdiectivi, TabulamenIncomparabilis, TabulamenNominis } from '@/praebeunda/tabulamina'
  import { type Lineae, genera, gradus } from '@/praebeunda/valores'
  import Tabulare from '@/facies/tabulas/tabulare.vue'
  import { Tabulator } from '@/praebeunda/interfecta'
  import Inflectere from '@/facies/inflectere.vue'
  import { Adiectivum } from '@/praebeunda/verba'
  import translation from '@/extensions/i18next'
  import '@/extensions/array'

  type Par = {
    title: string
    value: string
  }

  const { t, tf } = translation()
  const { agendum } = defineProps<{ agendum: Tabulator<Adiectivum> }>()
  const nomen: Ref<TabulamenNominis | undefined> = ref<TabulamenNominis | undefined>()

  const incomparabilium: boolean = agendum instanceof TabulamenIncomparabilis
  const graduum: Par[] = paria(gradus)
  const generum: Par[] = paria(genera)
  const et = { gradus: '', genus: '' }

  if (incomparabilium) et.gradus = 'positivus'

  function paria(valores: Lineae): Par[] {
    return valores.map((valor) => {
      return {
        title: tf(`${valor}_singulare`, 'capital'),
        value: valor,
      }
    })
  }

  async function referComparabile(): Promise<void> {
    nomen.value =
      (await (agendum as TabulamenAdiectivi).probetur({
        gradus: et.gradus as 'positivus' | 'comparativus' | 'superlativus',
        genus: et.genus as 'neutrum' | 'masculinum' | 'femininum',
      })) ?? undefined
  }
</script>

<template>
  <Inflectere v-if="nomen !== undefined" :agendum="nomen" @blur="nomen = undefined" />
  <template v-else>
    <Tabulare :agendum="agendum" :categoria="Adiectivum.name.lowercase" />
    <v-select id="genus" v-model="et.genus" density="compact" :label="t('partes.genus_singulare', 'capital')" :items="generum" chips flat open-on-clear />
    <v-select v-if="!incomparabilium" id="gradus" v-model="et.gradus" density="compact" :items="graduum" chips flat open-on-clear :label="tf('partes.gradus_singulare', 'capitalize')" />
    <v-btn v-if="!et.gradus.empty && !et.genus.empty" id="probetur" :text="t('annuli.tabulare.probare')" append-icon="open_in_full" @click="referComparabile()" />
  </template>
</template>
