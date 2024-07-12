<script lang='ts'>
  import { defineModel, defineProps, defineComponent, type ComponentOptionsWithoutProps } from 'vue'
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
  const adverbium: Adverbium | undefined = defineModel<Adverbium>().value;
  const tabula: Tabula<Adverbium> | null = agendum.putetur();
  const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;

  const componenta: ComponentOptionsWithoutProps = {
    'gustulare': gustulare,
    'seligere': seligere,
    'specere': specere,
    'onerare': onerare
  };

  const data: () => {
    adverbium: Adverbium | undefined,
    adverbia: Adverbium[],
    columnae: Columnae,
    gustulus: Gustulus,
    anglica: boolean,
    onerans: boolean
  } = () => {
    return {
      gustulus: new Gustulus({}),
      adverbium: adverbium,
      anglica: anglica,
      onerans: true,
      adverbia: [],
      columnae: []
    };
    };

  export default defineComponent({
    components: componenta, data: data,
    methods: {
      async omnia (): Promise<Adverbium[]> {
        return await tabula?.tabulentur() ?? [];
      }, async oneratust (): Promise<void> {
        return new Promise(() => this.onerans = false);
      }, async forsInflectat(): Promise<void> {
        this.onerans = true;
        this.adverbium = this.adverbia.random()
        return this.oneratust();
      }, async cole (selecta: string[]): Promise<void> {
        this.onerans = true;
        const omnia: Adverbium[] = await this.omnia();
        if (omnia) {
          this.adverbia = omnia.filter(adverbium => selecta.every(selectum =>
            adverbium.valores().includes(selectum)));
        }

        return this.oneratust();
      }
    }, async mounted (): Promise<void> {
      this.adverbia = await this.omnia();
      this.columnae = categoricum<Adverbium>({
        categoria: 'adverbium',
        haec: this.adverbia as Adverbium[]
      });

      return this.oneratust();
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
