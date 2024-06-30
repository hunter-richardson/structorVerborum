<script lang='ts'>
  import { defineModel, defineProps, defineComponent, type ComponentOptionsWithoutProps } from 'vue';
  import specere from '../specere.vue';
  import seligere from '../seligere.vue';
  import onerare from '../onerare.vue';
  import inflectere from '../inflectere.vue';
  import gustulare from '../gustulare.vue';
  import Gustulus from '../../scriptura/gustulus';
  import { NomenAgendum, AdiectivumAgendum, Incomparabile } from '../../praebeunda/agenda'
  import { type Columnae, categoricum } from '../../scriptura/columnae';
  import { genera, gradua } from '../../miscella/enumerationes';
  import type { Faciendum } from '../../praebeunda/interfecta';
  import { Adiectivum } from '../../praebeunda/verba';
  import Cocutor from '../../miscella/cocutor';
  import Tabula from '../../tabulae/tabula';

  type Par = {
    title: string,
    value: string
  };

  type Et = {
    gradus: string,
    genus: string
  };

  const agendum: Faciendum<Adiectivum> = defineProps<{ agendum: Faciendum<Adiectivum>; }>().agendum;

  const anglica: boolean = Cocutor.se.ipse().edatur('lingua') === 'anglica';
  const tabula: Tabula<Adiectivum> | null = agendum.putetur();

  const adiectivum: Adiectivum | undefined = defineModel<Adiectivum>().value;
  const nomen: NomenAgendum | undefined = defineModel<NomenAgendum>().value;
  const lectum: boolean = agendum instanceof AdiectivumAgendum;
  const incomparabilium: boolean = agendum instanceof Incomparabile;

  const componenta: ComponentOptionsWithoutProps = {
    'gustulare': gustulare,
    'seligere': seligere,
    'specere': specere,
    'onerare': onerare
  };

  const data = (): {
    adiectivum: Adiectivum | undefined,
    nomen: NomenAgendum | undefined,
    incomparabilium: boolean,
    adiectiva: Adiectivum[],
    columnae: Columnae,
    gustulus: Gustulus,
    anglica: boolean,
    onerans: boolean,
    lectum: boolean,
    genera: Par[],
    gradua: Par[],
    et: Et
  } => {
    return {
      incomparabilium: incomparabilium,
      gustulus: new Gustulus({}),
      adiectivum: adiectivum,
      anglica: anglica,
      lectum: lectum,
      onerans: true,
      adiectiva: [],
      columnae: [],
      nomen: nomen,
      gradua: gradua.map(gradus => {
        return {
          title: (anglica ? anglicum(gradus) : gradus).toUpperCase(),
          value: gradus
        };
      }), genera: genera.map(genus => {
        return: {
          title: (anglica ? anglicum(genus) : genus).toUpperCase(),
          value: genus
        };
      }), et: {
        gradus: '',
        genus: ''
      }
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    methods: {
      async omnia (): Promise<Adiectivum[]> {
        return await tabula?.tabulentur() ?? [];
      }, async oneratust (): Promise<void> {
        return new Promise(() => this.onerans = false);
      }, async cole (selecta: string[]): Promise<void> {
        this.onerans = true;
        const omnia: Adiectivum[] = await this.omnia();
        if (omnia) {
          this.adiectiva = omnia.filter(adiectivum => selecta.every(selectum =>
            adiectivum.valores().includes(selectum)));
        }

        return this.oneratust();
      }
    }, async mounted (): Promise<void> {
      this.adiectiva = await this.omnia();
      this.columnae = categoricum<Adiectivum>({
        categoria: 'adiectivum',
        haec: this.adiectiva as Adiectivum[]
      });

      return this.oneratust();
    }
  });
</script>

<template lang='vue'>
	<gustulare :gustulus='gustulus' />
	<specere v-if='adiectivum' :verbum='adiectivum' @blur='adiectivum = undefined;' />
	<template v-else>
		<seligere :multiplicia='adiectiva' :selectum='cole' />
		<v-data-table :items='adiectiva' :headers='columnae' density='compact' :loading='onerans' :disabled='onerans'
			id='tabula' items-per-page='10' item-selectable=false>
			<onerare :onerans='onerans' pittacium='adiectiva' />
			<template v-if='!onerans'>
				<v-btn v-show='!onerans' v-for='hoc in adiectiva' :key='hoc.unicum'
					:text="anglica ? 'Inflect' : 'Inflecte'" append-icon='open_in_full'
					:id='`selige_${hoc.unicum.toString()}`' @click='adiectivum = hoc;' />
			</template>
    </v-data-table>
    <template v-if='lectum || incomparabilium'>
      <v-select density='compact' id='genus' :label="anglica ? 'Gender' : 'Genus'"
                v-model='et.genus' :items='genera' chips flat open-on-clear />
      <template v-if='incomparabilium'>
        <v-btn :text="anglica ? 'Substantiate' : 'Probetur'"
               id='probetur' append-icon='open_in_full'
               @click='nomen = (agendum as Incomparabile).probetur(et.genus) ?? undefined' />
      </template>
      <template v-else-if='lectum'>
        <v-select density='compact' id='gradus' :label="anglica ? 'Grade' : 'Gradus'"
                  v-model='et.gradus' :items='gradua' chips flat open-on-clear />
        <v-btn :text="anglica ? 'Substantiate' : 'Probetur'"
               id='probetur' append-icon='open_in_full'
               @click='nomen = (agendum as AdiectivumAgendum).probetur({
                 gradus: et.gradus,
                 genus: et.genus
               }) ?? undefined' />
      </template>
    </template>
  </template>
</template>
