import Gustulus from './gustulus';
import Structor from '../praebeunda/structor';

export function referretne(): boolean
{ return navigator.clipboard !== undefined }

export async function referatur(valor?: string): Promise<Gustulus> {
  if (valor !== undefined) {
    const structor: Structor<Gustulus> = new Structor(Gustulus)
            .ponatur((gustulus) => (gustulus.vita = 3000))
    if (referretne()) {
      await navigator.clipboard.writeText(valor)
      return structor.ponatur((gustulus) => (gustulus.nuntium = 'Locutio referatur'))
                     .ponatur((gustulus) => (gustulus.color = 'green'))
                     .struatur
    } else return structor.ponatur((gustulus) => (gustulus.nuntium = 'Modus referendum non fert'))
                          .ponatur((gustulus) => (gustulus.color = 'red'))
                          .struatur
  } else return new Gustulus
}
