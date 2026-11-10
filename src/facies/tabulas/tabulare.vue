<script setup lang="ts" generic="Hoc extends Multiplex">
  import {
    buildRegExp,
    anyOf,
    charRange,
    charClass,
    startOfString,
    endOfString,
    oneOrMore
  } from 'ts-regex-builder'
  import { onMounted, ref, type Ref } from 'vue'
  import { type Columnae } from '@/scriptura/columnae'
  import { Tabulator } from '@/praebeunda/interfecta'
  import { categoricum } from '@/scriptura/columnae'
  import { Multiplex } from '@/praebeunda/verba'
  import translation from '@/extensions/i18next'
  import { Fulta } from '@/praebeunda/valores'
  import Onerare from '@/facies/onerare.vue'
  import Specere from '@/facies/specere.vue'
  import { Tabula } from '@/tabulae/tabula'
  import '@/extensions/array'

  type Radicis = {
    color: 'primary' | 'success' | 'error'
    error?: string
  }

  const radicis: Ref<Radicis> = ref({
    color: 'primary'
  })

  const { t } = translation()
  const { agendum, categoria } = defineProps<{
    agendum: Tabulator<Hoc>
    categoria: string
  }>()

  const inhaesum: string = t('scriptum.tabulare.radicis')

  const meta = {
    placeholder: inhaesum,
    'aria-label': inhaesum
  }

  const onerans: Ref<boolean> = ref<boolean>(true)
  const hoc: Ref<Hoc | undefined> = ref()

  const tabula: Tabula<Hoc> = await agendum.tabula
  const haec: Hoc[] = tabula.haec

  const seligenda: Fulta = new Fulta(...haec.flatMap((illud: Hoc): Fulta => illud.valores).unique)

  const columnae: Columnae = categoricum<Hoc>({
    categoria: categoria,
    haec: haec
  })

  const selecta: `${string}_${string}`[] = []
  const radix: Ref<string> = ref('')

  function validetur(): Promise<void> {
    reoneretur()
    radix.value = radix.value.trim()
    const licta: RegExp = buildRegExp(
      [startOfString, oneOrMore([charClass(anyOf('āēīōūv̄ȳ')), charRange('a', 'z')]), endOfString],
      { ignoreCase: true }
    )
    radicis.value.error = undefined
    switch (true) {
      case radix.value.empty:
        radicis.value.color = 'primary'
        break
      case licta.test(radix.value):
        radicis.value.color = 'success'
        break
      default:
        radicis.value.color = 'error'
        radicis.value.error = t('errores.quaerere.deLitteris')
    }
    return (radicis.value.error?.length ?? 0) > 0 ? exoneretur() : cole()
  }

  function reoneretur() {
    onerans.value = true
  }

  function exoneretur() {
    onerans.value = false
    return Promise.resolve()
  }

  async function forsInflectat() {
    reoneretur()
    hoc.value = haec.random
    await exoneretur()
  }

  async function cole() {
    reoneretur()
    haec.clear()
    if (selecta.any) {
      const pares: Record<string, string> = Object.fromEntries(
        selecta.map((selectum) => selectum.split('_'))
      )
      tabula
        .colantur({
          radix: radix.value,
          fulta: pares
        })
        .forEach((illud: Hoc) => haec.push(illud))
    }
    await exoneretur()
  }

  onMounted(() => exoneretur())
</script>

<template>
  <Onerare v-if="onerans" :onerans="onerans" :pittacium="categoria" />
  <Specere v-else-if="hoc !== undefined" :verbum="hoc" @blur="hoc = undefined" />
  <Specere v-else-if="haec.length == 1" :verbum="haec.first()" @blur="haec.clear()" />
  <template v-else-if="haec.length > 1">
    <v-text-field
      id="radix"
      v-model="radix"
      v-bind="meta"
      :icon-color="radicis.color"
      clear-icon="cancel"
      prepend-inner-icon="short_text"
      clearable
      persistent-clear
      :error-messages="radicis.error ?? ''"
      single-line
      @blur="validetur"
      @update:model-value="validetur"
      @click:prepend-inner="validetur" />
    <div v-if="!seligenda.empty" id="colamina">
      <v-chip-group v-model="selecta" selected-class="text-primary" filter multiple>
        <v-chip
          v-for="seligendum in seligenda"
          :id="`colamen_${seligendum.nomen}_${seligendum.valor}`"
          :key="`${seligendum.nomen}_${seligendum.valor}`"
          :text="`${t(`partes.${seligendum.nomen}_singularis`)}: ${t(`partes.${seligendum.nomen}.${seligendum.valor}`)}`"
          @change="cole()" />
      </v-chip-group>
    </div>
    <v-btn
      id="fortuna"
      append-icon="casino"
      :text="t('annuli.tabulare.aForte')"
      @click="forsInflectat()" />
    <v-data-table
      id="tabula"
      :items="haec"
      :headers="columnae"
      density="compact"
      items-per-page="10"
      item-selectable="false">
      <v-btn
        v-for="illud in haec"
        :id="`selige_${illud.scriptum}_${illud.unicum.toString()}`"
        :key="illud.unicum"
        append-icon="open_in_full"
        :text="t('annuli.tabulare.aMemet')"
        @click="hoc = illud" />
    </v-data-table>
  </template>
</template>
