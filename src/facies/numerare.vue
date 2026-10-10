<script setup lang='ts'>
  import { useTranslation } from 'i18next-vue';
import { defineProps, ref, type Ref } from 'vue';
import Numerator from '../miscella/numerator';
import { Numerale } from '../praebeunda/verba';
import Gustulus from '../scriptura/gustulus';
import Gustulare from './gustulare.vue';
import Specere from './specere.vue';

  const gustulus: Gustulus | undefined = defineProps<Gustulus | undefined>()

  type Arabicus = {
    integer: number,
    numerator: number,
    denominator: number
  }

  const validator: ((arabicus: number) => boolean | string)[] = [
    (arabicus: number): boolean | string =>
      { return Number.isInteger(arabicus) || useTranslation().t('errores.numerare.deNumeris') }
  ]

  const numerale: Ref<Numerale | undefined> = ref<Numerale | undefined>()
  const romanus: Ref<string> = ref<string>('N')

  const arabicus: Ref<Arabicus> = ref<Arabicus>({
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
  <Gustulare v-if='gustulus !== undefined' :gustulus='gustulus' />
  <Specere v-if='numerale !== undefined' :verbum='numerale' @blur='numerale = undefined' />
  <div class='text-center'>
    <v-card id='effectus' :text='romanus' />
    <v-btn v-if='arabicus.numerator === 0' icon='equal' id='aequa' @click='refer()' />
  </div>
  <div class='text-center'>
    <v-number-input @change='effiat()' id='integer' :rules='validator' validateOn='input'
                    v-model='arabicus.integer' autofocus clearable flat reverse />
    <v-card text=' + ' />
    <v-number-input @change='effiat()' id='numerator' :rules='validator' validateOn='input'
                    v-model='arabicus.numerator' clearable flat />
    <v-card :text="` + ${arabicus.denominator.toString()}`" />
  </div>
</template>
