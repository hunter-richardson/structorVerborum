<script lang="ts">
  import { defineComponent } from 'vue';
  import Crustula from '../miscella/crustula';
  import Nuntius from '../miscella/nuntius';

  const data = (): {
    anglica: boolean;
    historia: History;
  } => {
    return {
      anglica: Crustula.se.ipse().lingua.est('anglica') ?? false,
      historia: history
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

<template>
  <v-app>
    <v-container>
      <v-empty-state :text="anglica ? 'The requested resource is missing' : 'Quaerenda res abest'"
                     :title="anglica ? 'Absent page' : 'Absens pagina'"
                     :headline="anglica ? 'Oops, 404!' : 'Vae CDIV!'"
                     @click:action='historia.back();' image='/res/picta/latina.png'
                     :actionText="anglica ? 'Go back' : 'Recipe'" icon='arrow_back' />
    </v-container>
  </v-app>
</template>
