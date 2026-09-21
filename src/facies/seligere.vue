<script lang='ts'>
  import { defineComponent, defineModel, defineProps, type Ref, ref } from 'vue';
import { crustula } from '../miscella/crustula';
import { anglicum } from '../miscella/enumerationes';
import { Multiplex } from '../praebeunda/verba';

  const multiplicia: Multiplex[] = defineProps<{ multiplicia: Multiplex[] }>().multiplicia

  const seligenda: string[] = [
    ...new Set(multiplicia?.map(multiplex => multiplex.valores()).flat())
  ]

  const selectum: ((selecta: string[]) => Promise<void>) | undefined = defineModel<(selecta: string[]) => Promise<void>>().value
  const anglica: boolean = crustula.hoc().lingua.est('anglica') ?? false

  export default defineComponent({
    components: {},
    data: (): {
      seligenda: string[],
      anglica: boolean
    } => {
      return {
        seligenda: seligenda,
        anglica: anglica
      }
    }, setup () {
      const selecta: Ref<string[]> = ref([])

      async function selige (): Promise<void> { if (selectum) await selectum(selecta.value) }

      return { selecta, selige, anglicum }
    }
  })
</script>

<template>
  <template v-if='seligenda'>
    <div id='colamina'>
        <v-chip-group selected-class='text-primary' v-model='selecta' filter multiple>
          <v-chip v-for='seligendum in seligenda' :key='seligendum' @change='selige()'
                :id="`colamen_${seligendum}`" :text='anglica ? anglicum(seligendum) : seligendum' />
        </v-chip-group>
    </div>
  </template>
</template>
