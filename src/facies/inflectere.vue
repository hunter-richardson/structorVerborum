<script setup lang='ts' generic='Hoc extends Multiplex'>
  import * as Agenda from '../praebeunda/agenda';

  import type { Faciendum, Referendum } from '../praebeunda/interfecta';
  import { type Eventus } from '../miscella/dictionarium';
  import { Multiplex, Numeramen, Numerus, Verbum } from '../praebeunda/verba';
  import Tabula from '../tabulae/tabula';

  defineProps<{ id: Hoc; }>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const verba: ModelRef<Hoc[] | undefined, string> = defineModel<Hoc[]>('verba');

  const agendum: Faciendum<Hoc> = eventus.value?.referendum as Faciendum<Hoc>;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tabula: Tabula<Hoc> | null = agendum?.putetur() ?? null;

  let figura: string = '';
  switch (true) {
    case agendum instanceof Agenda.ActusAgendus:
      figura = 'actusAgendus';
      break;
    case agendum instanceof Agenda.AdiectivumAgendum:
      figura = 'adiectivumAgendum';
      break;
    case agendum instanceof Agenda.Incomparabile:
      figura = 'incomparabile';
      break;
    case agendum instanceof Agenda.NomenActum:
      figura = 'nomenFactum';
      break;
    case agendum instanceof Agenda.NumeramenAgendum:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      figura = 'numeramenAgendum';
      break;
  }
</script>

<script lang='ts'>
  import { defineComponent, defineModel } from 'vue';
  import spectere from './specere.vue';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { genera, gradi, anglicum } from '../miscella/enumerationes';
  import Cocutor from '../miscella/cocutor';
  import type { ModelRef } from 'vue';
  import Gustulus from '../scriptura/gustulus';
  import gustulare from './gustulare.vue';

  const eventus: ModelRef<Eventus | undefined, string> = defineModel<Eventus>('eventus');
  const verbum: ModelRef<Verbum | undefined, string> = defineModel<Verbum>('verbum');

  const lingua: string | undefined = Cocutor.se.ipse().edatur('lingua');
  const categoria: string = eventus.value?.categoria ?? '';

  const seligenda: string[] = [];
  const selecta: string[] = [];

  const HorizontalScroll = require('vue-horizontal-scroll')

  export default defineComponent({
    components: {
      HorizontalScroll, gustulare, spectere
    },

    data () {
      return {
        anglica: lingua === 'anglica',
        gustulus: new Gustulus({}),
        categoria: categoria,
        figura: figura,
        seligenda: seligenda,
        selecta: selecta,
        verba: verba,
        eventus: eventus,
        verbum: verbum,
        onerans: true,
        et: {
          gradus: '',
          genus: ''
        },

        columnae: Multiplex.colamina(categoria).map(columna => {
          return {
            title: (this.anglica ? anglicum(columna) : columna).toUpperCase(),
            key: columna,

            filter: (verbum: Multiplex, colamen: string): boolean => {
              return verbum.valores().includes(colamen);
            }
          };
        })
      };
    },

    methods: {
      async omnes (): Promise<Hoc[]> {
        return await tabula?.tabulentur() ?? [];
      },

      async cole (): Promise<void> {
        this.onerans = true;
        const omnia: Hoc[] = await this.omnes();
        if (omnia) {
          this.verba = omnia.filter(verbum =>
            (this.selecta as string[]).every(selectum =>
              verbum.valores().includes(selectum)));
        }

        return await new Promise(() => this.onerans = !!omnia);

      },

      async numeramen (numeramen: Hoc): Promise<void> {
        if (this.figura === 'numeramenAgendum' &&
          numeramen instanceof Numeramen &&
          agendum instanceof Agenda.NumeramenAgendum) {
          const referendum: Referendum = (agendum as Agenda.NumeramenAgendum).referatur(numeramen.referendum);
          if (referendum instanceof Numerus) {
            this.verbum = referendum as Numerus;
          } else if (referendum instanceof Agenda.NomenAgendum) {
            this.eventus = {
              referendum: referendum as Agenda.NomenAgendum,
              categoria: 'nomen'
            };
          } else if (referendum instanceof Agenda.AdiectivumAgendum) {
            this.eventus = {
              referendum: referendum as Agenda.AdiectivumAgendum,
              categoria: 'adiectivum'
            };
          } else if (referendum instanceof Agenda.Incomparabile) {
            this.eventus = {
              referendum: referendum as Agenda.Incomparabile,
              categoria: 'adiectivum'
            };
          }
        }
      },

      selige (verbum: Hoc): void {
        this.verbum = verbum;
      },

      refer (eventus: {
        categoria: string,
        referendum?: string,
        gradus?: string,
        genus?: string;
      }): void {
        let referendum: Referendum | null = null;
        switch (figura) {
          case 'actusAgendus':
            if (agendum instanceof Agenda.ActusAgendus) {
              switch (eventus.referendum) {
                case 'frequentativus':
                  referendum = (agendum as Agenda.ActusAgendus).frequentativus();
                  break;
                case 'nomen':
                  referendum = (agendum as Agenda.ActusAgendus).nomen();
                  break;
                case 'actor':
                  referendum = (agendum as Agenda.ActusAgendus).actor(eventus.genus ?? '');
                  break;
              }
            }
            break;
          case 'nomenFactum':
            if (agendum instanceof Agenda.NomenActum) {
              referendum = (agendum as Agenda.NomenActum).actus();
            }
            break;
          case 'adiectivumAgendum':
            if (agendum instanceof Agenda.AdiectivumAgendum) {
              referendum = (agendum as Agenda.AdiectivumAgendum).probetur({
                gradus: eventus.gradus ?? '',
                genus: eventus.genus ?? ''
              });
            }
            break;
          case 'incomparabile':
            if (agendum instanceof Agenda.Incomparabile) {
              referendum = (agendum as Agenda.Incomparabile).probetur(eventus.genus ?? '');
            }
            break;
        }

        if (referendum) {
          this.eventus = {
            referendum: referendum,
            categoria: eventus.categoria
          };
        };
      }
    },

    async mounted (): Promise<void> {
      this.verba = await this.omnes();

      this.seligenda = [
        ...new Set((this.verba as Hoc[])
          .map(verbum => verbum.valores())
          .map(valor => Object.values(valor))
          .flat())
      ];

      return new Promise(() => this.onerans = false);
    }
  });
</script>

<template lang='vue'>
	<gustulare v-model='gustulus' />
  <template v-if='verbum'>
    <spectere v-model='verbum' @blur='verbum = undefined;' />
  </template>
  <template v-else>
    <div id='colamina'>
      <horizontal-scroll>
        <v-chip-group v-for='seligendum in seligenda' :key='seligendum'
                      selected-class='text-primary'>
          <v-chip :text="anglica ? anglicum(seligendum) : seligendum" @change='cole();'
                  :id="`colamen_${seligendum}`" prepend-icon='category' filter />
        </v-chip-group>
      </horizontal-scroll>
    </div>
    <template v-if="figura === 'actusAgendus'">
      <v-btn-toggle>
        <v-btn append-icon='sprint' id='frequentativus'
               :text="anglica ? 'Frequentative' : 'Frequentativus'"
               @click="refer({ categoria: 'nomen', referendum: 'frequentativus' });" />
        <v-btn append-icon='subject' id='nomen' :text="anglica ? 'Noun' : 'Nomen'"
               @click="refer({ categoria: 'nomen', referendum: 'nomen' });" />
        <v-btn append-icon='person' id='actor' :text="anglica ? 'Agent (masculine)' : 'Actor'"
               @click="refer({ categoria: 'nomen', referendum: 'actor', genus: 'masculinum' });" />
        <v-btn append-icon='person' id='actrix' :text="anglica ? 'Agent (feminine)' : 'Actrix'"
               @click="refer({ categoria: 'nomen', referendum: 'actor', genus: 'femininum' });" />
      </v-btn-toggle>
    </template>
    <template v-else-if="figura === 'nomenFactum'">
      <v-btn append-icon='sprint' id='actus' :text="anglica ? 'Verb' : 'Actus'"
             @click="refer({ categoria: 'actus' });" />
    </template>
    <template v-if="[
      'adiectivumAgendum', 'incomparabile'
    ].includes(figura)">
      <span class='text-center'>
        <v-select density='compact' id='genus' :label="anglica ? 'Gender' : 'Genus'"
                  v-model='et.genus' chips flat open-on-clear :items="genera.map(genus => {
                    return {
                      title: (anglica ? anglicum(genus) : genus).toUpperCase(),
                      value: genus
                    };
                  })" />
        <template v-if="figura === 'adiectivumAgendum'">
          <v-select density='compact' id='gradus' :label="anglica ? 'Grade' : 'Gradus'"
                    v-model='et.gradus' chips flat open-on-clear :items="gradi.map(gradus => {
                      return {
                        title: (anglica ? anglicum(gradus) : gradus).toUpperCase(),
                        value: gradus
                      };
                    })" />
          <v-btn append-icon='open_in_full' id='probetur'
                 :text="anglica ? 'Substantiate' : 'Probetur'"
                 @click="refer({ categoria: 'adiectivum', gradus: et.gradus, genus: et.genus });" />
        </template>
        <template v-else-if="figura === 'incomparabile'">
          <v-btn append-icon='open_in_full' id='probetur'
                 :text="anglica ? 'Substantiate' : 'Probetur'"
                 @click="refer({ categoria: 'adiectivum', genus: et.genus });" />
        </template>
      </span>
    </template>
    <v-data-table :items='verba' :loading='onerans' :headers='columnae' density='compact'
                  id='tabula' items-per-page='10' item-selectable=false>
      <template v-if='onerans'>
        <v-skeleton-loader :loading-text="anglica ? 'Loading words...' : 'Verba onerantur...'"
                           :loading='onerans' type='table-tbody' />
      </template>
      <template v-if='!onerans' v-slot:item='item'>
        <template v-if="figura === 'numeramenAgendum'">
          <v-btn :text="anglica ? 'Open' : 'Refer'" append-icon='open_in_full' id='numeramen'
                 @click='numeramen(item.item);' />
        </template>
        <template v-else>
          <v-btn :text="anglica ? 'Inflect' : 'Inflecte'" append-icon='open_in_full'
                 :id="`selige_${item.item.unicum.toString()}`" @click='selige(item.item)' />
        </template>
      </template>
    </v-data-table>
  </template>
</template>
