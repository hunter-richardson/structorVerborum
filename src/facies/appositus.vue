<script setup lang='ts'>
  import { onMounted, ref, type Ref } from 'vue';
  import draggable from 'vue-draggable-next';
  import { dominus } from '@/miscella/dominus';
  import { useTranslation } from 'i18next-vue';
  import { referatur, referretne } from '@/scriptura/referre';
  import { transducatur } from '@/scriptura/transducere';
  import Calculare from '@/facies/calculare.vue';
  import Numerare from '@/facies/numerare.vue';
  import Quaerere from '@/facies/quaerere.vue';
  import '@/extensions/array'
  import { locutor } from '@/miscella/locutor';
  import { gustulator } from '@/miscella/gustulator';
  import Gustulare from '@/facies/gustulare.vue';
  import translation from '@/extensions/i18next';

  const { t } = translation()
  const separatores: string[] = Object.keys(dominus.separatores)
  const vexilla: string[] = [ 'apices', 'magnas', 'utendaU' ]
  const annuli: string[] = [ 'quaerere', 'numerare', 'calculare' ]

  const annulus: Ref<string> = ref(annuli.first() ?? '');
  const trahens: Ref<boolean> = ref(false)

  const duo = [
    {
      status: referretne(),
      icon: 'content_copy',
      ipsum: refer.name,
      actus: refer,
    }, {
      status: true,
      icon: 'file_open',
      ipsum: transduc.name,
      actus: transduc,
    }
  ]

  const assentienda = [
    {
      notendum: 'assentio',
      videndum: 'handshake',
      clavis: 'assentire',
      massa: 'assensit'
    }, {
      notendum: 'nego',
      videndum: 'block',
      clavis: 'negare',
      massa: 'negavit'
    }
  ]

  async function refer()
  { if(referretne()) gustulator.proponatur(await referatur(locutor.locutio)) }

  function transduc() { transducatur(locutor.locutio) }

  onMounted(() => { document.title = useTranslation().t('appositus.title') })
</script>

<template>
  <Gustulare />
  <v-card>
    <v-app-bar density='compact' location='top' absolute flat tile>
      <v-app-bar-title :text="t('scripta.appositus.titula')" />
      <v-card v-if='locutor.locutust' location='right'>
        <v-btn-toggle density='compact'>
          <template v-for='res in duo' :key='res.ipsum'>
            <v-btn v-if='res.status' :id='res.ipsum'
                   :icon='res.icon' @click='res.actus()' />
          </template>
        </v-btn-toggle>
      </v-card>
      <div v-else id='subiciendum' class='text-center'>
        <v-card :text="t('scripta.appositus.rogatum')" />
      </div>
      <v-avatar image='https://avatars.githubusercontent.com/u/22331463'>
        <v-hover>
          <template #default='{ isHovering, props }'>
            <a v-if='isHovering' target='_blank'
               href='https://github.com/hunter-richardson/structorverborum/issues'>
              <v-card v-bind='props' :text="t('scripta.appositus.colloqui')" />
            </a>
          </template>
        </v-hover>
      </v-avatar>
    </v-app-bar>
    <v-tabs v-model='annulus' grow hide-slider mandatory
            align-tabs='center' density='compact'>
      <v-tab v-for='res in annuli' :id='`annulus_${res}`' :key='res'
             value='res' selected-class='text-primary'
             text='res.titula' density='compact' tile />
    </v-tabs>
    <v-tabs-window v-model='annulus'>
      <v-tabs-window-item v-for='valor in annuli'
                          :key='valor' :value='valor'>
        <Quaerere v-if="valor === 'quaerere'" />
        <Numerare v-else-if="valor === 'numerare'" />
        <Calculare v-else-if="valor === 'calculare'" />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
  <template v-if='dominus.assensus.signum === true'>
    <draggable @start='trahens = true' @end='trahens = false'>
      <v-speed-dial id='crustula' transition='fade-transition'
                    location='bottom center' open-on-click>
        <template #activator='{ props: activator }'>
          <v-fab v-bind='activator' size='medium' icon='cake' />
        </template>
        <v-btn id='crustula.lingua' key='lingua' icon
               @click='dominus.lingua.interverteUtrum()'>
          <v-img height='36px' width='36px' :src='dominus.lingua.scriptum' />
        </v-btn>
        <v-btn id='crustula.facies' :icon='dominus.facies.scriptum'
               @click='dominus.facies.interverteUtrum()' />
        <v-btn v-for='vexillum in vexilla' :id='`crustula.${vexillum}`'
               :key='vexillum' :text='`dominus.hoc[${vexillum}].scribatur()`'
               @click='`dominus.hoc[${vexillum}].interverteUtrum()`' />
        <v-btn v-for='separator in separatores' :id='`crustula.separator.${separator}`'
               :key='separator' :text='`dominus.separatores[${separator}]`'
               @click='`dominus.separator.massa = ${separator}`' />
      </v-speed-dial>
    </draggable>
  </template>
  <template v-if='dominus.assensus.inhaesast === undefined'>
    <v-footer absolute>
      <v-container>
        <v-row no-gutters>
          <v-col>
            <v-sheet class='pa-1'>
              <div id='titulus.latinus'>
                {{ t('scripta.appositus.deCrustulis', { lng: 'la' }) }}
              </div>
              <v-btn-toggle>
                <v-btn v-for='assentiendum in assentienda'
                       :id='`crustula.${assentiendum.notendum}.latina`'
                       :key='assentiendum.clavis' :append-icon='assentiendum.videndum'
                       :text="t(`annuli.appositus.${assentiendum.notendum}`, { lng: 'la' })"
                       @click='dominus.assensus.massa = assentiendum.massa' />
              </v-btn-toggle>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class='pa-1'>
              <div id='titulus.anglicus'>
                {{ t('scripta.appositus.deCrustulis', { lng: 'en' }) }}
              </div>
              <v-btn-toggle>
                <v-btn v-for='assentiendum in assentienda'
                       :id='`crustula.${assentiendum.notendum}.anglica`'
                       :key='assentiendum.clavis' :append-icon='assentiendum.videndum'
                       :text="t(`annuli.appositus.${assentiendum.notendum}`, { lng: 'en' })"
                       @click='dominus.assensus.massa = assentiendum.massa' />
              </v-btn-toggle>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </template>
</template>

<style>
  .v-btn--floating
  { position: relative }
</style>
