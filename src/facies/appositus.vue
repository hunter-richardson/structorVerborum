<script setup lang='ts'>
  import { onMounted } from 'vue';
  import draggable from 'vuedraggable';
  import { dominus } from '../miscella/dominus';
  import { useTranslation } from 'i18next-vue';
  import { referatur, referretne } from '../scriptura/referre';
  import { transducatur, transduceretne } from '../scriptura/transducere';
  import calculare from './calculare.vue';
  import gustulare from './gustulare.vue';
  import numerare from './numerare.vue';
  import quaerere from './quaerere.vue';
  import '../extensions/array.ts'
import Quaerere from './quaerere.vue';
import Numerare from './numerare.vue';
import Calculare from './calculare.vue';

  const separatores: string[] = Object.keys(dominus.hoc().separatores)
  const vexilla: string[] = [ 'apices', 'magnas', 'utendaU' ]
  const annuli: string[] = [ 'quaerere', 'numerare', 'calculare' ]
  let annulus: string = annuli.first()

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

  onMounted(() => { document.title = useTranslation().t('appositus.title') })
</script>

<template>
  <!-- <gustulare :gustulus='gustulus' /> -->
  <v-card>
    <v-app-bar density='compact' location='top' absolute flat tile>
      <v-app-bar-title :text="$t('scripta.appositus.titula')" />
      <template v-if='locutionis'>
        <v-card location='right'>
          <v-btn-toggle density='compact'>
            <v-btn v-if='referret' icon='content_copy' id='refer' @click='refer()' />
            <v-btn v-if='transduceret' icon='file_open' id='transduc' @click='transduc()' />
          </v-btn-toggle>
        </v-card>
      </template>
      <template v-else>
        <div id='subiciendum' class='text-center'>
          <v-card :text="$t('scripta.appositus.rogatum')" />
        </div>
      </template>
      <v-avatar image='https://avatars.githubusercontent.com/u/22331463'>
        <v-hover>
          <template #default='{ isHovering, props }'>
            <a v-if='isHovering' target='_blank'
               href='https://github.com/hunter-richardson/structorverborum/issues'>
              <v-card v-bind='props' :text="$t('scripta.appositus.colloqui')" />
            </a>
          </template>
        </v-hover>
      </v-avatar>
    </v-app-bar>
    <v-tabs v-model='annulus' align-tabs='center' density='compact' grow hide-slider mandatory>
      <v-tab v-for='res in annuli' :key='res.valor' value='res'
             selected-class='text-primary' :id="`annulus_${res}`"
             text='res.titula' density='compact' tile />
    </v-tabs>
    <v-tabs-window v-model='annulus'>
      <v-tabs-window-item v-for='valor in annuli' :value='valor'>
        <template v-if="valor === 'quaerere'"><quaerere /></template>
        <template v-else-if="valor === 'numerare'"><numerare /></template>
        <template v-else-if="valor === 'calculare'"><calculare /></template>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
  <template v-if="$dominus.hoc().assensus.concoctast('assensit')">
    <draggable @start='trahens = true' @end='trahens = false'>
      <v-speed-dial id='crustula' location='bottom center' transition='fade-transition' open-on-click>
        <template #activator='{ props: activator }'>
          <v-fab v-bind='activator' size='medium' icon='cake' />
        </template>
        <v-btn key='lingua' id='crustula.lingua' @click='$dominus.hoc().lingua.interverteUtrum()' icon>
          <v-img height='36px' width='36px' :src"$dominus.hoc().lingua.scribatur()" />
        </v-btn>
        <v-btn id='crustula.facies' @click='$dominus.hoc().facies.interverteUtrum()'
               :icon='$dominus.hoc().facies.scribatur()'
        <v-btn v-for='vexillum in vexilla' :key='vexillum' :id="`crustula.${vexillum}`"
               @click="`$dominus.hoc()[${vexillum}].interverteUtrum()`"
               :text="`$dominus.hoc()[${vexillum}].scribatur()`" />
        <v-btn v-for='separator in separatores' :key='separator' :id="`crustula.separator.${separator}`"
               :text="`$dominus.hoc().separatores[${separator}]`"
               @click="`$dominus.hoc().separator.massa = ${separator}`" />
      </v-speed-dial>
    </draggable>
  </template>
  <template v-if='$dominus.hoc().assensus.inhaesast()'>
    <v-footer absolute>
      <v-container>
        <v-row no-gutters>
          <v-col>
            <v-sheet class='pa-1'>
              <div id='titulus.latinus'>{{ $t('scripta.appositus.deCrustulis', { lng: 'latina' }) }}</div>
              <v-btn-toggle>
                <v-btn v-for='assentiendum in assentienda' :key='assentiendum'
                       :id="`crustula.${assentiendum.notendum}.latina`"
                       :append-icon='assentiendum.videndum'
                       @click="`$dominus.hoc().assensus.massa = ${assentiendum.massa}`"
                       :text="`$t('annuli.appositus.${assentiendum.scriptum}', { lng: 'la' })`" />
              </v-btn-toggle>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class='pa-1'>
              <div id='titulus.anglicus'>{{ $t('scripta.appositus.deCrustulis', { lng: 'anglica' }) }}</div>
              <v-btn-toggle>
                <v-btn v-for='assentiendum in assentienda' :key='assentiendum'
                       :id="`crustula.${assentiendum.notendum}.anglica`"
                       :append-icon='assentiendum.videndum'
                       @click="`$dominus.hoc().assensus.massa = ${assentiendum.massa}"`
                       :text="`$t('annuli.appositus.${assentiendum.scriptum}', { lng: 'en' })`" />
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
