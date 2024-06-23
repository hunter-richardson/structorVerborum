<script lang='ts'>
  import { defineComponent, defineModel } from 'vue';
  import { Verbum, Multiplex, Actus, Numerus } from '../praebeunda/verba';
  import Locutor from '../miscella/locutor';
  import inflectere from './inflectere.vue';
  import Cocutor from '../miscella/cocutor';
  import type { Eventus } from '../miscella/dictionarium';
  import type { NumeramenAgendum } from '../praebeunda/agenda';
  import type { ModelRef } from 'vue';
  import Gustulus from '../scriptura/gustulus';
  import gustulare from './gustulare.vue';

  const eventus: ModelRef<Eventus | undefined, string> = defineModel<Eventus>('eventus');

  const lingua: string | undefined = Cocutor.se.ipse().edatur('lingua');
  const multiplex: boolean = false;
  const valores: string[] = []

  defineProps({ verbum: Verbum });

  export default defineComponent({
    components: { gustulare, inflectere },
    props: [ 'verbum' ],

    data() {
      return {
        gustulus: new Gustulus({}),
        eventus: eventus.value,
        anglica: lingua === 'anglica',
        multiplex: multiplex,
        valores: valores,
        locutor: Locutor.se.ipse()
      };
    },

    methods: {
      async aperi (): Promise<void> {
        switch (this.verbum?.categoria) {
          case 'actus': {
            const actus: Actus = verbum as Actus;
            if (actus.modus === 'participium') {
              this.eventus = {
                referendum: await actus.participialis(),
                categoria: 'adiectivum'
              };
            }

            break;
          }
          case 'numerus': {
            const numerus: Numerus = verbum as Numerus;
            const agendum: NumeramenAgendum | null = await numerus.numeramen();
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
    },

    mounted(): void {
      this.multiplex = this.verbum.value instanceof Multiplex;
      this.valores = this.multiplex ? (this.verbum.value as Multiplex)?.valores() : [];
    }
  });
</script>

<template lang='vue'>
	<gustulare :gustulus='gustulus' />
	<template v-if='eventus'>
		<inflectere :eventus='eventus' @blur='eventus = undefined;' />
	</template>
  <v-dialog v-if='verbum'>
    <v-card :title='verbum?.scriptum' :subtitle='verbum?.categoria.capitalize()'>
      <template v-if='multiplex'>
        <v-chip-group>
          <v-chip v-for='valor in valores' :key='valor' :text='valor' :id="`valor_${valor}`"
                  selected-class='text-primary' prepend-icon='category' />
        </v-chip-group>
      </template>
      <v-btn-toggle>
        <template v-if='verbum?.paratumne()'>
          <v-btn icon='chat_add_on' :text="anglica ? 'Add this to my phrase' : 'Adde hoc locutioni'"
                 id='adde' @click='locutor.addatur(verbum as Verbum);' />
        </template>
        <template v-if="verbum?.categoria === 'numerus'">
          <v-btn icon='quick_reference' id='aperi' @click='aperi();' :text="anglica ? 'Open' : 'Refer'" />
        </template>
        <template v-else-if="verbum?.categoria === 'actus' &&
          valores.includes('participalis')">
          <v-btn icon='quick_reference' id='aperi' @click='aperi();'
                 :text="anglica ? 'Particple' : 'Participalis'" />
        </template>
      </v-btn-toggle>
    </v-card>
  </v-dialog>
</template>
