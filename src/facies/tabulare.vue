<script setup lang="ts" generic='Hoc extends Multiplex'>
  import { onMounted, ref } from 'vue';
import '../extensions/array.ts';
import { type categoria } from '../miscella/enumerationes';
import Ignavum from '../miscella/ignavum';
import { type Faciendum } from '../praebeunda/interfecta';
import { Multiplex } from '../praebeunda/verba';
import { categoricum } from '../scriptura/columnae';
import Gustulus from '../scriptura/gustulus';
import Tabula from '../tabulae/tabula';
import gustulare from './gustulare.vue';
import onerare from './onerare.vue';
import specere from './specere.vue';

  export interface Forma {
    gustulus?: Gustulus,
    agendum: Faciendum<Hoc>,
    categoria: categoria
  }

  let onerans: boolean = true

  const { gustulus, agendum, categoria } = defineProps<Forma>()
  const tabula: Ignavum<Tabula<Hoc>> | undefined = agendum.putetur()

  async function omnia(): Promise<Hoc[]> { return await tabula?.hoc().tabulentur() ?? [] }

  const haec: Hoc[] = await omnia()

  const columnae: Colummae = categoricum<Hoc>({
    categoria: categoria,
    haec: haec
  })

  let hoc: Hoc | undefined = ref<Hoc | undefined>()

  const seligenda: string[] = [
    ...new Set<string>(haec?.map((multiplex: Multiplex) => multiplex.valores()).flat())
  ];

  const selecta: string[] = [];

  function reoneretur() { onerans = true }

  async function exoneretur() { onerans = false; }

  async function forsInflectat() {
    await reoneratur()
    hoc = haec.random()
    return await exoneratur()
  }

  async function cole(selecta: string[]) {
    await reoneratur()
    (await omnia())?.filter((illud: Hoc) =>
        selecta.every((selectum) => illud.valores().includes(selectum)))
               .forEach((illud: Hoc) => haec.push(illud))
    return await exoneratur()
  }

  onMounted(async () => await exoneratur())
</script>

<template>
  <gustulare v-if='gustulus' :gustulus='gustulus' />
  <onerare v-if='onerans' :onerans='onerans' :pittacium='categoria' />
  <specere v-else-if='!!hoc' :verbum='hoc' @blur='hoc = undefined' />
  <specere v-else-if='haec.length == 1' :verbum='haec.first()' @blur='haec = []' />
  <template v-else-if='haec.length > 1'>
    <div v-if='seligenda.length > 0' id='colamina'>
      <v-chip-group selected-class='text-primary' v-model='selecta' filter multiple>
        <v-chip v-for='seligendum in seligenda' :key='seligendum'
                @change='cole(selecta)' :id="`colamen_${seligendum}`"
                :text="$t(`${seligendum}_singularis`, 'capitalize')" />
      </v-chip-group>
    </div>
    <v-btn append-icon='casino' @click='forsInflectat()'
           id='fortuna' :text="$t('annuli.tabulare.aForte')" />
    <v-data-table :items='haec' :headers='columnae' density='compact'
                  id='tabula' items-per-page='10' item-selectable='false'>
      <v-btn v-for='illud in haec' :key='illud.unicum'
             :text="$t('annuli.tabulare.aMemet')"
             append-icon='open_in_full' :id='`selige_${illud.unicum.toString()}`'
             @click='hoc = illud' />
    </v-data-table>
  </template>
</template>
