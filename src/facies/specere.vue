<script setup lang='ts'>
  import { defineProps, ref, type Ref } from 'vue';
  import '../extensions/string';
  import { type Eventus } from '../miscella/dictionarium';
  import { Encliticus, enclitici } from '../praebeunda/valores';
  import { locutor } from '../miscella/locutor';
  import { Actus, Multiplex, Numerale, Verbum, Numeramen, Adiectivum } from '../praebeunda/verba';
  import Gustulus from '../scriptura/gustulus';
  import Docere from './docere.vue';
  import Gustulare from './gustulare.vue';
  import Inflectere from './inflectere.vue';
  import type { TabulamenNumeraminis } from '../praebeunda/tabulamina';

  const valorEnclitici: Ref<string> = ref(Encliticus.nullus)

  const valores: string[] = []
  const valoresEnclitici: string[] = []

  const gustulus = defineProps<Gustulus>()

  const verbum: Ref<Verbum | undefined> = ref()
  const eventus: Ref<Eventus | undefined> = ref()
  const multiplex: boolean = verbum.value !== undefined && verbum.value instanceof Multiplex
  const propriabile: boolean = [
      [ 'nomen', 'adiectiva' ].includes(verbum.value?.categoria.valor ?? ''),
      verbum.value?.scriptum.isCapitalized() || false
    ].all()

  if(verbum.value !== undefined && multiplex) {
    (verbum.value as Multiplex).valores
        .forEach((valor) => valores.push(valor.valor))
    enclitici.filter((valor) => !(verbum.value.scriptum.endsWith(valor)))
             .forEach((valor) => valoresEnclitici.push(valor))
  }

  async function aperi() {
    if(verbum.value !== undefined) {
      switch(verbum.value.categoria.valor) {
        case 'actus': {
          const actus: Actus = verbum.value as Actus
          if(actus.modus.aequatur('participium'))
            eventus.value = {
              ...(await actus.participialis()),
              categoria: Adiectivum.name.toLowerCase()
            }; break
        } case 'numerus': {
          const numerus: Numerale = verbum.value as Numerale
          const agendum: TabulamenNumeraminis | undefined = await numerus.numeramen()
          if(agendum !== undefined)
            eventus.value = {
              ...agendum,
              categoria: Numeramen.name.toLowerCase()
            }
        } break
        case 'numeramen': {
          const numeramen: Numeramen = verbum.value as Numeramen
          const referendus: Eventus | undefined = await numeramen.refer()
          if(referendus !== undefined) eventus.value = referendus
        } break
      }
    }
  }

  function adde() {
    if(verbum.value !== undefined) {
      if([ multiplex, valorEnclitici.value.length > 0 ].all())
        (verbum.value as Multiplex).encliticus = valorEnclitici.value as Encliticus
      verbum.value.scriptum = verbum.value.scriptum.toLowerCase()
      locutor.addatur(verbum.value)
    }
  }

  function addeProprium() {
    if (verbum.value !== undefined) {
      if ([ multiplex, valorEnclitici.value.length > 0 ].all())
        (verbum.value as Multiplex).encliticus = valorEnclitici.value as Encliticus
      if(propriabile)
        verbum.value.scriptum = verbum.value.scriptum.capitalize()
      locutor.addatur(verbum.value)
    }
  }
</script>

<template>
  <Gustulare v-if='gustulus !== undefined' :gustulus='gustulus' />
  <Inflectere v-if='eventus !== undefined' :eventus='eventus' @blur='eventus = undefined' />
  <v-dialog v-else-if='verbum !== undefined && verbum.categoria.valor !== undefined'>
    <v-card :title='verbum.monstretur()'
            :subtitle="$t(`partes.${verbum.categoria.valor}_singulare`, 'capitalize')">
      <template v-if='multiplex'>
        <v-chip-group>
          <v-chip v-for='valor in valores' :key='valor' :text='valor' :id="`valor_${valor}`"
                  selected-class='text-primary' prepend-icon='category' />
        </v-chip-group>
        <v-select density='compact' id='enclitica' v-model='valorEnclitici'
                  :title="$tf('categoriae.encliticum_plurale', 'capitalize')"
                  :items='valoresEnclitici' chips flat open-on-clear />
      </template>
      <Docere :prima='verbum.categoria.valor' />
      <template v-if='multiplex'>
        <Docere v-for='valor in valores' :key='valor' :prima='valor' />
      </template>
      <v-btn-toggle>
        <template v-if='verbum?.paratust()'>
          <v-btn icon='chat_add_on' id='adde' @click='adde()'
                 :text="$t('annuli.specere.addere')" />
        </template>
        <template v-if='propriabile && verbum?.paratust()'>
          <v-bnt icon='chat_add_on' id='addeProprium' @click='addeProprium()'
                 :text="$t('annuli.specere.addereProprium')" />
        </template>
        <template v-else-if="/^numer(amen|us)$/.test(verbum?.categoria.valor ?? '')">
          <v-btn icon='quick_reference' id='aperi' @click='aperi()'
                 :text="$t('annuli.specere.aperire')" />
        </template>
        <template v-else-if="[
          verbum?.categoria.aequatur('actus'),
          valores.includes('participium')
        ].all()">
          <v-btn icon='quick_reference' id='aperi' @click='aperi()'
                 :text="$tf('categoriae.participium_singulare', 'capitalize')" />
        </template>
      </v-btn-toggle>
    </v-card>
  </v-dialog>
</template>
