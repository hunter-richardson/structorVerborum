<script lang='ts'>
  import { defineComponent } from 'vue';
  import Gustularium from '../scriptura/gustularium';
  import Locutor from '../miscella/locutor';
  import Cocutor from '../miscella/cocutor';

  const locutor: Locutor = Locutor.se.ipse();

  export default defineComponent({
    data () {
      return {
        lingua: Cocutor.se.ipse().edatur('lingua'),
        gustularium: new Gustularium({}),
        verba: locutor.verba,
      };
    },

    methods: {
      remove (unicum: symbol): void {
        locutor.removeatur(unicum);
      }
    }
  });
</script>

<template>
  <v-snackbar :color='gustularium.color' :timeout='gustularium.vita' v-model='gustularium.visibile'>
    { gustularium.nuntium }
  </v-snackbar>
  <v-chip-group>
    <template v-for='verbum in verba'>
      <v-chip :v-bind:key='verbum' @click:close='remove(verbum.unicum);' close-icon='remove'
              :text='verbum.scriptum' selected-class='text-primary' />
    </template>
  </v-chip-group>
</template>
