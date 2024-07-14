<script lang='ts'>
  import { defineModel, defineComponent, defineProps, type ComponentOptionsWithoutProps, type Ref, ref } from 'vue'
  import specere from '../specere.vue'
  import seligere from '../seligere.vue'
  import onerare from '../onerare.vue'
  import gustulare from '../gustulare.vue'
  import Gustulus from '../../scriptura/gustulus'
  import { type Columnae, categoricum } from '../../scriptura/columnae'
  import { Pronomen } from '../../praebeunda/verba'
  import { Mantela } from '../../anomala/anomala'
  import Crustula from '../../miscella/crustula'
  import Tabula from '../../tabulae/tabula'

  const agendum: Mantela<Pronomen> = defineProps<{ agendum: Mantela<Pronomen>; }>().agendum;
  const tabula: Tabula<Pronomen> | null = agendum.putetur();
  const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;

  async function omnia (): Promise<Pronomen[]> {
    return await tabula?.tabulentur() ?? [];
  }

  const componenta: ComponentOptionsWithoutProps = {
    gustulare, seligere, onerare, specere
  };

  const data = (): {
    gustulus: Ref<Gustulus | undefined>,
    columnae: Columnae,
    anglica: boolean;
  } => {
    return {
      gustulus: ref(),
      columnae: [],
      anglica
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    setup () {
      const pronomen: Ref<Pronomen | undefined> = ref(defineModel<Pronomen>());
      const onerans: Ref<boolean> = ref(true);
      const pronomina: Ref<Pronomen[]> = ref([]);

      async function oneratust (): Promise<void> {
        onerans.value = false;
      }

      async function forsInflectat (): Promise<void> {
        onerans.value = true;
        pronomen.value = pronomina.value.random();
        return oneratust();
      }

      async function cole (selecta: string[]): Promise<void> {
        onerans.value = true;
        const omnes: Pronomen[] = await omnia();
        if (omnes) {
          pronomina.value = omnes.filter(pronomen => selecta.every(selectum =>
            pronomen.valores().includes(selectum)))
        }

        return oneratust();
      }

      return {
        pronomen, pronomina, onerans, forsInflectat, cole
      };
    }, async mounted (): Promise<void> {
      this.pronomina = await omnia();
      this.columnae = categoricum<Pronomen>({
        categoria: 'pronomen',
        haec: this.pronomina as Pronomen[]
      });

      this.onerans = false;
    }
  });
</script>

<template>
  <gustulare :gustulus='gustulus' />
  <template v-if='pronomen'>
    <specere :verbum='pronomen' @blur='pronomen = undefined;' />
  </template>
  <template v-else>
    <seligere :multiplicia='pronomina' :selectum='cole' />
    <template v-if='pronomina.length > 1'>
      <v-btn append-icon='casino' @click='forsInflectat();' :loading='onerans' :disabled='onerans'
             id='fortuna' :text="anglica ? 'I\'m feeling Lucky' : 'Fors Inflectat'" />
    </template>
    <v-data-table :items='pronomina' :headers='columnae' density='compact' :loading='onerans'
                  :disabled='onerans' id='tabula' items-per-page='10' item-selectable=false>
      <onerare :onerans='onerans' pittacium='pronomina' />
      <template v-if='!onerans'>
        <v-btn v-for='hoc in pronomina' :key='hoc.unicum' :text="anglica ? 'Inflect' : 'Inflecte'"
               append-icon='open_in_full' :id='`selige_${hoc.unicum.toString()}`'
               @click='pronomen = hoc' />
      </template>
    </v-data-table>
  </template>
</template>

