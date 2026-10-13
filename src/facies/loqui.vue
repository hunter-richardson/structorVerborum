<script setup lang='ts'>
  import { ref, type Ref } from 'vue'
  import draggable from 'vue-draggable-next'
  import { dominus } from '@/miscella/dominus'
  import { locutor } from '@/miscella/locutor'
  import { cfx } from 'classifyx'

  const trahens: Ref<boolean> = ref(false)
  const delectum: string = cfx({
    background: dominus.facies.tonus,
  })
  const tractum: string = cfx({
    backgrounnd: delectum,
    opacity: 0.5
  })
  const pellucidum: string = cfx({
    background: delectum,
    opacity: 0.25
  });
</script>

<template>
  <v-chip-group id='locutio'>
    <draggable v-model='locutor.verba' :drag-class='tractum'
               :ghost-class='pellucidum' :chosen-class='delectum'
               @start='trahens = true' @end='trahens = false'>
      <span :class="`mr-2 cursor-${trahens ? 'grab' : 'grabbing'}`">
        <template v-for='verbum in locutor.verba' :key='verbum.unicum'>
          <v-chip :id='verbum.unicum' selected-class='text-primary'
                  :text='verbum.monstretur()' close-icon='remove'
                  :data-separator='dominus.separator.signum'
                  @click:close='locutor.removeatur(verbum.unicum)' />
        </template>
      </span>
    </draggable>
  </v-chip-group>
</template>

<style>
  .v-chip:not(:last-child)::after
  { content: attr(data-separator) }
</style>
