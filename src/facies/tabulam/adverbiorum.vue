<script lang='ts'>
  import { defineModel, defineProps, defineComponent, type Ref, ref } from 'vue'
  import specere from '../specere'
  import seligere from '../seligere'
  import onerare from '../onerare'
  import gustulare from '../gustulare'
  import Gustulus from '../../scriptura/gustulus'
  import { type Columnae, categoricum } from '../../scriptura/columnae'
  import { AdverbiumAgendum } from '../../praebeunda/agenda'
  import { Adverbium } from '../../praebeunda/verba'
  import Tabula from '../../tabulae/tabula'
  import type Ignavum from '../../miscella/ignavum'
  import '../extensions/array'

  const agendum: AdverbiumAgendum = defineProps<{ agendum: AdverbiumAgendum }>().agendum
  const tabula: Ignavum<Tabula<Adverbium>> | undefined = agendum.putetur()

  async function omnia (): Promise<Adverbium[]> { return await tabula?.hoc().tabulentur() ?? [] }

  export default defineComponent({
    components: { gustulare, seligere, specere, onerare },
    data: (): {
      gustulus: Ref<Gustulus | undefined>,
      columnae: Columnae
    } => {
    return {
      gustulus: ref(),
      columnae: []
    }
  }, setup() {
      const adverbium: Ref<Adverbium | undefined> = ref(defineModel<Adverbium>())
      const onerans: Ref<boolean> = ref(true)
      const adverbia: Ref<Adverbium[]> = ref([])

      async function oneratust (): Promise<void> { onerans.value = false }

      async function forsInflectat (): Promise<void> {
        onerans.value = true
        adverbium.value = adverbia.value.random()
        return oneratust()
      }

      async function cole (selecta: string[]): Promise<void> {
        onerans.value = true
        const omnes: Adverbium[] = await omnia()
        if (omnes)
        { adverbia.value = omnes.filter(adverbium => selecta.every(selectum => adverbium.valores().includes(selectum))) }
        return oneratust()
      }

      return { adverbium, adverbia, onerans, forsInflectat, cole }
    }, async mounted (): Promise<void> {
      this.adverbia = await omnia()
      this.columnae = categoricum<Adverbium>({
        categoria: 'adverbium',
        haec: this.adverbia as Adverbium[]
      }); this.onerans = false
    }
  })
</script>

<template>
  <gustulare :gustulsu='gustulus' />
  <template v-if='adverbium'>
    <specere :verbum='adverbium' @blur='adverbium = undefined' />
  </template>
  <template v-else>
    <seligere :multiplicia='adverbia' :selectum='cole' />
    <template v-if='adverbia.length > 1'>
      <v-btn append-icon='casino' @click='forsInflectat()' :disabled='onerans' id='fortuna'
             :text="$t('annuli.inflectere.aForte')" />
    </template>
    <v-data-table :items='adverbia' :headers='columnae' density='compact' :loading='onerans'
                  :disabled='onerans' id='tabula' items-per-page='10' item-selectable=false>
      <onerare :onerans='onerans' pittacium='adverbia' />
      <template v-if='!onerans'>
        <v-btn v-for='hoc in adverbia' :key='hoc.unicum' :text="$t('annuli.inflectere.aMemet')"
               append-icon='open_in_full' :id='`selige_${hoc.unicum.toString()}`'
               @click='adverbium = hoc' />
      </template>
    </v-data-table>
  </template>
</template>
