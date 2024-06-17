<script lang='ts'>
  import { defineComponent, defineModel } from 'vue';
  import Numeral from '../miscella/numeral';
  import { Numerus } from '../praebeunda/verba';
  import Specere from './specere.vue';

  type numeri = {
    anglicus: number,
    romanus: string
  };

  const numerus = defineModel<Numerus>();
  const operator: string = '';

  const nihil: numeri = {
    anglicus: 0,
    romanus: 'N'
  };

  export default defineComponent({
    data() {
      return  {
        numerus: numerus,
        operator: operator,
        praevii: nihil,
        praesentes: nihil,
        nihil: nihil,
        actus: [
          [ ' I ', ' C ', ' · ', ' + ' ],
          [ ' V ', ' D ', ' : ', ' - ' ],
          [ ' X ', ' M ', ' ∴ ', ' • ' ],
          [ ' L ', ' | ', ' × ', ' ÷ ' ],
          [ ' = ', ' N ', ' S ', ' % ' ]
        ]
      };
    },

    methods: {
      operat (actus: string): boolean {
        return /^\+-•÷%=$/.test(actus);
      },

      licta(actus: string): boolean {
        return this.operat(actus) ||
            !!this.praesentes.anglicus;
      },

      ponatur(actus: string): void {
        if (actus === 'N') {
          this.praevii = nihil;
          this.praesentes = nihil;
        } else if (/^[|MDCLXVIS·:∴×]$/.test(actus)) {
          if (this.praesentes.anglicus) {
            this.praesentes.romanus += actus;
          } else {
            this.praesentes.romanus = actus;
          }

          try {
            this.praesentes.anglicus = Numeral.anglicus(this.praesentes.romanus);
          } catch {
            this.praesentes = nihil;
          }
        } else if (this.operat(actus)) {
          if (this.praevii.anglicus === 0) {
            this.praevii = this.praesentes;
          } else {
            switch ((this.operator ?? '').trim()) {
              case '+':
                this.praevii.anglicus += this.praesentes.anglicus;
                break;
              case '-':
                this.praevii.anglicus -= this.praesentes.anglicus;
                break;
              case '•':
                this.praevii.anglicus *= this.praesentes.anglicus;
                break;
              case '÷':
                this.praevii.anglicus /= this.praesentes.anglicus;
                break;
              case '%':
                this.praevii.anglicus %= this.praesentes.anglicus;
                break;
              default:
                this.praevii.anglicus = this.praesentes.anglicus;
                break;
            }

            this.praevii.romanus = Numeral.romanus(this.praevii.anglicus);
          }

          this.operator = actus === '=' ? '' : ` ${actus} `;
          this.praesentes = nihil;
        }
      },

      refer(): void {
        this.numerus = Numerus.numerator(this.praevii.anglicus);
      }
    }
  });
</script>

<template lang='vue'>
  <template v-if='this.numerus'>
    <Specere v-model='this.numerus'
             @blur='this.numerus = null;' />
  </template>
  <template v-if='this.praevii.anglicus'>
    <div class='text-center'>
      <template v-if='Number.isInteger(praevii.anglicus)'>
        <v-btn icon='equal' @click='refer();' />
      </template>
      <v-card :text='praevii.romanus' />
      <template v-if='operator'>
        <v-card :text='operator' />
      </template>
    </div>
  </template>
  <v-card :text='this.praesentes.romanus' />
  <div class='text-center' v-for='linea in this.actus' :key='linea'>
    <span class='text-center' v-for='littera in this.linea' :key='littera'>
      <v-card :text='littera' :disabled='this.licta(littera)'
              @click='ponatur(littera.trim());' density='comfortable'
              position='absolute' border hover />
    </span>
  </div>
</template>
