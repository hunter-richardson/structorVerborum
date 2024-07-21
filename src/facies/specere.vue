<script lang='ts'>
  import { defineComponent, defineModel, type ComponentOptionsWithoutProps, type Ref, ref, toRef } from 'vue';
  import docere from './docere.vue';
  import inflectere from './inflectere.vue';
  import gustulare from './gustulare.vue';
  import Gustulus from '../scriptura/gustulus';
  import { Verbum, Multiplex, Actus, Numerus } from '../praebeunda/verba';
  import Locutor from '../miscella/locutor';
  import Crustula from '../miscella/crustula';
  import { Encliticum } from '../miscella/enumerationes';
  import type { Eventus } from '../miscella/dictionarium';
  import type { NumeramenAgendum } from '../praebeunda/agenda';

  const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;

  const componenta: ComponentOptionsWithoutProps = {
    inflectere, gustulare, docere
  };

  const data = (): {
    gustulus: Ref<Gustulus | undefined>,
    valores: string[],
    enclitica: string[],
    anglica: boolean;
  } => {
    return {
      gustulus: ref(),
      valores: [],
      enclitica: [],
      anglica
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    setup () {
      const verbum: Ref<Verbum> = toRef(defineProps<{ verbum: Verbum; }>(), 'verbum');
      const eventus: Ref<Eventus | undefined> = ref(defineModel<Eventus>());
      const propriabile: Ref<boolean> = ref(false);
      const multiplex: Ref<boolean> = ref(false);
      const encliticum: Ref<string> = ref('');

      async function aperi (): Promise<void> {
        switch (verbum.value?.categoria) {
          case 'actus': {
            const actus: Actus = verbum.value as Actus;
            if (actus.modus === 'participium') {
              eventus.value = {
                referendum: await actus.participialis(),
                categoria: 'adiectivum'
              };
            }

            break;
          }
          case 'numerus': {
            const numerus: Numerus = verbum.value as Numerus;
            const agendum: NumeramenAgendum | null = await numerus.numeramen();
            if (agendum) {
              eventus.value = {
                referendum: agendum,
                categoria: 'numeramen'
              };
            }
            break;
          }
        }
      }

      function adde (): void {
        if (verbum.value) {
          if ([ multiplex, encliticum ].every(res => !!res.value)) {
            (verbum.value as Multiplex).encliticum = encliticum.value;
          }

          const locutor: Locutor = Locutor.se.ipse();
          locutor.addatur(verbum.value);
        }
      }

      function addeProprium (): void {
        if (verbum.value && propriabile.value) {
          verbum.value.scriptum = verbum.value.scriptum.capitalize();
        }

        adde();
      }

      return {
        eventus, verbum, encliticum, multiplex, propriabile, aperi, adde, addeProprium
      };
    }, mounted (): void {
      this.multiplex = this.verbum ? this.verbum instanceof Multiplex : false;
      if (this.multiplex) {
        this.valores = (this.verbum as Multiplex)?.valores();
      }

      this.propriabile = [
        [
          'nomen', 'adiectivum'
        ].includes(this.verbum?.categoria ?? ''),
        !this.verbum?.scriptum.isCapitalized()
      ].all();

      this.enclitica = Object.keys(Encliticum)
        .filter(encliticum => !this.verbum?.scriptum.endsWith(encliticum));
    }
  });
</script>

<template>
  <gustulare :gustulus='gustulus' />
  <template v-if='eventus'>
    <inflectere :eventus='eventus' @blur='eventus = undefined;' />
  </template>
  <v-dialog v-else-if='verbum'>
    <v-card :title='verbum.scriptum' :subtitle='verbum.categoria.capitalize()'>
      <template v-if='multiplex'>
        <v-chip-group>
          <v-chip v-for='valor in valores' :key='valor' :text='valor' :id="`valor_${valor}`"
                  selected-class='text-primary' prepend-icon='category' />
        </v-chip-group>
        <v-select density='compact' id='enclitica' v-model='encliticum'
                  :title="anglica ? 'Enclitics' : 'Enclitica'" :items='enclitica' chips flat
                  open-on-clear />
      </template>
      <docere :docendum='verbum.categoria' />
      <template v-if='multiplex'>
        <docere v-for='valor in valores' :key='valor' :docendum='valor' />
      </template>
      <v-btn-toggle>
        <template v-if='verbum?.paratumne()'>
          <v-btn icon='chat_add_on' id='adde' @click='adde();'
                 :text="anglica ? 'Add this to my phrase' : 'Adde hoc locutioni'" />
        </template>
        <template v-if='propriabile'>
          <v-bnt icon='chat_add_on' id='addeProprium' @click='addeProprium();'
                 :text="anglica ? 'Add this to my phrase as a proper name' : 'Adde hoc locutioni ut proprium'" />
        </template>
        <template v-else-if="verbum?.categoria === 'numerus'">
          <v-btn icon='quick_reference' id='aperi' @click='aperi();'
                 :text="anglica ? 'Open' : 'Refer'" />
        </template>
        <template v-else-if="[
          verbum?.categoria === 'actus',
          valores.includes('participium')
        ].all()">
          <v-btn icon='quick_reference' id='aperi' @click='aperi();'
                 :text="anglica ? 'Particple' : 'Participalis'" />
        </template>
      </v-btn-toggle>
    </v-card>
  </v-dialog>
</template>
