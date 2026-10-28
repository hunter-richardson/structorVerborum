<script setup lang="ts">
  import { ref, type Ref } from 'vue'
  import { anyOf, buildRegExp, endOfString, startOfString } from 'ts-regex-builder'
  import { Numerator, minimum as nihil, type Par } from '@/miscella/numerator'
  import { Numerale } from '@/praebeunda/verba'
  import Specere from '@/facies/specere.vue'

  const numerus: Ref<Numerale | undefined> = ref()
  const operator: Ref<string> = ref('')
  const praesentes: Ref<Par> = ref(nihil)
  const praevii: Ref<Par> = ref(nihil)

  const actus: string = 'IC·+ VD:- XM∴• L|×÷ =NS%'

  function operat(actus: string): boolean {
    return buildRegExp([startOfString, anyOf('+-•÷%='), endOfString]).test(actus)
  }

  function licta(actus: string): boolean {
    return operat(actus) || praesentes.value.arabicus > 0
  }

  function ponatur(actus: string) {
    if (actus === 'N') {
      praevii.value = praesentes.value = nihil
    } else if (/^[|MDCLXVIS·:∴×]$/.test(actus)) {
      if (praesentes.value.arabicus) praesentes.value.romanus += actus
      else praesentes.value.romanus = actus
      try {
        praesentes.value.arabicus = Numerator.arabicus(praesentes.value.romanus)
      } catch {
        praesentes.value = nihil
      }
    } else if (operat(actus)) {
      if (praevii.value.arabicus === 0) praevii.value = praesentes.value
      else {
        switch ((operator.value ?? '').trim()) {
          case '+':
            praevii.value.arabicus += praesentes.value.arabicus
            break
          case '-':
            praevii.value.arabicus -= praesentes.value.arabicus
            break
          case '•':
            praevii.value.arabicus *= praesentes.value.arabicus
            break
          case '÷':
            praevii.value.arabicus /= praesentes.value.arabicus
            break
          case '%':
            praevii.value.arabicus %= praesentes.value.arabicus
            break
          default:
            praevii.value.arabicus = praesentes.value.arabicus
            break
        }
        praevii.value.romanus = Numerator.romanus(praevii.value.arabicus)
      }
      operator.value = actus === '=' ? '' : ` ${actus} `
      praesentes.value = nihil
    }
  }

  function aequa() {
    numerus.value = Numerale.numerator(praevii.value.arabicus)
  }
</script>

<template>
  <Specere v-if="numerus !== undefined" :verbum="numerus" @blur="numerus = undefined" />
  <template v-else>
    <div class="text-center">
      <v-btn v-if="Number.isInteger(praevii.arabicus)" id="refer" icon="aequa" @click="aequa()" />
      <v-card :text="praevii.romanus" />
      <v-card v-if="!operator.empty" id="operator" :text="operator" />
    </div>
    <v-card :text="praesentes.romanus" />
    <div v-for="linea in actus.split(' ') as string[]" :key="linea" class="text-center">
      <span v-for="littera in Array.from(linea)" :key="littera" class="text-center">
        <v-card :id="`actus_${littera}`" :text="` ${littera} `" density="comfortable" position="absolute" border hover :disabled="licta(littera)" @click="ponatur(littera)" />
      </span>
    </div>
  </template>
</template>
