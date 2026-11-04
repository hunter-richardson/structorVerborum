<script setup lang="ts">
  import { ref, type Ref } from 'vue'
  import draggable from 'vue-draggable-next'
  import dominus from '@/miscella/dominus'

  const trahens: Ref<boolean> = ref(false)

  const separatores: string[] = Object.keys(dominus.separatores)
  const vexilla: string[] = ['apices', 'magnas', 'utendaU']
  const assentienda = [
    {
      notendum: 'assentio',
      videndum: 'handshake',
      clavis: 'assentire',
      massa: 'assensit'
    },
    {
      notendum: 'nego',
      videndum: 'block',
      clavis: 'negare',
      massa: 'negavit'
    }
  ]

  const linguae = [
    {
      lingua: 'latina',
      titula: 'latinus',
      imminutum: 'la'
    },
    {
      lingua: 'anglica',
      titula: 'anglicus',
      imminutum: 'en'
    }
  ]
</script>

<template>
  <template v-if="dominus.assensus.signum === true">
    <draggable @start="trahens = true" @end="trahens = false">
      <v-speed-dial id="crustula" transition="fade-transition" location="bottom center" open-on-click>
        <template #activator="{ props: activator }">
          <v-fab v-bind="activator" size="medium" icon="cake" />
        </template>
        <v-btn id="crustula.lingua" key="lingua" icon @click="dominus.lingua.interverteUtrum()">
          <v-img height="36px" width="36px" :src="dominus.lingua.scriptum" />
        </v-btn>
        <v-btn id="crustula.facies" :icon="dominus.facies.scriptum" @click="dominus.facies.interverteUtrum()" />
        <v-btn v-for="vexillum in vexilla" :id="`crustula.${vexillum}`" :key="vexillum" :text="`dominus.hoc[${vexillum}].scribatur()`" @click="`dominus.hoc[${vexillum}].interverteUtrum()`" />
        <v-btn v-for="separator in separatores" :id="`crustula.separator.${separator}`" :key="separator" :text="`dominus.separatores[${separator}]`" @click="`dominus.separator.massa = ${separator}`" />
      </v-speed-dial>
    </draggable>
  </template>
  <template v-else-if="dominus.assensus.inhaesast === undefined">
    <v-footer absolute>
      <v-container>
        <v-row no-gutters>
          <v-col v-for="lingua in linguae" :key="lingua.imminutum">
            <v-sheet class="pa-1">
              <div id="`titulus.${lingua.titulus}`">
                {{ $t(`scripta.appositus.deCrustulis`, { lng: lingua.imminutum }) }}
              </div>
              <v-btn-toggle>
                <v-btn v-for="assentiendum in assentienda" :id="`crustula.${assentiendum.notendum}.${lingua.lingua}`" :key="`${assentiendum.clavis}.${lingua.lingua}`" :append-icon="assentiendum.videndum" :text="$t(`annuli.appositus.${assentiendum.notendum}`, { lng: lingua.imminutum })" @click="dominus.assensus.massa = assentiendum.massa" />
              </v-btn-toggle>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </template>
</template>

<style scoped>
  .v-btn--floating {
    position: relative;
  }
</style>
