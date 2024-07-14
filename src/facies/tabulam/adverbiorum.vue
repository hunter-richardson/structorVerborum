<script lang='ts'>
  import { defineModel, defineProps, defineComponent, type ComponentOptionsWithoutProps, type Ref, ref } from 'vue'
  import specere from '../specere.vue'
  import seligere from '../seligere.vue'
  import onerare from '../onerare.vue'
  import gustulare from '../gustulare.vue'
  import Gustulus from '../../scriptura/gustulus'
  import { type Columnae, categoricum } from '../../scriptura/columnae'
  import { AdverbiumAgendum } from '../../praebeunda/agenda'
  import { Adverbium } from '../../praebeunda/verba'
  import Crustula from '../../miscella/crustula'
  import Tabula from '../../tabulae/tabula'

  const agendum: AdverbiumAgendum = defineProps<{ agendum: AdverbiumAgendum; }>().agendum;
  const tabula: Tabula<Adverbium> | null = agendum.putetur();
  const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;

  async function omnia (): Promise<Adverbium[]> {
    return await tabula?.tabulentur() ?? [];
  }

  const componenta: ComponentOptionsWithoutProps = {
    gustulare, seligere, specere, onerare
  };

  const data: () => {
    gustulus: Ref<Gustulus | undefined>,
    columnae: Columnae,
    anglica: boolean;
  } = () => {
    return {
      gustulus: ref(),
      columnae: [],
      anglica
    };
    };

  export default defineComponent({
    components: componenta, data: data,
    setup () {
      const adverbium: Ref<Adverbium | undefined> = ref(defineModel<Adverbium>());
      const onerans: Ref<boolean> = ref(true);
      const adverbia: Ref<Adverbium[]> = ref([]);

      async function oneratust (): Promise<void> {
        onerans.value = false;
      }

      async function forsInflectat (): Promise<void> {
        onerans.value = true;
        adverbium.value = adverbia.value.random();
        return oneratust();
      }

      async function cole (selecta: string[]): Promise<void> {
        onerans.value = true;
        const omnes: Adverbium[] = await omnia();
        if (omnes) {
          adverbia.value = omnes.filter(adverbium => selecta.every(selectum =>
            adverbium.valores().includes(selectum)));
        }

        return oneratust();
      }

      return {
        adverbium, adverbia, onerans, forsInflectat, cole
      };
    }, async mounted (): Promise<void> {
      this.adverbia = await omnia();
      this.columnae = categoricum<Adverbium>({
        categoria: 'adverbium',
        haec: this.adverbia as Adverbium[]
      });

      this.onerans = false;
    }
  });
</script>

<template lang='vue'>
  <gustulare :gustulsu='gustulus' />
  <template v-if='adverbium'>
    <specere :verbum='adverbium' @blur='adverbium = undefined;' />
  </template>
  <template v-else>
    <seligere :multiplicia='adverbia' :selectum='cole' />
    <template v-if='adverbia.length > 1'>
      <v-btn append-icon='casino' @click='forsInflectat();' :disabled='onerans'
              id='fortuna' :text="anglica ? 'I\'m feeling Lucky' : 'Fors Inflectat'" />
    </template>
    <v-data-table :items='adverbia' :headers='columnae' density='compact' :loading='onerans'
                  :disabled='onerans' id='tabula' items-per-page='10' item-selectable=false>
      <onerare :onerans='onerans' pittacium='adverbia' />
      <template v-if='!onerans'>
        <v-btn v-for='hoc in adverbia' :key='hoc.unicum' :text="anglica ? 'Inflect' : 'Inflecte'"
              append-icon='open_in_full' :id='`selige_${hoc.unicum.toString()}`'
              @click='adverbium = hoc;' />
      </template>
    </v-data-table>
  </template>
</template>
