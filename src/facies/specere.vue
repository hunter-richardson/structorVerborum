<script lang='ts'>
  import { defineComponent, defineModel } from 'vue';
  import { Verbum, Multiplex, Actus, Numerus } from '../praebeunda/verba';
  import Locutor from '../miscella/locutor';
  import Inflectere from './inflectere.vue';
  import Cocutor from '../miscella/cocutor';
  import type { Eventus } from '../miscella/dictionarium';

  const verbum = defineModel<Verbum>('verbum');
  const eventus = defineModel<Eventus>('eventus');
  const lingua: string | undefined = Cocutor.se.ipse().edatur('lingua');

  export default defineComponent({
    data () {
      return {
        verbum: verbum.value,
        eventus: eventus.value,
        anglica: Cocutor.se.ipse().edatur('lingua') === 'anglica',
        multiplex: verbum.value instanceof Multiplex,
        valores: (verbum.value as Multiplex)?.valores() ?? [],
        locutor: Locutor.se.ipse()
      };
    },

    methods: {
      async refer (): Promise<void> {
        switch (this.verbum?.categoria) {
          case 'actus':
            const actus: Actus = this.verbum as Actus;
            if (actus.modus === 'participium') {
              this.eventus = {
                referendum: await actus.participialis(),
                categoria: 'adiectivum'
              };
            }
            break;
          case 'numerus':
            const numerus: Numerus = this.verbum as Numerus;
            const agendum = await numerus.numeramen();
            if (agendum) {
              this.eventus = {
                referendum: agendum,
                categoria: 'numeramen'
              };
            }
            break;
        }
      }
    }
  });
</script>

<template>
  <template v-if='eventus'>
    <Inflectere v-model='eventus' @blur='eventus = undefined;' />
  </template>
  <v-dialog v-if'verbum'>
    <v-card :title='verbum?.scriptum'>
      <span id='categoria'>{{ verbum?.categoria.capitalize() }}</span>
      <template v-if='multiplex'>
        <v-chip-group>
          <v-chip v-for='valor in valores' :key='valor' :text='valor' selected-class='text-primary'
                  prepend-icon='category' />
        </v-chip-group>
      </template>
      <v-btn-toggle>
        <template v-if='verbum?.paratumne()'>
          <v-btn icon='chat_add_on' :text="anglica ? 'Add this to my phrase' : 'Adde hoc locutioni'"
                 @click='locutor.addatur(verbum as Verbum);' />
        </template>
        <template v-if="verbum?.categoria === 'numerus'">
          <v-btn icon='quick_reference' @click='refer();' :text="anglica ? 'Open' : 'Refer'" />
        </template>
        <template v-else-if="verbum?.categoria === 'actus' &&
          valores.includes('participalis')">
          <v-btn icon='quick_reference' @click='refer();'
                 :text="anglica ? 'Particple' : 'Participalis'" />
        </template>
      </v-btn-toggle>
    </v-card>
  </v-dialog>
</template>
