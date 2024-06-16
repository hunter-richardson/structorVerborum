type Optanda = {
  nuntium?: string;
  vita?: number;
  color?: string;
};

export default class Gustularium {
  readonly nuntium: string;
  readonly vita: number;
  readonly color: string;
  readonly visibile: boolean;

  constructor (optanda: Optanda) {
    const make_color = require('@types/pleasej').make_color;

    this.nuntium = optanda.nuntium ?? '';
    this.vita = optanda.vita ?? 0;
    this.color = optanda.color ?? make_color();
    this.visibile = !!optanda.vita && (optanda.vita > 0);
  }
}
