<script setup lang='ts'>
  import { onMounted, ref, type Ref } from 'vue';
  import draggable from 'vuedraggable';
  import { dominus } from '../miscella/dominus';
  import { useTranslation } from 'i18next-vue';
  import { referatur, referretne } from '../scriptura/referre';
  import { transducatur, transduceretne } from '../scriptura/transducere';
  import Calculare from './calculare.vue';
  import Numerare from './numerare.vue';
  import Quaerere from './quaerere.vue';
  import '../extensions/array'
  import { locutor } from '../miscella/locutor';

  const separatores: string[] = Object.keys(dominus.separatores)
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

  const trahens: Ref<boolean> = ref<boolean>(false)

  async function refer()
  { if(referretne()) {await referatur(locutor.scribantur())} }

  function transduc()
  { if(transduceretne()) { transducatur(locutor.scribantur()) } }

  onMounted(() => { document.title = useTranslation().t('appositus.title') })
</script>

<template>
  <v-card>
    <v-app-bar density='compact' location='top' absolute flat tile>
      <v-app-bar-title :text="$t('scripta.appositus.titula')" />
      <template v-if='locutor.locutust()'>
        <v-card location='right'>
          <v-btn-toggle density='compact'>
            <v-btn v-if='referretne' icon='content_copy' id='refer' @click='refer()' />
            <v-btn v-if='transduceretne' icon='file_open' id='transduc' @click='transduc()' />
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
      <v-tab v-for='res in annuli' :key='res' value='res'
             selected-class='text-primary' :id="`annulus_${res}`"
             text='res.titula' density='compact' tile />
    </v-tabs>
    <v-tabs-window v-model='annulus'>
      <v-tabs-window-item v-for='valor in annuli' :value='valor'>
        <template v-if="valor === 'quaerere'"><Quaerere /></template>
        <template v-else-if="valor === 'numerare'"><Numerare /></template>
        <template v-else-if="valor === 'calculare'"><Calculare /></template>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
  <template v-if="dominus.assensus.signetur() === true">
    <draggable @start='trahens = true' @end='trahens = false'>
      <v-speed-dial id='crustula' location='bottom center' transition='fade-transition' open-on-click>
        <template #activator='{ props: activator }'>
          <v-fab v-bind='activator' size='medium' icon='cake' />
        </template>
        <v-btn key='lingua' id='crustula.lingua' @click='dominus.lingua.interverteUtrum()' icon>
          <v-img height='36px' width='36px' :src"$dominus.lingua.scribatur()" />
        </v-btn>
        <v-btn id='crustula.facies' @click='dominus.facies.interverteUtrum()'
               :icon='dominus.facies.scribatur()' />
        <v-btn v-for='vexillum in vexilla' :key='vexillum' :id="`crustula.${vexillum}`"
               @click="`dominus.hoc[${vexillum}].interverteUtrum()`"
               :text="`dominus.hoc[${vexillum}].scribatur()`" />
        <v-btn v-for='separator in separatores' :key='separator' :id="`crustula.separator.${separator}`"
               @click="`dominus.separator.massa = ${separator}`"
               :text="`dominus.separatores[${separator}]`" />
      </v-speed-dial>
    </draggable>
  </template>
  <template v-if='dominus.assensus.inhaesast() === undefined'>
    <v-footer absolute>
      <v-container>
        <v-row no-gutters>
          <v-col>
            <v-sheet class='pa-1'>
              <div id='titulus.latinus'>
                {{ $t('scripta.appositus.deCrustulis', { lng: 'latina' }) }}
              </div>
              <v-btn-toggle>
                <v-btn v-for='assentiendum in assentienda' :key='assentiendum.clavis'
                       :id="`crustula.${assentiendum.notendum}.latina`"
                       :append-icon='assentiendum.videndum'
                       @click="dominus.assensus.massa = assentiendum.massa"
                       :text="`$t('annuli.appositus.${assentiendum.notendum}', { lng: 'la' })`" />
              </v-btn-toggle>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class='pa-1'>
              <div id='titulus.anglicus'>
                {{ $t('scripta.appositus.deCrustulis', { lng: 'anglica' }) }}
              </div>
              <v-btn-toggle>
                <v-btn v-for='assentiendum in assentienda' :key='assentiendum.clavis'
                       :id="`crustula.${assentiendum.notendum}.anglica`"
                       :append-icon='assentiendum.videndum'
                       @click="dominus.assensus.massa = assentiendum.massa"
                       :text="`$t('annuli.appositus.${assentiendum.notendum}', { lng: 'en' })`" />
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
