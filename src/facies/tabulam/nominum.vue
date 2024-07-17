<script lang='ts'>
  import { defineModel, defineProps, defineComponent, type ComponentOptionsWithoutProps, type Ref, ref } from 'vue';
  import specere from '../specere.vue';
  import onerare from '../onerare.vue';
  import seligere from '../seligere.vue';
  import inflectere from '../inflectere.vue';
  import gustulare from '../gustulare.vue';
  import Gustulus from '../../scriptura/gustulus';
  import { type Columnae, categoricum } from '../../scriptura/columnae';
  import { NomenActum } from '../../praebeunda/agenda';
  import type { Faciendum } from '../../praebeunda/interfecta';
  import { Nomen, Actus } from '../../praebeunda/verba';
  import Crustula from '../../miscella/crustula';
  import Tabula from '../../tabulae/tabula';

  const agendum: Faciendum<Nomen> = defineProps<{ agendum: Faciendum<Nomen>; }>().agendum;
  const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;
  const tabula: Tabula<Nomen> | null = agendum.putetur();
  const actum: boolean = agendum instanceof NomenActum;

  async function omnia (): Promise<Nomen[]> {
    return await tabula?.tabulentur() ?? [];
  }

  const componenta: ComponentOptionsWithoutProps = {
    inflectere, gustulare, seligere, specere, onerare
  };

  const data = (): {
    gustulus: Ref<Gustulus | undefined>,
    agendum: Faciendum<Nomen>,
    columnae: Columnae,
    anglica: boolean,
    actum: boolean;
  } => {
    return {
      gustulus: ref(),
      columnae: [],
      agendum,
      anglica,
      actum
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    setup () {
      const actus: Ref<Faciendum<Actus> | undefined> = ref(defineModel<Faciendum<Actus>>());
      const nomen: Ref<Nomen | undefined> = ref(defineModel<Nomen>());
      const onerans: Ref<boolean> = ref(true);
      const nomina: Ref<Nomen[]> = ref([]);

      async function oneratust (): Promise<void> {
        onerans.value = false;
      }

      async function forsInflectat (): Promise<void> {
        onerans.value = true;
        nomen.value = nomina.value.random();
        return oneratust();
      }

      async function cole (selecta: string[]): Promise<void> {
        const omnes: Nomen[] = await omnia();
        if (omnes) {
          nomina.value = omnes.filter(nomen => selecta.every(selectum =>
            nomen.valores().includes(selectum)))
        }

        return oneratust();
      }

      async function refer (): Promise<void> {
        actus.value = await (agendum as NomenActum).actus() ?? undefined;
      }

      return {
        nomen, nomina, actus, onerans, forsInflectat, cole, refer
      };
    }, async mounted (): Promise<void> {
      this.nomina = await omnia();
      this.columnae = categoricum<Nomen>({
        categoria: 'nomen',
        haec: this.nomina as Nomen[]
      });

      this.onerans = false;
    }
  });
</script>

<template>
  <gustulare :gustulus='gustulus' />
  <specere v-if='nomen' :verbum='nomen' @blur='nomen = undefined;' />
  <inflectere v-else-if='actus' :agendum='actus' @blur='actus = undefined;' />
  <template v-else>
    <seligere :multiplicia='nomina' :selectum='cole' />
    <template v-if='nomina.length > 1'>
      <v-btn append-icon='casino' @click='forsInflectat();' :disabled='onerans' id='fortuna'
             :text="anglica ? 'I\'m feeling Lucky' : 'Fors Inflectat'" />
    </template>
    <v-data-table :items='nomina' :headers='columnae' density='compact' :loading='onerans'
                  :disabled='onerans' id='tabula' items-per-page='10' item-selectable=false>
      <onerare :onerans='onerans' pittacium='nomina' />
      <template v-if='!onerans'>
        <v-btn v-for='hoc in nomina' :key='hoc.unicum' :text="anglica ? 'Inflect' : 'Inflecte'"
               append-icon='open_in_full' :id='`selige_${hoc.unicum.toString()}`'
               @click='nomen = hoc;' />
      </template>
    </v-data-table>
    <v-btn v-if='actum' :text="anglica ? 'Verb' : 'Actus'" append-icon='sprint' id='actus'
           @click='refer()' />
  </template>
</template>
