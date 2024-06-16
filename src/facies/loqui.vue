<script lang='ts'>
  import { defineComponent } from 'vue';
  import { transducatur, transduceretne } from '../scriptura/transducere';
  import { referatur, referretne } from '../scriptura/referre';
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
        locutio: locutor.scribantur(),
        referret: referretne(),
        transduceret: transduceretne()
      };
    },

    methods: {
      refer (): Promise<void> {
        return new Promise(() => this.gustularium = referatur(this.locutio));
      },

      transduc (): void {
        transducatur(this.locutio);
      },

      remove (unicum: symbol): void {
        this.locutio = locutor.removeatur(unicum);
      }
    }
  });
</script>

<template>
  <v-snackbar :color='gustularium.color'
              :timeout='gustularium.vita'
              v-model='gustularium.visibile'>
    { gustularium.nuntium }
  </v-snackbar>
  <v-expansion-panels>
    <v-expansion-panel :title="lingua === 'anglica' ? 'Phrase' : 'Locutio'"
                       :text='locutio'
                       collapse-icon='top_panel_close'
                       expand-icon='menu' max=1>
      <v-expansion-panel-title>
        <span>Locutio</span>
        <v-btn-toggle density='compact'>
          <v-btn :readonly='referret'
                 @click='refer();'
                 icon='content_copy' />
          <v-btn :readonly='transduceret'
                 @click='transduc();'
                 icon='file_open' />
        </v-btn-toggle>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-chip-group>
          <v-chip v-for='verbum in verba' :key='verbum'
                  @click:close='remove(verbum.unicum);' close-icon='remove'
                  :text='verbum.scriptum' selected-class='text-primary' />
        </v-chip-group>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
