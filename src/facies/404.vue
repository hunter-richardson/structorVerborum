<script lang='ts'>
  import { defineComponent } from 'vue';
  import Nuntius from '../miscella/nuntius';
  import Cocutor from '../miscella/cocutor';

  export default defineComponent({
    data() {
      return {
        lingua: Cocutor.se.ipse().edatur('lingua')
      };
    },

    methods: {
      recipe(): void {
        history.back();
      }
    },

    mounted(): void {
      if ([
        location.href,
        location.href !== '404'
      ].all()) {
        Nuntius.timeo({
          nomen: '404.vue',
          error: new Error(`CDIV loco ${ location.href } effectu'st`)
        });
      }
    }
  })
</script>

<template lang='vue'>
	<v-app>
		<v-container>
			<v-empty-state :text="lingua === 'anglica' ? 'The requested resource is missing' : 'Quaerenda res abest'"
				:title="lingua === 'anglica' ? 'Absent page' :  'Absens pagina'"
				:headline="lingua === 'anglica' ? 'Oops, 404!' : 'Vae CDIV!'" @click:action='recipe();'
				image='/res/picta/spqr.png' :actionText="lingua === 'anglica' ? 'Go back' : 'Recipe'"
				icon='arrow_back' />
		</v-container>
	</v-app>
</template>
