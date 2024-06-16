<script setup lang='ts' generic='Hoc extends Multiplex'>
  import * as Agenda from '../praebeunda/agenda';

  import type { Faciendum, Referendum } from '../praebeunda/interfecta';
  import { type Eventus } from '../miscella/dictionarium';
  import { Multiplex, Numeramen, Numerus, Verbum } from '../praebeunda/verba';
  import Tabula from '../tabulae/tabula';

  defineProps<{ id: Hoc; }>();

  const eventus = defineModel<Eventus>();
  const categoria: string = eventus.value?.categoria ?? '';
  const agendum: Faciendum<Hoc> = eventus.value?.referendum as Faciendum<Hoc>;
  const tabula: Tabula<Hoc> | null = agendum?.putetur();
  const verba: Hoc[] = [];
  const colamina: Agenda.Colamen<Hoc>[] = [];
  const selecta: string[] = [];

  let figura: string;
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
    case agendum instanceof Agenda.NomenFactum:
      figura = 'nomenFactum';
      break;
    case agendum instanceof Agenda.NumeramenAgendum:
      figura = 'numeramenAgendum';
      break;
  }
</script>

<script lang='ts'>
  import { defineComponent } from 'vue';
  import Spectere from './specere.vue';
  import { genera, gradi, anglicum } from '../miscella/enumerationes';
  import Cocutor from '../miscella/cocutor';

  const lingua: string | undefined = Cocutor.se.ipse().edatur('lingua');

  export default defineComponent({
    data () {
      return {
        lingua: lingua,
        categoria: categoria,
        figura: figura,
        colamina: colamina,
        selecta: selecta,
        verba: verba,
        eventus: eventus,
        onerans: true,
        verbum: null,
        et: {
          gradus: '',
          genus: ''
        },

        columnae: Multiplex.colamina(categoria).map(columna => {
          return {
            title: (lingua === 'anglica' ? anglicum(columna) : columna).toUpperCase(),
            align: 'start',
            key: columna
          };
        })
      };
    },

    methods: {
      async omnes (): Promise<Hoc[] | null> {
        return await tabula?.tabulentur() ?? null;
      },

      async cole (): Promise<void> {
        this.onerans = true;
        this.verba = ((await this.omnes()) as Hoc[])
          .filter(verbum =>
            (this.selecta as string[]).every(selectum =>
              verbum.valores().includes(selectum)));
        await new Promise(() => this.onerans = false);
      },

      async numeramen (numeramen: Numeramen): Promise<void> {
        if (this.figura === 'numeramenAgendum') {
          const referendum: Referendum = (this.agendum as Agenda.NumeramenAgendum).referatur(numeramen.numerium);
          if (referendum instanceof Numerus) {
            this.verba = referendum as Numerus;
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

      seliga (verbum: Verbum): void {
        this.verbum = verbum;
      },

      refer (eventus: Eventus): void {
        this.eventus = eventus;
      }

    },

    async mounted (): Promise<void> {
      this.verba = await this.omnes();
      this.colamina = [
        ...new Set((this.verba as Hoc[])
          .map(verbum => verbum.valores())
          .flat())
      ];

      return new Promise(() => this.onerans = false);
    }
  });
</script>

<template>
  <template v-if='verbum'>
    <Spectere v-model='verbum' @blur='verbum = null;' />
  </template>
  <template v-else>
    <v-chip-group selected-class='text-primary'>
      <template v-for='colamen in colamina'>
        <v-chip :text="lingua === 'anglica' ? anglicum(Object.values(colamen).first()).toString() : Object.values(colamen).first().toString()"
                @change='cole();' prepend-icon='category' filter />
      </template>
    </v-chip-group>
    <v-data-table :items='verba' v-for='ullum in verba' :v-bind:key='ullum' :loading='onerans'
                  :headers='columnae' density='compact' items-per-page='10' item-selectable=false>
      <template v-if='onerans'>
        <v-skeleton-loader :loading-text="lingua === 'anglica' ? 'Loading words...' : 'Verba onerantur...'"
                           :loading='onerans' type='table-tbody' />
      </template>
      <template v-else-if="figura === 'numeramenAgendum'">
        <v-btn :text="lingua === 'anglica' ? 'Open' : 'Refer'" append-icon='open_in_full'
               @click='numeramen(ullum as Numeramen);' />
      </template>
      <template v-else>
        <v-btn :text="lingua === 'anglica' ? 'Inflect' : 'Inflecte'" append-icon='open_in_full'
               @click='seliga(ullum)' />
      </template>
    </v-data-table>
    <template v-if="figura === 'actusAgendus'">
      <v-btn-toggle>
        <v-btn append-icon='subject' :text="lingua === 'anglica' ? 'Noun' : 'Nomen'" @click="refer({
          categoria: 'nomen',
          referendum: (agendum as Agenda.ActusAgendus).nomen()
        });" />
        <v-btn append-icon='person' :text="lingua === 'anglica' ? 'Agent (masculine)' : 'Actor'"
               @click="refer({
                categoria: 'nomen',
                referendum: (agendum as Agenda.ActusAgendus).actor('masculinum')
              });" />
        <v-btn append-icon='person' :text="lingua === 'anglica' ? 'Agent (feminine)' : 'Actrix'"
               @click="refer({
                categoria: 'nomen',
                referendum: (agendum as Agenda.ActusAgendus).actor('femininum')
              });" />
      </v-btn-toggle>
    </template>
    <template v-else-if="figura === 'nomenFactum'">
      <v-btn append-icon='sprint' :text="lingua === 'anglica' ? 'Verb' : 'Actus'" @click="refer({
        categoria: 'actus',
        referendum: (agendum as Agenda.NomenFactum).actus()
      });" />
    </template>
    <template v-if="[
      'adiectivumAgendum', 'incomparabile'
    ].includes(figura)">
      <span class='text-center'>
        <v-select density='compact' id='genus' :label="lingua === 'anglica' ? 'Gender' : 'Genus'"
                  v-model='et.genus' chips flat open-on-clear :items="genera.map(genus => {
                    return {
                      title: (lingua === 'anglica' ? anglicum(genus) : genus).toUpperCase(),
                      value: genus
                    };
                  })" />
        <template v-if="figura === 'adiectivumAgendum'">
          <v-select density='compact' id='gradus' :label="lingua === 'anglica' ? 'Grade' : 'Gradus'"
                    v-model='et.gradus' chips flat open-on-clear :items="gradi.map(gradus => {
                      return {
                        title: (lingua === 'anglica' ? anglicum(gradus) : gradus).toUpperCase(),
                        value: gradus
                      };
                    })" />
          <v-btn append-icon='open_in_full'
                 :text="lingua === 'anglica' ? 'Substantiate' : 'Probetur'" @click="refer({
                  categoria: 'adiectivum',
                  referendum: (agendum as Agenda.AdiectivumAgendum).probetur({
                    gradus: et.gradus,
                    genus: et.genus
                  })
                });" />
        </template>
        <template v-else-if="figura === 'incomparabile'">
          <v-btn append-icon='open_in_full'
                 :text="lingua === 'anglica' ? 'Substantiate' : 'Probetur'" @click="refer({
                  categoria: 'adiectivum',
                  referendum: (agendum as Agenda.Incomparabile).probetur(et.genus)
                });" />
        </template>
      </span>
    </template>
  </template>
</template>
