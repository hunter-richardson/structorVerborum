<script setup lang='ts'>
  import { useTranslation } from 'i18next-vue';
  import { ref, type Ref } from 'vue';
  import Numerator from '@/miscella/numerator';
  import { Numerale } from '@/praebeunda/verba';
  import Specere from '@/facies/specere.vue';

  type Arabicus = {
    integer: number,
    numerator: number,
    denominator: number
  }

  const validator: ((arabicus: number) => boolean | string)[] = [
    (arabicus: number): boolean | string =>
      { return Number.isInteger(arabicus) || useTranslation().t('errores.numerare.deNumeris') }
  ]

  const numerale: Ref<Numerale | undefined> = ref()
  const romanus: Ref<string> = ref('N')

  const arabicus: Ref<Arabicus> = ref({
    integer: 0,
    numerator: 0,
    denominator: 12
  })

  function effiat (): void {
    romanus.value = Numerator.romanus(arabicus.value.integer + (arabicus.value.numerator / arabicus.value.denominator))
  }

  function refer (): void {
    if (arabicus.value.numerator === 0)
      numerale.value = Numerale.numerator(arabicus.value.integer)
  }
</script>

<template>
  <Specere v-if='numerale !== undefined' :verbum='numerale' @blur='numerale = undefined' />
  <div class='text-center'>
    <v-card id='effectus' :text='romanus' />
    <v-btn v-if='arabicus.numerator === 0' id='aequa' icon='equal' @click='refer()' />
  </div>
  <div class='text-center'>
    <v-number-input id='integer' v-model='arabicus.integer' :rules='validator' validate-on='input'
                    autofocus clearable flat reverse @change='effiat()' />
    <v-card text=' + ' />
    <v-number-input id='numerator' v-model='arabicus.numerator' :rules='validator' validate-on='input'
                    clearable flat @change='effiat()' />
    <v-card :text='` + ${arabicus.denominator.toString()}`' />
  </div>
</template>
