import Gustularium from './gustularium';

export function referretne (): boolean {
  return !!navigator.clipboard;
}
export async function referatur (valor?: string): Promise<Gustularium> {
  if (valor) {
    if (referretne()) {
      await navigator.clipboard.writeText(valor);
      return new Gustularium({
        nuntium: 'Locutio referatur',
        vita: 3000, color: 'green'
      });
    } else {
      return new Gustularium({
        nuntium: 'Modus referendum non fert',
        vita: 3000, color: 'red'
      });
    }
  } else {
    return new Gustularium({});
  }
}
