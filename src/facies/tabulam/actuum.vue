<script lang='ts'>
  import { defineComponent, defineModel, defineProps, type Ref, ref } from 'vue';
  import type Ignavum from '../../miscella/ignavum';
  import { ActusAgendus } from '../../praebeunda/agenda';
  import { type Faciendum } from '../../praebeunda/interfecta';
  import { Actus, Nomen } from '../../praebeunda/verba';
  import { categoricum, type Columnae } from '../../scriptura/columnae';
  import Gustulus from '../../scriptura/gustulus';
  import Tabula from '../../tabulae/tabula';
  import gustulare from '../gustulare.vue';
  import inflectere from '../inflectere.vue';
  import seligere from '../seligere.vue';
  import specere from '../specere.vue';
  import '../extensions/array.ts'

  const agendum: Faciendum<Actus> = defineProps<{ agendum: Faciendum<Actus> }>().agendum
  const latina: boolean = this.$dominus.hoc().lingua.inhaesast()
  const tabula: Ignavum<Tabula<Actus>> | undefined = agendum.putetur()
  const lectum: boolean = agendum instanceof ActusAgendus

  async function omnia (): Promise<Actus[]> {
    return await tabula?.hoc().tabulentur() ?? []
  }

  export default defineComponent({
    components: { inflectere, gustulare, seligere, specere },
    data: (): {
      gustulus: Ref<Gustulus | undefined>,
      agendum: Faciendum<Actus>,
      columnae: Columnae,
      latina: boolean,
      lectum: boolean
    } => {
      return {
        gustulus: ref(),
        columnae: [],
        latina: latina,
        agendum: agendum,
        lectum: lectum
      }
    }, async mounted (): Promise<void> {
      this.actua = await omnia()
      this.columnae = categoricum<Actus>({
        categoria: 'actus',
        haec: this.actua as Actus[]
      })

      this.onerans = false
    }, setup () {
      const referendum: Ref<Faciendum<Nomen> | undefined> = ref(defineModel<Faciendum<Nomen>>())
      const actus: Ref<Actus | undefined> = ref(defineModel<Actus>())
      const onerans: Ref<boolean> = ref(false)
      const actua: Ref<Actus[]> = ref([])

      async function oneratust (): Promise<void> { onerans.value = false }

      async function forsInflectat (): Promise<void> {
        onerans.value = true
        actus.value = actua.value.random()
        return oneratust()
      }

      async function cole (selecta: string[]): Promise<void> {
        onerans.value = true
        const omnes: Actus[] = await omnia()
        if (omnes)
        { actua.value = omnes.filter(actus => selecta.every(selectum => actus.valores().includes(selectum))) }
        return oneratust()
      }

      async function refer (res: Promise<Faciendum<Nomen> | null>): Promise<void> { referendum.value = await res ?? undefined }

      function age (res: Faciendum<Nomen> | null): void { referendum.value = res ?? null }

      return { onerans, actus, actua, referendum, forsInflectat, cole, refer, age }
    }
  })
</script>

<template>
  <gustulare :gustulus='gustulus' />
  <specere v-if='actus' :verbum='actus' @blur='actus = undefined' />
  <inflectere v-else-if='referendum' :agendum='referendum' @blur='referendum = undefined' />
  <template v-else>
    <seligere :multiplicia='actua' :selectum='cole' />
    <template v-if='actua.length > 1'>
      <v-btn append-icon='casino' @click='forsInflectat()' :disabled='onerans' id='fortuna'
             :text="$t('annuli.inflectere.aForte')" />
    </template>
    <v-data-table :items='actua' :headers='columnae' density='compact' :loading='onerans'
                  :disabled='onerans' id='tabula' items-per-page='10' item-selectable=false>
      <template v-if='onerans'>
        <v-skeleton-loader :loading-text="latina ? 'Actus onerantur...' : 'Loading verbs...'"
                           :loading='onerans' type='table-tbody' />
      </template>
      <template v-else>
        <v-btn v-for='hoc in actua' :key='hoc.unicum' :text="$t('annuli.inflectere.aMemet')"
               append-icon='open_in_full' :id='`selige_${hoc.unicum.toString()}`'
               @click='actus = hoc' />
      </template>
    </v-data-table>
    <v-btn-toggle v-if='lectum'>
      <v-btn :text="latina ? 'Nomen' : 'Gerund'" append-icon='subject' id='nomen'
             @click='refer((agendum as ActusAgendus).nomen())' />
      <v-btn :text="latina ? 'Actor' : 'Agent (masculine)" append-icon='man' id='actor'
             @click="age((agendum as ActusAgendus).actor('masculinum'))" />
      <v-btn :text="latina ? 'Actrix' : 'Agent (feminine)" append-icon='woman' id='actrix'
             @click="age((agendum as ActusAgendus).actor('feminine'))" />
    </v-btn-toggle>
  </template>
</template>
