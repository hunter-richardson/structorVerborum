<script lang='ts'>
  import i18next from 'i18next';
import { defineComponent, ref, type Ref } from 'vue';
import draggable from 'vuedraggable';
import { useTheme } from 'vuetify';
import { crustula, type Crustula } from '../miscella/crustula';
import type Ignavum from '../miscella/ignavum';
import { locutor } from '../miscella/locutor';
import Gustulus from '../scriptura/gustulus';
import { referatur, referretne } from '../scriptura/referre';
import { transducatur, transduceretne } from '../scriptura/transducere';
import calculare from './calculare.vue';
import gustulare from './gustulare.vue';
import numerare from './numerare.vue';
import quaerere from './quaerere.vue';

  type Annuli = {
    titula: string,
    valor: string
  }[]

  export default defineComponent({
    components: { draggable, gustulare, calculare, quaerere, numerare },
    data: (): {
      gustulus: Ref<Gustulus | undefined>,
      transduceret: boolean,
      trahens: Ref<boolean>,
      annulus: Ref<string>,
      locutionis: boolean,
      referret: boolean,
      annuli: Annuli,
    } => {
      return {
        locutionis: locutor.hoc().locutust(),
        transduceret: transduceretne(),
        referret: referretne(),
        trahens: ref(false),
        annulus: ref(''),
        gustulus: ref(),
        annuli: [],
      }
    }, setup () {
      const crustula: Ref<Ignavum<Crustula> | undefined> = ref()

      function interverteFaciem () {
        crustula.value?.hoc().facies.interverteUtrum()
        useTheme().global.name.value = crustula.value?.hoc().facies.concoctast('fusca') ? 'dark' : 'light'
      }

      function interverteLinguam() {
        if(crustula.value && !crustula.value.hoc().assensus.concoctast('')) {
          crustula.value.hoc().lingua.interverteUtrum()
          i18next.changeLanguage(crustula.value.hoc().lingua.massa)
          window.location.reload()
        }
      }

      function resepara (valor: string) {
        crustula.value?.hoc().separator.concoctast(valor)
        document.querySelectorAll('[^id=crustula.separator].text-primary')
          .forEach(element => element.classList.remove('text-primary'))

        const separatoris: Element | null = document.getElementById(`crustula.separator.${valor}`)
        if (separatoris) separatoris.classList.add('text-primary')
      }

      function negavit () {
        crustula.value?.hoc().assensus.concoctast('negavit')
        window.location.reload()
      }

      function coquantur () {
        if (crustula.value) {
          crustula.value.hoc().assensus.concoctast('assensit')
          crustula.value.hoc().separator.concoctast('ita')
          crustula.value.hoc().apices.concoctast('ita')
          crustula.value.hoc().utendaU.concoctast('ita')
          crustula.value.hoc().magnas.concoctast('ita')
          crustula.value.hoc().facies.concoctast('ita')

          useTheme().global.name.value = 'dark'
          const separatoris: Element | null = document.getElementById('#crustula.separator.inane')
          if (separatoris) separatoris.classList.add('text-primary')

          if (!crustula.value.hoc().lingua.coctast()) crustula.value.hoc().lingua.concoctast('ita')
          window.location.reload()
        }
      }

      return { crustula, interverteFaciem, interverteLinguam, resepara, negavit, coquantur }
    }, methods: {
      async refer (): Promise<void> { if (this.referret) await referatur(locutor.hoc().scribantur()) },
      transduc () { if (this.transduceret) transducatur(locutor.hoc().scribantur()) }
    }, mounted () {
      this.crustula = crustula
      document.title = i18next.t('appositus.titula')
      this.annuli = [ 'quaerere', 'numerare', 'calculare' ].map((annulus) => {
        return {
          valor: annulus,
          titula: i18next.t(`annuli.appositus.${annulus}`)
        }
      })
      // this.annulus = this.annuli.first().valor
    }
  })
</script>

<template>
  <template v-if='crustula'>
    <gustulare :gustulus='gustulus' />
    <template v-if="crustula.hoc().assensus.concoctast('assensit')">
      <draggable @start='trahens = true' @end='trahens = false'>
        <v-speed-dial id='crustula' location='bottom center' transition='fade-transition'
                      open-on-click>
          <template #activator='{ props: activator }'>
            <v-fab v-bind='activator' size='medium' icon='cake' />
          </template>
          <v-btn key='lingua' id='crustula.lingua' @click="interverteLinguam()" icon>
            <v-img height='36px' width='36px' :src="`/res/picta/${crustula.hoc().lingua.massa}.png`" />
          </v-btn>
          <v-btn key='facies' id='crustula.facies' @click='interverteFaciem()'
                 :icon="`${crustula.hoc().facies.concoctast('fusca') ? 'dark' : 'light'}_mode`" />
          <v-btn key='apices' id='crustula.apices' :text="crustula.hoc().apices.concoctast('ita') ? 'ā' : 'a'"
                 @click='crustula.hoc().apices.interverteUtrum()' />
          <v-btn key='magnas' id='crustula.magnas' :text="crustula.hoc().magnas.concoctast('ita') ? 'A' : 'a'"
                 @click='crustula.hoc().magnas.interverteUtrum()' />
          <v-btn key='utendaU' id='crustula.utendaU' :text="crustula.hoc().utendaU.concoctast('ita') ? 'v' : 'u'"
                 @click='crustula.hoc().utendaU.interverteUtrum()' />
          <v-btn key='crustula.separator.inane' text=' _ ' @click="resepara('inane')"
                 id='crustula.separator.inane' />
          <v-btn key='crustula.separator.interpunctum' text=' • ' @click="resepara('interpunctum')"
                 id='crustula.separator.interpunctum' />
          <v-btn key='crustula.separator.nullum' text='   ' @click="resepara('nullum')"
                 id='crustula.separator.nullum' />
        </v-speed-dial>
      </draggable>
    </template>
    <v-card>
      <v-app-bar density='compact' location='top' absolute flat tile>
        <v-app-bar-title :text="$t('scripta.appositus.titula')" />
        <template v-if='locutionis'>
          <v-card location='right'>
            <v-btn-toggle density='compact'>
              <template v-if='referret'>
                <v-btn icon='content_copy' id='refer' @click='refer()' />
              </template>
              <template v-if='transduceret'>
                <v-btn icon='file_open' id='transduc' @click='transduc()' />
              </template>
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
                <v-card v-bind='props'
                        :text="$t('scripta.appositus.colloqui')" />
              </a>
            </template>
          </v-hover>
        </v-avatar>
      </v-app-bar>
      <v-tabs v-model='annulus' align-tabs='center' density='compact' grow hide-slider mandatory>
        <template v-for='res in annuli' :key='res.valor'>
          <v-tab :value='res' selected-class='text-primary' :id="`annulus_${res}`" density='compact'
                 :text='res.titula' tile />
        </template>
      </v-tabs>
      <v-tabs-window v-model='annulus'>
        <v-tabs-window-item value='quaerere'>
          <quaerere />
        </v-tabs-window-item>
        <v-tabs-window-item value='numerare'>
          <numerare />
        </v-tabs-window-item>
        <v-tabs-window-item value='calculare'>
          <calculare />
        </v-tabs-window-item>
      </v-tabs-window>
    </v-card>
    <template v-if='!crustula.hoc().assensus'>
      <v-footer absolute>
        <v-container>
          <v-row no-gutters>
            <v-col>
              <v-sheet class='pa-1'>
                <div id='titulus.latinus'>{{ $t('scripta.appositus.deCrustulis', { lng: 'latina' }) }}</div>
                <v-btn-toggle>
                  <v-btn :text="$t('scripta.appositus.assentire', { lng: 'latina' })"
                         id='assentio' append-icon='handshake' @click='coquantur()' />
                  <v-btn :text="$t('scripta.appositus.negare', { lng: 'anglica' })"
                         id='nego' append-icon='block' @click='negavit()' />
                </v-btn-toggle>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class='pa-1'>
                <div id='titulus.anglicus'>{{ $t('scripta.appositus.deCrustulis', { lng: 'anglica' }) }}</div>
                <v-btn-toggle>
                  <v-btn :text="$t('scripta.appositus.assentire', { lng: 'anglica' })" append-icon='handshake'
                         @click="interverteLinguam(); coquantur()" />
                  <v-btn :text="$t('scripta.appositus.negare')" append-icon='block' @click='negavit()' />
                </v-btn-toggle>
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-footer>
    </template>
  </template>
</template>

<style>
  .v-btn--floating {
    position: relative
  }
</style>
