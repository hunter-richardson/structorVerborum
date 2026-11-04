<script setup lang="ts">
  import { buildRegExp, charRange, endOfString, oneOrMore, startOfString } from 'ts-regex-builder'
  import { VueMarkdownIt as Markdown } from '@f3ve/vue-markdown-it'
  import { ref, type Ref } from 'vue'
  import { open } from 'node:fs/promises'
  import { resolve } from 'node:path'
  import transducatur from '@/scriptura/transducere'
  import translation from '@/extensions/i18next'
  import dominus from '@/miscella/dominus'
  import { valores } from '@/praebeunda/valores'
  import '@/extensions/string'
  import '@/extensions/array'

  type Monstrandum = {
    onerans: boolean
    doctum?: string
    res: string
  }

  const { t } = translation()
  const { activator } = defineProps<{ activator: string }>()

  const monstranda: Ref<Monstrandum[]> = ref([await doceatur(activator)])
  const concitatust: Ref<boolean> = ref(false)

  async function doceatur(res: string): Promise<Monstrandum> {
    let doctum: string = ''
    if (valores.includes(res)) {
      const via: string = resolve('@/res/docenda', dominus.lingua.signum, `${res}.md`)
      //  eslint-disable-next-line security/detect-non-literal-fs-filename -- Hoc filum validust
      ;(await open(via, 'r')).createReadStream({ encoding: 'utf8' }).on('data', (pars) => (doctum += typeof pars === 'string' ? pars.trim() : pars))
    } else res = ''
    return {
      onerans: false,
      doctum: doctum,
      res: res
    }
  }

  async function adliumDoceatur(eventus: MouseEvent) {
    const parma: HTMLElement = eventus.target as HTMLElement
    if (parma.tagName.lowercase === 'a') {
      eventus.preventDefault()
      const referendum: string | null = parma.getAttribute('href')
      if (referendum !== null && !referendum.empty) {
        if (buildRegExp([startOfString, oneOrMore(charRange('a', 'z')), '.md', endOfString]).test(referendum)) {
          const res: string = referendum.split('.').first() ?? ''
          monstranda.value.push(await doceatur(res))
        } else transducatur(referendum)
      }
    }
  }
</script>

<template>
  <v-dialog v-model="concitatust" width="100%" open-on-click scrollable>
    <template #activator="{ props: res }">
      <v-btn :text="activator" v-bind="res" />
    </template>
    <div id="docenda" @click="adliumDoceatur">
      <v-card v-for="monstrandum in monstranda" :key="monstrandum.res">
        <v-card-title>{{ monstrandum.res }}</v-card-title>
        <v-skeleton-loader v-if="monstrandum.onerans" type="paragraph" :loading-text="t(`scripta.docere.onerans`)" />
        <Markdown v-else-if="monstrandum.doctum !== undefined && !monstrandum.doctum.empty" :id="`doctum.${monstrandum.res}`" :source="monstrandum.doctum" breaks />
        <v-spacer />
      </v-card>
    </div>
  </v-dialog>
</template>
