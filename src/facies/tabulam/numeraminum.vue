<script lang='ts'>
  import { defineModel, defineComponent, defineProps, type ComponentOptionsWithoutProps, type Ref, ref } from 'vue';
  import specere from '../specere.vue';
  import inflectere from '../inflectere.vue';
  import onerare from '../onerare.vue';
  import gustulare from '../gustulare.vue';
  import Gustulus from '../../scriptura/gustulus';
  import { type Columnae, categoricum } from '../../scriptura/columnae';
  import { Numeramen } from '../../praebeunda/verba';
  import { NumeramenAgendum } from '../../praebeunda/agenda';
  import Crustula from '../../miscella/crustula';
  import Tabula from '../../tabulae/tabula';
  import type { Referendum } from '../../praebeunda/interfecta';

  const agendum: NumeramenAgendum = defineProps<{ agendum: NumeramenAgendum; }>().agendum;
  const tabula: Tabula<Numeramen> | null = agendum.putetur();
  const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;

  async function omnia (): Promise<Numeramen[]> {
    return await tabula?.tabulentur() ?? [];
  }

  const componenta: ComponentOptionsWithoutProps = {
    inflectere, gustulare, onerare, specere
  };

  const data = (): {
    gustulus: Ref<Gustulus | undefined>,
    columnae: Columnae,
    anglica: boolean;
  } => {
    return {
      gustulus: ref(),
      columnae: [],
      anglica,
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    setup () {
      const referendum: Ref<Referendum | undefined> = ref(defineModel<Referendum>());
      const onerans: Ref<boolean> = ref(true);
      const numeramina: Ref<Numeramen[]> = ref([]);

      async function oneratust (): Promise<void> {
        onerans.value = false;
      }

      async function forsInflectat (): Promise<void> {
        onerans.value = true;
        referendum.value = await agendum.referatur(
          numeramina.value.map(numeramen => numeramen.referendum).random()
        ) ?? undefined;
        return oneratust();
      }

      async function cole (selecta: string[]): Promise<void> {
        onerans.value = true;
        const omnes: Numeramen[] = await omnia();
        if (omnes) {
          numeramina.value = omnes.filter(numeramen => selecta.every(selectum =>
            numeramen.valores().includes(selectum)));
        }
        return oneratust();
      }

      async function refer (res: string): Promise<void> {
        referendum.value = await agendum.referatur(res) ?? undefined;
      }

      return {
        referendum, numeramina, onerans, forsInflectat, cole, refer
      };
    }, async mounted (): Promise<void> {
      this.numeramina = await omnia();
      this.columnae = categoricum<Numeramen>({
        categoria: 'numeramen',
        haec: this.numeramina as Numeramen[]
      });

      this.onerans = false;
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
    <template v-if='numeramina.length > 1'>
      <v-btn append-icon='casino' @click='forsInflectat();' :loading='onerans' :disabled='onerans'
             id='fortuna' :text="anglica ? 'I\'m feeling Lucky' : 'Fors Inflectat'" />
    </template>
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
