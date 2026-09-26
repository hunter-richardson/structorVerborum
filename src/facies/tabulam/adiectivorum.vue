<script setup lang='ts'>
  import { defineProps, ref } from 'vue';
import '../../extensions/array.ts';
import translation from '../../extensions/i18next.ts';
import { genera, gradua } from '../../miscella/enumerationes';
import { AdiectivumAgendum, Incomparabile, NomenAgendum } from '../../praebeunda/agenda';
import { type Faciendum } from '../../praebeunda/interfecta';
import { Adiectivum } from '../../praebeunda/verba';
import Gustulus from '../../scriptura/gustulus';
import gustulare from '../gustulare.vue';
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

  export interface Forma {
    gustulus?: Gustulus,
    agendum: Faciendum<Adiectivum>;
  }

  const { tf } = translation();

  const { gustulus, agendum } = defineProps<Forma>();
  const lectum: boolean = agendum instanceof AdiectivumAgendum;
  const incomparabilium: boolean = agendum instanceof Incomparabile;

  let nomen: NomenAgendum | undefined = ref<NomenAgendum | undefined>('nomen');
  const et: Et = { gradus: '', genus: '' };

  function paria (valores: string[]): Par[] {
    return valores.map(valor => {
      return {
        title: tf(`${valor}_singulare`, 'capital'),
        value: valor
      };
    });
  }

  const valoresGraduum: Par[] = paria(gradua);
  const valoresGenerum: Par[] = paria(genera);

  function referIncomparabile (): void
  { nomen = (agendum as Incomparabile).probetur(et.genus) ?? undefined; }

  async function referComparabile (): Promise<void> {
    nomen = await (agendum as AdiectivumAgendum).probetur({
      gradus: et.gradus,
      genus: et.genus
    }) ?? undefined;
  }
</script>

<template>
  <gustulare v-if='!!gustulus' :gustulus='gustulus' />
  <inflectere v-else-if='!!nomen' :agendum='nomen' @blur='nomen = undefined' />
  <tabulare v-else :agendum='agendum' categoria='adiectivum' />
  <template v-if='lectum || incomparabilium'>
    <v-select density='compact' id='genus' :label="$('partes.genus_singulare', 'capital')"
              v-model='et.genus' :items='valoresGenerum' chips flat open-on-clear />
    <v-btn v-if='incomparabilium' :text="$t('annuli.tabulare.probare')" id='probetur'
           append-icon='open_in_full' @click='referIncomparabile()' />
    <template v-else-if='lectum'>
      <v-select density='compact' id='gradus' :label="$('partes.gradus_singulare', 'capital' )"
                v-model='et.gradus' :items='valoresGraduum' chips flat open-on-clear />
      <v-btn :text="$t('annuli.tabulare.probare')" id='probetur' append-icon='open_in_full'
             @click='referComparabile()' />
    </template>
  </template>
</template>
