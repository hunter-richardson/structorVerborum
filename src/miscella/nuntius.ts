import { makeDirectorySync } from 'make-dir';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import Numerator from './numerator';
import { Mensa } from '../praebeunda/valores';
import { type TransformableInfo } from 'logform'

function scribatur(parametra: TransformableInfo & { nomen?: string }): string {
  const inhaesum: string = `@${Temporis.nunc()} <${parametra.level}> ${parametra.message}`
  return parametra.nomen ? `${parametra.nomen} ${inhaesum}` : inhaesum
}

interface Parametra {
  error?: Error
  nomen?: string
  nuntium?: string
}

export default class Nuntius implements Disposable {
  static morior(parametra: Parametra): void {
    this.timeo(parametra)
    process.abort()
  }

  static timeo(parametra: Parametra): void {
    new Nuntius(parametra.nomen).nuntio({
      error: parametra.error,
      nuntium: parametra.nuntium
    })
  }

  static moneo(parametra: Parametra): void {
    new Nuntius(parametra.nomen).nuntio({
      gradus: 'warn',
      nuntium: parametra.nuntium
    })
  }

  static noto(parametra: Parametra): void {
    new Nuntius(parametra.nomen).nuntio({
      gradus: 'info',
      nuntium: parametra.nuntium
    })
  }

  static certioro(parametra: Parametra): void {
    new Nuntius(parametra.nomen).nuntio({
      gradus: 'http',
      nuntium: parametra.nuntium
    })
  }

  static garrio(parametra: Parametra): void {
    new Nuntius(parametra.nomen).nuntio({
      gradus: 'verbose',
      nuntium: parametra.nuntium
    })
  }

  static plusGarrio(parametra: Parametra): void {
    new Nuntius(parametra.nomen).nuntio({
      gradus: 'debug',
      nuntium: parametra.nuntium
    })
  }

  static plurimumGarrio(parametra: Parametra): void {
    new Nuntius(parametra.nomen).nuntio({
      gradus: 'silly',
      nuntium: parametra.nuntium
    })
  }

  static positor<Hoc, Valor extends any> (
      positor: (this: Hoc, valor: Valor) => void,
      contextus: ClassSetterDecoratorContext<Hoc, Valor>) {
    return function (this: Hoc, valor: Valor) {
      Nuntius.noto({
        nomen: (this as any).constructor.name.toLowerCase(),
        nuntium: `Initu'st positor ${contextus.name.toString()}`
      }); try { positor.call(this, valor) }
      catch(error) {
        Nuntius.timeo({
          nomen: (this as any).constructor.name.toLowerCase(),
          nuntium: `Invenit positor ${contextus.name.toString()} errorem ${error}`
        }); throw error
      } Nuntius.noto({
        nomen: (this as any).constructor.name.toLowerCase(),
        nuntium: `Exitu'st positor ${contextus.name.toString()}`
      })
    }
  }

  static captor<Hoc, Illud> (
      captor: (this: Hoc) => Illud,
      contextus: ClassGetterDecoratorContext<Hoc, Illud>) {
    return function (this: Hoc): Illud {
      Nuntius.noto({
        nomen: (this as any).constructor.name.toLowerCase(),
        nuntium: `Initu'st captor ${contextus.name.toString()}`
      }); try {
        const illud: Illud = captor.call(this)
        Nuntius.noto({
          nomen: (this as any).constructor.name.toLowerCase(),
          nuntium: `Exitu'st captor ${contextus.name.toString()}`
        }); return illud
      } catch(error) {
        Nuntius.timeo({
          nomen: (this as any).constructor.name.toLowerCase(),
          nuntium: `Invenit positor ${contextus.name.toString()} errorem ${error}`
        }); throw error
      }
    }
  }

  static factum<Hoc extends new (...parametra: any[]) => any> (constr: Hoc,) {
    return class extends constr {
      constructor(...parametra: any[]) {
        super(...parametra)
        Nuntius.noto({
          nomen: (this as any).constructor.name.toLowerCase(),
          nuntium: 'Fit'
        })
      }
    }
  }

  static modus<Hoc, Parametra extends any[], Illud> (
      modus: (this: Hoc, ...parametra: Parametra) => Illud,
      contextus: ClassMethodDecoratorContext<Hoc, (this: Hoc, ...parametra: Parametra) => Illud>) {
    return function (this: Hoc, ...parametra: Parametra): Illud {
      Nuntius.noto({
        nomen: (this as any).constructor.name.toLowerCase(),
        nuntium: `Initu'st modus ${contextus.name.toString()}`
      }); try {
        const illud: Illud = modus.call(this, ...parametra)
        Nuntius.noto({
          nomen: (this as any).constructor.name.toLowerCase(),
          nuntium: `Exitu'st modus ${contextus.name.toString()}`
        }); return illud
      } catch (error) {
        Nuntius.timeo({
          nomen: (this as any).constructor.name.toLowerCase(),
          nuntium: `Invenit modus ${contextus.name.toString()} errorem ${error}`
        }); throw error
      }
    }
  }

  static promittum<Hoc, Parametra extends any[], Illud> (
      promittum: (this: Hoc, ...parametra: Parametra) => Promise<Illud>,
      contextus: ClassMethodDecoratorContext<Hoc, (this: Hoc, ...parametra: Parametra) => Promise<Illud>>) {
    return async function (this: Hoc, ...parametra: Parametra): Promise<Illud> {
      Nuntius.noto({
        nomen: (this as any).constructor.name.toLowerCase(),
        nuntium: `Initu'st promittum ${contextus.name.toString()}`
      }); try {
        const illud: Promise<Illud> = promittum.apply(this, parametra)
        Nuntius.noto({
          nomen: (this as any).constructor.name.toLowerCase(),
          nuntium: `Exitu'st promittum ${contextus.name.toString()}`
        }); return illud
      } catch (error) {
        Nuntius.timeo({
          nomen: (this as any).constructor.name.toLowerCase(),
          nuntium: `Invenit promittum ${contextus.name.toString()} errorem ${error}`
        }); throw error
      }
    }
  }

  static exutor(exutor: () => void, contextus: ClassMethodDecoratorContext) {
    return function (this: any): void {
      exutor.call(this)
      Nuntius.noto({
        nomen: (this as any).constructor.name.toLowerCase(),
        nuntium: `Exutu'st ${contextus.name.toString()}`
      })
    }
  }

  private readonly _nuntiator: winston.Logger
  private readonly _mundusEvolendum: boolean = true

  nuntio (parametra: {
    error?: Error
    gradus?: string
    nuntium?: string
  }): void {
    if (parametra.error) this._nuntiator.error(parametra.error)
    else if (parametra.gradus) this._nuntiator.log(parametra.gradus, parametra.nuntium)
  }

  private constructor(private readonly _nomen?: string) {
    let navigium: winston.transport
    let forma: winston.Logform.Format
    if (this._mundusEvolendum) {
      forma = winston.format.combine(
        winston.format.align(),
        winston.format.cli(),
        winston.format.colorize(),
        winston.format.prettyPrint(),
        winston.format.printf((res: TransformableInfo) =>
          scribatur({
            ...res,
            nomen: this._nomen
          })
        )
      )

      navigium = new winston.transports.Console({ format: forma })
    } else {
      forma = winston.format.combine(
        winston.format.align(),
        winston.format.uncolorize(),
        winston.format.simple(),
        winston.format.printf((res) =>
          scribatur({
            ...res,
            nomen: this._nomen
          })
        )
      )

      navigium = new DailyRotateFile({
        datePattern: '',
        dirname: '/nuntia',
        filename: `StructorVerborum${Temporis.hodie()}.log)`,
        frequency: '1d',
        maxSize: '20m',
        maxFiles: '30d',
        zippedArchive: true
      })

      makeDirectorySync((navigium as DailyRotateFile).dirname)

      // navigium.on('new', (hoc: string) => { })
      // navigium.on('rotate', (illud: string, hoc: string) => { })
      // navigium.on('archive', (tabularium: string) => { })
      // navigium.on('logRemoved', (delendum: string) => { })
    }

    this._nuntiator = winston.createLogger({
      exitOnError: this._mundusEvolendum,
      format: forma,
      level: this._mundusEvolendum ? 'debug' : 'error',
      transports: [navigium]
    })
  }

  [Symbol.dispose](): void {
    this._nuntiator.close()
    this._nuntiator.destroy()
  }
}

class Temporis {
  static hodie(): string {
    const hodie: Date = new Date
    return [
      Numerator.romanus(hodie.getUTCDay()),
      Mensa[hodie.getUTCMonth()],
      Numerator.romanus(hodie.getUTCFullYear())
    ].join('')
  }

  static nunc(): string {
    const nunc: Date = new Date
    return [
      nunc.getUTCHours(),
      nunc.getUTCMinutes(),
      nunc.getUTCSeconds(),
      nunc.getUTCMilliseconds()
    ].map((numerus) => Numerator.romanus(numerus))
     .join(':')
  }
}
