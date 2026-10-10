<script setup lang='ts'>
  import { defineProps, ref, type Ref } from 'vue';
  import '../extensions/string';
  import { type Eventus } from '../miscella/dictionarium';
  import { Encliticus, enclitici } from '../praebeunda/valores';
  import { locutor } from '../miscella/locutor';
  import { Actus, Multiplex, Numerale, Verbum, Numeramen } from '../praebeunda/verba';
  import Gustulus from '../scriptura/gustulus';
  import Docere from './docere.vue';
  import Gustulare from './gustulare.vue';
  import Inflectere from './inflectere.vue';
import type { TabulamenNumeraminis } from '../praebeunda/tabulamina';

  let valorEnclitici: string = Encliticus.nullus

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
    (verbum as Multiplex).valores
        .forEach((valor) => valores.push(valor.valor))
    enclitici.filter((valor) => !verbum.scriptum.endsWith(valor))
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
          const agendum: TabulamenNumeraminis | undefined = await numerus.numeramen()
          if(agendum !== undefined)
            eventus.value = {
              ...agendum,
              categoria: 'numeramen'
            }
        }; break
        case 'numeramen': {
          const numeramen: Numeramen = verbum as Numeramen
          const referendus: Eventus | undefined = await numeramen.refer()
          if(referendus !== undefined)
            eventus.value = referendus
        }; break
      }
    }
  }

  function adde() {
    if(verbum) {
      if([multiplex, valorEnclitici.length > 0].all())
        (verbum as Multiplex).encliticus = valorEnclitici as Encliticus
      verbum.scriptum = verbum.scriptum.toLowerCase()
      locutor.addatur(verbum)
    }
  }

  function addeProprium() {
    if (verbum) {
      if ([ multiplex, valorEnclitici.length > 0 ].all())
        (verbum as Multiplex).encliticus = valorEnclitici as Encliticus;
      if(propriabile)
        verbum.scriptum = verbum.scriptum.capitalize()
      locutor.addatur(verbum);
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
      <Docere :docendum='verbum.categoria.valor' />
      <Docere v-if='multiplex' v-for='valor in valores' :key='valor' :docendum='valor' />
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
