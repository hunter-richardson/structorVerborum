<script setup lang='ts'>
  import { ref, type Ref } from 'vue'
  import draggable from 'vuedraggable'
  import { dominus } from '../miscella/dominus'
  import { locutor } from '../miscella/locutor'
  import Gustulus from '../scriptura/gustulus'
  import Gustulare from './gustulare.vue'

  const pellucidum: string[] = require('classifyx')({
    opacity: 0.5,
    background: require('pleasejs').make_color(
      { value: dominus.facies.inhaereatur() }
    )
  })

  const gustulus: Gustulus | undefined = defineProps<Gustulus | undefined>()
  const trahens: Ref<boolean> = ref<boolean>(false)
</script>

<template>
  <Gustulare v-if='gustulus !== undefined' :gustulus='gustulus' />
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
