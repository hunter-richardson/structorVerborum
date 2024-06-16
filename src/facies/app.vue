<script lang='ts'>
  import { useTheme } from 'vuetify';
  import { defineComponent } from 'vue';
  import { referretne, referatur } from '../scriptura/referre';
  import Quaerere from './quaerere.vue';
  import Numerare from './numerare.vue';
  import Calculare from './calculare.vue';
  import Cocutor, { type Crustulum } from '../miscella/cocutor';
  import Locutor from '../miscella/locutor';

  const locutor: Locutor = Locutor.se.ipse();
  const cocutor: Cocutor = Cocutor.se.ipse();
  const crustula = {
    assensus: '',
    facies: '',
    lingua: '',
    apices: '',
    utendaU: '',
    magnas: '',
    separator: ''
  };

  export default defineComponent({
    data () {
      return {
        annulus: '',
        titulus: { latinus: '', anglicus: '' },
        locutionis: referretne() && locutor.locutust(),
        crustula: crustula,

        annuli: [
          {
            titula: crustula.lingua === 'anglica' ? 'Search' : 'Quaerere',
            valor: 'quaerere'
          }, {
            titula: crustula.lingua === 'anglica' ? 'Ennumerate' : 'Numerare',
            valor: 'numerare'
          }, {
            titula: crustula.lingua === 'anglica' ? 'Calculate' : 'Calculare',
            valor: 'calculare'
          },
        ]
      };
    },

    methods: {
      refer (): void {
        if (referretne()) {
          referatur(locutor.scribantur());
        }
      },

      coquantur (): void {
        this.coque({
          nomen: 'assensus',
          valor: 'assensit'
        });

        this.coque({
          nomen: 'facies',
          valor: 'fuscum'
        });

        this.coque({
          nomen: 'lingua',
          valor: 'latina'
        });

        this.coque({
          nomen: 'apices',
          valor: 'ita'
        });

        this.coque({
          nomen: 'utendaU',
          valor: 'ita'
        });

        this.coque({
          nomen: 'magnas',
          valor: 'non'
        });

        this.coque({
          nomen: 'separator',
          valor: 'inane'
        });

        window.location.reload();
      },

      coque (crustulum: Crustulum): void {
        cocutor.coquatur(crustulum);
        switch (crustulum.nomen) {
          case 'facies':
            this.crustula.facies = crustulum.valor;
            if (this.crustula.facies === 'illustre') {
              useTheme().global.name.value = 'light';
            } else {
              useTheme().global.name.value = 'dark';
            }
            break;
          case 'apices':
            this.crustula.apices = crustulum.valor;
            break;
          case 'magnas':
            this.crustula.magnas = crustulum.valor;
            break;
          case 'lingua':
            this.crustula.lingua = crustulum.valor;
            break;
          case 'utendaU':
            this.crustula.utendaU = crustulum.valor;
            break;
        }
      }
    },

    async mounted (): Promise<void> {
      if (cocutor.edatur('assensus') === 'assensit') {
        this.crustula = {
          assensus: cocutor.edatur('assensus') ?? 'assensit',
          facies: cocutor.edatur('facies') ?? 'fuscum',
          apices: cocutor.edatur('apices') ?? 'ita',
          magnas: cocutor.edatur('magnas') ?? 'non',
          lingua: cocutor.edatur('lingua') ?? 'latinum',
          utendaU: cocutor.edatur('utendaU') ?? 'ita',
          separator: cocutor.edatur('separator') ?? 'inane'
        };
      }
    }
  });
</script>

<template>
  <template v-if="crustula.assensus === 'assensit'">
    <v-speed-dial id='crustula' location='bottom center' transition='fade-transition' open-on-click>
      <template v-slot:activator='{ props: activator }'>
        <v-fab v-bind='activator' size='medium' icon='cake' />
      </template>
      <v-fab key='facies' :icon="crustula.facies === 'fuscum' ? 'light_mode' : 'dark_mode'" @click="coque({
        nomen: 'facies',
        valor: crustula.facies === 'fuscum' ? 'fuscum' : 'illustre'
      });" />
      <v-fab key='apices' :text="crustula.apices === 'ita' ? 'ā' : 'a'" @click="coque({
        nomen: 'apices',
        valor: crustula.apices === 'ita' ? 'non' : 'ita'
      });" />
      <v-fab key='magnae' :text="crustula.magnas === 'ita' ? 'A' : 'a'" @click="coque({
        nomen: 'magnas',
        valor: crustula.magnas === 'ita' ? 'non' : 'ita'
      });" />
      <v-fab key='utendaU' :text="crustula.utendaU === 'ita' ? 'v' : 'u'" @click="coque({
        nomen: 'utendaU',
        valor: crustula.utendaU === 'ita' ? 'non' : 'ita'
      });" />
      <v-btn-toggle key='separator'>
        <v-btn @click="coque({
          nomen: 'separator',
          valor: 'inane'
        });" text=' _ ' />
        <v-btn @click="coque({
          nomen: 'separator',
          valor: 'interpunctum'
        });" text=' · ' />
        <v-btn @click="coque({
          nomen: 'separator',
          valor: 'nullum'
        });" text='   ' />
      </v-btn-toggle>
    </v-speed-dial>
  </template>
  <v-card>
    <v-app-bar density='compact' location='top' absolute flat tile>
      <v-app-bar-title text='StructorVerborum' />
      <v-card location='left'>
        <template v-if='locutionis'>
          <v-btn icon='content_copy' @click='refer()' />
        </template>
        <v-avatar image='https://avatars.githubusercontent.com/u/22331463'>
          <v-hover>
            <template v-slot:default='{ isHovering, props }'>
              <a v-if='isHovering' target='_blank'
                 href='https://github.com/hunter-richardson/structorverborum/issues'>
                <v-card v-bind='props'
                        :text="crustula.lingua === 'anglica' ? 'Let\'s talk!' : 'Colloquamur mihi'" />
              </a>
            </template>
          </v-hover>
        </v-avatar>
      </v-card>
    </v-app-bar>
    <v-tabs v-model='annulus' align-tabs='center' density='compact' grow hide-slider mandatory>
      <template v-for='annulus in annuli'>
        <v-tab :value='annulus' selected-class='text-primary' density='compact'
               :text='annulus.titula' tile />
      </template>
    </v-tabs>
    <v-tabs-window v-model='annulus'>
      <v-tabs-window-item value='quaerere'>
        <Quaerere />
      </v-tabs-window-item>
      <v-tabs-window-item value='numerare'>
        <Numerare />
      </v-tabs-window-item>
      <v-tabs-window-item value='calculare'>
        <Calculare />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
  <template v-if='!crustula.assensus'>
    <v-footer absolute>
      <div class='text-center'>
        <span class='text-left'>
          Hic crustula utantur ut singulas pro usu tibi opteris, aut crustula condita negare optares
          et situm immutatum utereris, atque solum crustulum conditum erit renutus eorum.
          <v-btn-toggle>
            <v-btn text='Assentio' append-icon='handshake' @click="coque({
              nomen: 'assensus',
              valor: 'assensit'
            });" />
            <v-btn text='Nego' append-icon='block' @click="coque({
              nomen: 'assessus',
              valor: 'negavit'
            });" />
          </v-btn-toggle>
        </span>
        <span class='text-left'>
          Here cookies are used so that you may choose details for your own experience. Or you can
          choose not to store cookies and use the site unchanged; in this case, the only cookie
          stored would be your refusal of them.
          <v-btn-toggle>
            <v-btn text='Agree' append-icon='handshake' @click="coque({
              nomen: 'assensus',
              valor: 'assensit'
            });" />
            <v-btn text='Refuse' append-icon='block' @click="coque({
              nomen: 'assessus',
              valor: 'negavit'
            });" />
          </v-btn-toggle>
        </span>
      </div>
    </v-footer>
  </template>
</template>
