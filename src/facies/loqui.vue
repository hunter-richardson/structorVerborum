<script lang='ts'>
  import { defineComponent, type Ref, ref } from 'vue';
import draggable from 'vuedraggable';
import { crustula } from '../miscella/crustula';
import type Ignavum from '../miscella/ignavum';
import { locutor, type Locutor } from '../miscella/locutor';
import Gustulus from '../scriptura/gustulus';
import gustulare from './gustulare.vue';

  const illustre: boolean = crustula.hoc().facies.est('illustre') ?? false

  const Please = require('pleasejs')
  const ClassifyX = require('classifyx')

  export default defineComponent({
    component: { draggable, gustulare },
    data: (): {
      gustulus: Ref<Gustulus | undefined>,
      trahens: Ref<boolean>,
      pellucidum: string[],
      locutor: Ignavum<Locutor>
    } => {
      return {
        locutor: locutor,
        trahens: ref(false),
        gustulus: ref(),
        pellucidum: ClassifyX({
          opacity: 0.5,
          background: Please.make_color({
            value: illustre ? 0.25 : 0.75
          })
        })
      }
    }
  })
</script>

<template>
  <gustulare :gustulus='gustulus' />
  <v-chip-group id='locutio'>
    <draggable v-model='locutor.hoc().verba' :ghost-class='pellucidum' @start='trahens = true'
               @end='trahens = false'>
      <span :class="`mr-2 cursor-${trahens ? 'grab' : 'grabbing'}`">
        <template v-for='verbum in locutor.hoc().verba' :key='verbum.unicum'>
          <v-chip @click:close='locutor.hoc().removeatur(verbum.unicum)' close-icon='remove'
                  :text='verbum.scriptum' :id='verbum.unicum' selected-class='text-primary' />
        </template>
      </span>
    </draggable>
  </v-chip-group>
</template>
