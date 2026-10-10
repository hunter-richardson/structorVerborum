<script setup lang='ts'>
  import { defineProps, ref, type Ref } from 'vue';
  import '../../extensions/array';
  import translation from '../../extensions/i18next';
  import { Lineae, genera, gradus } from '../../praebeunda/valores';
  import { TabulamenAdiectivi, TabulamenIncomparabilis, TabulamenNominis } from '../../praebeunda/tabulamina';
  import { type Tabulator } from '../../praebeunda/interfecta';
  import { Adiectivum } from '../../praebeunda/verba';
  import inflectere from '../inflectere.vue';
  import tabulare from '../tabulare.vue';

  type Par = {
    title: string,
    value: string;
  };

  type Et = {
    gradus: string,
    genus: string;
  };

  const { agendum } = defineProps<{ agendum: Tabulator<Adiectivum> }>();
  const incomparabilium: boolean = agendum instanceof TabulamenIncomparabilis;
  const lectum: boolean = incomparabilium || agendum instanceof TabulamenAdiectivi;

  const nomen: Ref<TabulamenNominis | undefined> = ref<TabulamenNominis | undefined>(undefined);
  const et: Et = { gradus: '', genus: '' };

  function paria (valores: Lineae): Par[] {
    return valores.map(valor => {
      return {
        title: translation().tf(`${valor}_singulare`, 'capital'),
        value: valor
      };
    });
  }

  const valoresGraduum: Par[] = paria(gradus);
  const valoresGenerum: Par[] = paria(genera);

  function referIncomparabile (): void
  { nomen.value = (agendum as TabulamenIncomparabilis).probetur(et.genus) ?? undefined; }

  async function referComparabile (): Promise<void> {
    nomen.value = await (agendum as TabulamenAdiectivi).probetur({
      gradus: et.gradus,
      genus: et.genus
    }) ?? undefined;
  }
</script>

<template>
  <inflectere v-if='nomen !== undefined' :agendum='nomen' @blur='nomen = undefined' />
  <tabulare v-else :agendum='agendum' categoria='adiectivum' />
  <template v-if='lectum || incomparabilium'>
    <v-select density='compact' id='genus' :label="$t('partes.genus_singulare', 'capital')"
              v-model='et.genus' :items='valoresGenerum' chips flat open-on-clear />
    <v-btn v-if='incomparabilium' :text="$t('annuli.tabulare.probare')" id='probetur'
           append-icon='open_in_full' @click='referIncomparabile()' />
    <template v-else-if='lectum'>
      <v-select density='compact' id='gradus' v-model='et.gradus'
                :items='valoresGraduum' chips flat open-on-clear
                :label="$tf('partes.gradus_singulare', 'capitalize' )" />
      <v-btn :text="$t('annuli.tabulare.probare')" id='probetur'
             append-icon='open_in_full' @click='referComparabile()' />
    </template>
  </template>
</template>
