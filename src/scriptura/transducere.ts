import { NewTabOpener } from 'new-tab-opener';

export function transduceretne(): boolean {
  //  eslint-disable-next-line no-extra-boolean-cast
  try { return !!new Blob }
  catch { return false }
}

export function transducatur(locutio: string): void {
  if (transduceretne()) (new NewTabOpener).open(URL.createObjectURL(new Blob([locutio], { type: 'text/plaincharset=utf-8' })))
}
