<script setup lang='ts' generic='Hoc extends Multiplex'>
  import Tabula from '../tabulae/tabula';
  import type { Faciendum } from '../praebeunda/interfecta';
  import type { Eventus } from '../miscella/dictionarium';


  const eventus: Eventus = defineProps<{ eventus: Eventus }>().eventus;

  type Columnae = {
    title: string,
    key: string,
    filter: (verbum: Hoc, colamen: string) => boolean
  }[];

  const agendum: Faciendum<Hoc> = eventus.referendum as Faciendum<Hoc>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tabula: Tabula<Hoc> | null = agendum?.putetur() ?? null;

  const categoria: string = eventus.categoria ?? '';
  const anglica: boolean = Cocutor.se.ipse().edatur('lingua') === 'anglica';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const columnae: Columnae = [
    ...Multiplex.colamina(categoria),
    'scriptum'
  ].map(columna => {
    return {
      title: (anglica ? anglicum(columna) : columna).toUpperCase(),
      key: columna,

      filter: (verbum: Hoc, colamen: string): boolean => {
        return verbum.valores().includes(colamen);
      }
    }
  });

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
      figura = 'nomenActum';
      break;
    case agendum instanceof Agenda.NumeramenAgendum:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
      figura = 'numeramenAgendum';
      break;
  }
</script>

<script lang='ts'>
  import { defineComponent, defineModel, type ModelRef, ref } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import specere from './specere.vue';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import gustulare from './gustulare.vue';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import Gustulus from '../scriptura/gustulus';
  import * as Agenda from '../praebeunda/agenda';
  import { Numeramen, Numerus, Multiplex, Verbum } from '../praebeunda/verba';
  import Cocutor from '../miscella/cocutor';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  import { genera, gradi, anglicum } from '../miscella/enumerationes';
  import type { Referendum } from '../praebeunda/interfecta'

  const verbum: ModelRef<Verbum | undefined, string> = defineModel<Verbum>('verbum');

  const HorizontalScroll = require('vue-horizontal-scroll');
  const seligenda: string[] = [];
  const selecta: string[] = [];

  type Et = {
    gradus: string,
    genus: string
  };

  const et: Et = {
    gradus: '',
    genus: ''
  };

  export default defineComponent({
    components: { HorizontalScroll, gustulare, specere },

    data(): {
      anglica: boolean,
      gustulus: Gustulus,
      categoria: string,
      figura: string,
      seligenda: string[],
      selecta: string[],
      haec: Hoc[],
      verbum: Verbum | undefined,
      onerans: boolean,
      columnae: Columnae,
      et: Et
    } {
      return {
        anglica: anglica,
        gustulus: new Gustulus({}),
        categoria: categoria,
        figura: figura,
        seligenda: seligenda,
        selecta: selecta,
        haec: (tabula?.tabulentur() ?? []) as Hoc[],
        verbum: verbum.value,
        onerans: true,
        columnae: columnae,
        et: et,
      };
    }, methods: {
      async omnes (): Promise<Hoc[]> {
        return (await tabula?.tabulentur()) ?? [];
      }, async cole (): Promise<void> {
        this.onerans = true;
        const omnia: Hoc[] = await this.omnes();
        if (omnia) {
          this.haec = ref<Hoc[]>(omnia.filter(verbum =>
            (this.selecta as string[]).every(selectum =>
              verbum.valores().includes(selectum)))).value;
          // this.haec = omnia.filter(verbum =>
          //   (this.selecta as string[]).every(selectum =>
          //     verbum.valores().includes(selectum)));
        }

        return await new Promise(() => this.onerans = !!omnia);
      }, async numeramen (numeramen: Hoc): Promise<void> {
        if (this.figura === 'numeramenAgendum' &&
          agendum instanceof Agenda.NumeramenAgendum &&
          numeramen instanceof Numeramen) {
          const referendum: Referendum | null = await (agendum as Agenda.NumeramenAgendum).referatur(numeramen.referendum);
          if (referendum) {
            if (referendum instanceof Numerus) {
              this.verbum = referendum as Numerus;
            } else {
              this.eventus.referendum = referendum;
              if (referendum instanceof Agenda.NomenAgendum) {
                this.eventus.categoria = 'nomen';
              } else if (referendum instanceof Agenda.AdiectivumAgendum) {
                this.eventus.categoria = 'adiectivum';
              } else if (referendum instanceof Agenda.Incomparabile) {
                this.eventus.categoria = 'adiectivum';
              }
            }
          }
        }
      }, selige (hoc: Hoc): void {
        this.verbum = hoc;
      }, async refer (res: {
        categoria: string,
        referendum?: string,
        gradus?: string,
        genus?: string;
      }): Promise<void> {
        let referendum: Referendum | null = null;
        switch (this.figura) {
          case 'actusAgendus':
            if (agendum instanceof Agenda.ActusAgendus) {
              switch (eventus.referendum) {
                case 'frequentativus':
                  referendum = (agendum as Agenda.ActusAgendus).frequentativus();
                  break;
                case 'nomen':
                  referendum = (await (agendum as Agenda.ActusAgendus).nomen());
                  break;
                case 'actor':
                  referendum = (agendum as Agenda.ActusAgendus).actor(res.genus ?? '');
                  break;
              }
            }
            break;
          case 'nomenActum':
            if (agendum instanceof Agenda.NomenActum) {
              referendum = (await (agendum as Agenda.NomenActum).actus());
            }
            break;
          case 'adiectivumAgendum':
            if (agendum instanceof Agenda.AdiectivumAgendum) {
              referendum = (await (agendum as Agenda.AdiectivumAgendum).probetur({
                gradus: res.gradus ?? '',
                genus: res.genus ?? ''
              }));
            }
            break;
          case 'incomparabile':
            if (agendum instanceof Agenda.Incomparabile) {
              referendum = (agendum as Agenda.Incomparabile).probetur(res.genus ?? '');
            }
            break;
        }

        if (referendum) {
          eventus.referendum = referendum;
          eventus.categoria = res.categoria;
        }
      }
    }, async mounted (): Promise<void> {
      this.haec = ref<Hoc[]>(await this.omnes()).value;
      // this.haec = await this.omnes());

      switch (this.haec?.length ?? 0) {
        case 1:
          this.verbum = this.haec.first();
          break;
        case 0:
          break;
        default:
          this.seligenda = [
            ...new Set((this.haec as Hoc[])
              .map(verbum => verbum.valores())
              .map(valor => Object.values(valor))
              .flat())
          ];

          break;
      }

      return new Promise(() => this.onerans = false);
    }
  });
</script>

<template lang='vue'>
	<gustulare :gustulus='gustulus' />
  <template v-if='verbum'>
    <specere :verbum='verbum' @blur='verbum = undefined;' />
  </template>
  <template v-else-if='eventus && eventus.referendum'>
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
               @click="refer({ categoria: 'actus', referendum: 'frequentativus' });" />
        <v-btn append-icon='subject' id='nomen' :text="anglica ? 'Noun' : 'Nomen'"
               @click="refer({ categoria: 'nomen', referendum: 'nomen' });" />
        <v-btn append-icon='person' id='actor' :text="anglica ? 'Agent (masculine)' : 'Actor'"
               @click="refer({ categoria: 'nomen', referendum: 'actor', genus: 'masculinum' });" />
        <v-btn append-icon='person' id='actrix' :text="anglica ? 'Agent (feminine)' : 'Actrix'"
               @click="refer({ categoria: 'nomen', referendum: 'actor', genus: 'femininum' });" />
      </v-btn-toggle>
    </template>
    <template v-else-if="figura === 'nomenActum'">
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
    <v-data-table :items='haec' :loading='onerans' :headers='columnae' density='compact'
                  id='tabula' items-per-page='10' item-selectable=false>
      <template v-if='onerans'>
        <v-skeleton-loader :loading-text="anglica ? 'Loading words...' : 'Verba onerantur...'"
                           :loading='onerans' type='table-tbody' />
      </template>
      <template v-if='!onerans' #item='hoc'>
        <template v-if="figura === 'numeramenAgendum'">
          <v-btn :text="anglica ? 'Open' : 'Refer'" append-icon='open_in_full' id='numeramen'
                 @click='numeramen(hoc.item);' />
        </template>
        <template v-else>
          <v-btn :text="anglica ? 'Inflect' : 'Inflecte'" append-icon='open_in_full'
                 :id="`selige_${hoc.item.unicum.toString()}`" @click='selige(hoc.item)' />
        </template>
      </template>
    </v-data-table>
  </template>
</template>
