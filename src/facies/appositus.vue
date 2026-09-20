<script lang='ts'>
  import { computed, defineComponent, type Ref, ref } from 'vue'
  import { useTheme } from 'vuetify'
  import draggable from 'vuedraggable'
  import { transducatur, transduceretne } from '../scriptura/transducere'
  import { referretne, referatur } from '../scriptura/referre'
  import { crustula, type Crustula } from '../miscella/crustula'
  import quaerere from './quaerere.vue'
  import numerare from './numerare.vue'
  import calculare from './calculare.vue'
  import gustulare from './gustulare.vue'
  import Gustulus from '../scriptura/gustulus'
  import { locutor } from '../miscella/locutor'
import type Ignavum from '../miscella/ignavum'
import { useRoute } from 'vuetify/lib/composables/router.mjs';
import { monstrator, type Monstranda } from '../miscella/monstrator';

  const via = useRoute();
  const nomen: string = (computed(() => via.value) as unknown) as string;
  const monstranda: Monstranda = await monstrator.hoc().monstrentur(nomen)

  type Nuntium = {
    titula: string,
    rogatum: string,
    colloqui: string,
    assentire: string,
    negare: string,
    deCrustulis: string,
    annuli: {
      quaerere: string,
      numerare: string,
      calculare: string
    },
  }

  type Nuntia = {
    anglicum: Nuntium,
    latinum: Nuntium
  }

  type Annuli = {
    titula: string,
    valor: string
  }[]

  const nuntia: Nuntia = {
    latinum: {
      titula: monstranda.first((monstrandum) => monstrandum.unicum === 'latina.titula').nuntium,
      rogatum: monstranda.first((monstrandum) => monstrandum.unicum === 'latinum.rogatum').nuntium,
      colloqui: monstranda.first((monstrandum) => monstrandum.unicum === 'latinum.colloqui').nuntium,
      assentire: monstranda.first((monstrandum) => monstrandum.unicum === 'latinum.assentire').nuntium,
      negare: monstranda.first((monstrandum) => monstrandum.unicum === 'latinum.negare').nuntium,
      deCrustulis: monstranda.first((monstrandum) => monstrandum.unicum === 'latinum.deCrustulis').nuntium,
      annuli: {
        quaerere: monstranda.first((monstrandum) => monstrandum.unicum === 'latini.annuli.quaerere').nuntium,
        numerare: monstranda.first((monstrandum) => monstrandum.unicum === 'latini.annuli.numerare').nuntium,
        calculare: monstranda.first((monstrandum) => monstrandum.unicum === 'latini.annuli.calculare').nuntium,
      }
    }, anglicum: {
        titula: monstranda.first((monstrandum) => monstrandum.unicum === 'anglica.titula').nuntium,
        rogatum: monstranda.first((monstrandum) => monstrandum.unicum === 'anglicum.rogatum').nuntium,
        colloqui: monstranda.first((monstrandum) => monstrandum.unicum === 'anglicum.colloqui').nuntium,
        assentire: monstranda.first((monstrandum) => monstrandum.unicum === 'latinum.assentire').nuntium,
        negare: monstranda.first((monstrandum) => monstrandum.unicum === 'latinum.negare').nuntium,
        deCrustulis: monstranda.first((monstrandum) => monstrandum.unicum === 'anglicum.deCrustulis').nuntium,
        annuli: {
          quaerere: monstranda.first((monstrandum) => monstrandum.unicum === 'anglici.annuli.quaerere').nuntium,
          numerare: monstranda.first((monstrandum) => monstrandum.unicum === 'anglici.annuli.numerare').nuntium,
          calculare: monstranda.first((monstrandum) => monstrandum.unicum === 'anglici.annuli.calculare').nuntium,
      }
    }
  };

  export default defineComponent({
    components: { draggable, gustulare, calculare, quaerere, numerare },
    data: (): {
      gustulus: Ref<Gustulus | undefined>,
      transduceret: boolean,
      trahens: Ref<boolean>,
      annulus: Ref<string>,
      locutionis: boolean,
      referret: boolean,
      nuntia: Nuntia,
      annuli: Annuli,
    } => {
      return {
        locutionis: locutor.hoc().locutust(),
        transduceret: transduceretne(),
        referret: referretne(),
        trahens: ref(false),
        annulus: ref(''),
        gustulus: ref(),
        nuntia: nuntia,
        annuli: [],
      }
    }, setup () {
      const crustula: Ref<Ignavum<Crustula> | undefined> = ref()

      function interverteFaciem (): void {
        crustula.value?.hoc().facies.interverteUtrum()
        useTheme().global.name.value = crustula.value?.hoc().facies.est('fusca') ? 'dark' : 'light'
      }

      function resepara (valor: string): void {
        crustula.value?.hoc().separator.coquatur(valor)
        document.querySelectorAll('[^id=crustula.separator].text-primary')
          .forEach(element => element.classList.remove('text-primary'))

        const separatoris: Element | null = document.getElementById(`crustula.separator.${valor}`)
        if (separatoris) {
          separatoris.classList.add('text-primary')
        }
      }

      function negavit (): void {
        crustula.value?.hoc().assensus.coquatur('negavit')
        window.location.reload()
      }

      function coquantur (): void {
        if (crustula.value) {
          crustula.value.hoc().assensus.coquatur('assensit')

          crustula.value.hoc().separator.coquatur()
          crustula.value.hoc().apices.coquatur()
          crustula.value.hoc().utendaU.coquatur()
          crustula.value.hoc().magnas.coquatur()
          crustula.value.hoc().facies.coquatur()

          useTheme().global.name.value = 'dark'
          const separatoris: Element | null = document.getElementById('#crustula.separator.inane')
          if (separatoris) {
            separatoris.classList.add('text-primary')
          }

          if (!crustula.value.hoc().lingua.cocutust()) {
            crustula.value.hoc().lingua.coquatur()
          }

          window.location.reload()
        }
      }

      return {
        crustula, interverteFaciem, resepara, negavit, coquantur
      }
    }, methods: {
      async refer (): Promise<void> {
        if (this.referret) {
          await referatur(locutor.hoc().scribantur())
        }
      }, transduc (): void {
        if (this.transduceret) {
          transducatur(locutor.hoc().scribantur())
        }
      }
    }, mounted (): void {
      this.crustula = crustula

      if (this.crustula?.hoc().assensus.est('assensit')) {
        const anglica: boolean = this.crustula.hoc().lingua.est('anglica') ?? false
        document.title = anglica ? nuntia.anglicum.titula : nuntia.latinum.titula
        this.annuli = [
          {
            titula: anglica ? nuntia.anglicum.annuli.quaerere : nuntia.latinum.annuli.quaerere,
            valor: 'quaerere'
          }, {
            titula: anglica ? nuntia.anglicum.annuli.numerare : nuntia.latinum.annuli.numerare,
            valor: 'numerare'
          }, {
            titula: anglica ? nuntia.anglicum.annuli.calculare : nuntia.latinum.annuli.calculare,
            valor: 'calculare'
          }
        ]
      } else {
        document.title = nuntia.latinum.titula
        this.annuli = [
          {
            titula: nuntia.latinum.annuli.quaerere,
            valor: 'quaerere'
          }, {
            titula: nuntia.latinum.annuli.numerare,
            valor: 'numerare'
          }, {
            titula: nuntia.latinum.annuli.calculare,
            valor: 'calculare'
          }
        ]
      }

      this.annulus = this.annuli.first().valor
    }
  })
</script>

<template>
  <template v-if='crustula'>
    <gustulare :gustulus='gustulus' />
    <template v-if="crustula.hoc().assensus.est('assensit')">
      <draggable @start='trahens = true' @end='trahens = false'>
        <v-speed-dial id='crustula' location='bottom center' transition='fade-transition'
                      open-on-click>
          <template #activator='{ props: activator }'>
            <v-fab v-bind='activator' size='medium' icon='cake' />
          </template>
          <v-btn key='lingua' id='crustula.lingua' @click="crustula.hoc().lingua.interverteUtrum()" icon>
            <v-img height='36px' width='36px' :src="`/res/picta/${crustula.hoc().lingua.edatur()}.png`" />
          </v-btn>
          <v-btn key='facies' id='crustula.facies' @click='interverteFaciem()'
                 :icon="`${crustula.hoc().facies.est('fusca') ? 'dark' : 'light'}_mode`" />
          <v-btn key='apices' id='crustula.apices' :text="crustula.hoc().apices.est() ? 'ā' : 'a'"
                 @click='crustula.hoc().apices.interverteUtrum()' />
          <v-btn key='magnas' id='crustula.magnas' :text="crustula.hoc().magnas.est() ? 'A' : 'a'"
                 @click='crustula.hoc().magnas.interverteUtrum()' />
          <v-btn key='utendaU' id='crustula.utendaU' :text="crustula.hoc().utendaU.est() ? 'v' : 'u'"
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
        <v-app-bar-title :text="crustula.hoc().lingua.est('anglica') ? nuntia.anglicum.titula : nuntia.latinum.titula" />
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
            <v-card :text="crustula.hoc().lingua.est('anglica') ? nuntia.anglicum.rogatum : nuntia.latinum.rogatum" />
          </div>
        </template>
        <v-avatar image='https://avatars.githubusercontent.com/u/22331463'>
          <v-hover>
            <template #default='{ isHovering, props }'>
              <a v-if='isHovering' target='_blank'
                 href='https://github.com/hunter-richardson/structorverborum/issues'>
                <v-card v-bind='props'
                        :text="crustula.hoc().lingua.est('anglica') ? nuntia.anglicum.colloqui : nuntia.latinum.colloqui" />
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
                <div id='titulus.latinus'>
                  <v-card :text="nuntia.latinum.titula" />
                </div>
                <v-btn-toggle>
                  <v-btn :text='nuntia.latinum.assentire' id='assentio' append-icon='handshake'
                         @click='coquantur()' />
                  <v-btn :text='nuntia.latinum.negare' id='nego' append-icon='block' @click='negavit()' />
                </v-btn-toggle>
              </v-sheet>
            </v-col>
            <v-col>
              <v-sheet class='pa-1'>
                <div id='titulus.anglicus'>
                  <v-card :text="nuntia.anglicum.titula" />
                </div>
                <v-btn-toggle>
                  <v-btn :text='nuntia.anglicum.assentire' append-icon='handshake'
                         @click="crustula.hoc().lingua.coquatur('anglica') coquantur()" />
                  <v-btn :text='nuntia.anglicum.negare' append-icon='block' @click='negavit()' />
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
