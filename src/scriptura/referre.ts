import Gustulus from './gustulus';
import Structor from '../praebeunda/structor';

export function referretne(): boolean {
  return !!navigator.clipboard
}

export async function referatur(valor?: string): Promise<Gustulus> {
  if (valor) {
    if (referretne()) {
      await navigator.clipboard.writeText(valor)
      return new Structor(Gustulus)
                   .ponatur((gustulus) => (gustulus.nuntium = 'Locutio referatur'))
                   .ponatur((gustulus) => (gustulus.vita = 3000))
                   .ponatur((gustulus) => (gustulus.color = 'green'))
                   .struatur()
    } else return new Structor(Gustulus)
                        .ponatur((gustulus) => (gustulus.nuntium = 'Modus referendum non fert'))
                        .ponatur((gustulus) => (gustulus.vita = 3000))
                        .ponatur((gustulus) => (gustulus.color = 'red'))
                        .struatur()
  } else return new Gustulus
}
