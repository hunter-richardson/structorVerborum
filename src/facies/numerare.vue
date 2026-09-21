<script lang='ts'>
  import { computed, defineComponent, defineModel, type Ref, ref } from 'vue';
import { crustula } from '../miscella/crustula';
import Numerator from '../miscella/numerator';
import { Numerus } from '../praebeunda/verba';
import Gustulus from '../scriptura/gustulus';
import gustulare from './gustulare.vue';
import specere from './specere.vue';
import { useRoute } from 'vuetify/lib/composables/router.mjs';
import { monstrator, type Monstranda } from '../miscella/monstrator';

  const via = useRoute();
  const nomen: string = (computed(() => via.value) as unknown) as string;
  const monstranda: Monstranda = await monstrator.hoc().monstrentur(nomen);

  type Nuntium = {
    deNumeris: string;
  };

  type Nuntia = {
    anglicum: Nuntium,
    latinum: Nuntium;
  }

  const nuntia: Nuntia = {
    latinum: {
      deNumeris: monstranda.first((monstrandum) => (monstrandum.unicum === 'latinum.deNumeris')).nuntium
    }, anglicum: {
      deNumeris: monstranda.first((monstrandum) => (monstrandum.unicum === 'anglicum.deNumeris')).nuntium
    },
  }

  type Arabicus = {
    integer: number,
    numerator: number,
    denominator: number
  }

  const anglica: boolean = crustula.hoc().lingua.est('anglica') ?? false

  const validator: ((arabicus: number) => boolean | string)[] = [
    (arabicus: number): boolean | string => {
      const error: string = anglica ? nuntia.latinum.deNumeris : nuntia.latinum.deNumeris
      return Number.isInteger(arabicus) || error
    }
  ]

  export default defineComponent({
    components: { gustulare, specere },
    data: (): {
      validator: ((arabicus: number) => boolean | string)[],
      gustulus: Ref<Gustulus | undefined>,
      anglica: boolean,
    } => {
      return {
        gustulus: ref(),
        validator,
        anglica: anglica
      }
    }, setup () {
      const numerus: Ref<Numerus | undefined> = ref(defineModel<Numerus>())
      const romanus: Ref<string> = ref('N')
      const arabicus: Ref<Arabicus> = ref({
        integer: 0,
        numerator: 0,
        denominator: 12
      })

      function effiat (): void {
        romanus.value = Numerator.romanus(arabicus.value.integer + arabicus.value.numerator / arabicus.value.denominator)
      }

      function refer (): void {
        if (arabicus.value.numerator === 0) {
          numerus.value = Numerus.numerator(arabicus.value.integer)
        }
      }

      return {
        numerus, romanus, arabicus, effiat, refer
      }
    }
  })
</script>

<template>
  <gustulare :gustulus='gustulus' />
  <template v-if='numerus'>
    <specere :verbum='numerus' @blur='numerus = undefined' />
  </template>
  <div class='text-center'>
    <v-card id='effectus' :text='romanus' />
    <template v-if='arabicus.numerator === 0'>
      <v-btn icon='equal' id='aequa' @click='refer()' />
    </template>
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
