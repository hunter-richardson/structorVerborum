<script lang='ts'>
  import { defineComponent, defineModel, type ComponentOptionsWithoutProps, type Ref, ref } from 'vue';
  import Numerator from '../miscella/numerator';
  import { Numerus } from '../praebeunda/verba';
  import specere from './specere.vue';
  import Crustula from '../miscella/crustula';
  import Gustulus from '../scriptura/gustulus';
  import gustulare from './gustulare.vue';

  type Arabicus = {
    integer: number,
    numerator: number,
    denominator: number
  }

  const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;

  const validator: ((arabicus: number) => boolean | string)[] = [
    (arabicus: number): boolean | string => {
      const error: string = anglica ?
        'Only Roman numerals allowed' : 'Romani numeri soli licuntur';
      return Number.isInteger(arabicus) || error;
    }
  ];

  const componenta: ComponentOptionsWithoutProps = {
    gustulare, specere
  };

  const data = (): {
    validator: ((arabicus: number) => boolean | string)[],
    gustulus: Ref<Gustulus | undefined>,
    anglica: boolean,
  } => {
    return {
      gustulus: ref(),
      validator,
      anglica
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    setup () {
      const numerus: Ref<Numerus | undefined> = ref(defineModel<Numerus>());
      const romanus: Ref<string> = ref('N');
      const arabicus: Ref<Arabicus> = ref({
        integer: 0,
        numerator: 0,
        denominator: 12
      });

      function effiat (): void {
        romanus.value = Numerator.romanus(arabicus.value.integer + arabicus.value.numerator / arabicus.value.denominator);
      }

      function refer (): void {
        if (arabicus.value.numerator === 0) {
          numerus.value = Numerus.numerator(arabicus.value.integer);
        }
      }

      return {
        numerus, romanus, arabicus, effiat, refer
      };
    }
  });
</script>

<template lang='vue'>
	<gustulare :gustulus='gustulus' />
	<template v-if='numerus'>
		<specere :verbum='numerus' @blur='numerus = undefined' />
	</template>
  <div class='text-center'>
    <v-card id='effectus' :text='romanus' />
    <template v-if='anglicus.numerator === 0'>
      <v-btn icon='equal' id='aequa' @click='refer();' />
    </template>
  </div>
  <div class='text-center'>
    <v-number-input @change='effiat();' id='integer' :rules='validator' validateOn='input'
                    v-model='anglicus.integer' autofocus clearable flat reverse />
    <v-card text=' + ' />
    <v-number-input @change='effiat();' id='numerator' :rules='validator' validateOn='input'
                    v-model='anglicus.numerator' clearable flat />
    <v-card :text="' ÷ '.concat(anglicus.denominator.toString())" />
  </div>
</template>
