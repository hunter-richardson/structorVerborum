<script setup lang='ts'>
  import { ref, type Ref } from 'vue'
  import '@/extensions/array'
  import { TabulamenNominis, type TabulamenFacti } from '@/praebeunda/tabulamina'
  import { Tabulator } from '@/praebeunda/interfecta'
  import { Nomen } from '@/praebeunda/verba'
  import inflectere from '@/facies/inflectere.vue'
  import tabulare from '@/facies/tabulare.vue'
  import { type Eventus } from '@/miscella/dictionarium'
  import translation from '@/extensions/i18next';

  const { t } = translation()
  const { agendum } = defineProps<{ agendum: Tabulator<Nomen> }>();
  const actus: Ref<Eventus | undefined> = ref();
  const factum: boolean = agendum instanceof TabulamenNominis;

  async function refer ()
  { actus.value = await (agendum as TabulamenFacti).actus() ?? undefined; }
</script>

<template>
  <inflectere v-if='actus !== undefined' :agendum='actus'
              @blur='actus = undefined' />
  <template v-else>
    <tabulare :agendum='agendum' :categoria='Nomen.name.lowercase' />
    <v-btn v-if='factum' id='actus' append-icon='sprint'
           :text="t('categoria.actus.singularis', 'capitalize')"
           @click='refer()' />
  </template>
</template>
