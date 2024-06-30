<script lang='ts'>
  import { defineModel, defineComponent, defineProps, type ComponentOptionsWithoutProps } from 'vue';
  import specere from '../specere.vue';
  import inflectere from '../inflectere.vue';
  import onerare from '../onerare.vue';
  import gustulare from '../gustulare.vue';
  import Gustulus from '../../scriptura/gustulus';
  import { type Columnae, categoricum } from '../../scriptura/columnae';
  import { Numeramen } from '../../praebeunda/verba';
  import { NumeramenAgendum } from '../../praebeunda/agenda';
  import Cocutor from '../../miscella/cocutor';
  import Tabula from '../../tabulae/tabula';
  import type { Referendum } from '../../praebeunda/interfecta';

  const agendum: NumeramenAgendum = defineProps<{ agendum: NumeramenAgendum; }>().agendum;
  const referendum: Referendum | undefined = defineModel<Referendum>().value;
  const tabula: Tabula<Numeramen> | null = agendum.putetur();
  const anglica: boolean = Cocutor.se.ipse().edatur('lingua') === 'anglica';

  const componenta: ComponentOptionsWithoutProps = {
    'inflectere': inflectere,
    'gustulare': gustulare,
    'onerare': onerare,
    'specere': specere
  };

  const data = (): {
    referendum: Referendum | undefined,
    numeramina: Numeramen[],
    columnae: Columnae,
    gustulus: Gustulus,
    onerans: boolean,
    anglica: boolean;
  } => {
    return {
      gustulus: new Gustulus({}),
      referendum: referendum,
      anglica: anglica,
      onerans: true,
      numeramina: [],
      columnae: []
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    methods: {
      async omnia (): Promise<Numeramen[]> {
        return await tabula?.tabulentur() ?? [];
      }, async oneratust (): Promise<void> {
        return new Promise(() => this.onerans = false);
      }, async cole (selecta: string[]): Promise<void> {
        this.onerans = true;
        const omnia: Numeramen[] = await this.omnia();
        if (omnia) {
          this.numeramina = omnia.filter(numeramen => selecta.every(selectum =>
            numeramen.valores().includes(selectum)));
        }
        return this.oneratust();
      }, async refer (referendum: string): Promise<void> {
        this.referendum = await agendum.referatur(referendum) ?? undefined;
      }
    }, async mounted (): Promise<void> {
      this.numeramina = await this.omnia();
      this.columnae = categoricum<Numeramen>({
        categoria: 'numeramen',
        haec: this.numeramina as Numeramen[]
      });

      return this.oneratust();
    }
  });
</script>

<template>
  <gustulare :gustulus='gustulus' />
  <template v-if='referendum'>
    <inflectere :eventus='referendum' @blur='referendum = undefined;' />
  </template>
  <template v-else>
    <seligere :multiplicia='numeramina' :selectum='cole' />
    <v-data-table :items='numeramina' :headers='columnae' density='compact' :loading='onerans'
                  :disabled='onerans' id='tabula' items-per-page='10' item-selectable=false>
      <onerare :onerans='onerans' pittacium='numeramina' />
      <template v-if='!onerans'>
        <v-btn v-for='hoc in numeramina' :key='hoc.unicum' :text="anglica ? 'Inflect' : 'Inflecte'"
               append-icon='open_in_full' :id='`selige_${hoc.unicum.toString()}`'
               @click='refer(hoc.referendum)' />
      </template>
    </v-data-table>
  </template>
</template>
