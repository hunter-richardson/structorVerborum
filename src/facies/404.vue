<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router';
  import Nuntius from '../miscella/nuntius'

  function recipatur() { useRouter().back() }

  onMounted(() => {
    if ([ location.href, location.href !== '404' ].all()) {
      Nuntius.timeo({
        nomen: '404.vue',
        error: new Error(`CDIV effectu'st loco ${location.href}`)
      });
    }
  })
</script>

<template>
  <v-app>
    <v-container>
      <v-empty-state image='@res/picta/latina.png' icon='arrow_back'
                     :text="$t('scripta.404.nuntium')"
                     :title="$t('scripta.404.titula')"
                     :headline="$t('scripta.404.caput')"
                     :action-text="$t('scripta.404.actum')"
                     @click:action='recipatur()' />
    </v-container>
  </v-app>
</template>
