<script lang='ts'>
  import { defineComponent, defineModel, type ModelRef, type ComponentOptionsWithoutProps } from 'vue';
  import Numerator from '../miscella/numerator';
  import { Numerus } from '../praebeunda/verba';
  import Gustulus from '../scriptura/gustulus';
  import gustulare from './gustulare.vue';
  import specere from './specere.vue';

  type numeri = {
    arabicus: number,
    romanus: string;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const numerus: Numerus | undefined = defineModel<Numerus>().value;
  const operator: string = '';

  const nihil: numeri = {
    arabicus: 0,
    romanus: 'N'
  };

  const actus: string[][] = [
    [ 'I', 'C', '·', '+' ],
    [ 'V', 'D', ':', '-' ],
    [ 'X', 'M', '∴', '•' ],
    [ 'L', '|', '×', '÷' ],
    [ '=', 'N', 'S', '%' ]
  ];

  const componenta: ComponentOptionsWithoutProps = {
    'gustulare': gustulare,
    'specere': specere
  };

  const data = (): {
    numerus: Numerus | undefined,
    gustulus: Gustulus,
    operator: string,
    actus: string[][],
    praevii: numeri,
    praesentes: numeri,
    nihil: numeri;
  } => {
    return {
      gustulus: new Gustulus({}),
      operator: operator,
      numerus: numerus,
      praevii: nihil,
      praesentes: nihil,
      nihil: nihil,
      actus: actus
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    methods: {
      operat (actus: string): boolean {
        return /^\+-•÷%=$/.test(actus);
      }, licta (actus: string): boolean {
        return this.operat(actus) ||
          !!this.praesentes.arabicus;
      }, ponatur (actus: string): void {
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
      }, aequa (): void {
        this.numerus = Numerus.numerator(this.praevii.arabicus);
      }
    }
  });
</script>

<template lang='vue'>
	<gustulare :gustulus='gustulus' />
  <template v-if='numerus'>
    <specere :verbum='numerus'
             @blur='numerus = null;' />
  </template>
  <template v-if='praevii.anglicus'>
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
  <v-card :text='praesentes.romanus' />
  <div class='text-center' v-for='linea in actus' :key='linea'>
    <span class='text-center' v-for='littera in linea' :key='littera'>
      <v-card :text=` ${littera} ` :id='`actus_${littera}`'
              :disabled='licta(littera)' density='comfortable'
              @click='ponatur(littera);'
              position='absolute' border hover />
    </span>
  </div>
</template>
