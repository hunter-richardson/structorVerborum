import { NewTabOpener } from 'new-tab-opener';

export function transduceretne(): boolean
{ return typeof Blob !== 'undefined' }

export function transducatur(locutio: string): void {
  if (transduceretne()) (new NewTabOpener)
      .open(URL.createObjectURL(new Blob([locutio],
            { type: 'text/plaincharset=utf-8' })))
}
