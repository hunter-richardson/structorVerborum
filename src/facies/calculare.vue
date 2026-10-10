<script setup lang='ts'>
  import { defineProps, ref, type Ref } from 'vue';
  import Numerator, { minimum as nihil, type Par } from '../miscella/numerator';
  import { Numerale } from '../praebeunda/verba';
  import Gustulus from '../scriptura/gustulus';
  import Gustulare from './gustulare.vue';
  import specere from './specere.vue';

  const gustulus: Gustulus | undefined = defineProps<Gustulus | undefined>()

  const numerus: Ref<Numerale | undefined> = ref<Numerale | undefined>()
  const operator: Ref<string> = ref<string>('')
  const praesentes: Ref<Par> = ref<Par>(nihil)
  const praevii: Ref<Par> = ref<Par>(nihil)

  const actus: string = 'IC·+ VD:- XM∴• L|×÷ =NS%'

  function operat (actus: string): boolean { return /^\+-•÷%=$/.test(actus); }

  function licta (actus: string): boolean
  { return operat(actus) || praesentes.value.arabicus > 0; }

  function ponatur (actus: string): void {
    if (actus === 'N') {
      praevii.value = praesentes.value = nihil;
    } else if (/^[|MDCLXVIS·:∴×]$/.test(actus)) {
      if (praesentes.value.arabicus) praesentes.value.romanus += actus;
      else praesentes.value.romanus = actus;
      try { praesentes.value.arabicus = Numerator.arabicus(praesentes.value.romanus); }
      catch { praesentes.value = nihil; }
    } else if (operat(actus)) {
      if (praevii.value.arabicus === 0) praevii.value = praesentes.value;
      else {
        switch ((operator.value ?? '').trim()) {
          case '+': praevii.value.arabicus += praesentes.value.arabicus; break;
          case '-': praevii.value.arabicus -= praesentes.value.arabicus; break;
          case '•': praevii.value.arabicus *= praesentes.value.arabicus; break;
          case '÷': praevii.value.arabicus /= praesentes.value.arabicus; break;
          case '%': praevii.value.arabicus %= praesentes.value.arabicus; break;
          default: praevii.value.arabicus = praesentes.value.arabicus; break;
        } praevii.value.romanus = Numerator.romanus(praevii.value.arabicus);
      } operator.value = actus === '=' ? '' : ` ${actus} `;
      praesentes.value = nihil;
    }
  }

  function aequa (): void { numerus.value = Numerale.numerator(praevii.value.arabicus); }
</script>

<template>
  <Gustulare v-if='gustulus !== undefined' :gustulus='gustulus' />
  <specere v-if='numerus !== undefined' :verbum='numerus' @blur='numerus = undefined' />
  <div class='text-center'>
    <v-btn v-if='Number.isInteger(praevii.arabicus)' id='refer' icon='aequa' @click='aequa()' />
    <v-card :text='praevii.romanus' />
    <v-card v-if='operator.length > 0' id='operator' :text='operator' />
  </div>
  <v-card :text='praesentes.romanus' />
  <div class='text-center' v-for="linea in (actus.split(' ') as string[])" :key='linea'>
    <span class='text-center' v-for="littera in Array.from(linea)" :key='littera'>
      <v-card :text="` ${littera} `" :id='`actus_${littera}`' :disabled='licta(littera)'
              density='comfortable' @click='ponatur(littera)' position='absolute' border hover />
    </span>
  </div>
</template>
