import { NewTabOpener } from 'new-tab-opener';

export function transduceretne(): boolean {
  try {
    return !!new Blob;
  } catch {
    return false;
  }
}

export function transducatur(locutio: string): void {
  if (transduceretne()) {
    (new NewTabOpener).open(
      URL.createObjectURL(
        new Blob([locutio], {
          type: 'text/plain;charset=utf-8'
        })
      )
    );
  }
}
