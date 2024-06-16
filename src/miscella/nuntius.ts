import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { Mensa } from './enumerationes';
import Numeral from './numeral';


const scribatur = (parametra: {
  nomen?: string,
  res: {
    level: string,
    message: string;
  };
}): string => {
  if (parametra.nomen) {
    return `${parametra.nomen} @${Temporis.nunc()} <${parametra.res.level}> ${parametra.res.message}`;
  } else {
    return `@${Temporis.nunc()} <${parametra.res.level}> ${parametra.res.message}`;
  }
};

type Parametra = {
  nomen?: string,
  nuntium?: string,
  error?: Error;
}

export default class Nuntius implements Disposable {
  static morior (parametra: Parametra): void {
    this.timeo(parametra);
    process.abort();
  }

  static timeo (parametra: Parametra): void {
    using nuntius: Nuntius = new Nuntius(parametra.nomen);
    nuntius.nuntio({
      error: parametra.error
    });
  }

  static moneo (parametra: Parametra): void {
    using nuntius: Nuntius = new Nuntius(parametra.nomen);
    nuntius.nuntio({
      gradus: 'warn',
      nuntium: parametra.nuntium
    });
  }

  static noto (parametra: Parametra): void {
    using nuntius: Nuntius = new Nuntius(parametra.nomen);
    nuntius.nuntio({
      gradus: 'info',
      nuntium: parametra.nuntium
    });
  }

  static certioro (parametra: Parametra): void {
    using nuntius: Nuntius = new Nuntius(parametra.nomen);
    nuntius.nuntio({
      gradus: 'http',
      nuntium: parametra.nuntium
    });
  }

  static garrio (parametra: Parametra): void {
    using nuntius: Nuntius = new Nuntius(parametra.nomen);
    nuntius.nuntio({
      gradus: 'verbose',
      nuntium: parametra.nuntium
    });
  }

  static plusGarrio (parametra: Parametra): void {
    using nuntius: Nuntius = new Nuntius(parametra.nomen);
    nuntius.nuntio({
      gradus: 'debug',
      nuntium: parametra.nuntium
    });
  }

  static plurimumGarrio (parametra: Parametra): void {
    using nuntius: Nuntius = new Nuntius(parametra.nomen);
    nuntius.nuntio({
      gradus: 'silly',
      nuntium: parametra.nuntium
    });
  }

  static factum(nomen: string): any {
    return function<Hoc extends { new (...parametra: any[]): object }>(constr: Hoc) {
      return class extends constr {
        constructor(...parametra: any[]) {
          super(...parametra);

          Nuntius.plusGarrio({
            nomen: nomen,
            nuntium: 'Fit'
          });
        }
      }
    }
  }

  static modus(nomen?: string) {
    return function(modus: any, contextus: ClassMethodDecoratorContext) {
      return function (...parametra: any[]) {
        Nuntius.plusGarrio({
          nomen: nomen,
          nuntium: `Initu'st modus ${contextus.name.toString()}`
        });

        const illud = modus(parametra);

        Nuntius.plusGarrio({
          nomen: nomen,
          nuntium: `Exitu'st modus ${contextus.name.toString()}`
        });

        return illud;
      }
    }
  }

  static futurus(nomen?: string) {
    return function(modus: any, contextus: ClassMethodDecoratorContext) {
      return async function (...parametra: any[]) {
        Nuntius.plusGarrio({
          nomen: nomen,
          nuntium: `Initu'st modus ${contextus.name.toString()}`
        });

        const illud = await modus(parametra);

        Nuntius.plusGarrio({
          nomen: nomen,
          nuntium: `Exitu'st modus ${contextus.name.toString()}`
        });

        return illud;
      }
    }
  }

  static finitus(nomen?: string) {
    return function(modus: any, contextus: ClassMethodDecoratorContext) {
      return function (...parametra: any[]) {
        modus(parametra);

        Nuntius.plusGarrio({
          nomen: nomen,
          nuntium: "Finitu'st"
        });
      }
    }
  }

  private readonly _nuntiator: winston.Logger;
  private readonly _mundusEvolendum: boolean = true;
  private readonly _nomen?: string;

  private constructor (nomen?: string) {
    this._nomen = nomen;
    let navigium, forma: any;
    if (this._mundusEvolendum) {
      forma = winston.format.combine(
        winston.format.align(),
        winston.format.cli(),
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.printf(res => scribatur({
          nomen: this._nomen,
          res: res
        }))
      );

      navigium = new winston.transports.Console({
        format: forma
      });
    } else {
      forma = winston.format.combine(
        winston.format.align(),
        winston.format.uncolorize(),
        winston.format.simple(),
        winston.format.printf(res => scribatur({
          nomen: this._nomen,
          res: res
        }))
      );

      navigium = new DailyRotateFile({
        datePattern: '',
        dirname: '../nuntia',
        filename: `StructorVerborum${Temporis.hodie()}.log)`,
        frequency: '1d',
        maxSize: '20m',
        maxFiles: '30d',
        zippedArchive: true
      });

      // navigium.on('new', (hoc: string) => { });
      // navigium.on('rotate', (illud: string, hoc: string) => { });
      // navigium.on('archive', (tabularium: string) => { });
      // navigium.on('logRemoved', (delendum: string) => { });
    }

    this._nuntiator = winston.createLogger({
      exitOnError: this._mundusEvolendum,
      format: forma,
      level: this._mundusEvolendum ? 'debug' : 'error',
      transports: [ navigium ]
    });
  }

  nuntio (parametra: {
    gradus?: string,
    nuntium?: string,
    error?: Error;
  }): void {
    if (parametra.error) {
      this._nuntiator.error(parametra.error);
    } else if (parametra.gradus) {
      this._nuntiator.log(parametra.gradus, parametra.nuntium);
    }
  }

  [ Symbol.dispose ] (): void {
    this._nuntiator.close();
    this._nuntiator.destroy();
  }
}

class Temporis {
  static hodie (): string {
    const hodie: Date = new Date;
    return [
      Numeral.romanus(hodie.getUTCDay()),
      Mensa[ hodie.getUTCMonth() ],
      Numeral.romanus(hodie.getUTCFullYear())
    ].join('');
  }

  static nunc (): string {
    const nunc: Date = new Date;
    return [
      nunc.getUTCHours(),
      nunc.getUTCMinutes(),
      nunc.getUTCSeconds(),
      nunc.getUTCMilliseconds()
    ].map(numerus => Numeral.romanus(numerus))
      .join(':');
  }
}
