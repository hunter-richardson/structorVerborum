<script lang='ts'>
  import { defineModel, defineProps, defineComponent } from 'vue';
  import specere from '../specere.vue';
  import seligere from '../seligere.vue';
  import onerare from '../onerare.vue';
  import gustulare from '../gustulare.vue';
  import Gustulus from '../../scriptura/gustulus';
  import { type Columnae, categoricum } from '../../scriptura/columnae';
  import type { Faciendum } from '../../praebeunda/interfecta';
  import { Nomen } from '../../praebeunda/verba';
  import Cocutor from '../../miscella/cocutor';
  import Tabula from '../../tabulae/tabula';

  const agendum: Faciendum<Nomen> = defineProps<{ agendum: Faciendum<Nomen>; }>().agendum;

  const anglica: boolean = Cocutor.se.ipse().edatur('lingua') === 'anglica';
  const tabula: Tabula<Nomen> | null = agendum.putetur();
  const nomina: Nomen[] = await tabula?.tabulentur() ?? [];
  const nomen: Nomen | undefined = defineModel<Nomen>().value;

  const columnae: Columnae<Nomen> = categoricum<Nomen>({
    categoria: 'nomen',
    haec: nomina
  });

  export default defineComponent({
    components: { gustulare, specere, seligere, onerare },
    data (): {
      gustulus: Gustulus,
      nomina: Nomen[],
      nomen: Nomen | undefined,
      columnae: Columnae<Nomen>,
      onerans: boolean,
      anglica: boolean;
    } {
      return {
        gustulus: new Gustulus({}),
        nomina: nomina,
        nomen: nomen,
        columnae: columnae,
        anglica: anglica,
        onerans: true
      };
    }, methods: {
      async omnia (): Promise<Nomen[]> {
        return await tabula?.tabulentur() ?? [];
      }, async cole (selecta: string[]): Promise<void> {
        this.onerans = true;
        const omnia: Nomen[] = await this.omnia();
        if (omnia) {
          this.nomina = omnia.filter(nomen => selecta.every(selectum =>
            nomen.valores().includes(selectum)));
        }

        return new Promise(() => this.onerans = false);
      }
    }
  });
</script>

<template lang='vue'>
	<gustulare :gustulus='gustulus' />
	<specere v-if='nomen' :verbum='nomen' @blur='nomen = undefined;' />
	<template v-else>
		<seligere :multiplicia='nomina' :selectum='cole' />
		<v-data-table :items='adiectiva' :headers='columnae' density='compact' :loading='onerans' :disabled='onerans'
			id='tabula' items-per-page='10' item-selectable=false>
			<onerare :onerans='onerans' pittacium='nomina' />
			<template v-if='!onerans'>
				<v-btn v-for='hoc in nomina' :key='hoc.unicum' :text="anglica ? 'Inflect' : 'Inflecte'"
					append-icon='open_in_full' :id='`selige_${hoc.unicum.toString()}`' @click='nomen = hoc;' />
			</template>
</v-data-table>
</template>
</template>
