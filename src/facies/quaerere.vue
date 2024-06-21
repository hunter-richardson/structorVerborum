<script lang='ts'>
  import { defineComponent, defineModel } from 'vue';
  import Dictionarium, { type Lemma, type Eventus, type Quaerenda } from '../miscella/dictionarium';
  import { anglicum, categoriae } from '../miscella/enumerationes';
  import inflectere from './inflectere.vue';
  import specere from './specere.vue';
  import loqui from './loqui.vue';
  import Cocutor from '../miscella/cocutor';
  import type { Verbum } from '../praebeunda/verba';
  import type { ModelRef } from 'vue';
  import Gustulus from '../scriptura/gustulus';
  import gustulare from './gustulare.vue';

  const verbum: ModelRef<Verbum | undefined, string> = defineModel<Verbum>('verbum');
  const eventus: ModelRef<Eventus | undefined, string> = defineModel<Eventus>('eventus');

  const lingua: string | undefined = Cocutor.se.ipse().edatur('lingua');
  const dictionarium: Dictionarium = Dictionarium.se.ipse();

  const lemmae: Lemma[] = [];
  const quaerenda: Quaerenda = {
    categoriae: [],
    pars: ''
  };

  export default defineComponent({
    components: {
      gustulare, inflectere, specere, loqui
    },

    data () {
      return {
        gustulus: new Gustulus({}),
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

      async aperi (lemma: Lemma): Promise<void> {
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

<template lang='vue'>
	<gustulare v-model='gustulus' />
  <loqui />
  <template v-if='verbum'>
    <specere v-model='verbum' @blur='verbum = undefined;' />
  </template>
  <template v-else-if='eventus'>
    <inflectere v-model='eventus' @blur='eventus = undefined;' />
  </template>
  <div class='text-center'>
    <v-btn append-icon='search' @click='sarci();' :disabled='onerans'
           id='sarci' :text="anglica ? 'Search' : 'Sarci'" />
  </div>
  <v-data-table :items-per-page='10' :loading='onerans' density='compact' id='tabula' :headers='columnae'>
    <template v-slot:headers='{ headers, isSorted, getSortIcon, toggleSort }'>
      <tr>
        <template v-for='columna in headers.flat()' :key='columna.key'>
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
            <span class='mr-2 cursor-pointer' :id="`ordina_${columna.key}`" @click='toggleSort(columna)' />
          </td>
        </template>
      </tr>
    </template>
    <template v-if='onerans'>
      <v-skeleton-loader :loadingText="anglica ? 'Loading words...' : 'Lemmae onerantur...'"
                         :loading='onerans' type='table-tbody' />
    </template>
    <template v-else v-for='lemma in lemmae' :key='lemma'>
      <tr>
        <td>{{ lemma.categoria }}</td>
      </tr>
      <tr>
        <td>{{ lemma.scriptum }}</td>
      </tr>
      <tr>
        <td>
          <v-btn :text="anglica ? 'Open' : 'Refer'" :disabled='error'
                 id='aperi' append-icon='open_in_full' @click='aperi(lemma);' />
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
