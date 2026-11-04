import { buildRegExp, endOfString } from 'ts-regex-builder'
import path from 'node:path'
import os from 'node:os'
import '@/extensions/array'

const WIN32_SLASH_AT_END: RegExp = buildRegExp([path.win32.sep, endOfString])
const WIN32_SLASH: RegExp = buildRegExp([path.win32.sep], { global: true })
const EXT_SEP: `.` = '.'

const handler: typeof path = os.platform() === 'win32' ? path.win32 : path.posix

export default class {
  private readonly _path: path.ParsedPath

  get isAbsolute(): boolean {
    return handler.isAbsolute(this.path)
  }

  get root(): string {
    return this._path.root.replace(WIN32_SLASH_AT_END, '')
  }
  get dirname(): string {
    return this._path.dir.replace(WIN32_SLASH, path.posix.sep)
  }
  get filename(): string {
    return this._path.base
  }
  get basename(): string {
    return this._path.name
  }
  get path(): string {
    return handler.join(this.dirname, this.filename)
  }
  get dirs(): string[] {
    return this.dirname.split(path.posix.sep)
  }
  get extensions(): string[] {
    return this.filename.split(EXT_SEP).slice(1)
  }
  get extension(): string {
    return this.extensions.join(EXT_SEP)
  }
  get lastExtension(): string {
    return this.extensions.last() ?? ''
  }

  constructor(file: string) {
    this._path = handler.parse(file)
  }
}
