<script lang='ts'>
  import { defineComponent, type ComponentOptionsWithoutProps } from 'vue';
  import draggable from 'vuedraggable'
  import Gustulus from '../scriptura/gustulus';
  import Locutor from '../miscella/locutor';
  import Cocutor from '../miscella/cocutor';
  import gustulare from './gustulare.vue';
  import { Verbum } from '../praebeunda/verba'

  const locutor: Locutor = Locutor.se.ipse();
  const cocutor: Cocutor = Cocutor.se.ipse();

  const illustre: boolean = cocutor.edatur('facies') === 'illustre';

  const Please = require('pleasejs');
  const ClassifyX = require('classifyx')

  const pellucidum: string[] = ClassifyX({
    opacity: 0.5,
    background: Please.make_color({
      value: illustre ? 0.25 : 0.75
    })
  });

  const componenta: ComponentOptionsWithoutProps = {
    'draggable': draggable,
    'gustulare': gustulare
  };

  const data = (): {
    trahens: boolean,
    gustulus: Gustulus,
    verba: Verbum[],
    pellucidum: string[]
  } => {
    return {
      trahens: false,
      gustulus: new Gustulus({}),
      verba: locutor.verba,
      pellucidum: pellucidum
    };
  };

  export default defineComponent({
    component: componenta, data: data,
    methods: {
      remove (unicum: symbol): void {
        locutor.removeatur(unicum);
      }
    }
  });
</script>

<template lang='vue'>
	<gustulare :gustulus='gustulus' />
	<v-chip-group id='locutio'>
		<draggable v-model='verba' :ghost-class='pellucidum' @start='trahens = true' @end='trahens = false'>
			<span :class="'mr-2'.concat(trahens ? 'cursor-grab' : 'cursor-grabbing')">
				<template v-for='verbum in verba'>
					<v-chip :v-bind:key='verbum' @click:close='remove(verbum.unicum);' close-icon='remove'
						:text='verbum.scriptum' :id='verbum.unicum' selected-class='text-primary' />
				</template>
      </span>
    </draggable>
  </v-chip-group>
</template>
