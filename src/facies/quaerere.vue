<script setup lang='ts'>
  import { onMounted, ref } from 'vue';
import translation from '../extensions/i18next.ts';
import '../extensions/string.ts';
import { dictionarium, type Eventus, type Lemma, type Quaerenda } from '../miscella/dictionarium';
import { categoriae, inflectenda } from '../miscella/enumerationes';
import { type Verbum } from '../praebeunda/verba';
import type { Columnae } from '../scriptura/columnae';
import Gustulus from '../scriptura/gustulus';
import gustulare from './gustulare.vue';
import inflectere from './inflectere.vue';
import loqui from './loqui.vue';
import onerare from './onerare.vue';
import specere from './specere.vue';

  const { t, tf } = translation()

  const Categoriae: {
    title: string,
    value: string
  }[] = categoriae.map(function(this: any, categoria: string) {
    return {
      title: tf(`partes.${categoria}_singularis`, 'capitalize'),
      value: categoria
    }
  })

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
      return licta.test(pars.toLowerCase()) || this.$t('errores.quaerere.deLitteris')
    }
  ]

  let onerans: boolean = false
  let error: boolean = false
  let verbum: Verbum | undefined = undefined
  let lemmae: Lemma[] = []
  let quaerenda: Quaerenda = {
    categoriae: [],
    pars: ''
  }

  const gustulus = defineProps<Gustulus | undefined>()

  let eventus: Eventus | undefined = ref<Eventus | undefined>()

  function reoneratur() { onerans = true }

  async function exoneratur (): Promise<void> { onerans = false }

  async function sarci (): Promise<void> {
    reoneratur()
    lemmae = await dictionarium.hoc().quaeratur(quaerenda)
    return exoneratur()
  }

  async function forsSeligat (): Promise<void> {
    reoneratur()
    const res: Eventus = await dictionarium.hoc().forsReferatur(quaerenda)
    if (inflectenda(res.categoria)) eventus = res
    else verbum = res as Verbum ?? undefined
    return exoneratur()
  }

  async function omnia (): Promise<void> {
    reoneratur()
    quaerenda.categoriae = []
    quaerenda.pars = ''
    sarci()
  }

  async function aperi (lemma: Lemma) {
    const res: Eventus | null = await dictionarium.hoc().referatur(lemma)
    if (res) {
      if (inflectenda(res.categoria)) eventus = res
      else verbum = res as Verbum
    }
  }

  function removeApices (): void {
    if (validator[ 0 ](quaerenda.pars)) {
      quaerenda.pars = quaerenda.pars.toLowerCase().removeMacra()
      error = false
    } else error = true
  }

  onMounted(async () => { await omnia().then((() => exoneratur())) })
</script>

<template>
  <gustulare v-if='gustulus' :gustulus='gustulus' />
  <loqui />
  <specere v-if='verbum' :verbum='verbum' @blur='verbum = undefined' />
  <inflectere v-else-if='eventus' :eventus='eventus as Eventus' @blur='eventus = undefined' />
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
    <onerare :onerans='onerans' pittacium='lemmae' />
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
