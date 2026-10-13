<script setup lang='ts' generic='Hoc extends Multiplex'>
  import { onMounted, ref, type Ref } from 'vue'
  import '@/extensions/array'
  import { type Columnae } from '@/scriptura/columnae'
  import { Tabulator } from '@/praebeunda/interfecta'
  import { Multiplex } from '@/praebeunda/verba'
  import { categoricum } from '@/scriptura/columnae'
  import { Tabula } from '@/tabulae/tabula'
  import Onerare from '@/facies/onerare.vue'
  import Specere from '@/facies/specere.vue'
  import { Fulta } from '../praebeunda/valores';

  const { agendum, categoria } = defineProps<{
    agendum: Tabulator<Hoc>,
    categoria: string;
  }>()

  const onerans: Ref<boolean> = ref<boolean>(true)
  const hoc: Ref<Hoc | undefined> = ref()

  const tabula: Tabula<Hoc> = agendum.tabula
  const haec: Hoc[] = await omnia()

  const seligenda: Fulta = new Fulta(...haec.map((illud: Hoc): Fulta =>
      illud.valores).flat().unique())

  const columnae: Columnae = categoricum<Hoc>({
    categoria: categoria,
    haec: haec
  })

  const selecta: string[] = [];

  function reoneretur() { onerans.value = true }

  async function omnia (): Promise<Hoc[]> { return tabula.haec; }

  async function exoneretur() { onerans.value = false; }

  async function forsInflectat() {
    await reoneretur()
    hoc.value = haec.random()
    return await exoneretur()
  }

  async function cole(selecta: string[]) {
    await reoneretur()
    haec.length = 0;
    (await omnia())?.filter((illud: Hoc) =>
        selecta.every((selectum) =>
           illud.valores.some((istud) => istud.valor === selectum)))
               .forEach((illud: Hoc) => haec.push(illud))
    return await exoneretur()
  }

  onMounted(async () => await exoneretur())
</script>

<template>
  <Onerare v-if='onerans' :onerans='onerans' :pittacium='categoria' />
  <Specere v-else-if='hoc !== undefined' :verbum='hoc' @blur='hoc = undefined' />
  <Specere v-else-if='haec.length == 1' :verbum='haec.first()' @blur='haec.clear()' />
  <template v-else-if='haec.length > 1'>
    <div v-if='seligenda.length > 0' id='colamina'>
      <v-chip-group v-model='selecta' selected-class='text-primary' filter multiple>
        <v-chip v-for='seligendum in seligenda'
                :id='`colamen_${seligendum.nomen}_${seligendum.valor}`'
                :key='`${seligendum.nomen}_${seligendum.valor}`'
                :text='`${$t(`partes.${seligendum.nomen}_singularis`)}: ${$t(`partes.${seligendum.nomen}.${seligendum.valor}`)}`'
                @change='cole(selecta)' />
      </v-chip-group>
    </div>
    <v-btn id='fortuna' append-icon='casino'
           :text="$t('annuli.tabulare.aForte')"
           @click='forsInflectat()' />
    <v-data-table id='tabula' :items='haec' :headers='columnae'
                  density='compact' items-per-page='10'
                  item-selectable='false'>
      <v-btn v-for='illud in haec'
             :id='`selige_${illud.scriptum}_${illud.unicum.toString()}`'
             :key='illud.unicum' append-icon='open_in_full'
             :text="$t('annuli.tabulare.aMemet')"
             @click='hoc = illud' />
    </v-data-table>
  </template>
</template>
