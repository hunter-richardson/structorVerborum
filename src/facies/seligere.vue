<script lang='ts'>
  import { defineModel, defineComponent, defineProps, type ComponentOptionsWithoutProps } from 'vue';
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
    selecta: string[],
    anglica: boolean;
  } => {
    return {
      seligenda: seligenda,
      selecta: [],
      anglica: anglica
    };
  };

  export default defineComponent({
    components: compnenta, data: data,
    methods: {
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
