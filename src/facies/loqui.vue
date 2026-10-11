<script setup lang='ts'>
  import { ref, type Ref } from 'vue'
  import draggable from 'vuedraggable'
  import { dominus } from '../miscella/dominus'
  import { locutor } from '../miscella/locutor'
  import Gustulare from './gustulare.vue'
  import { cfx } from 'classifyx'
  import * as Please from 'pleasejs'

  const pellucidum: string[] = cfx({
    opacity: 0.5,
    background: Please.make_color({
      value: dominus.facies.inhaereatur(),
      format: 'hex'
    })
  })
  const trahens: Ref<boolean> = ref(false)
</script>

<template>
  <Gustulare />
  <v-chip-group id='locutio'>
    <draggable v-model='locutor.verba' :ghost-class='pellucidum'
               @start='trahens = true' @end='trahens = false'>
      <span :class="`mr-2 cursor-${trahens ? 'grab' : 'grabbing'}`">
        <template v-for='verbum in locutor.verba' :key='verbum.unicum'>
          <v-chip @click:close='locutor.removeatur(verbum.unicum)' close-icon='remove'
                  :text='verbum.monstretur()' :id='verbum.unicum' selected-class='text-primary'
                  :data-separator="dominus.separator.signum" />
        </template>
      </span>
    </draggable>
  </v-chip-group>
</template>

<style>
  .v-chip:not(:last-child)::after
  { content: attr(data-separator) }
</style>
