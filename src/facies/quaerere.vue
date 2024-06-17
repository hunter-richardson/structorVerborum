<script lang='ts'>
  import { defineComponent, defineModel } from 'vue';
  import Dictionarium, { type Lemma, type Eventus, type Quaerenda } from '../miscella/dictionarium';
  import { anglicum, categoriae } from '../miscella/enumerationes';
  import Inflectere from './inflectere.vue';
  import Specere from './specere.vue';
  import Loqui from './loqui.vue';
  import Cocutor from '../miscella/cocutor';
  import type { Verbum } from '../praebeunda/verba';

  const dictionarium: Dictionarium = Dictionarium.se.ipse();
  const lingua: string | undefined = Cocutor.se.ipse().edatur('lingua');

  const lemmae: Lemma[] = [];
  const verbum = defineModel<Verbum>('verbum');
  const eventus = defineModel<Eventus>('eventus');
  const quaerenda: Quaerenda = {
    categoriae: [],
    pars: ''
  };

  export default defineComponent({
    data () {
      return {
        anglica: lingua === 'anglica',
        lemmae: lemmae,
        onerans: true,
        error: false,
        verbum: verbum.value,
        eventus: eventus.value,
        quaerenda: quaerenda,
        categoriae: categoriae.map(categoria => {
          return {
            title: (this.anglica ? anglicum(categoria) : categoria).capitalize(),
            value: categoria
          };
        }),

        columnae: [
          {
            latinum: 'lemma',
            anglicum: 'term',
            cultor: (verbum: Verbum, quaerendum: string): boolean => {
              return verbum.scriptum.includes(quaerendum);
            }
          }, {
            latinum: 'categoriae',
            anglicum: 'categories',
            cultor: (verbum: Verbum, selecta: string[]): boolean => {
              return selecta.includes(verbum.categoria);
            }
          }
        ].map(columna => {
          return {
            title: (this.anglica ? columna.anglicum : columna.latinum).capitalize(),
            filter: columna.cultor,
            key: columna.latinum
          };
        }),


        validator: [
          (pars: string): boolean | string => {
            const licta: RegExp = /[āabcdēefghīijklmnōopqrstūuvxȳyz|]/;
            const validum: boolean = licta.test(pars.toLowerCase());
            const error: string = this.anglica ?
              'Only Latin letters allowed' : 'Latinae litterae solae licuntur';
            return validum || error;
          }
        ]
      };
    },

    methods: {
      async sarci (): Promise<void> {
        this.onerans = true;
        this.lemmae = await dictionarium.quaeratur(this.quaerenda);
        return new Promise(() => this.onerans = false);
      },

      async omnes (): Promise<void> {
        this.onerans = true;
        this.quaerenda.categoriae = [];
        this.quaerenda.pars = '';

        this.sarci();
      },

      removeApices (): void {
        if (this.validator[ 0 ](this.quaerenda.pars) === true) {
          this.quaerenda.pars = this.quaerenda.pars.toLowerCase().removeMacra();
          this.error = false;
        } else {
          this.error = true;
        }
      },

      async refer (lemma: Lemma): Promise<void> {
        const eventus: Eventus | null = await dictionarium.referatur(lemma);
        if (eventus) {
          if ([
            'actus', 'adiectiva', 'adverbia',
            'nomen', 'numeramen', 'pronomen'
          ].includes(eventus.categoria)) {
            this.eventus = eventus;
          } else {
            this.verbum = eventus.referendum as Verbum;
          }
        }
      }
    }
  });
</script>

<template>
  <Loqui />
  <template v-if='verbum'>
    <Specere v-model='verbum' @blur='verbum = undefined;' />
  </template>
  <template v-else-if='eventus'>
    <Inflectere v-model='eventus' @blur='eventus = undefined;' />
  </template>
  <div class='text-center'>
    <v-btn append-icon='search' @click='sarci();' :disabled='onerans'
           :text="anglica ? 'Search' : 'Sarci'" />
  </div>
  <v-data-table :items-per-page='10' :loading='onerans' density='compact' :headers='columnae'>
    <template v-slot:headers='{ headers, isSorted, getSortIcon, toggleSort }'>
      <tr>
        <template v-for='columna in columnae' :key='columna.key'>
          <td>
            <template v-if='isSorted(columna)'>
              <v-icon :icon='getSortIcon(columna)' />
            </template>
            <template v-if="columna.key === 'lemma'">
              <v-text-field :label='columna.title' v-model='quaerenda.pars' :disabled='onerans'
                            :loading='onerans' validate-on='input' :rules='validator'
                            id='quaerenda.pars' density='compact' @blur='removeApices();' autofocus
                            flat single-line />
            </template>
            <template v-else-if="columna.key === 'categoriae'">
              <v-select :loading='onerans' density='compact' id='quaerenda.categoriae'
                        v-model='quaerenda.categoriae' :disabled='onerans' :label='columna.title'
                        :items='categoriae' chips flat multiple open-on-clear />
            </template>
            <span class='mr-2 cursor-pointer' @click='() => toggleSort(columna)' />
          </td>
        </template>
      </tr>
    </template>
    <template v-if='onerans'>
      <v-skeleton-loader :loading='onerans' type='table-tbody'
                         :loadingText="anglica ? 'Loading words...' : 'Lemmae onerantur...'" />
    </template>
    <template v-else>
      <template v-for='lemma in lemmae' :key='lemma'>
        <tr>
          <td>{{ lemma.categoria }}</td>
        </tr>
        <tr>
          <td>{{ lemma.scriptum }}</td>
        </tr>
        <tr>
          <td>
            <v-btn :text="anglica ? 'Open' : 'Refer'" :disabled='error' append-icon='open_in_full'
                   @click='refer(lemma);' />
          </td>
        </tr>
      </template>
    </template>
  </v-data-table>
</template>
