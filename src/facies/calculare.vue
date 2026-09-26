<script setup lang='ts'>
  import { defineProps } from 'vue';
import Numerator, { minimum as nihil, type Par } from '../miscella/numerator';
import { Numerus } from '../praebeunda/verba';
import Gustulus from '../scriptura/gustulus';
import gustulare from './gustulare.vue';
import specere from './specere.vue';

  const gustulus: Gustulus | undefined = defineProps<Gustulus | undefined>()

  let numerus: Numerus | undefined = undefined

  const actus: string = 'IC·+ VD:- XM∴• L|×÷ =NS%'
  let operator: string = ''
  let praesentes: Par = nihil
  let praevii: Par = nihil

  function operat (actus: string): boolean { return /^\+-•÷%=$/.test(actus); }

  function licta (actus: string): boolean { return operat(actus) || !!praesentes.arabicus; }

  function ponatur (actus: string): void {
    if (actus === 'N') {
      praevii = praesentes = nihil;
    } else if (/^[|MDCLXVIS·:∴×]$/.test(actus)) {
      if (praesentes.arabicus) praesentes.romanus += actus;
      else praesentes.romanus = actus;
      try { praesentes.arabicus = Numerator.arabicus(praesentes.romanus); }
      catch { praesentes = nihil; }
    } else if (operat(actus)) {
      if (praevii.arabicus === 0) praevii = praesentes;
      else {
        switch ((operator ?? '').trim()) {
          case '+': praevii.arabicus += praesentes.arabicus; break;
          case '-': praevii.arabicus -= praesentes.arabicus; break;
          case '•': praevii.arabicus *= praesentes.arabicus; break;
          case '÷': praevii.arabicus /= praesentes.arabicus; break;
          case '%': praevii.arabicus %= praesentes.arabicus; break;
          default: praevii.arabicus = praesentes.arabicus; break;
        } praevii.romanus = Numerator.romanus(praevii.arabicus);
      } operator = actus === '=' ? '' : ` ${actus} `;
      praesentes = nihil;
    }
  }

  function aequa (): void { numerus = Numerus.numerator(praevii.arabicus); }
</script>

<template>
  <gustulare v-if='!!gustulus' :gustulus='gustulus' />
  <specere v-if='!!numerus' :verbum='numerus' @blur='numerus = undefined' />
  <div class='text-center'>
    <v-btn v-if='Number.isInteger(praevii.arabicus)' id='refer' icon='aequa' @click='aequa()' />
    <v-card :text='praevii.romanus' />
    <v-card v-if='!!operator' id='operator' :text='operator' />
  </div>
  <v-card :text='praesentes.romanus' />
  <div class='text-center' v-for="linea in (actus.split(' ') as string[])" :key='linea'>
    <span class='text-center' v-for="littera in Array.from(linea)" :key='littera'>
      <v-card :text="` ${littera} `" :id='`actus_${littera}`' :disabled='licta(littera)'
              density='comfortable' @click='ponatur(littera)' position='absolute' border hover />
    </span>
  </div>
</template>
