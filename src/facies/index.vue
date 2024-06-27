<script lang='ts'>
  import { useTheme } from 'vuetify';
  import { defineComponent, type ComponentOptionsWithoutProps } from 'vue';
  import { transducatur, transduceretne } from '../scriptura/transducere';
  import { referretne, referatur } from '../scriptura/referre';
  import Cocutor, { type Crustulum } from '../miscella/cocutor';
  import quaerere from './quaerere.vue';
  import numerare from './numerare.vue';
  import calculare from './calculare.vue';
  import gustulare from './gustulare.vue';
  import Gustulus from '../scriptura/gustulus';
  import Locutor from '../miscella/locutor';
  import { Component } from 'node_modules/typedoc/dist/lib/utils';

  type Crustula = {
    assensus: string,
    facies: string,
    lingua: string,
    apices: string,
    utendaU: string,
    magnas: string,
    separator: string;
  };

  type Separatores = {
    clavis: string,
    valor: string;
  }[];

  type Annuli = {
    titula: string,
    valor: string;
  }[];

  const locutor: Locutor = Locutor.se.ipse();
  const cocutor: Cocutor = Cocutor.se.ipse();
  const crustula: Crustula = {
    assensus: '',
    facies: '',
    lingua: '',
    apices: '',
    utendaU: '',
    magnas: '',
    separator: ''
  };

  const separatores: {
    clavis: string,
    valor: string;
  }[] = [
      {
        clavis: 'inane',
        valor: '_'
      }, {
        clavis: 'interpunctum',
        valor: '·'
      }, {
        clavis: 'nullum',
        valor: ' '
      },
    ];

  const componenta = {
    'gustulare': gustulare,
    'calculare': calculare,
    'quaerere': quaerere,
    'numerare': numerare
  };

  const data = (): {
    name: string,
    gustulus: Gustulus,
    locutionis: boolean,
    referret: boolean,
    transduceret: boolean,
    crustula: Crustula,
    separatores: Separatores,
    annuli: Annuli,
    annulus: string;
  } => {
    return {
      name: crustula.lingua === 'anglica' ? 'Phrase Factory' : 'Structor Verborum',
      gustulus: new Gustulus({}),
      locutionis: locutor.locutust(),
      referret: referretne(),
      transduceret: transduceretne(),
      separatores: separatores,
      crustula: crustula,
      annuli: [],
      annulus: ''
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    methods: {
      async refer (): Promise<void> {
        if (this.referret) {
          await referatur(locutor.scribantur());
        }
      }, transduc (): void {
        if (this.transduceret) {
          transducatur(locutor.scribantur());
        }
      }, coque (crustulum: Crustulum): void {
        cocutor.coquatur(crustulum);
        switch (crustulum.nomen) {
          case 'facies':
            this.crustula.facies = crustulum.valor;
            if (this.crustula.facies === 'illustris') {
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
      }, coquantur (): void {
        this.coque({
          nomen: 'assensus',
          valor: 'assensit'
        });

        this.coque({
          nomen: 'facies',
          valor: 'fusca'
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
      }
    }, async mounted (): Promise<void> {
      document.title = this.name;
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

        const anglica: boolean = this.crustula.lingua === 'anglica';
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
      }
    }
  });
</script>

<template lang='vue'>
	<gustulare :gustulus='gustulus' />
  <template v-if="crustula.assensus === 'assensit'">
    <v-speed-dial id='crustula' location='bottom center' transition='fade-transition' open-on-click>
      <template #activator='{ props: activator }'>
        <v-fab v-bind='activator' size='medium' icon='cake' />
      </template>
      <v-fab key='facies' id='crustula.facies'
             :icon="crustula.facies === 'fusca' ? 'light_mode' : 'dark_mode'"
             @click="coque({ nomen: 'facies', valor: crustula.facies === 'fusca' ? 'illustris' : 'fusca' });" />
      <v-fab key='apices' id='crustula.apices'
             :text="crustula.apices === 'ita' ? 'ā' : 'a'"
             @click="coque({ nomen: 'apices', valor: crustula.apices === 'ita' ? 'non' : 'ita' });" />
      <v-fab key='magnas' id='crustula.magnas'
             :text="crustula.magnas === 'ita' ? 'A' : 'a'"
             @click="coque({ nomen: 'magnas', valor: crustula.magnas === 'ita' ? 'non' : 'ita' });" />
      <v-fab key='utendaU' id='crustula.utendaU'
             :text="crustula.utendaU === 'ita' ? 'v' : 'u'"
             @click="coque({ nomen: 'utendaU', valor: crustula.utendaU === 'ita' ? 'non' : 'ita' });" />
      <v-btn-toggle key='separator'>
        <v-btn v-for='separator in separatores' :key='separator'
               @click="coque({ nomen: 'separator', valor: separator.clavis })"
               :text="` ${separator.valor} `" :id="`crustula.separator.${separator.clavis}`"
               selected-class='text-primary' />
      </v-btn-toggle>
    </v-speed-dial>
  </template>
  <v-card>
    <v-app-bar density='compact' location='top' absolute flat tile>
      <v-app-bar-title text='StructorVerborum' />
      <template v-if='!locutionis'>
        <div id='subiciendum' class='text-center'>
          <v-card :text="lingua === 'anglica' ? 'What would you like to do or say?' : 'Quid agere loquive velles'" />
        </div>
      </template>
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
    </v-app-bar>
    <v-tabs v-model='annulus' align-tabs='center' density='compact' grow hide-slider mandatory>
      <template v-for='annulus in annuli'>
        <v-tab :v-bind:key='annulus' :value='annulus' selected-class='text-primary'
               :id="`annulus_${annulus}`" density='compact' :text='annulus.titula' tile />
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
  <template v-if='!crustula.assensus'>
    <v-footer absolute>
      <div class='text-center'>
        <span class='text-left'>
          <div id='titulus.latinus'>
            Hic crustula utantur ut singulas opteris pro usu tibi, aut crustula condita negare
            optares et situm immutatum utereris, atque solum crustulum conditum erit renutus
            eorum.<br><br>Noteris quod crustula plura mutabunt modum pariendo locutionum ergo
            infidum esset vertere huc illucque.
          </div>
          <v-btn-toggle>
            <v-btn text='Assentio' id='assentio' append-icon='handshake'
                   @click="coque({ nomen: 'assensus', valor: 'assensit' });" />
            <v-btn text='Nego' id='nego' append-icon='block'
                   @click="coque({ nomen: 'assessus', valor: 'negavit' });" />
          </v-btn-toggle>
        </span>
        <span class='text-left'>
          <div id='titulus.anglicus'>
            Here cookies are used so that you may choose details for your own experience. Or you can
            choose not to store cookies and use the site unchanged; in this case, the only cookie
            stored would be your refusal of them.<br><br>Note that most of these cookies will modify
            the method of generating phrases, so switching them back-and-forth between modes will be
            unreliable.
          </div>
          <v-btn-toggle>
            <v-btn text='Agree' append-icon='handshake'
                   @click="coque({ nomen: 'assensus', valor: 'assensit' });
                           coque({ nomen: 'lingua', valor: 'anglica' });" />
            <v-btn text='Refuse' append-icon='block'
                   @click="coque({ nomen: 'assessus', valor: 'negavit' });" />
          </v-btn-toggle>
        </span>
      </div>
    </v-footer>
  </template>
</template>
