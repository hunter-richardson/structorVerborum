<script setup lang='ts'>
  import { ref, type Ref } from 'vue';
  import '@/extensions/string';
  import { type Eventus } from '@/miscella/dictionarium';
  import { Encliticus, enclitici } from '@/praebeunda/valores';
  import { locutor } from '@/miscella/locutor';
  import { Multiplex, Verbum, Adiectivum, Nomen } from '@/praebeunda/verba';
  import Docere from '@/facies/docere.vue';
  import Inflectere from '@/facies/inflectere.vue';
  import translation from '@/extensions/i18next'

  const valorEnclitici: Ref<string> = ref(Encliticus.nullus)

  const valores: string[] = []
  const valoresEnclitici: string[] = []

  const verbum: Ref<Verbum | undefined> = ref()
  const eventus: Ref<Eventus | undefined> = ref()
  const multiplex: boolean = verbum.value !== undefined && verbum.value instanceof Multiplex
  const propriabile: boolean = [
      [
        Adiectivum, Nomen
      ].map((classis) => (classis.name.toLowerCase()))
      .includes(verbum.value?.categoria.valor ?? ''),
      verbum.value?.scriptum.isCapitalized() || false
    ].all()

  const { t, tf } = translation()

  const quattuor = [
    {
      scriptum: t('annuli.specere.addere'),
      status: verbum.value?.paratust() === true,
      icon: 'chat_add_on',
      ipsum: 'addere',
      actus: adde
    }, {
      scriptum: t('annuli.specere.addereProprium'),
      status: propriabile && verbum.value?.paratust() === true,
      icon: 'chat_add_on',
      ipsum: 'proprium.addere',
      actus: addeProprium
    }, {
      scriptum: t('annuli.specere.aperire'),
      status: verbum.value?.numeramest() === true,
      icon: 'quick_reference',
      ipsum: 'aperire.numeramen',
      actus: aperi
    }, {
      scriptum: tf('categoriae.participium_singulare', 'capitalize'),
      status: verbum.value?.actust() === true &&
              verbum.value.modus.aequatur('participium'),
      icon: 'quick_reference',
      ipsum: 'aperire.actum',
      actus: aperi
    }
  ]

  if(verbum.value !== undefined && multiplex) {
    const scriptum: string = verbum.value.scriptum;
    (verbum.value as Multiplex).valores
        .forEach((valor) => valores.push(valor.valor))
    enclitici.filter((valor) => !(scriptum.endsWith(valor)))
             .forEach((valor) => valoresEnclitici.push(valor))
  }

  async function aperi() {
    if(verbum.value !== undefined) {
      if(verbum.value.actust())
        eventus.value = {
          ...(await verbum.value.participialis()),
          categoria: Adiectivum.name.toLowerCase()
        }
      else if(verbum.value.numeramest()) {
        const referendus: Eventus | undefined = await verbum.value.refer();
        if (referendus !== undefined) eventus.value = referendus
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
      <v-chip-group v-if='multiplex'>
        <v-chip v-for='valor in valores' :id='`valor_${valor}`' :key='valor' :text='valor'
                selected-class='text-primary' prepend-icon='category' />
      </v-chip-group>
      <v-select id='enclitici' v-model='valorEnclitici' density='compact'
                :title="$tf('categoriae.encliticum_plurale', 'capitalize')"
                :items='valoresEnclitici' chips flat open-on-clear />
      <Docere :activator='verbum.categoria.valor' />
      <template v-if='multiplex'>
        <Docere v-for='valor in valores' :key='valor' :activator='valor' />
      </template>
      <v-btn-toggle>
        <v-btn v-for='res in quattuor' :id='res.ipsum' :key='res.ipsum'
               :icon='res.icon' :text='res.scriptum' @click='res.actus()' />
      </v-btn-toggle>
    </v-card>
  </v-dialog>
</template>
