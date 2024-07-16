<script lang='ts'>
  import { defineComponent, type ComponentOptionsWithoutProps, type Ref, ref } from 'vue';
  import { useTheme } from 'vuetify';
  import draggable from 'vuedraggable';
  import { transducatur, transduceretne } from '../scriptura/transducere';
  import { referretne, referatur } from '../scriptura/referre';
  import Crustula from '../miscella/crustula';
  import quaerere from './quaerere.vue';
  import numerare from './numerare.vue';
  import calculare from './calculare.vue';
  import gustulare from './gustulare.vue';
  import Gustulus from '../scriptura/gustulus';
  import Locutor from '../miscella/locutor';

  type Annuli = {
    titula: string,
    valor: string;
  }[];

  const locutor: Locutor = Locutor.se.ipse();

  const componenta: ComponentOptionsWithoutProps = {
    draggable, gustulare, calculare, quaerere, numerare
  };

  const data = (): {
    gustulus: Ref<Gustulus | undefined>,
    transduceret: boolean,
    trahens: Ref<boolean>,
    annulus: Ref<string>,
    locutionis: boolean,
    referret: boolean,
    annuli: Annuli
  } => {
    return {
      locutionis: locutor.locutust(),
      transduceret: transduceretne(),
      referret: referretne(),
      trahens: ref(false),
      annulus: ref(''),
      gustulus: ref(),
      annuli: []
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    setup () {
      const crustula: Ref<Crustula | undefined> = ref();

      function interverteFaciem (): void {
        crustula.value?.facies.interverteUtrum();
        useTheme().global.name.value = crustula.value?.facies.est('fusca') ? 'dark' : 'light';
      }

      function resepara (valor: string): void {
        crustula.value?.separator.coquatur(valor);
        document.querySelectorAll('[^id=crustula.separator].text-primary')
          .forEach(element => element.classList.remove('text-primary'));

        const separatoris: Element | null = document.getElementById(`crustula.separator.${valor}`);
        if (separatoris) {
          separatoris.classList.add('text-primary');
        }
      }

      function negavit (): void {
        crustula.value?.assensus.coquatur('negavit');
        window.location.reload();
      }

      function coquantur (): void {
        if (crustula.value) {
          crustula.value.assensus.coquatur('assensit');

          crustula.value.separator.coquatur();
          crustula.value.apices.coquatur();
          crustula.value.utendaU.coquatur();
          crustula.value.magnas.coquatur();
          crustula.value.facies.coquatur();

          useTheme().global.name.value = 'dark';
          const separatoris: Element | null = document.getElementById('#crustula.separator.inane');
          if (separatoris) {
            separatoris.classList.add('text-primary');
          }

          if (!crustula.value.lingua.cocutust()) {
            crustula.value.lingua.coquatur();
          }

          window.location.reload();
        }
      }

      return {
        crustula, interverteFaciem, resepara, negavit, coquantur
      };
    },
    methods: {
      async refer (): Promise<void> {
        if (this.referret) {
          await referatur(locutor.scribantur());
        }
      }, transduc (): void {
        if (this.transduceret) {
          transducatur(locutor.scribantur());
        }
      }
    }, mounted (): void {
      this.crustula = Crustula.se.ipse();

      if (this.crustula?.assensus.est('assensit')) {
        const anglica: boolean = this.crustula.lingua.est('anglica') ?? false;
        document.title = anglica ? 'Phrase Factory' : 'Structor Verborum';
        this.annuli = [
          {
            titula: anglica ? 'Search' : 'Quaerere',
            valor: 'quaerere'
          }, {
            titula: anglica ? 'Ennumerate' : 'Numerare',
            valor: 'numerare'
          }, {
            titula: anglica ? 'Calculate' : 'Calculare',
            valor: 'calculare'
          }
        ];
      } else {
        document.title = 'Structor Verborum';
        this.annuli = [
          {
            titula: 'Quaerere',
            valor: 'quaerere'
          }, {
            titula: 'Numerare',
            valor: 'numerare'
          }, {
            titula: 'Calculare',
            valor: 'calculare'
          }
        ];
      }

      this.annulus = this.annuli.first().valor;
    }
  });
</script>

<template lang='vue'>
  <gustulare :gustulus='gustulus' />
  <template v-if="crustula.assensus === 'assensit'">
    <draggable @start='trahens = true' @end='trahens = false'>
      <v-speed-dial id='crustula' location='bottom center' transition='fade-transition' open-on-click>
        <template #activator='{ props: activator }'>
          <v-fab v-bind='activator' size='medium' icon='cake' />
        </template>
        <v-btn key='lingua' id='crustula.lingua' icon
               @click="crustula.lingua.interverteUtrum();" >
          <v-img height='36px' width='36px' :src="`/res/picta/${crustula.lingua.edatur()}.png`" />
        </v-btn>
        <v-btn key='facies' id='crustula.facies'
               :icon="`${crustula.facies.est('fusca') ? 'dark' : 'light'}_mode`"
               @click='interverteFaciem()' />
        <v-btn key='apices' id='crustula.apices'
              :text="crustula.apices.est() ? 'ā' : 'a'"
              @click='crustula.apices.interverteUtrum();' />
        <v-btn key='magnas' id='crustula.magnas'
               :text="crustula.magnas.est() ? 'A' : 'a'"
               @click='crustula.magnas.interverteUtrum();' />
        <v-btn key='utendaU' id='crustula.utendaU'
               :text="crustula.utendaU.est() ? 'v' : 'u'"
               @click='crustula.utendaU.interverteUtrum();' />
        <v-btn key='crustula.separator.inane' text=' _ '
               @click="resepara('inane');"
               id='crustula.separator.inane' />
        <v-btn key='crustula.separator.interpunctum' text=' • '
               @click="resepara('interpunctum');"
               id='crustula.separator.interpunctum' />
        <v-btn key='crustula.separator.nullum' text='   '
               @click="resepara('nullum');"
               id='crustula.separator.nullum' />
      </v-speed-dial>
    </draggable>
  </template>
  <v-card>
    <v-app-bar density='compact' location='top' absolute flat tile>
      <v-app-bar-title text='StructorVerborum' />
      <template v-if='locutionis'>
        <v-card location='right'>
          <template v-if='locutionis'>
            <v-btn-toggle density='compact'>
              <template v-if='referret'>
                <v-btn icon='content_copy' id='refer' @click='refer()' />
              </template>
              <template v-if='transduceret'>
                <v-btn icon='file_open' id='transduc' @click='transduc()' />
              </template>
              </v-btn-toggle>
          </template>
          <v-avatar image='https://avatars.githubusercontent.com/u/22331463'>
            <v-hover>
              <template #default='{ isHovering, props }'>
                <a v-if='isHovering' target='_blank'
                   href='https://github.com/hunter-richardson/structorverborum/issues'>
                  <v-card v-bind='props'
                          :text="crustula.lingua === 'anglica' ? 'Let\'s talk!' : 'Colloquamur'" />
                </a>
              </template>
            </v-hover>
          </v-avatar>
        </v-card>
      </template>
      <template v-else>
        <div id='subiciendum' class='text-center'>
          <v-card :text="lingua === 'anglica' ? 'What would you like to do or say?' : 'Quid agere loquive velles'" />
        </div>
      </template>
    </v-app-bar>
    <v-tabs v-model='annulus.value' align-tabs='center' density='compact' grow hide-slider mandatory>
      <template v-for='annulus in annuli'>
        <v-tab :v-bind:key='annulus' :value='annulus' selected-class='text-primary'
               :id="`annulus_${annulus}`" density='compact' :text='annulus.titula' tile />
      </template>
    </v-tabs>
    <v-tabs-window v-model='annulus.value'>
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
  <template v-if='crustula && !crustula.assensus'>
    <v-footer absolute>
      <div class='text-center'>
        <span class='text-left'>
          <div id='titulus.latinus'>
            Hic crustula utantur ut singulas opteris pro usu tibi, aut crustula condita negare optares et situm immutatum utereris, atque solum crustulum conditum erit renutus eorum.<br><br>Noteris quod crustula plura mutabunt modum pariendo locutionum ergo infidum esset vertere huc illucque.
          </div>
          <v-btn-toggle>
            <v-btn text='Assentio' id='assentio' append-icon='handshake'
                   @click='coquantur();' />
            <v-btn text='Nego' id='nego' append-icon='block'
                   @click='negavit();' />
          </v-btn-toggle>
        </span>
        <span class='text-left'>
          <div id='titulus.anglicus'>
            Here cookies are used so that you may choose details for your own experience. Or you can choose not to store cookies and use the site unchanged; in this case, the only cookie stored would be your refusal of them.<br><br>Note that most of these cookies will modify the method of generating phrases, so switching them back-and-forth between modes will be unreliable.
          </div>
          <v-btn-toggle>
            <v-btn text='Agree' append-icon='handshake'
                   @click="crustula?.lingua.coquatur('anglica');
                           coquantur();" />
            <v-btn text='Refuse' append-icon='block'
                   @click='negavit();' />
          </v-btn-toggle>
        </span>
      </div>
    </v-footer>
  </template>
</template>

<style>
  .v-speed-dial {
    position: absolute;
  }

  .v-btn--floating {
    position: relative;
  }
</style>
