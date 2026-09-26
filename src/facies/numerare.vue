<script setup lang='ts'>
  import { useTranslation } from 'i18next-vue';
import { defineProp, ref } from 'vue';
import Numerator from '../miscella/numerator';
import { Numerus } from '../praebeunda/verba';
import Gustulus from '../scriptura/gustulus';
import gustulare from './gustulare.vue';
import specere from './specere.vue';

  const gustulus: Gustulus | undefined = defineProp<Gustulus | undefined>()

  type Arabicus = {
    integer: number,
    numerator: number,
    denominator: number
  }

  const validator: ((arabicus: number) => boolean | string)[] = [
    (arabicus: number): boolean | string =>
    { return Number.isInteger(arabicus) || useTranslation().t('errores.numerare.deNumeris') }
  ]

  let numerus: Numerus | undefined = ref<Numerus | undefined>('numerus')
  let romanus: string = 'N'
  let arabicus: Arabicus = {
    integer: 0,
    numerator: 0,
    denominator: 12
  }

  function effiat (): void {
    romanus = Numerator.romanus(arabicus.integer + arabicus.numerator / arabicus.denominator);
  }

  function refer (): void {
    if (arabicus.numerator === 0)
      numerus = Numerus.numerator(arabicus.integer);
  }
</script>

<template>
  <gustulare v-if='!!gustulus' :gustulus='gustulus' />
  <specere v-if='!!numerus' :verbum='numerus' @blur='numerus = undefined' />
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
