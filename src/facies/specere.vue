<script setup lang='ts'>
  import { defineProps, ref } from 'vue';
import '../extensions/string';
import { type Eventus } from '../miscella/dictionarium';
import { encliticum } from '../miscella/enumerationes';
import { locutor } from '../miscella/locutor';
import { type NumeramenAgendum } from '../praebeunda/agenda';
import { Actus, Multiplex, Numerus, Verbum } from '../praebeunda/verba';
import Gustulus from '../scriptura/gustulus';
import docere from './docere.vue';
import gustulare from './gustulare.vue';
import inflectere from './inflectere.vue';

  let valorEnclitici: string = encliticum.nullum

  export interface Forma {
    gustulus?: Gustulus,
    verbum: Verbum
  }

  let multiplex: boolean = false
  let propriabile: boolean = false
  const valores: string[] = []
  const enclitica: string[] = []

  const { gustulus, verbum } = defineProps<Forma>();
  let eventus: Eventus | undefined = ref<Eventus | undefined>('eventus')

  if(verbum) {
    multiplex = verbum instanceof Multiplex
    propriabile = ['nomen', 'adiectiva'].includes(verbum.categoria) &&
                  verbum.scriptum.isCapitalized()
    if(multiplex) {
      (verbum as Multiplex).valores()
          .forEach((valor) => valores.push(valor))
      Object.keys(encliticum)
            .filter((valor) => !verbum.scriptum.endsWith(valor))
            .forEach((valor) => enclitica.push(valor))
    }
  }

  async function aperi() {
    if(verbum) {
      switch(verbum.categoria) {
        case 'actus': {
          const actus: Actus = verbum as Actus
          if(actus.modus === 'participium')
            eventus = {
              ...(await actus.participialis()),
              categoria: 'adiectivum'
            }; break
        } case 'numerus': {
          const numerus: Numerus = verbum as Numerus
          const agendum: NumeramenAgendum | undefined = await numerus.numeramen()
          if(!!agendum)
            eventus = {
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
        (verbum as Multiplex).encliticum = valorEnclitici as encliticum
      verbum.scriptum = verbum.scriptum.toLowerCase()
      locutor.hoc().addatur(verbum)
    }
  }

  function addeProprium() {
    if (verbum) {
      if ([ multiplex, !!valorEnclitici ].all())
        (verbum as Multiplex).encliticum = valorEnclitici as encliticum;
      if(propriabile)
        verbum.scriptum = verbum.scriptum.capitalize()
      locutor.hoc().addatur(verbum);
    }
  }
</script>

<template>
  <gustulare v-if='!!gustulus' :gustulus='gustulus' />
  <inflectere v-if='!!eventus' :eventus='eventus' @blur='eventus = undefined' />
  <v-dialog v-else-if='verbum'>
    <v-card :title='verbum.scriptum' :subtitle='verbum.categoria.capitalize()'>
      <template v-if='multiplex'>
        <v-chip-group>
          <v-chip v-for='valor in valores' :key='valor' :text='valor' :id="`valor_${valor}`"
                  selected-class='text-primary' prepend-icon='category' />
        </v-chip-group>
        <v-select density='compact' id='enclitica' v-model='encliticum'
                  :title="$tf('categoriae.encliticum_pluralis', 'capitalize')"
                  :items='enclitica' chips flat open-on-clear />
      </template>
      <docere :docendum='verbum.categoria' />
      <docere v-if='multiplex' v-for='valor in valores' :key='valor' :docendum='valor' />
      <v-btn-toggle>
        <template v-if='verbum?.paratumne()'>
          <v-btn icon='chat_add_on' id='adde' @click='adde()'
                 :text="$t('annuli.specere.addere')" />
        </template>
        <template v-if='propriabile'>
          <v-bnt icon='chat_add_on' id='addeProprium' @click='addeProprium()'
                 :text="$t('annuli.specere.addereProprium')" />
        </template>
        <template v-else-if="verbum?.categoria === 'numerus'">
          <v-btn icon='quick_reference' id='aperi' @click='aperi()'
                 :text="$t('annuli.specere.aperire')" />
        </template>
        <template v-else-if="[
          verbum?.categoria === 'actus',
          valores.includes('participium')
        ].all()">
          <v-btn icon='quick_reference' id='aperi' @click='aperi()'
                 :text="$tf('categoriae.participium_singularis', 'capitalize')" />
        </template>
      </v-btn-toggle>
    </v-card>
  </v-dialog>
</template>
