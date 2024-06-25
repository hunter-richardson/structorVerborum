<script lang='ts'>
  import { defineModel, defineComponent, defineProps } from 'vue';
  import { Multiplex } from '../praebeunda/verba';
  import Cocutor from '../miscella/cocutor';

  const multiplicia: Multiplex[] = defineProps<{ multiplicia: Multiplex[]; }>().multiplicia;

  const HorizontalScroll = require('horizontal-scroll');
  const seligenda: string[] = [
    ...new Set(multiplicia?.map(multiplex => multiplex.valores()).flat())
  ];

  const selectum: ((selecta: string[]) => Promise<void>) | undefined = defineModel<(selecta: string[]) => Promise<void>>().value;
  const anglica: boolean = Cocutor.se.ipse().edatur('lingua') === 'anglica';

  export default defineComponent({
    components: { HorizontalScroll },
    data (): {
      seligenda: string[],
      selecta: string[],
      anglica: boolean;
    } {
      return {
        seligenda: seligenda,
        selecta: [],
        anglica: anglica
      };
    }, methods: {
      async selige (): Promise<void> {
        if (selectum) {
          await selectum(this.selecta);
        }
      }
    }
  });
</script>

<template lang='vue'>
	<template v-if='[ seligenda, selectum ].all()'>
		<div id='colamina'>
			<horizontal-scroll>
				<v-chip-group selected-class='text-primary' v-model='selecta' filter multiple>
					<v-chip v-for='seligendum in seligenda' :key='seligendum' @change='cole' :id=`colamen_${seligendum}`
						:text='anglica ? anglicum(seligendum) : seligendum' />
				</v-chip-group>
			</horizontal-scroll>
		</div>
	</template>
</template>
