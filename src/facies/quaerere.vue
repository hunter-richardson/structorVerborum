<script setup lang='ts'>
  import { onMounted, ref, type Ref } from 'vue';
  import translation from '../extensions/i18next';
  import '../extensions/string';
  import {
      dictionarium, type Eventus,
      type Lemma, type Quaerenda
  } from '../miscella/dictionarium';
  import { categoriae, inflectenda } from '../praebeunda/valores';
  import { type Verbum } from '../praebeunda/verba';
  import { type Columnae } from '../scriptura/columnae';
  import Inflectere from './inflectere.vue';
  import Loqui from './loqui.vue';
  import Onerare from './onerare.vue';
  import Specere from './specere.vue';
  import type { Referendum } from '../praebeunda/interfecta';

  const { t, tf } = translation()

  const columnae: Columnae = [
    'lemma', 'categoriae'
  ].map(function(this: any, columna: string) {
    return {
      title: tf(`partes.${columna}_singularis`, 'capitalize'),
      key: columna
    }
  })

  const validator: ((pars: string) => boolean | string)[] = [
    function(this: any, pars: string): boolean | string {
      const licta: RegExp = /[āabcdēefghīijklmnōopqrstūuvxȳyz|]/
      return licta.test(pars.toLowerCase()) || t('errores.quaerere.deLitteris')
    }
  ]

  const eventus: Ref<Eventus | undefined> = ref<Eventus | undefined>()
  const verbum: Ref<Referendum | undefined> = ref<Referendum | undefined>()

  const onerans: Ref<boolean> = ref<boolean>(false)
  const error: Ref<boolean> = ref<boolean>(false)
  const lemmae: Ref<Lemma[]> = ref<Lemma[]>([])
  const quaerenda: Ref<Quaerenda> = ref<Quaerenda>({
    categoriae: [],
    pars: ''
  })

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
    const res: Eventus | null = await dictionarium.referatur(lemma)
    if (res) {
      if (inflectenda(res.categoria)) eventus.value = res
      else verbum.value = res as Referendum
    }
  }

  function removeApices (): void {
    if (validator[ 0 ](quaerenda.value.pars)) {
      quaerenda.value.pars = quaerenda.value.pars.toLowerCase().removeMacra()
      error.value = false
    } else error.value = true
  }

  onMounted(async () =>
  { await omnia().then((() => exoneratur())) })
</script>

<template>
  <Loqui />
  <Specere v-if='verbum !== undefined' :verbum='verbum as Verbum' @blur='verbum = undefined' />
  <Inflectere v-else-if='eventus !== undefined' :eventus='eventus as Eventus' @blur='eventus = undefined' />
  <div class='text-center'>
    <v-btn append-icon='search' @click='sarci()' :disabled='onerans' id='sarci'
           :text="$t('annuli.quaerere.sarcire')" />
    <v-btn append-icon='casino' @click='forsSeligat()' :disabled='onerans' id='fortuna'
           :text="$t('annuli.quaerere.seligere')" />
  </div>
  <v-data-table :items-per-page='10' :loading='onerans' :disabled='onerans'
                density='compact' id='tabula' :headers='columnae'>
    <template #headers='{ headers, isSorted, getSortIcon, toggleSort }'>
      <tr>
        <td v-for='columna in headers.flat()' :key='columna.key ?? ""'>
          <v-icon v-if='isSorted(columna)' :icon='getSortIcon(columna)' />
          <v-text-field v-if="columna.key === 'lemma'" :label='columna.title'
                        v-model='quaerenda.pars' :disabled='onerans' :loading='onerans'
                        validate-on='input' :rules='validator' id='quaerenda.pars'
                        density='compact' @blur='removeApices()' autofocus flat single-line />
          <v-select v-else-if="columna.key === 'categoriae'" :loading='onerans' density='compact'
                    id='quaerenda.categoriae' v-model='quaerenda.categoriae' :disabled='onerans'
                    :label='columna.title' :items='categoriae' chips flat multiple open-on-clear />
          <span class='mr-2 cursor-pointer' :id="`ordina_${columna.key}`" @click='toggleSort(columna)' />
        </td>
      </tr>
    </template>
    <Onerare :onerans='onerans' pittacium='lemmae' />
    <template v-if='!onerans' v-for='lemma in lemmae' :key="`${lemma.categoria}_${lemma.scriptum}`">
      <tr><td>{{ lemma.categoria }}</td></tr>
      <tr><td>{{ lemma.scriptum }}</td></tr>
      <tr>
        <td>
          <v-btn :text="$t('annuli.quaerere.aperire')" :disabled='error' id='aperi'
                  append-icon='open_in_full' @click='aperi(lemma)' />
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
