<script lang='ts'>
  import { defineComponent, defineModel } from 'vue';
  import Numerator from '../miscella/numerator';
  import { Numerus } from '../praebeunda/verba';
  import * as Specere from './specere.vue';
  import Cocutor from '../miscella/cocutor';
  import type { ModelRef } from 'vue';

  const cocutor: Cocutor = Cocutor.se.ipse();

  const numerus: ModelRef<Numerus | undefined, string> = defineModel<Numerus>();

  export default defineComponent({
    data () {
      return {
        romanus: '',
        anglica: cocutor.edatur('lingua') === 'anglica',
        numerus: numerus,
        arabicus: {
          integer: 0,
          numerator: 0,
          denominator: 12
        },

        validator: [
          (arabicus: number): boolean | string => {
            const error: string = this.anglica ?
              'Only Roman numerals allowed' : 'Romani numeri soli licuntur';
            return Number.isInteger(arabicus) || error;
          }
        ]
      };
    },

    methods: {
      effiat (): void {
        this.romanus = Numerator.romanus(this.arabicus.integer + (this.arabicus.numerator / this.arabicus.denominator));
      },

      refer (): void {
        if (this.arabicus.numerator === 0) {
          this.numerus = Numerus.numerator(this.arabicus.integer);
        }
      }
    },

    mounted(): void {
      this.effiat();
    }
  });
</script>

<template lang='vue'>
	<template v-if='numerus'>
		<Specere v-model='numerus' @blur='numerus = undefined' />
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
