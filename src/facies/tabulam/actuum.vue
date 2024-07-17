<script lang='ts'>
  import { defineModel, defineProps, defineComponent, type ComponentOptionsWithoutProps, type Ref, ref } from 'vue';
  import specere from '../specere.vue';
  import inflectere from '../inflectere.vue';
  import seligere from '../seligere.vue';
  import gustulare from '../gustulare.vue';
  import Gustulus from '../../scriptura/gustulus';
  import { ActusAgendus } from '../../praebeunda/agenda';
  import { type Columnae, categoricum } from '../../scriptura/columnae';
  import type { Faciendum } from '../../praebeunda/interfecta';
  import { Actus, Nomen } from '../../praebeunda/verba';
  import Crustula from '../../miscella/crustula';
  import Tabula from '../../tabulae/tabula';

  const agendum: Faciendum<Actus> = defineProps<{ agendum: Faciendum<Actus>; }>().agendum;
  const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;
  const tabula: Tabula<Actus> | null = agendum.putetur();
  const lectum: boolean = agendum instanceof ActusAgendus;

  async function omnia (): Promise<Actus[]> {
    return await tabula?.tabulentur() ?? [];
  }

  const componenta: ComponentOptionsWithoutProps = {
    inflectere, gustulare, seligere, specere
  };

  const data = (): {
    gustulus: Ref<Gustulus | undefined>,
    agendum: Faciendum<Actus>,
    columnae: Columnae,
    anglica: boolean,
    lectum: boolean;
  } => {
    return {
      gustulus: ref(),
      columnae: [],
      anglica,
      agendum,
      lectum
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    async mounted (): Promise<void> {
      this.actua = await omnia();
      this.columnae = categoricum<Actus>({
        categoria: 'actus',
        haec: this.actua as Actus[]
      });

      this.onerans = false;
    }, setup () {
      const referendum: Ref<Faciendum<Nomen> | undefined> = ref(defineModel<Faciendum<Nomen>>());
      const actus: Ref<Actus | undefined> = ref(defineModel<Actus>());
      const onerans: Ref<boolean> = ref(false);
      const actua: Ref<Actus[]> = ref([]);

      async function oneratust (): Promise<void> {
        onerans.value = false;
      }

      async function forsInflectat (): Promise<void> {
        onerans.value = true;
        actus.value = actua.value.random();
        return oneratust();
      }

      async function cole (selecta: string[]): Promise<void> {
        onerans.value = true;
        const omnes: Actus[] = await omnia();
        if (omnes) {
          actua.value = omnes.filter(actus => selecta.every(selectum =>
            actus.valores().includes(selectum)));
        }

        return oneratust();
      }

      async function refer (res: Promise<Faciendum<Nomen> | null>): Promise<void> {
        referendum.value = await res ?? undefined;
      }

      function age (res: Faciendum<Nomen> | null): void {
        referendum.value = res ?? undefined;
      }

      return {
        onerans, actus, actua, referendum, forsInflectat, cole, refer, age
      }
    }
  });
</script>

<template>
  <gustulare :gustulus='gustulus' />
  <specere v-if='actus' :verbum='actus' @blur='actus = undefined;' />
  <inflectere v-else-if='referendum' :agendum='referendum' @blur='referendum = undefined;' />
  <template v-else>
    <seligere :multiplicia='actua' :selectum='cole' />
    <template v-if='actua.length > 1'>
      <v-btn append-icon='casino' @click='forsInflectat();' :disabled='onerans' id='fortuna'
             :text="anglica ? 'I\'m feeling Lucky' : 'Fors Inflectat'" />
    </template>
    <v-data-table :items='actua' :headers='columnae' density='compact' :loading='onerans'
                  :disabled='onerans' id='tabula' items-per-page='10' item-selectable=false>
      <template v-if='onerans'>
        <v-skeleton-loader :loading-text="anglica ? 'Loading verbs...' : 'Actus onerantur...'"
                           :loading='onerans' type='table-tbody' />
      </template>
      <template v-else>
        <v-btn v-for='hoc in actua' :key='hoc.unicum' :text="anglica ? 'Inflect' : 'Inflecte'"
               append-icon='open_in_full' :id='`selige_${hoc.unicum.toString()}`'
               @click='actus = hoc;' />
      </template>
    </v-data-table>
    <v-btn-toggle v-if='lectum'>
      <v-btn :text="anglica ? 'Gerund' : 'Nomen'" append-icon='subject' id='nomen'
             @click='refer((agendum as ActusAgendus).nomen())' />
      <v-btn :text="anglica ? 'Agent (masculine)' : 'Actor'" append-icon='man' id='actor'
             @click="age((agendum as ActusAgendus).actor('masculinum'))" />
      <v-btn :text="anglica ? 'Agent (feminine)' : 'Actrix'" append-icon='woman' id='actrix'
             @click="age((agendum as ActusAgendus).actor('feminine'))" />
    </v-btn-toggle>
  </template>
</template>
