<script setup lang='ts'>
  import { onMounted, ref, type Ref } from 'vue';
  import translation from '@/extensions/i18next';
  import '@/extensions/string';
  import {
      dictionarium, type Eventus,
      type Lemma, type Quaerenda
  } from '@/miscella/dictionarium';
  import { categoriae, inflectenda } from '@/praebeunda/valores';
  import { type Verbum } from '@/praebeunda/verba';
  import { type Columnae } from '@/scriptura/columnae';
  import Inflectere from '@/facies/inflectere.vue';
  import Loqui from '@/facies/loqui.vue';
  import Onerare from '@/facies/onerare.vue';
  import Specere from '@/facies/specere.vue';
  import { type Referendum } from '@/praebeunda/interfecta';

  const { t, tf } = translation()

  const columnae: Columnae = [
    'lemma', 'categoriae'
  ].map(function(columna: string) {
    return {
      title: tf(`partes.${columna}_singularis`, 'capitalize'),
      key: columna
    }
  })

  const validator: ((pars: string) => boolean | string)[] = [
    function(pars: string): boolean | string {
      const licta: RegExp = /[āabcdēefghīijklmnōopqrstūuvxȳyz|]/
      return licta.test(pars.lowercase) || t('errores.quaerere.deLitteris')
    }
  ]

  const eventus: Ref<Eventus | undefined> = ref()
  const verbum: Ref<Referendum | undefined> = ref()

  const onerans: Ref<boolean> = ref(false)
  const error: Ref<boolean> = ref(false)
  const lemmae: Ref<Lemma[]> = ref([])
  const quaerenda: Ref<Quaerenda> = ref({
    categoriae: [],
    pars: ''
  })

  const duo = [
    {
      actus: sarci,
      scriptum: 'seligere',
      icon: 'search'
    }, {
      actus: forsSeligat,
      scriptum: 'sarcire',
      icon: 'casino'
    }
  ]

  function reoneratur() { onerans.value = true }

  async function exoneratur (): Promise<void> { onerans.value = false }

  async function sarci (): Promise<void> {
    reoneratur()
    lemmae.value = await dictionarium.quaeratur(quaerenda.value)
    return exoneratur()
  }

  async function forsSeligat (): Promise<void> {
    reoneratur()
    const res: Eventus = await dictionarium.forsReferatur(quaerenda.value)
    if (inflectenda(res.categoria)) eventus.value = res
    else verbum.value = res as Referendum ?? undefined
    return exoneratur()
  }

  async function omnia (): Promise<void> {
    reoneratur()
    quaerenda.value.categoriae = []
    quaerenda.value.pars = ''
    sarci()
  }

  async function aperi (lemma: Lemma) {
    const res: Eventus | undefined = await dictionarium.referatur(lemma)
    if (res) {
      if (inflectenda(res.categoria)) eventus.value = res
      else verbum.value = res as Referendum
    }
  }

  function removeApices (): void {
    if (validator[ 0 ](quaerenda.value.pars)) {
      quaerenda.value.pars = quaerenda.value.pars.lowercase.removeMacra
      error.value = false
    } else error.value = true
  }

  onMounted(async () =>
  { await omnia().then((() => exoneratur())) })
</script>

<template>
  <Loqui />
  <Specere v-if='verbum !== undefined'
           :verbum='verbum as Verbum'
           @blur='verbum = undefined' />
  <Inflectere v-else-if='eventus !== undefined'
              :eventus='eventus as Eventus'
              @blur='eventus = undefined' />
  <template v-if='!onerans'>
    <div class='text-center'>
      <v-btn v-for='res in duo' :id='res.scriptum'
             :key='res.scriptum' :disabled='onerans'
             :text='$t(`annuli.quaerere.${res.scriptum}`)'
             :append-icon='res.icon' @click='res.actus()' />
    </div>
  </template>
  <v-data-table id='tabula' :items-per-page='10' density='compact'
                :loading='onerans' :disabled='onerans' :headers='columnae'>
    <template #headers='{ headers, isSorted, getSortIcon, toggleSort }'>
      <tr>
        <td v-for='columna in headers.flat()' :key='columna.key ?? ""'>
          <v-icon v-if='isSorted(columna)' :icon='getSortIcon(columna)' />
          <v-text-field v-if="columna.key === 'lemma'" id='quaerenda.pars'
                        v-model='quaerenda.pars' :label='columna.title'
                        :disabled='onerans' :loading='onerans' :rules='validator'
                        validate-on='input' density='compact' single-line
                        autofocus flat @blur='removeApices()' />
          <v-select v-else-if="columna.key === 'categoriae'"
                    id='quaerenda.categoriae' v-model='quaerenda.categoriae'
                    :loading='onerans' density='compact' :disabled='onerans'
                    :label='columna.title' :items='categoriae'
                    chips flat multiple open-on-clear />
          <span :id='`ordina_${columna.key}`' class='mr-2 cursor-pointer' @click='toggleSort(columna)' />
        </td>
      </tr>
    </template>
    <Onerare v-if='onerans' :onerans='onerans' pittacium='lemmae' />
    <template v-else-if='!onerans'>
      <template v-for='lemma in lemmae' :key='`${lemma.categoria}_${lemma.scriptum}`'>
        <tr v-for="clavis in [ 'categoria', 'scriptum' ]" :key='clavis'>
          <td>{{ lemma[clavis] }}</td>
        </tr>
        <tr><td>
          <v-btn id='aperi' :disabled='error'
                 :text="$t('annuli.quaerere.aperire')"
                 append-icon='open_in_full' @click='aperi(lemma)' />
        </td></tr>
      </template>
    </template>
  </v-data-table>
</template>
