<script lang='ts'>
  import { defineModel, defineProps, defineComponent } from 'vue';
  import specere from '../specere.vue';
  import seligere from '../seligere.vue';
  import onerare from '../onerare.vue';
  import gustulare from '../gustulare.vue';
  import Gustulus from '../../scriptura/gustulus';
  import { type Columnae, categoricum } from '../../scriptura/columnae';
  import type { Faciendum } from '../../praebeunda/interfecta';
  import { Adiectivum } from '../../praebeunda/verba';
  import Cocutor from '../../miscella/cocutor';
  import Tabula from '../../tabulae/tabula';

  const agendum: Faciendum<Adiectivum> = defineProps<{ agendum: Faciendum<Adiectivum>; }>().agendum;

  const anglica: boolean = Cocutor.se.ipse().edatur('lingua') === 'anglica';
  const tabula: Tabula<Adiectivum> | null = agendum.putetur();
  const adiectivum: Adiectivum | undefined = defineModel<Adiectivum>().value;

  export default defineComponent({
    components: { gustulare, specere, seligere, onerare },
    data (): {
      adiectivum: Adiectivum | undefined,
      columnae: Columnae<Adiectivum>,
      adiectiva: Adiectivum[],
      gustulus: Gustulus,
      anglica: boolean,
      onerans: boolean;
    } {
      return {
        gustulus: new Gustulus({}),
        adiectivum: adiectivum,
        anglica: anglica,
        onerans: true,
        adiectiva: [],
        columnae: []
      };
    }, methods: {
      async omnia (): Promise<Adiectivum[]> {
        return await tabula?.tabulentur() ?? [];
      }, async cole (selecta: string[]): Promise<void> {
        this.onerans = true;
        const omnia: Adiectivum[] = await this.omnia();
        if (omnia) {
          this.adiectiva = omnia.filter(adiectivum => selecta.every(selectum =>
            adiectivum.valores().includes(selectum)));
        }

        return new Promise(() => this.onerans = false);
      }
    }, async mounted (): Promise<void> {
      this.adiectiva = await this.omnia();
      this.columnae = categoricum<Adiectivum>({
        categoria: 'adiectivum',
        haec: this.adiectiva as Adiectivum[]
      });

      return new Promise(() => this.onerans = false);
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
</template>
</template>
