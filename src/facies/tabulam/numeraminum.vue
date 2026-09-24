<script lang='ts'>
  import { defineComponent, defineModel, defineProps, type Ref, ref } from 'vue';
  import type Ignavum from '../../miscella/ignavum';
  import { NumeramenAgendum } from '../../praebeunda/agenda';
  import { type Referendum } from '../../praebeunda/interfecta';
  import { Numeramen } from '../../praebeunda/verba';
  import { categoricum, type Columnae } from '../../scriptura/columnae';
  import Gustulus from '../../scriptura/gustulus';
  import Tabula from '../../tabulae/tabula';
  import gustulare from '../gustulare';
  import inflectere from '../inflectere';
  import onerare from '../onerare';
  import specere from '../specere';
  import '../extensions/array'

  const agendum: NumeramenAgendum = defineProps<{ agendum: NumeramenAgendum }>().agendum
  const tabula: Ignavum<Tabula<Numeramen>> | undefined = agendum.putetur()

  async function omnia (): Promise<Numeramen[]> { return await tabula?.hoc().tabulentur() ?? [] }

  export default defineComponent({
    components: { inflectere, gustulare, onerare, specere },
    data: (): {
      gustulus: Ref<Gustulus | undefined>,
      columnae: Columnae,
    } => {
      return {
        gustulus: ref(),
        columnae: []
      }
    }, setup () {
      const referendum: Ref<Referendum | undefined> = ref(defineModel<Referendum>())
      const onerans: Ref<boolean> = ref(true)
      const numeramina: Ref<Numeramen[]> = ref([])

      async function oneratust (): Promise<void> { onerans.value = false }

      async function forsInflectat (): Promise<void> {
        onerans.value = true
        referendum.value = await agendum.referatur(numeramina.value.map(numeramen => numeramen.referendum).random()) ?? undefined
        return oneratust()
      }

      async function cole (selecta: string[]): Promise<void> {
        onerans.value = true
        const omnes: Numeramen[] = await omnia()
        if (omnes)
        { numeramina.value = omnes.filter(numeramen => selecta.every(selectum => numeramen.valores().includes(selectum))) }
        return oneratust()
      }

      async function refer (res: string): Promise<void> { referendum.value = await agendum.referatur(res) ?? undefined }

      return { referendum, numeramina, onerans, forsInflectat, cole, refer }
    }, async mounted (): Promise<void> {
      this.numeramina = await omnia()
      this.columnae = categoricum<Numeramen>({
        categoria: 'numeramen',
        haec: this.numeramina as Numeramen[]
      }); this.onerans = false
    }
  })
</script>

<template>
  <gustulare :gustulus='gustulus' />
  <template v-if='referendum'>
    <inflectere :eventus='referendum' @blur='referendum = undefined' />
  </template>
  <template v-else>
    <seligere :multiplicia='numeramina' :selectum='cole' />
    <template v-if='numeramina.length > 1'>
      <v-btn append-icon='casino' @click='forsInflectat()' :loading='onerans' :disabled='onerans'
             id='fortuna' :text="$t('annuli.inflectere.aForte')" />
    </template>
    <v-data-table :items='numeramina' :headers='columnae' density='compact' :loading='onerans'
                  :disabled='onerans' id='tabula' items-per-page='10' item-selectable=false>
      <onerare :onerans='onerans' pittacium='numeramina' />
      <template v-if='!onerans'>
        <v-btn v-for='hoc in numeramina' :key='hoc.unicum' :text="$t('annuli.inflectere.aMemet')"
               append-icon='open_in_full' :id='`selige_${hoc.unicum.toString()}`'
               @click='refer(hoc.referendum)' />
      </template>
    </v-data-table>
  </template>
</template>
