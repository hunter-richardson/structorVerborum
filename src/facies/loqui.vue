<script lang='ts'>
  import { defineComponent } from 'vue';
  import draggable from 'vuedraggable'
  import Gustularium from '../scriptura/gustularium';
  import Locutor from '../miscella/locutor';
  import Cocutor from '../miscella/cocutor';

  const locutor: Locutor = Locutor.se.ipse();
  const cocutor: Cocutor = Cocutor.se.ipse();

  const illustre: boolean = cocutor.edatur('facies') === 'illustre';

  const Please = require('pleasejs');
  const ClassifyX = require('classifyx')

  export default defineComponent({
    component: { draggable },

    data () {
      return {
        trahens: false,
        pellucidum: ClassifyX({
          opacity: 0.5,
          background: Please.make_color({
            value: illustre ? 0.25 : 0.75
          })
        }),
        lingua: Cocutor.se.ipse().edatur('lingua'),
        gustularium: new Gustularium({}),
        verba: locutor.verba,
      };
    },

    methods: {

      remove (unicum: symbol): void {
        locutor.removeatur(unicum);
      }
    }
  });
</script>

<template lang='vue'>
	<v-snackbar :color='gustularium.color' :timeout='gustularium.vita' v-model='gustularium.visibile'>
		{ gustularium.nuntium }
	</v-snackbar>
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
