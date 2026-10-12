<script setup lang='ts'>
  import { ref, type Ref } from 'vue';
  import '@/extensions/string';
  import { type Eventus } from '@/miscella/dictionarium';
  import { Encliticus, enclitici } from '@/praebeunda/valores';
  import { locutor } from '@/miscella/locutor';
  import { Actus, Multiplex, Numerale, Verbum, Numeramen, Adiectivum } from '@/praebeunda/verba';
  import Docere from '@/facies/docere.vue';
  import Inflectere from '@/facies/inflectere.vue';
  import type { TabulamenNumeraminis } from '@/praebeunda/tabulamina';

  const valorEnclitici: Ref<string> = ref(Encliticus.nullus)

  const valores: string[] = []
  const valoresEnclitici: string[] = []

  const verbum: Ref<Verbum | undefined> = ref()
  const eventus: Ref<Eventus | undefined> = ref()
  const multiplex: boolean = verbum.value !== undefined && verbum.value instanceof Multiplex
  const propriabile: boolean = [
      [ 'nomen', 'adiectiva' ].includes(verbum.value?.categoria.valor ?? ''),
      verbum.value?.scriptum.isCapitalized() || false
    ].all()

  if(verbum.value !== undefined && multiplex) {
    const scriptum: string = verbum.value.scriptum;
    (verbum.value as Multiplex).valores
        .forEach((valor) => valores.push(valor.valor))
    enclitici.filter((valor) => !(scriptum.endsWith(valor)))
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
  <Inflectere v-if='eventus !== undefined' :eventus='eventus' @blur='eventus = undefined' />
  <v-dialog v-else-if='verbum !== undefined && verbum.categoria.valor !== undefined'>
    <v-card :title='verbum.monstretur()'
            :subtitle="$t(`partes.${verbum.categoria.valor}_singulare`, 'capitalize')">
      <template v-if='multiplex'>
        <v-chip-group>
          <v-chip v-for='valor in valores' :id='`valor_${valor}`' :key='valor' :text='valor'
                  selected-class='text-primary' prepend-icon='category' />
        </v-chip-group>
        <v-select id='enclitica' v-model='valorEnclitici' density='compact'
                  :title="$tf('categoriae.encliticum_plurale', 'capitalize')"
                  :items='valoresEnclitici' chips flat open-on-clear />
      </template>
      <Docere :activator='verbum.categoria.valor' />
      <template v-if='multiplex'>
        <Docere v-for='valor in valores' :key='valor' :activator='valor' />
      </template>
      <v-btn-toggle>
        <template v-if='verbum?.paratust()'>
          <v-btn id='adde' icon='chat_add_on' :text="$t('annuli.specere.addere')"
                 @click='adde()' />
        </template>
        <template v-if='propriabile && verbum?.paratust()'>
          <v-bnt id='addeProprium' icon='chat_add_on' :text="$t('annuli.specere.addereProprium')"
                 @click='addeProprium()' />
        </template>
        <template v-else-if="/^numer(amen|us)$/.test(verbum?.categoria.valor ?? '')">
          <v-btn id='aperi' icon='quick_reference' :text="$t('annuli.specere.aperire')"
                 @click='aperi()' />
        </template>
        <template v-else-if="[
          verbum?.categoria.aequatur('actus'),
          valores.includes('participium')
        ].all()">
          <v-btn id='aperi' icon='quick_reference' :text="$tf('categoriae.participium_singulare', 'capitalize')"
                 @click='aperi()' />
        </template>
      </v-btn-toggle>
    </v-card>
  </v-dialog>
</template>
