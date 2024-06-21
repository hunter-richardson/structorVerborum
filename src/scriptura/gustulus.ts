type Optanda = {
  nuntium?: string;
  vita?: number;
  color?: string;
};

export default class Gustulus {
  readonly nuntium: string;
  readonly vita: number;
  readonly color: string;
  readonly visibile: boolean;

  constructor (optanda: Optanda) {
    const Please = require('pleasejs');

    this.nuntium = optanda.nuntium ?? '';
    this.vita = optanda.vita ?? 0;
    this.color = optanda.color ?? Please.make_color();
    this.visibile = !!optanda.vita && (optanda.vita > 0);
  }
}
