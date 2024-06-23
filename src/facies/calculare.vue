<script lang='ts'>
  import { defineComponent, defineModel } from 'vue';
  import Numerator from '../miscella/numerator';
  import { Numerus } from '../praebeunda/verba';
  import specere from './specere.vue';
  import Gustulus from '../scriptura/gustulus';
  import gustulare from './gustulare.vue';
  import type { ModelRef } from 'vue';

  type numeri = {
    arabicus: number,
    romanus: string
  };

  const numerus: ModelRef<Numerus | undefined, string> = defineModel<Numerus>();
  const operator: string = '';

  const nihil: numeri = {
    arabicus: 0,
    romanus: 'N'
  };

  const actus: string[][] = [
    [ ' I ', ' C ', ' · ', ' + ' ],
    [ ' V ', ' D ', ' : ', ' - ' ],
    [ ' X ', ' M ', ' ∴ ', ' • ' ],
    [ ' L ', ' | ', ' × ', ' ÷ ' ],
    [ ' = ', ' N ', ' S ', ' % ' ]
  ];

  export default defineComponent({
    components: { gustulare, specere },
    props: [ 'numerus' ],

    data() {
      return {
        gustulus: new Gustulus({}),
        operator: operator,
        praevii: nihil,
        praesentes: nihil,
        nihil: nihil,
        actus: actus
      };
    },

    methods: {
      operat (actus: string): boolean {
        return /^\+-•÷%=$/.test(actus);
      },

      licta(actus: string): boolean {
        return this.operat(actus) ||
          !!this.praesentes.arabicus;
      },

      ponatur(actus: string): void {
        if (actus === 'N') {
          this.praevii = nihil;
          this.praesentes = nihil;
        } else if (/^[|MDCLXVIS·:∴×]$/.test(actus)) {
          if (this.praesentes.arabicus) {
            this.praesentes.romanus += actus;
          } else {
            this.praesentes.romanus = actus;
          }

          try {
            this.praesentes.arabicus = Numerator.arabicus(this.praesentes.romanus);
          } catch {
            this.praesentes = nihil;
          }
        } else if (this.operat(actus)) {
          if (this.praevii.arabicus === 0) {
            this.praevii = this.praesentes;
          } else {
            switch ((this.operator ?? '').trim()) {
              case '+':
                this.praevii.arabicus += this.praesentes.arabicus;
                break;
              case '-':
                this.praevii.arabicus -= this.praesentes.arabicus;
                break;
              case '•':
                this.praevii.arabicus *= this.praesentes.arabicus;
                break;
              case '÷':
                this.praevii.arabicus /= this.praesentes.arabicus;
                break;
              case '%':
                this.praevii.arabicus %= this.praesentes.arabicus;
                break;
              default:
                this.praevii.arabicus = this.praesentes.arabicus;
                break;
            }

            this.praevii.romanus = Numerator.romanus(this.praevii.arabicus);
          }

          this.operator = actus === '=' ? '' : ` ${actus} `;
          this.praesentes = nihil;
        }
      },

      aequa(): void {
        this.numerus = Numerus.numerator(this.praevii.arabicus);
      }
    }
  });
</script>

<template lang='vue'>
	<gustulare :gustulus='gustulus' />
  <template v-if='this.numerus'>
    <specere :verbum='this.numerus'
             @blur='this.numerus = null;' />
  </template>
  <template v-if='this.praevii.anglicus'>
    <div class='text-center'>
      <template v-if='Number.isInteger(praevii.arabicus)'>
        <v-btn id='refer' icon='aequa' @click='aequa();' />
      </template>
      <v-card :text='praevii.romanus' />
      <template v-if='operator'>
        <v-card id='operator' :text='operator' />
      </template>
    </div>
  </template>
  <v-card :text='this.praesentes.romanus' />
  <div class='text-center' v-for='linea in this.actus' :key='linea'>
    <span class='text-center' v-for='littera in this.linea' :key='littera'>
      <v-card :text='littera' :id='`actus_${littera.trim()}`'
              :disabled='this.licta(littera)' density='comfortable'
              @click='ponatur(littera.trim());'
              position='absolute' border hover />
    </span>
  </div>
</template>
