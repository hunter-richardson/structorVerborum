<script lang='ts'>
  import { defineModel, defineProps, defineComponent, type ComponentOptionsWithoutProps } from 'vue';
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
  const actus: Actus | undefined = defineModel<Actus>().value;
  const referendum: Faciendum<Nomen> | undefined = defineModel<Faciendum<Nomen>>().value;

  const componenta: ComponentOptionsWithoutProps = {
    'inflectere': inflectere,
    'gustulare': gustulare,
    'seligere': seligere,
    'specere': specere
  };

  const data = (): {
    referendum: Faciendum<Nomen> | undefined,
    agendum: Faciendum<Actus>,
    actus: Actus | undefined,
    columnae: Columnae,
    gustulus: Gustulus,
    onerans: boolean,
    anglica: boolean,
    lectum: boolean,
    actua: Actus[]
  } => {
    return {
      gustulus: new Gustulus({}),
      referendum: referendum,
      anglica: anglica,
      agendum: agendum,
      lectum: lectum,
      onerans: true,
      columnae: [],
      actus: actus,
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
      }, async forsInflectat(): Promise<void> {
        this.onerans = true;
        this.actus = this.actua.random()
        return this.oneratust();
      }, async cole (selecta: string[]): Promise<void> {
        this.onerans = true;
        const omnia: Actus[] = await this.omnia();
        if (omnia) {
          this.actua = omnia.filter(actus => selecta.every(selectum =>
            actus.valores().includes(selectum)));
        }

        return this.oneratust();
      }, async refer(referendum: Promise<Faciendum<Nomen> | null>): Promise<void> {
        this.referendum = await referendum ?? undefined;
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
  <inflectere v-else-if='referendum' :agendum='referendum' @blur='referendum = undefined;' />
  <template v-else>
    <seligere :multiplicia='actua' :selectum='cole' />
    <template v-if='actua.length > 1'>
      <v-btn append-icon='casino' @click='forsInflectat();' :disabled='onerans'
             id='fortuna' :text="anglica ? 'I\'m feeling Lucky' : 'Fors Inflectat'" />
    </template>
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
    <v-btn-toggle v-if='lectum'>
      <v-btn :text="anglica ? 'Gerund' : 'Nomen'" append-icon='subject' id='nomen'
             @click='refer((agendum as ActusAgendus).nomen())' />
      <v-btn :text="anglica ? 'Agent (masculine)' : 'Actor'" append-icon='man' id='actor'
             @click="refer((agendum as ActusAgendus).actor('masculinum'))" />
      <v-btn :text="anglica ? 'Agent (feminine)' : 'Actrix'" append-icon='woman' id='actrix'
             @click="refer((agendum as ActusAgendus).actor('feminine'))" />
    </v-btn-toggle>
  </template>
</template>
