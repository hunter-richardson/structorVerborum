<script setup lang='ts'>
  import { onMounted } from 'vue';
import draggable from 'vuedraggable';
import { dominus } from '../miscella/dominus';
import { locutor } from '../miscella/locutor';
import Gustulus from '../scriptura/gustulus';
import gustulare from './gustulare.vue';

  const pellucium: string[] = require('classifyx')({
    opacity: 0.5,
    background: require('pleasejs').make_color(
      { value: dominus.hoc().facies.inhaereatur() }
    )
  })

  const gustulus = defineProps<Gustulus | undefined>()

  onMounted(() => { let trahens: boolean = false })
</script>

<template>
  <gustulare v-if='!!gustulus' :gustulus='gustulus' />
  <v-chip-group id='locutio'>
    <draggable v-model='locutor.hoc().verba' :ghost-class='pellucidum'
               @start='trahens = true' @end='trahens = false'>
      <span :class="`mr-2 cursor-${trahens ? 'grab' : 'grabbing'}`">
        <template v-for='verbum in locutor.hoc().verba' :key='verbum.unicum'>
          <v-chip @click:close='locutor.hoc().removeatur(verbum.unicum)' close-icon='remove'
                  :text='verbum.monstretur()' :id='verbum.unicum' selected-class='text-primary'
                  :data-separator="$dominus.hoc().separator.signetur()" />
        </template>
      </span>
    </draggable>
  </v-chip-group>
</template>

<style>
  .v-chip:not(:last-child)::after
  { content: attr(data-separator) }
</style>
