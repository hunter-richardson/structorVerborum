<script setup lang='ts'>
  import { ref, type Ref } from 'vue'
  import { dominus } from '@/miscella/dominus'
  import '@/extensions/array'
  import { transducatur } from '@/scriptura/transducere'
  import fs from 'node:fs'
  import { VueMarkdownIt as Markdown } from '@f3ve/vue-markdown-it'
  import path from 'node:path'
  import translation from '@/extensions/i18next';
  import '@/extensions/string'
  import { buildRegExp, charRange, endOfString, oneOrMore, startOfString } from 'ts-regex-builder';

  type Monstrandum = {
    onerans: boolean,
    doctum?: string,
    res: string
  }

  const { t } = translation()
  const { activator } = defineProps<{ activator: string}>()

  const monstranda: Ref<Monstrandum[]> = ref([ await doceatur(activator) ])
  const concitatust: Ref<boolean> = ref(false)

  async function doceatur(res: string): Promise<Monstrandum> {
    const via: string = `${path.join('/res/docenda', dominus.lingua.signum, res)}.md`
    let doctum: string = ''
    fs.createReadStream(via).on('data', (pars) =>
          doctum += (typeof pars === 'string' ? pars.trim() : pars))
    return {
      onerans: false,
      doctum: doctum,
      res: res
    };
  }

  async function adliumDoceatur(eventus: MouseEvent) {
    const parma: HTMLElement = eventus.target as HTMLElement
    if(parma.tagName.lowercase === 'a') {
      eventus.preventDefault()
      const referendum: string | null = parma.getAttribute('href')
      if(referendum !== null && !referendum.empty) {
        if(buildRegExp([
          startOfString, oneOrMore(charRange('a', 'z')), '.md', endOfString
        ]).test(referendum)) {
          const res: string = referendum.split('.').first() ?? '';
          monstranda.value.push(await doceatur(res));
        } else transducatur(referendum)
      }
  } }
</script>

<template>
  <v-dialog v-model='concitatust' width='100%'
            open-on-click scrollable>
    <template #activator='{ props: res }'>
      <v-btn :text='activator' v-bind='res' />
    </template>
    <div id='docenda' @click='adliumDoceatur'>
      <v-card v-for='monstrandum in monstranda' :key='monstrandum.res'>
        <v-card-title>{{ monstrandum.res }}</v-card-title>
        <v-skeleton-loader v-if='monstrandum.onerans' type='paragraph'
                           :loading-text='t(`scripta.docere.onerans`)' />
        <Markdown v-else-if='monstrandum.doctum !== undefined && !monstrandum.doctum.empty'
                  :id='`doctum.${monstrandum.res}`' :source='monstrandum.doctum' breaks />
        <v-spacer />
      </v-card>
    </div>
  </v-dialog>
</template>
