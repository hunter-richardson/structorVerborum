<script setup lang="ts">
  import { onMounted, ref, type Ref } from 'vue'
  import { useTranslation } from 'i18next-vue'
  import { referatur, referretne } from '@/scriptura/referre'
  import transducatur from '@/scriptura/transducere'
  import { gustulator } from '@/miscella/gustulator'
  import translation from '@/extensions/i18next'
  import Gustulare from '@/facies/gustulare.vue'
  import Calculare from '@/facies/calculare.vue'
  import Numerare from '@/facies/numerare.vue'
  import Quaerere from '@/facies/quaerere.vue'
  import Coquere from '@/facies/coquere.vue'
  import locutor from '@/miscella/locutor'
  import '@/extensions/array'

  const { t } = translation()
  const annuli: string[] = ['quaerere', 'numerare', 'calculare']

  const annulus: Ref<string> = ref(annuli.first() ?? '')

  const duo = [
    {
      status: referretne(),
      icon: 'content_copy',
      ipsum: refer.name,
      actus: refer
    },
    {
      status: true,
      icon: 'file_open',
      ipsum: transduc.name,
      actus: transduc
    }
  ]

  async function refer() {
    if (referretne()) await gustulator.proponatur(await referatur(locutor.locutio))
  }

  function transduc() {
    transducatur(locutor.locutio)
  }

  onMounted(() => {
    document.title = useTranslation().t('appositus.title')
  })
</script>

<template>
  <Gustulare />
  <v-card>
    <v-app-bar density="compact" location="top" absolute flat tile>
      <v-app-bar-title :text="t('scripta.appositus.titula')" />
      <v-card v-if="locutor.locutust" location="right">
        <v-btn-toggle density="compact">
          <template v-for="res in duo" :key="res.ipsum">
            <v-btn v-if="res.status" :id="res.ipsum" :icon="res.icon" @click="res.actus()" />
          </template>
        </v-btn-toggle>
      </v-card>
      <v-card v-else id="subiciendum" class="text-center" :text="t('scripta.appositus.rogatum')" />
      <v-avatar image="https://avatars.githubusercontent.com/u/22331463">
        <v-hover>
          <template #default="{ isHovering, props }">
            <a
              v-if="isHovering"
              target="_blank"
              href="https://github.com/hunter-richardson/structorverborum/issues">
              <v-card v-bind="props" :text="t('scripta.appositus.colloqui')" />
            </a>
          </template>
        </v-hover>
      </v-avatar>
    </v-app-bar>
    <v-tabs v-model="annulus" grow hide-slider mandatory align-tabs="center" density="compact">
      <v-tab
        v-for="res in annuli"
        :id="`annulus_${res}`"
        :key="res"
        value="res"
        selected-class="text-primary"
        text="res.titula"
        density="compact"
        tile />
    </v-tabs>
    <v-tabs-window v-model="annulus">
      <v-tabs-window-item v-for="valor in annuli" :key="valor" :value="valor">
        <Quaerere v-if="valor === 'quaerere'" />
        <Numerare v-else-if="valor === 'numerare'" />
        <Calculare v-else-if="valor === 'calculare'" />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
  <Coquere />
</template>
