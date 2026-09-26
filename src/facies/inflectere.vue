<script setup lang='ts'>
  import { defineModel } from 'vue';
import type { Mantela } from '../anomala/anomala';
import { type Eventus } from '../miscella/dictionarium';
import type { categoria } from '../miscella/enumerationes';
import type {
  ActusAgendus, AdiectivumAgendum, AdverbiumAgendum,
  Incomparabile, NomenAgendum, NumeramenAgendum
} from '../praebeunda/agenda';
import { type Referendum } from '../praebeunda/interfecta';
import type { Pronomen } from '../praebeunda/verba';
import actuum from './tabulam/actuum.vue';
import adiectivorum from './tabulam/adiectivorum.vue';
import nominum from './tabulam/nominum.vue';
import numeraminum from './tabulam/numeraminum.vue';

  const eventus: Eventus = defineModel<Eventus | undefined>('eventus')

  const categoria: categoria = eventus.categoria
  let referendum: Referendum | undefined = eventus as Referendum
</script>

<template>
  <template v-if='referendum'>
    <v-dialog @blur='referendum = undefined; eventus = undefined'>
      <actuum v-if="categoria === 'actus'"
              :agendum='referendum as ActusAgendus' />
      <nominum v-else-if="categoria === 'nomen'"
               :agendum='referendum as NomenAgendum' />
      <numeraminum v-else-if="categoria === 'numeramen'"
                   :agendum='referendum as NumeramenAgendum' />
      <adiectivorum v-else-if="categoria === 'adiectivum'"
                    :agendum='referendum as AdiectivumAgendum | Incomparabile' />
      <tabulare v-else-if="/^(adverium|pronomen)$/.test(categoria)"
                :agendum='referendum as AdverbiumAgendum | Mantela<Pronomen>'
                :categoria='categoria' />
      <template v-else><div /></template>
    </v-dialog>
  </template>
</template>
