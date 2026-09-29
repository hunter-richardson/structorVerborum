<script setup lang='ts'>
  import { ref, type Ref } from 'vue'
  import draggable from 'vuedraggable'
  import { dominus } from '../miscella/dominus.ts'
  import { locutor } from '../miscella/locutor.ts'
  import Gustulus from '../scriptura/gustulus.ts'
  import Gustulare from './gustulare.vue'

  const pellucidum: string[] = require('classifyx')({
    opacity: 0.5,
    background: require('pleasejs').make_color(
      { value: dominus.hoc().facies.inhaereatur() }
    )
  })

  const gustulus: Gustulus | undefined = defineProps<Gustulus | undefined>()
  const trahens: Ref<boolean> = ref<boolean>(false)
</script>

<template>
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <Gustulare v-if='!!gustulus' :gustulus='gustulus' />
  <v-chip-group id='locutio'>
    <draggable v-model='locutor.hoc().verba' :ghost-class='pellucidum'
               @start='trahens = true' @end='trahens = false'>
      <span :class="`mr-2 cursor-${trahens ? 'grab' : 'grabbing'}`">
        <template v-for='verbum in locutor.hoc().verba' :key='verbum.unicum'>
          <v-chip @click:close='locutor.hoc().removeatur(verbum.unicum)' close-icon='remove'
                  :text='verbum.monstretur()' :id='verbum.unicum' selected-class='text-primary'
                  :data-separator="dominus.hoc().separator.signetur()" />
        </template>
      </span>
    </draggable>
  </v-chip-group>
</template>

<style>
  .v-chip:not(:last-child)::after
  { content: attr(data-separator) }
</style>
