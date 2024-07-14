<script lang='ts'>
  import { defineModel, defineProps, defineComponent, type ComponentOptionsWithoutProps, type Ref, ref } from 'vue';
  import specere from '../specere.vue';
  import seligere from '../seligere.vue';
  import onerare from '../onerare.vue';
  import inflectere from '../inflectere.vue';
  import gustulare from '../gustulare.vue';
  import Gustulus from '../../scriptura/gustulus';
  import { NomenAgendum, AdiectivumAgendum, Incomparabile } from '../../praebeunda/agenda'
  import { type Columnae, categoricum } from '../../scriptura/columnae';
  import { genera, gradua, anglicum } from '../../miscella/enumerationes';
  import type { Faciendum } from '../../praebeunda/interfecta';
  import { Adiectivum } from '../../praebeunda/verba';
  import Crustula from '../../miscella/crustula';
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
  const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;
  const tabula: Tabula<Adiectivum> | null = agendum.putetur();
  const lectum: boolean = agendum instanceof AdiectivumAgendum;
  const incomparabilium: boolean = agendum instanceof Incomparabile;

  function paria(valores: string[]): Par[] {
    return valores.map(valor => {
      return {
        title: (anglica ? anglicum(valor) : valor).toUpperCase(),
        value: valor
      };
    });
  }

  async function omnia (): Promise<Adiectivum[]> {
    return await tabula?.tabulentur() ?? [];
  }

  const componenta: ComponentOptionsWithoutProps = {
    inflectere, gustulare, seligere, specere, onerare
  };

  const data = (): {
    gustulus: Ref<Gustulus | undefined>,
    agendum: Faciendum<Adiectivum>,
    incomparabilium: boolean,
    columnae: Columnae,
    anglica: boolean,
    lectum: boolean,
    genera: Par[],
    gradua: Par[],
  } => {
    return {
      gradua: paria(gradua),
      genera: paria(genera),
      incomparabilium,
      gustulus: ref(),
      columnae: [],
      agendum,
      anglica,
      lectum,
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    setup () {
      const adiectivum: Ref<Adiectivum | undefined> = ref(defineModel<Adiectivum>());
      const nomen: Ref<NomenAgendum | undefined> = ref(defineModel<NomenAgendum>());
      const onerans: Ref<boolean> = ref(true);
      const adiectiva: Ref<Adiectivum[]> = ref([]);
      const et: Ref<Et> = ref({
        gradus: '',
        genus: ''
      });

      async function oneratust (): Promise<void> {
        onerans.value = false;
      }

      async function forsInflectat (): Promise<void> {
        onerans.value = true;
        adiectivum.value = adiectiva.value.random();
        return oneratust();
      }

      async function cole (selecta: string[]): Promise<void> {
        onerans.value = true;
        const omnes: Adiectivum[] = await omnia();
        if (omnes) {
          adiectiva.value = omnes.filter(adiectivum => selecta.every(selectum =>
            adiectivum.valores().includes(selectum)));
        }

        return oneratust();
      }

      function referIncomparabile (): void {
        nomen.value = (agendum as Incomparabile).probetur(et.value.genus) ?? undefined;
      }

      async function referComparabile (): Promise<void> {
        nomen.value = await (agendum as AdiectivumAgendum).probetur({
          gradus: et.value.gradus,
          genus: et.value.genus
        }) ?? undefined;
      }

      return {
        adiectivum, adiectiva, nomen, onerans, et, forsInflectat, cole, referIncomparabile, referComparabile
      };
    }, async mounted (): Promise<void> {
      this.adiectiva = await omnia();
      this.columnae = categoricum<Adiectivum>({
        categoria: 'adiectivum',
        haec: this.adiectiva as Adiectivum[]
      });

      this.onerans = false;
    }
  });
</script>

<template lang='vue'>
  <gustulare :gustulus='gustulus' />
  <specere v-if='adiectivum' :verbum='adiectivum' @blur='adiectivum = undefined;' />
  <inflectere v-else-if='nomen' :agendum='nomen' @blur='nomen = undefined;' />
  <template v-else>
        <seligere :multiplicia='adiectiva' :selectum='cole' />
        <template v-if='adiectiva.length > 1'>
                <v-btn append-icon='casino' @click='forsInflectat();' :disabled='onerans'
                       id='fortuna' :text="anglica ? 'I\'m feeling Lucky' : 'Fors Inflectat'" />
              </template>
  <v-data-table :items='adiectiva' :headers='columnae' density='compact'
                :loading='onerans' :disabled='onerans'
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
               @click='referIncomparabile()' />
      </template>
      <template v-else-if='lectum'>
        <v-select density='compact' id='gradus' :label="anglica ? 'Grade' : 'Gradus'"
                  v-model='et.gradus' :items='gradua' chips flat open-on-clear />
        <v-btn :text="anglica ? 'Substantiate' : 'Probetur'"
               id='probetur' append-icon='open_in_full'
               @click='referComparabile()' />
      </template>
    </template>
  </template>
</template>
