<script setup lang='ts'>
  import { defineProps, ref, type Ref } from 'vue';
  import '../../extensions/array.ts';
  import translation from '../../extensions/i18next.ts';
  import { genera, gradus } from '../../miscella/enumerationes.ts';
  import { AdiectivumAgendum, Incomparabile, NomenAgendum } from '../../praebeunda/agenda.ts';
  import { type Faciendum } from '../../praebeunda/interfecta.ts';
  import { Adiectivum } from '../../praebeunda/verba.ts';
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

  const { agendum } = defineProps<{ agendum: Faciendum<Adiectivum> }>();
  const lectum: boolean = agendum instanceof AdiectivumAgendum;
  const incomparabilium: boolean = agendum instanceof Incomparabile;

  const nomen: Ref<NomenAgendum | undefined> = ref<NomenAgendum | undefined>(undefined);
  const et: Et = { gradus: '', genus: '' };

  function paria (valores: string[]): Par[] {
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
  { nomen.value = (agendum as Incomparabile).probetur(et.genus) ?? undefined; }

  async function referComparabile (): Promise<void> {
    nomen.value = await (agendum as AdiectivumAgendum).probetur({
      gradus: et.gradus,
      genus: et.genus
    }) ?? undefined;
  }
</script>

<template>
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <inflectere v-if='!!nomen' :agendum='nomen' @blur='nomen = undefined' />
  <tabulare v-else :agendum='agendum' categoria='adiectivum' />
  <template v-if='lectum || incomparabilium'>
    <v-select density='compact' id='genus' :label="$('partes.genus_singulare', 'capital')"
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
