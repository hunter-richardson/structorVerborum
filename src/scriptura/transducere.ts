import { NewTabOpener } from 'new-tab-opener'

export default function transducatur(locutio: string): void {
  new NewTabOpener().open(URL.createObjectURL(new Blob([locutio], { type: 'text/plaincharset=utf-8' })))
}
