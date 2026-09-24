<script lang="ts">
  import { computed, defineComponent } from 'vue';
  import Nuntius from '../miscella/nuntius';

  export default defineComponent({
    data: (): { historia: History } => { return { historia: history } },
    mounted (): void {
      if ([ location.href, location.href !== '404' ].all()) {
        Nuntius.timeo({
          nomen: '404.vue',
          error: new Error(`CDIV effectu'st loco ${location.href}`)
        })
      }
    }
  })
</script>

<template>
  <v-app>
    <v-container>
      <v-empty-state :text="$t('scripta.404.nuntium')"
                     :title="$t('scripta.404.titula')"
                     :headline="$t('scripta.404.caput')"
                     :actionText="$t('scripta.404.actum')"
                     @click:action='historia.back()' image='/res/picta/latina.png'
                     icon='arrow_back' />
    </v-container>
  </v-app>
</template>
