<script setup lang='ts'>
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router';
  import Nuntius from '@/miscella/nuntius'
  import translation from '@/extensions/i18next';

  const { t } = translation()
  function recipatur() { useRouter().back() }

  onMounted(() => {
    if(location.href.endsWith('404.html')) {
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
                     :action-text="t('scripta.404.actum')"
                     :headline="t('scripta.404.caput')"
                     :text="t('scripta.404.nuntium')"
                     :title="t('scripta.404.titula')"
                     @click:action='recipatur()' />
    </v-container>
  </v-app>
</template>
