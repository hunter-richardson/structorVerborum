<script lang='ts'>
  import { defineModel, defineComponent, defineProps, type ComponentOptionsWithoutProps } from 'vue'
  import specere from '../specere.vue'
  import seligere from '../seligere.vue'
  import onerare from '../onerare.vue'
  import gustulare from '../gustulare.vue'
  import Gustulus from '../../scriptura/gustulus'
  import { type Columnae, categoricum } from '../../scriptura/columnae'
  import { Pronomen } from '../../praebeunda/verba'
  import { Mantela } from '../../anomala/anomala'
  import Crustula from '../../miscella/crustula'
  import Tabula from '../../tabulae/tabula'

  const agendum: Mantela<Pronomen> = defineProps<{ agendum: Mantela<Pronomen>; }>().agendum;
  const pronomen: Pronomen | undefined = defineModel<Pronomen>().value;
  const tabula: Tabula<Pronomen> | null = agendum.putetur();
  const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;

  const componenta: ComponentOptionsWithoutProps = {
    'gustulare': gustulare,
    'seligere': seligere,
    'onerare': onerare,
    'specere': specere
  };

  const data = (): {
    pronomen: Pronomen | undefined,
    pronomina: Pronomen[],
    columnae: Columnae,
    gustulus: Gustulus,
    onerans: boolean,
    anglica: boolean
  } => {
    return {
      gustulus: new Gustulus({}),
      pronomen: pronomen,
      anglica: anglica,
      onerans: true,
      pronomina: [],
      columnae: []
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    methods: {
      async omnia(): Promise<Pronomen[]> {
        return await tabula?.tabulentur() ?? [];
      }, async oneratust (): Promise<void> {
        return new Promise(() => this.onerans = false);
      }, async forsInflectat(): Promise<void> {
        this.onerans = true;
        this.pronomen = this.pronomina.random()
        return this.oneratust();
      }, async cole(selecta: string[]): Promise<void> {
        this.onerans = true;
        const omnia: Pronomen[] = await this.omnia();
        if (omnia) {
          this.pronomina = omnia.filter(pronomen => selecta.every(selectum =>
              pronomen.valores().includes(selectum)));
        }
        return this.oneratust();
      }
    }, async mounted (): Promise<void> {
      this.pronomina = await this.omnia();
      this.columnae = categoricum<Pronomen>({
        categoria: 'pronomen',
        haec: this.pronomina as Pronomen[]
      });

      return this.oneratust();
    }
  });
</script>

<template>
  <gustulare :gustulus='gustulus' />
  <template v-if='pronomen'>
    <specere :verbum='pronomen' @blur='pronomen = undefined;' />
  </template>
  <template v-else>
    <seligere :multiplicia='pronomina' :selectum='cole' />
    <template v-if='pronomina.length > 1'>
      <v-btn append-icon='casino' @click='forsInflectat();' :disabled='onerans'
             id='fortuna' :text="anglica ? 'I\'m feeling Lucky' : 'Fors Inflectat'" />
    </template>
    <v-data-table :items='pronomina' :headers='columnae' density='compact' :loading='onerans'
                  :disabled='onerans' id='tabula' items-per-page='10' item-selectable=false>
      <onerare :onerans='onerans' pittacium='pronomina' />
      <template v-if='!onerans'>
        <v-btn v-for='hoc in pronomina' :key='hoc.unicum' :text="anglica ? 'Inflect' : 'Inflecte'"
               append-icon='open_in_full' :id='`selige_${hoc.unicum.toString()}`'
               @click='pronomen = hoc' />
      </template>
    </v-data-table>
  </template>
</template>

