<script setup lang='ts'>
  import { onMounted, ref, type Ref } from 'vue'
  import { dominus } from '../miscella/dominus'
  import '../extensions/array'
  import fs from 'fs'
  import { VueMarkdownIt as markdown } from '@f3ve/vue-markdown-it'
  import path from 'path'

  let onerans: boolean = true

  const docendum: Ref<string | undefined> = ref<string | undefined>(undefined)
  const doctum: Ref<string | undefined> = ref<string | undefined>(undefined)

  async function exoneratur() { onerans = false }

  function reoneratur() { onerans = true }

  async function doceatur() {
    reoneratur()
    doctum.value = ''
    const via: string = `${path.join('/res/docenda', dominus.lingua.signum, docendum.value!)}.md`
    fs.createReadStream(via)
      .on('data', (pars) =>
          doctum.value = `${doctum.value}${typeof pars === 'string' ? pars.trim() : pars}`)
  }

  async function adliumDoceatur(eventus: MouseEvent) {
    reoneratur()
    eventus.preventDefault()
    const parma: string | undefined =
        (eventus.currentTarget as HTMLElement)?.closest('a')
            ?.getAttribute('href') ?? undefined
    //  eslint-disable-next-line no-extra-boolean-cast
    if(!!parma && parma.endsWith('.md')) {
      docendum.value = parma.split('/').last().split('.').first()
      return doceatur()
      //  eslint-disable-next-line no-extra-boolean-cast
    } else if(!!parma)
      return new Promise<void>(() =>
          window.open(parma, '_blank', 'noopener,nooreferrer'))
  }

  async function iungantur() {
    const collecta =
        (document.getElementsByClassName('markdown').item(0))?.getElementsByTagName('a')
    if(collecta)
        [...collecta].forEach((res) =>
            res.addEventListener('click', adliumDoceatur,
                                { once: true, capture: true, passive: false }))
  }

  onMounted(async () => {
    await doceatur().then(() => iungantur())
                    .then(() => exoneratur())
  })
</script>

<template>
  <<v-skeleton-loader v-if='onerans' :loading='onerans' type='paragraph'
                      :loading-text="$t('scripta.docere.onerans')" />
  <!-- eslint-disable-next-line no-extra-boolean-cast -->
  <div v-else-if='!!doctum' class='markdown' :id="`doctum.${docendum}`">
    <markdown breaks='true' :source='doctum' />
  </div>
</template>
