<script lang="ts">
  import { defineComponent } from 'vue';
  import Cocutor from '../miscella/cocutor';
  import Nuntius from '../miscella/nuntius';

  const data = (): {
    anglica: boolean;
  } => {
    return {
      anglica: Cocutor.se.ipse().edatur('lingua') === 'anglica'
    }
  };

  export default defineComponent({
    data: data,
    mounted (): void {
      if ([ location.href, location.href !== '404' ].all()) {
        Nuntius.timeo({
          nomen: '404.vue',
          error: new Error(`CDIV loco ${location.href} effectu'st`)
        });
      }
    }
  });
</script>

<template lang="vue">
<v-app>
		<v-container>
			<v-empty-state :text="anglica ? 'The requested resource is missing' : 'Quaerenda res abest'"
				:title="anglica ? 'Absent page' :  'Absens pagina'"
				:headline="anglica ? 'Oops, 404!' : 'Vae CDIV!'" @click:action='history.back();'
				image='/res/picta/spqr.png' :actionText="anglica ? 'Go back' : 'Recipe'"
				icon='arrow_back' />
		</v-container>
	</v-app>
</template>
