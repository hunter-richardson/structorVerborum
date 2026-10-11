<script setup lang='ts'>
  import { onMounted, defineProps, ref, type Ref } from 'vue'
  import { dominus } from '../miscella/dominus'
  import '../extensions/array'
  import { transduceretne, transducatur } from '../scriptura/transducere'
  import fs from 'fs'
  import { VueMarkdownIt as Markdown } from '@f3ve/vue-markdown-it'
  import path from 'path'
  import { pipeline } from 'node:stream'

  type Monstrandum = {
    onerans: boolean,
    doctum?: string,
    res: string
  }

  const prima: string = defineProps<string>()

  const monstranda: Ref<Monstrandum[]> = ref([ await doceatur(prima) ])

  const concitatust: Ref<boolean> = ref(false)

  async function doceatur(res: string): Promise<Monstrandum> {
    return await new Promise((solvatur) => {
      const monstrandum: Monstrandum = {
        onerans: true,
        res: res
      }; const via: string = `${path.join('/res/docenda', dominus.lingua.signum, monstrandum.res)}.md`
      await pipeline((await fs.open(via), 'r').createReadStream())
        .on('data', (pars) => monstrandum.doctum! += (typeof pars === 'string' ? pars.trim() : pars))
        .on('end', () => {
          monstrandum.onerans = false
          solvatur(monstrandum)
        })
    })
  }

  async function adliumDoceatur(eventus: MouseEvent) {
    eventus.preventDefault()
    const parma: string | undefined =
        (eventus.currentTarget as HTMLElement)?.closest('a')
            ?.getAttribute('href') ?? undefined
    if(parma !== undefined) {
      if(parma.endsWith('.md')) {
        const res: string = parma.split('/').last().split('.').first();
        monstranda.value.push(await doceatur(res));
      } else return await new Promise<void>(() => {
          if(transduceretne()) transducatur(parma)
          else window.open(parma, '_blank', 'noopener,nooreferrer')
  } )} }

  async function iungantur() {
    const collecta =
        (document.getElementsByClassName('markdown').item(0))?.getElementsByTagName('a')
    if(collecta)
        [...collecta].forEach((res) =>
            res.addEventListener('click', adliumDoceatur,
                                { once: true, capture: true, passive: false }))
  }

  onMounted(async () => await iungantur())
</script>

<template>
  <v-dialog v-model='concitatust' :scrollable='true' full-width='true' lazy='true'>
    <template v-slot:activator='{ isActive: concitatust }'>
      <v-btn :text='prima' @click='concitatust = true' />
    </template>
    <v-card v-for='monstrandum in monstranda' :key='monstrandum.res'>
      <v-card-title>{{ monstrandum.res }}</v-card-title>
      <v-skeleton-loader v-if='monstrandum.onerans' type='paragraph'
                         :loading-text='$t(`scripta.docere.onerans`)' />
      <div v-else-if='monstrandum.doctum !== undefined && monstrandum.doctum.length > 0'
           :id='`doctum.${monstrandum.res}`' class='markdown'>
        <Markdown :source='monstrandum.doctum' breaks='true' />
      </div>
      <v-spacer />
    </v-card>
  </v-dialog>
</template>
