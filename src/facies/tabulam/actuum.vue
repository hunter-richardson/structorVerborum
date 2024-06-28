<script lang='ts'>
  import { defineModel, defineProps, defineComponent, type ComponentOptionsWithoutProps } from 'vue';
  import specere from '../specere.vue';
  import seligere from '../seligere.vue';
  import gustulare from '../gustulare.vue';
  import Gustulus from '../../scriptura/gustulus';
  import { type Columnae, categoricum } from '../../scriptura/columnae';
  import type { Faciendum } from '../../praebeunda/interfecta';
  import { Actus } from '../../praebeunda/verba';
  import Cocutor from '../../miscella/cocutor';
  import Tabula from '../../tabulae/tabula';

  const agendum: Faciendum<Actus> = defineProps<{ agendum: Faciendum<Actus>; }>().agendum;
  const anglica: boolean = Cocutor.se.ipse().edatur('lingua') === 'anglica';
  const tabula: Tabula<Actus> | null = agendum.putetur();
  const actus: Actus | undefined = defineModel<Actus>().value;

  const componenta: ComponentOptionsWithoutProps = {
    'gustulare': gustulare,
    'specere': specere,
    'seligere': seligere
  };

  const data = (): {
    actus: Actus | undefined,
    columnae: Columnae,
    gustulus: Gustulus,
    onerans: boolean,
    anglica: boolean,
    actua: Actus[]
  } => {
    return {
      gustulus: new Gustulus({}),
      actus: actus,
      anglica: anglica,
      onerans: true,
      columnae: [],
      actua: []
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    methods: {
      async omnia (): Promise<Actus[]> {
        return await tabula?.tabulentur() ?? [];
      }, async oneratust (): Promise<void> {
        return new Promise(() => this.onerans = false);
      }, async cole (selecta: string[]): Promise<void> {
        this.onerans = true;
        const omnia: Actus[] = await this.omnia();
        if (omnia) {
          this.actua = omnia.filter(actus => selecta.every(selectum =>
            actus.valores().includes(selectum)));
        }

        return this.oneratust();
      }
    }, async mounted (): Promise<void> {
      this.actua = await this.omnia();
      this.columnae = categoricum<Actus>({
        categoria: 'actus',
        haec: this.actua as Actus[]
      });

      return this.oneratust();
    }
  });
</script>

<template lang='vue'>
  <gustulare :gustulus='gustulus' />
  <specere v-if='actus' :verbum='actus' @blur='actus = undefined;' />
  <template v-else>
    <seligere :multiplicia='actua' :selectum='cole' />
    <v-data-table :items='actua' :headers='columnae' density='compact'
                  :loading='onerans' :disabled='onerans' id='tabula'
                  items-per-page='10' item-selectable=false>
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
      </template>
</template>
