<script lang='ts'>
  import { defineComponent, defineModel, type ComponentOptionsWithoutProps } from 'vue';
  import inflectere from './inflectere.vue';
  import specere from './specere.vue';
  import loqui from './loqui.vue';
  import onerare from './onerare.vue'
  import gustulare from './gustulare.vue';
  import Gustulus from '../scriptura/gustulus';
  import Dictionarium, { type Lemma, type Eventus, type Quaerenda } from '../miscella/dictionarium';
  import { anglicum, categoriae, inflectenda } from '../miscella/enumerationes';
  import Crustula from '../miscella/crustula';
  import type { Verbum } from '../praebeunda/verba';

  type Columnae = {
    title: string,
    key: string,
    filter: ((verbum: Verbum, quaerendum: any) => boolean);
  }[];

  const eventus: Eventus | undefined = defineModel<Eventus>('eventus').value;
  const verbum: Verbum | undefined = defineModel<Verbum>('verbum').value;

  const anglica: boolean = Crustula.se.ipse().lingua.est('anglica') ?? false;
  const dictionarium: Dictionarium = Dictionarium.se.ipse();

  const lemmae: Lemma[] = [];
  const quaerenda: Quaerenda = {
    categoriae: [],
    pars: ''
  };

  const Categoriae: {
    title: string,
    value: string
  }[] = categoriae.map(categoria => {
    return {
      title: (anglica ? anglicum(categoria) : categoria).capitalize(),
      value: categoria
    };
  });

  const columnae: Columnae = [
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
      title: (anglica ? columna.anglicum : columna.latinum).capitalize(),
      filter: columna.cultor,
      key: columna.latinum
    };
  });

  const validator: ((pars: string) => boolean | string)[] = [
    (pars: string): boolean | string => {
      const licta: RegExp = /[āabcdēefghīijklmnōopqrstūuvxȳyz|]/;
      const validum: boolean = licta.test(pars.toLowerCase());
      const error: string = anglica ?
        'Only Latin letters allowed' : 'Latinae litterae solae licuntur';
      return validum || error;
    }
  ];

  const componenta: ComponentOptionsWithoutProps = {
    'inflectere': inflectere,
    'gustulare': gustulare,
    'onerare': onerare,
    'specere': specere,
    'loqui': loqui
  };

  const data = (): {
    validator: ((pars: string) => boolean | string)[],
    eventus: Eventus | undefined,
    verbum: Verbum | undefined,
    quaerenda: Quaerenda,
    gustulus: Gustulus,
    columnae: Columnae,
    onerans: boolean,
    anglica: boolean,
    lemmae: Lemma[],
    error: boolean,
    categoriae: {
      title: string,
      value: string;
    }[];
  } => {
    return {
      gustulus: new Gustulus({}),
      anglica: anglica,
      lemmae: lemmae,
      onerans: true,
      error: false,
      verbum: verbum,
      eventus: eventus,
      quaerenda: quaerenda,
      categoriae: Categoriae,
      columnae: columnae,
      validator: validator
    };
  };

  export default defineComponent({
    components: componenta, data: data,
    methods: {
      async oneratust(): Promise<void> {
        return new Promise(() => this.onerans = false);
      }, async sarci (): Promise<void> {
        this.onerans = true;
        this.lemmae = await dictionarium.quaeratur(this.quaerenda);
        return this.oneratust();
      }, async forsSeligat(): Promise<void> {
        this.onerans = true;
        const eventus: Eventus = await dictionarium.forsReferatur(this.quaerenda);
        if (inflectenda(eventus.categoria)) {
          this.eventus = eventus;
        } else {
          this.verbum = eventus.referendum as Verbum ?? undefined;
        }

        return this.oneratust();
      }, async omnes (): Promise<void> {
        this.onerans = true;
        this.quaerenda.categoriae = [];
        this.quaerenda.pars = '';

        this.sarci();
      }, removeApices (): void {
        if (this.validator[ 0 ](this.quaerenda.pars) === true) {
          this.quaerenda.pars = this.quaerenda.pars.toLowerCase().removeMacra();
          this.error = false;
        } else {
          this.error = true;
        }
      }, async aperi (lemma: Lemma): Promise<void> {
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
	<gustulare :gustulus='gustulus' />
  <loqui />
  <template v-if='verbum'>
    <specere :verbum='verbum' @blur='verbum = undefined;' />
  </template>
  <template v-else-if='eventus'>
    <inflectere :eventus='eventus as Eventus' @blur='eventus = undefined;' />
  </template>
  <div class='text-center'>
    <v-btn append-icon='search' @click='sarci();' :disabled='onerans'
           id='sarci' :text="anglica ? 'Search' : 'Sarci'" />
    <v-btn append-icon='casino' @click='forsSeligat();' :disabled='onerans'
           id='fortuna' :text="anglica ? 'I\'m feeling Lucky' : 'Fors Seligat'" />
  </div>
  <v-data-table :items-per-page='10' :loading='onerans' density='compact' id='tabula' :headers='columnae'>
    <template #headers='{ headers, isSorted, getSortIcon, toggleSort }'>
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
    <onerare :onerans='onerare' pittacium='lemmae' />
    <template v-if='~!onerare' v-for='lemma in lemmae' :key='lemma'>
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
