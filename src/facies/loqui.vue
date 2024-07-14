<script lang='ts'>
  import { defineComponent, type ComponentOptionsWithoutProps, type Ref, ref } from 'vue';
  import draggable from 'vuedraggable'
  import Gustulus from '../scriptura/gustulus';
  import Locutor from '../miscella/locutor';
  import Crustula from '../miscella/crustula';
  import gustulare from './gustulare.vue';

  const illustre: boolean = Crustula.se.ipse().facies.est('illustre') ?? false;

  const Please = require('pleasejs');
  const ClassifyX = require('classifyx')

  const pellucidum: string[] = ClassifyX({
    opacity: 0.5,
    background: Please.make_color({
      value: illustre ? 0.25 : 0.75
    })
  });

  const componenta: ComponentOptionsWithoutProps = {
    draggable, gustulare
  };

  const data = (): {
    gustulus: Ref<Gustulus | undefined>,
    trahens: Ref<boolean>,
    pellucidum: string[],
    locutor: Locutor
  } => {
    return {
      locutor: Locutor.se.ipse(),
      trahens: ref(false),
      gustulus: ref(),
      pellucidum
    };
  };

  export default defineComponent({
    component: componenta, data: data
  });
</script>

<template lang='vue'>
	<gustulare :gustulus='gustulus' />
	<v-chip-group id='locutio'>
		<draggable v-model='verba' :ghost-class='pellucidum' @start='trahens = true' @end='trahens = false'>
			<span :class="'mr-2'.concat(trahens ? 'cursor-grab' : 'cursor-grabbing')">
				<template v-for='verbum in locutor.verba'>
					<v-chip :v-bind:key='verbum' @click:close='locutor.removeatur(verbum.unicum);' close-icon='remove'
						:text='verbum.scriptum' :id='verbum.unicum' selected-class='text-primary' />
				</template>
      </span>
    </draggable>
  </v-chip-group>
</template>
