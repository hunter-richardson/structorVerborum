<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import { onMounted } from 'vue'
  import translation from '@/extensions/i18next'
  import Nuntius from '@/miscella/nuntius'

  const { t } = translation()
  const actum: string = window.history.length === 0 ? 'domui' : 'retro'

  async function recipatur() {
    if (window.history.length === 0) await useRouter().push('/')
    else useRouter().back()
  }

  onMounted(() => {
    Nuntius.timeo({
      nomen: '404.vue',
      nuntium: `CDIV effectu'st loco ${location.href}`
    })
  })
</script>

<template>
  <v-app>
    <v-container>
      <v-empty-state
        image="@res/picta/latina.png"
        icon="arrow_back"
        :action-text="t(`scripta.404.${actum}`)"
        :headline="t('scripta.404.caput')"
        :text="t('scripta.404.nuntium')"
        :title="t('scripta.404.titula')"
        @click:action="recipatur()" />
    </v-container>
  </v-app>
</template>
