<script lang='ts'>
  import { defineModel, defineComponent, defineProps, type ComponentOptionsWithoutProps, type Ref, ref } from 'vue';
  import { anglicum } from '../miscella/enumerationes';
  import { Multiplex } from '../praebeunda/verba';
  import Crustula from '../miscella/crustula';

  const multiplicia: Multiplex[] = defineProps<{ multiplicia: Multiplex[]; }>().multiplicia;

  const HorizontalScroll = require('horizontal-scroll');
  const seligenda: string[] = [
    ...new Set(multiplicia?.map(multiplex => multiplex.valores()).flat())
  ];

  const selectum: ((selecta: string[]) => Promise<void>) | undefined = defineModel<(selecta: string[]) => Promise<void>>().value;
  const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;

  const compnenta: ComponentOptionsWithoutProps = {
    'horizontal-scroll': HorizontalScroll
  };

  const data = (): {
    seligenda: string[],
    anglica: boolean;
  } => {
    return {
      seligenda,
      anglica
    };
  };

  export default defineComponent({
    components: compnenta, data: data,
    setup () {
      const selecta: Ref<string[]> = ref([]);

      async function selige (): Promise<void> {
        if (selectum) {
          await selectum(selecta.value);
        }
      }

      return {
        selecta, selige, anglicum
      };
    }
  });
</script>

<template>
  <template v-if='seligenda'>
    <div id='colamina'>
      <horizontal-scroll>
        <v-chip-group selected-class='text-primary' v-model='selecta' filter multiple>
          <v-chip v-for='seligendum in seligenda' :key='seligendum' @change='selige()'
                  :id="`colamen_${seligendum}`"
                  :text='anglica ? anglicum(seligendum) : seligendum' />
        </v-chip-group>
      </horizontal-scroll>
    </div>
  </template>
</template>
