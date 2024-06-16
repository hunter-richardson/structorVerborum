import Cocutor from './cocutor';
import Ignavum from './ignavum';
import Nuntius from './nuntius';
import { Verbum } from '../praebeunda/verba';

@Nuntius.factum('Locutor')
export default class Locutor {
  static se: Ignavum<Locutor> = new Ignavum(() => new Locutor);

  private readonly cocutor: Cocutor = Cocutor.se.ipse();

  private _verba: Verbum[];
  private apices?: boolean;
  private utendaU?: boolean;
  private magnas?: boolean;
  private separator?: string;

  constructor () {
    this._verba = [];
    this.veliferum();
  }

  locutust(): boolean {
    return this._verba.length > 0;
  }

  private veliferum(): void {
    this.apices = this.cocutor.est('apices') ?? true;
    this.utendaU = this.cocutor.est('utendaU') ?? true;
    this.magnas = this.cocutor.est('magnas') ?? false;

    switch (this.cocutor.edatur('separator')) {
      case 'interpunctum':
        this.separator = '·';
      case 'nullum':
        this.separator = '';
      default:
        this.separator = ' ';
    }
  }

  get verba (): Verbum[] {
    return this._verba;
  }

  addatur (verbum: Verbum): void {
    const praevium: Verbum = this._verba.last();
    if (praevium.categoria === 'praepositio') {
      verbum.scriptum.startsWithVowel()
      switch (praevium.scriptum) {
        case 'ā':
          if (verbum.scriptum.startsWithVowel()) {
            this.removeatur(praevium.unicum);
            praevium.scriptum = 'ab';
            this.addatur(praevium);
          }
          break;
        case 'ē':
          if (verbum.scriptum.startsWithVowel()) {
            this.removeatur(praevium.unicum);
            praevium.scriptum = 'ex';
            this.addatur(praevium);
          }
          break;
        case 'ab':
          if (verbum.scriptum.startsWithVowel()) {
            this.removeatur(praevium.unicum);
            praevium.scriptum = 'ā';
            this.addatur(praevium);
          }
          break;
        case 'ex':
          if (verbum.scriptum.startsWithVowel()) {
            this.removeatur(praevium.unicum);
            praevium.scriptum = 'ē';
            this.addatur(praevium);
          }
          break;
      }
    }

    this.veliferum();
    if (this.utendaU) {
      if ([
        'Ū', 'U', 'ū', 'u'
      ].some(littera => verbum.scriptum.includes(littera))) {
        verbum.scriptum = verbum.scriptum.replace('Ū', 'V')
        verbum.scriptum = verbum.scriptum.replace('U', 'V')
        verbum.scriptum = verbum.scriptum.replace('ū', 'v')
        verbum.scriptum = verbum.scriptum.replace('u', 'v')
      }
    }

    if (!this.apices) {
      verbum.scriptum = verbum.scriptum.removeMacra();
    }

    this._verba.push(verbum);
  }

  loquitur(unicum: symbol): boolean {
    return this.verba.some(verbum => verbum.unicum === unicum);
  }

  removeatur (unicum: symbol): string {
    this._verba = this._verba.filter(verba => verba.unicum !== unicum);
    return this.scribantur();
  }

  scribantur (): string {
    this.veliferum();
    const locutio: string = this.verba.map(verba => verba.scriptum)
            .join(this.separator);
    if (this.magnas) {
      return locutio.toUpperCase();
    } else {
      return locutio.capitalize();
    }
  }
}
