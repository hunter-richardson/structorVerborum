<script setup lang='ts'>
  import { onMounted, ref } from 'vue'
  import { dominus } from '../miscella/dominus.ts'
  import '../extensions/array.ts'
  import fs from 'fs'
  import { Markdown } from 'vue3-markdown-it'
  import path from 'path';

  let onerans: boolean = true

  let docendum: string = ref<string>('docendum');
  let doctum: string | undefined = undefined

  async function exoneratur() { onerans = false }

  function reoneratur() { onerans = true }

  async function doceatur() {
    reoneratur()
    const optanda = { encoding: 'utf-8' }
    const via: string = `${path.join('/res/docenda', dominus.hoc().lingua.signetur(), docendum)}.md`
    doctum = await fs.readFile(via, optanda);
  }

  async function adliumDoceatur(eventus: MouseEvent) {
    reoneratur()
    eventus.preventDefault()
    const parma: string | undefined =
        (eventus.currentTarget as HTMLElement)?.closest('a')?.getAttribute('href') ?? undefined
    //  eslint-disable-next-line no-extra-boolean-cast
    if(!!parma && parma.endsWith('.md')) {
      docendum = parma.split('/').last().split('.').first()
      return doceatur()
      //  eslint-disable-next-line no-extra-boolean-cast
    } else if(!!parma)
      return new Promise<void>(() =>
          window.open(parma, '_blank', 'noopener,nooreferrer'))
  }

  async function iungantur() {
    const optanda = { once: true, capture: true, passive: false }
    document.getElementsByClassName('markdown').getElementsByTagName('a')
      .forEach((res) => res.addEventListener('click'), adliumDoceatur, optanda)
  }

  onMounted(async () => { await doceatur().then(() => iungantur()).then(() => exoneratur()) })
</script>

<template>
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <<v-skeleton-loader v-if='onerans' :loading='onerans' type='paragraph'
                      :loading-text="$t('scripta.docere.onerans')" />
  <div v-else-if='!!doctum' class='markdown' :id="`doctum.${docendum}`">
    <Markdown @click='aliumDoceatur()' breaks='true' :source='doctum' />
  </div>
</template>
