<script lang='ts'>
  import { defineComponent, type Ref, ref } from 'vue';
  import draggable from 'vuedraggable';
  import type Ignavum from '../miscella/ignavum';
  import { locutor, type Locutor } from '../miscella/locutor';
  import Gustulus from '../scriptura/gustulus';
  import gustulare from './gustulare.vue';

  const fusca: boolean = this.$dominus.hoc().facies.inhaesast()

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
        pellucidum: require('classifyx')({
          opacity: 0.5,
          background: require('pleasejs').make_color({
            value: fusca ? 0.75 : 0.25
          })
        })
      }
    }
  })
</script>

<template>
  <gustulare :gustulus='gustulus' />
  <v-chip-group id='locutio'>
    <draggable v-model='locutor.hoc().verba' :ghost-class='pellucidum'
               @start='trahens = true' @end='trahens = false'>
      <span :class="`mr-2 cursor-${trahens ? 'grab' : 'grabbing'}`">
        <template v-for='verbum in locutor.hoc().verba' :key='verbum.unicum'>
          <v-chip @click:close='locutor.hoc().removeatur(verbum.unicum)' close-icon='remove'
                  :text='verbum.monstretur()' :id='verbum.unicum' selected-class='text-primary' />
        </template>
      </span>
    </draggable>
  </v-chip-group>
</template>

<style>
  .v-chip:not(:last-child)::after
  { content: v-bind($dominus.hoc().separator.signetur()) }
</style>
