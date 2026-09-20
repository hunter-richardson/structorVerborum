<script lang="ts">
  import { computed, defineComponent } from 'vue';
import { useRoute } from 'vuetify/lib/composables/router.mjs';
import { crustula } from '../miscella/crustula';
import { monstrator, type Monstranda } from '../miscella/monstrator';
import Nuntius from '../miscella/nuntius';

  const via = useRoute()
  const nomen: string = (computed(() => via.value) as unknown) as string
  const monstranda: Monstranda = await monstrator.hoc().monstrentur(nomen)

  type Nuntium = {
    nuntium: string,
    titula: string,
    caput: string,
    actum: string
  }

  type Nuntia = {
    latinum: Nuntium,
    anglicum: Nuntium
  }

  const nuntia: Nuntia = {
    latinum: {
      nuntium: monstranda.first((monstrandum) => monstrandum.unicum === 'latinum.nuntium').nuntium,
      titula: monstranda.first((monstrandum) => monstrandum.unicum === 'latina.titula').nuntium,
      caput: monstranda.first((monstrandum) => monstrandum.unicum === 'latinum.caput').nuntium,
      actum: monstranda.first((monstrandum) => monstrandum.unicum === 'latinum.actum').nuntium
    }, anglicum: {
      nuntium: monstranda.first((monstrandum) => monstrandum.unicum === 'anglicum.nuntium').nuntium,
      titula: monstranda.first((monstrandum) => monstrandum.unicum === 'anglica.titula').nuntium,
      caput: monstranda.first((monstrandum) => monstrandum.unicum === 'anglicum.caput').nuntium,
      actum: monstranda.first((monstrandum) => monstrandum.unicum === 'anglicum.actum').nuntium
    }
  }

  export default defineComponent({
    data: (): {
      historia: History,
      anglica: boolean,
      nuntia: Nuntia
    } => {
      return {
        anglica: crustula.hoc().lingua.est('anglica') ?? false,
        historia: history,
        nuntia: nuntia
      }
    }, mounted (): void {
      if ([ location.href, location.href !== '404' ].all()) {
        Nuntius.timeo({
          nomen: '404.vue',
          error: new Error(`CDIV loco ${location.href} effectu'st`)
        })
      }
    }
  })
</script>

<template>
  <v-app>
    <v-container>
      <v-empty-state :text="anglica ? nuntia.anglicum.nuntium : nuntia.latinum.nuntium"
                     :title="anglica ? nuntia.anglicum.titula : nuntia.latinum.titula"
                     :headline="anglica ? nuntia.anglicum.caput : nuntia.latinum.caput"
                     @click:action='historia.back()' image='/res/picta/latina.png'
                     :actionText="anglica ? nuntia.anglicum.actum : nuntia.latinum.actum"
                     icon='arrow_back' />
    </v-container>
  </v-app>
</template>
