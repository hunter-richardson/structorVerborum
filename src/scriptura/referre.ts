import Gustulus from './gustulus';

export function referretne (): boolean {
  return !!navigator.clipboard;
}

export async function referatur (valor?: string): Promise<Gustulus> {
  if (valor) {
    if (referretne()) {
      await navigator.clipboard.writeText(valor);
      return new Gustulus({
        nuntium: 'Locutio referatur',
        vita: 3000, color: 'green'
      });
    } else {
      return new Gustulus({
        nuntium: 'Modus referendum non fert',
        vita: 3000, color: 'red'
      });
    }
  } else {
    return new Gustulus({});
  }
}
