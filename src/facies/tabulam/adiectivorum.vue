<script setup lang='ts'>
  import { defineProps, ref, type Ref } from 'vue';
  import '@/extensions/array';
  import translation from '@/extensions/i18next';
  import { type Lineae, genera, gradus } from '@/praebeunda/valores';
  import { TabulamenAdiectivi, TabulamenIncomparabilis, TabulamenNominis } from '@/praebeunda/tabulamina';
  import { Tabulator } from '@/praebeunda/interfecta';
  import { Adiectivum } from '@/praebeunda/verba';
  import inflectere from '@/facies/inflectere.vue';
  import tabulare from '@/facies/tabulare.vue';

  type Par = {
    title: string,
    value: string
  }

  type Et = {
    gradus: string,
    genus: string
  }

  const { agendum } = defineProps<{ agendum: Tabulator<Adiectivum> }>()
  const incomparabilium: boolean = agendum instanceof TabulamenIncomparabilis

  const nomen: Ref<TabulamenNominis | undefined> = ref<TabulamenNominis | undefined>()
  const et: Et = { gradus: '', genus: '' }

  function paria (valores: Lineae): Par[] {
    return valores.map(valor => {
      return {
        title: translation().tf(`${valor}_singulare`, 'capital'),
        value: valor
      }
    })
  }

  const valoresGraduum: Par[] = paria(gradus);
  const valoresGenerum: Par[] = paria(genera);

  async function referComparabile (): Promise<void> {
    nomen.value = await (agendum as TabulamenAdiectivi).probetur({
      gradus: et.gradus,
      genus: et.genus
    }) ?? undefined
  }
</script>

<template>
  <inflectere v-if='nomen !== undefined' :agendum='nomen' @blur='nomen = undefined' />
  <tabulare v-else :agendum='agendum' categoria='adiectivum' />
  <v-select id='genus' v-model='et.genus' density='compact'
            :label="$t('partes.genus_singulare', 'capital')" :items='valoresGenerum' chips flat open-on-clear />
  <v-btn id='probetur' :text="$t('annuli.tabulare.probare')"
          append-icon='open_in_full' @click='referComparabile()' />
  <template v-if='!incomparabilium'>
    <v-select id='gradus' v-model='et.gradus' density='compact'
              :items='valoresGraduum' chips flat open-on-clear
              :label="$tf('partes.gradus_singulare', 'capitalize' )" />
    <v-btn id='probetur' :text="$t('annuli.tabulare.probare')"
            append-icon='open_in_full' @click='referComparabile()' />
  </template>
</template>
