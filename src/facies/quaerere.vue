<script lang='ts'>
  import { defineComponent, defineModel, type Ref, ref } from 'vue';
  import { dictionarium, type Eventus, type Lemma, type Quaerenda } from '../miscella/dictionarium';
  import { anglicum, categoriae, inflectenda } from '../miscella/enumerationes';
  import { type Verbum } from '../praebeunda/verba';
  import Gustulus from '../scriptura/gustulus';
  import gustulare from './gustulare.vue';
  import inflectere from './inflectere.vue';
  import loqui from './loqui.vue';
  import onerare from './onerare.vue';
  import specere from './specere.vue';
  import i18next from 'i18next'
  import '../extensions/i18next'

  type Columnae = {
    title: string,
    key: string,
  }[]

  const Categoriae: {
    title: string,
    value: string
  }[] = categoriae.map(categoria => {
    return {
      title: i18next.tf(`categoria.${categoria}_singularis`, 'capitalize'),
      value: categoria
    }
  })

  const columnae: Columnae = [ 'lemma', 'categoriae' ].map(columna => {
    return {
      title: i18next.tf(`categoria.${columna}_singularis`, 'capitalize'),
      key: columna
    }
  })

  const validator: ((pars: string) => boolean | string)[] = [
    (pars: string): boolean | string => {
      const licta: RegExp = /[āabcdēefghīijklmnōopqrstūuvxȳyz|]/
      return licta.test(pars.toLowerCase()) || i18next.t('errores.quaerere.deLitteris')
    }
  ]

  export default defineComponent({
    components: { inflectere, gustulare, onerare, specere, loqui },
    data: (): {
      validator: ((pars: string) => boolean | string)[],
      gustulus: Ref<Gustulus | undefined>,
      columnae: Columnae,
      categoriae: {
        title: string,
        value: string
      }[]
    } => {
      return {
        categoriae: Categoriae,
        gustulus: ref(),
        validator: validator,
        columnae: columnae
      }
    }, setup () {
      const eventus: Ref<Eventus | undefined> = ref(defineModel<Eventus>('eventus'))
      const verbum: Ref<Verbum | undefined> = ref(defineModel<Verbum>('verbum'))
      const onerans: Ref<boolean> = ref(true)
      const error: Ref<boolean> = ref(false)
      const lemmae: Ref<Lemma[]> = ref([])
      const quaerenda: Ref<Quaerenda> = ref({
        categoriae: [],
        pars: ''
      })

      async function oneratust (): Promise<void> { onerans.value = false }

      async function sarci (): Promise<void> {
        onerans.value = true
        lemmae.value = await dictionarium.hoc().quaeratur(quaerenda.value)
        return oneratust()
      }

      async function forsSeligat (): Promise<void> {
        onerans.value = true
        const res: Eventus = await dictionarium.hoc().forsReferatur(quaerenda.value)
        if (inflectenda(res.categoria)) eventus.value = res
        else verbum.value = res as Verbum ?? undefined
        return oneratust()
      }

      async function omnia (): Promise<void> {
        onerans.value = true
        quaerenda.value.categoriae = []
        quaerenda.value.pars = ''
        sarci()
      }

      async function aperi (lemma: Lemma) {
        const res: Eventus | null = await dictionarium.hoc().referatur(lemma)
        if (res) {
          if (inflectenda(res.categoria)) eventus.value = res
          else verbum.value = res as Verbum
        }
      }

      function removeApices (): void {
        if (validator[ 0 ](quaerenda.value.pars)) {
          quaerenda.value.pars = quaerenda.value.pars.toLowerCase().removeMacra()
          error.value = false
        } else error.value = true
      }

      return { eventus, verbum, lemmae, onerans, quaerenda, error, sarci, forsSeligat, omnia, aperi, removeApices }
    }
  })
</script>

<template>
  <gustulare :gustulus='gustulus' />
  <loqui />
  <template v-if='verbum'>
    <specere :verbum='verbum' @blur='verbum = undefined' />
  </template>
  <template v-else-if='eventus'>
    <inflectere :eventus='eventus as Eventus' @blur='eventus = undefined' />
  </template>
  <div class='text-center'>
    <v-btn append-icon='search' @click='sarci()' :disabled='onerans' id='sarci'
           :text="$t('annuli.quaerere.sarcire')" />
    <v-btn append-icon='casino' @click='forsSeligat()' :disabled='onerans' id='fortuna'
           :text="$t('annuli.quaerere.seligere')" />
  </div>
  <v-data-table :items-per-page='10' :loading='onerans' :disabled='onerans' density='compact'
                id='tabula' :headers='columnae'>
    <template #headers='{ headers, isSorted, getSortIcon, toggleSort }'>
      <tr>
        <template v-for='columna in headers.flat()' :key='columna.key ?? ""'>
          <td>
            <template v-if='isSorted(columna)'>
              <v-icon :icon='getSortIcon(columna)' />
            </template>
            <template v-if="columna.key === 'lemma'">
              <v-text-field :label='columna.title' v-model='quaerenda.pars' :disabled='onerans'
                            :loading='onerans' validate-on='input' :rules='validator'
                            id='quaerenda.pars' density='compact' @blur='removeApices()' autofocus
                            flat single-line />
            </template>
            <template v-else-if="columna.key === 'categoriae'">
              <v-select :loading='onerans' density='compact' id='quaerenda.categoriae'
                        v-model='quaerenda.categoriae' :disabled='onerans' :label='columna.title'
                        :items='categoriae' chips flat multiple open-on-clear />
            </template>
            <span class='mr-2 cursor-pointer' :id="`ordina_${columna.key}`"
                  @click='toggleSort(columna)' />
          </td>
        </template>
      </tr>
    </template>
    <onerare :onerans='onerans' pittacium='lemmae' />
    <template v-if='!onerans'>
      <template v-for='lemma in lemmae' :key="`${lemma.scriptum}_${lemma.categoria}`">
        <tr>
          <td>{{ lemma.categoria }}</td>
        </tr>
        <tr>
          <td>{{ lemma.scriptum }}</td>
        </tr>
        <tr>
          <td>
            <v-btn :text="$t('annuli.quaerere.aperire')" :disabled='error' id='aperi'
                   append-icon='open_in_full' @click='aperi(lemma)' />
          </td>
        </tr>
      </template>
    </template>
  </v-data-table>
</template>
