<script lang='ts'>
  import { defineComponent, defineModel, type ComponentOptionsWithoutProps, type Ref, ref } from 'vue';
  import Numerator from '../miscella/numerator';
  import { Numerus } from '../praebeunda/verba';
  import Gustulus from '../scriptura/gustulus';
  import gustulare from './gustulare.vue';
  import specere from './specere.vue';

  type numeri = {
    arabicus: number,
    romanus: string;
  };

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
    gustulare, specere
  };

  const data = (): {
    gustulus: Ref<Gustulus | undefined>,
    actus: string[][],
    nihil: numeri;
  } => {
    return {
      gustulus: ref(),
      nihil: nihil,
      actus
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    setup () {
      const numerus: Ref<Numerus | undefined> = ref(defineModel<Numerus>());
      const operator: Ref<string> = ref('');
      const praesentes: Ref<numeri> = ref(nihil);
      const praevii: Ref<numeri> = ref(nihil);

      function operat (actus: string): boolean {
        return /^\+-•÷%=$/.test(actus);
      }

      function licta (actus: string): boolean {
        return operat(actus) ||
          !!praesentes.value.arabicus;
      }

      function ponatur (actus: string): void {
        if (actus === 'N') {
          praevii.value = nihil;
          praesentes.value = nihil;
        } else if (/^[|MDCLXVIS·:∴×]$/.test(actus)) {
          if (praesentes.value.arabicus) {
            praesentes.value.romanus += actus;
          } else {
            praesentes.value.romanus = actus;
          }

          try {
            praesentes.value.arabicus = Numerator.arabicus(praesentes.value.romanus);
          } catch {
            praesentes.value = nihil;
          }
        } else if (operat(actus)) {
          if (praevii.value.arabicus === 0) {
            praevii.value = praesentes.value;
          } else {
            switch ((operator.value ?? '').trim()) {
              case '+':
                praevii.value.arabicus += praesentes.value.arabicus;
                break;
              case '-':
                praevii.value.arabicus -= praesentes.value.arabicus;
                break;
              case '•':
                praevii.value.arabicus *= praesentes.value.arabicus;
                break;
              case '÷':
                praevii.value.arabicus /= praesentes.value.arabicus;
                break;
              case '%':
                praevii.value.arabicus %= praesentes.value.arabicus;
                break;
              default:
                praevii.value.arabicus = praesentes.value.arabicus;
                break;
            }

            praevii.value.romanus = Numerator.romanus(praevii.value.arabicus);
          }

          operator.value = actus === '=' ? '' : ` ${actus} `;
          praesentes.value = nihil;
        }
      }

      function aequa (): void {
        numerus.value = Numerus.numerator(praevii.value.arabicus);
      }

      return {
        numerus, operator, praesentes, praevii, licta, aequa, ponatur
      };
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
        <v-card id='operator.value' :text='operator' />
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
