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
    <draggable v-model='locutor.verba'
               @start='trahens = true'
               @end='trahens = false'
               :ghost-class='pellucidum'
               :chosen-class='delectum'
               :drag-class='tractum'>
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
