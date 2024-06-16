<script lang='ts'>
  import { defineComponent, defineModel } from 'vue';
  import Numeral from '../miscella/numeral';
  import { Numerus } from '../praebeunda/verba';
  import Spectere from './specere.vue';
  import Cocutor from '../miscella/cocutor';

  const numerus = defineModel<Numerus>();
  const cocutor: Cocutor = Cocutor.se.ipse();

  export default defineComponent({
    data () {
      return {
        romanus: '',
        lingua: cocutor.edatur('lingua') === 'anglica',
        numerus: numerus,
        anglicus: {
          integer: 0,
          numerator: 0,
          denominator: 12
        },

        validator: [
          (anglicus: number): boolean | string => {
            const error: string = this.lingua ?
              'Only Roman numerals allowed' : 'Romani numeri soli licuntur';
            return Number.isInteger(anglicus) || error;
          }
        ]
      };
    },

    methods: {
      effiat (): void {
        this.romanus = Numeral.romanus(this.anglicus.integer + (this.anglicus.numerator / this.anglicus.denominator));
      },

      refer (): void {
        if (this.anglicus.numerator === 0) {
          this.numerus = Numerus.numerator(this.anglicus.integer);
        }
      }
    },

    mounted(): void {
      this.effiat();
    }
  });
</script>

<template>
  <template v-if='numerus'>
    <Specere v-model='numerus' @blur='numerus = undefined' />
  </template>
  <div class='text-center'>
    <v-card id='effectus' :text='romanus' />
    <template v-if='anglicus.numerator === 0'>
      <v-btn icon='equal' @click='refer();' />
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
