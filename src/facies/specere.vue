<script setup lang='ts'>
  import { defineProps, ref, type Ref } from 'vue';
  import '../extensions/string.ts';
  import { type Eventus } from '../miscella/dictionarium.ts';
  import { Encliticum, enclitica } from '../miscella/enumerationes.ts';
  import { locutor } from '../miscella/locutor.ts';
  import { type NumeramenAgendum } from '../praebeunda/agenda.ts';
  import { Actus, Multiplex, Numerale, Verbum } from '../praebeunda/verba.ts';
  import Gustulus from '../scriptura/gustulus.ts';
  import Docere from './docere.vue';
  import Gustulare from './gustulare.vue';
  import Inflectere from './inflectere.vue';

  let valorEnclitici: string = Encliticum.nullum

  export interface Forma {
    gustulus?: Gustulus,
    verbum: Verbum
  }

  const valores: string[] = []
  const valoresEnclitici: string[] = []

  const { gustulus, verbum } = defineProps<Forma>();
  const eventus: Ref<Eventus | undefined> = ref<Eventus | undefined>()
  const multiplex: boolean = verbum instanceof Multiplex
  const propriabile: boolean = [
      [ 'nomen', 'adiectiva' ].includes(verbum.categoria.valor ?? ''),
      verbum.scriptum.isCapitalized()
    ].all()

  if(multiplex) {
    (verbum as Multiplex).valores()
        .forEach((valor) => valores.push(valor))
    enclitica.filter((valor) => !verbum.scriptum.endsWith(valor))
             .forEach((valor) => valoresEnclitici.push(valor))
  }

  async function aperi() {
    if(verbum) {
      switch(verbum.categoria.valor) {
        case 'actus': {
          const actus: Actus = verbum as Actus
          if(actus.modus.aequatur('participium'))
            eventus.value = {
              ...(await actus.participialis()),
              categoria: 'adiectivum'
            }; break
        } case 'numerus': {
          const numerus: Numerale = verbum as Numerale
          const agendum: NumeramenAgendum | undefined = await numerus.numeramen()
          // eslint-disable-next-line no-extra-boolean-cast
          if(!!agendum)
            eventus.value = {
              ...agendum,
              categoria: 'numeramen'
            }
        }; break
      }
    }
  }

  function adde() {
    if(verbum) {
      if([multiplex, !!valorEnclitici].all())
        (verbum as Multiplex).encliticum = valorEnclitici as Encliticum
      verbum.scriptum = verbum.scriptum.toLowerCase()
      locutor.hoc().addatur(verbum)
    }
  }

  function addeProprium() {
    if (verbum) {
      if ([ multiplex, !!valorEnclitici ].all())
        (verbum as Multiplex).encliticum = valorEnclitici as Encliticum;
      if(propriabile)
        verbum.scriptum = verbum.scriptum.capitalize()
      locutor.hoc().addatur(verbum);
    }
  }
</script>

<template>
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <Gustulare v-if='!!gustulus' :gustulus='gustulus' />
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <Inflectere v-if='!!eventus' :eventus='eventus' @blur='eventus = undefined' />
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <v-dialog v-else-if='!!verbum && !!verbum.categoria.valor'>
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
      <Docere :docendum='verbum.categoria.valor' />
      <Docere v-if='multiplex' v-for='valor in valores' :key='valor' :docendum='valor' />
      <v-btn-toggle>
        <template v-if='verbum?.paratumne()'>
          <v-btn icon='chat_add_on' id='adde' @click='adde()'
                 :text="$t('annuli.specere.addere')" />
        </template>
        <template v-if='propriabile'>
          <v-bnt icon='chat_add_on' id='addeProprium' @click='addeProprium()'
                 :text="$t('annuli.specere.addereProprium')" />
        </template>
        <template v-else-if="verbum?.categoria.aequatur('numerus')">
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
