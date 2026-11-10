import { buildRegExp, regex, capture, optional, oneOrMore, zeroOrMore, startOfString, endOfString, whitespace, any, RegexConstruct } from 'ts-regex-builder'
import origin from 'git-remote-origin-url'
import { badge } from 'markdown-utils'
import { readFile, writeFile } from 'node:fs/promises'
import parse from 'git-url-parse'
import '@/extensions/string'
import '@/extensions/array'

type Localia = NonNullable<ReturnType<parse>>
type Valor = string | number | bigint | boolean | undefined | null
type Validum = string | number | bigint | boolean
type Res = Record<string, Valor>

function validust(valor: Valor): valor is Validum {
  return !(valor === undefined || valor === null ||
    (typeof valor === 'string' && valor.trim().empty))
}

function via({ locus, res }: {
  locus: string,
  res: Res
}): string {
  const illa: [string, string][] =
    (Object.entries(res) as [string, Valor][])
      .filter(([clavis, valor]) => !clavis.empty && validust(valor))
      .map(([clavis, valor]) => [clavis, `${valor}`])
  return illa.empty ? locus : `${locus}?${new URLSearchParams(illa).toString()}`
}

const partes: Localia = parse(await origin())
const domus: string = partes.source.split('.').first()  //  github
const clavis: string = `${partes.owner}/${partes.name}`  //  hunter-richardson/structorVerborum
const clavisSonarQube: string = `${partes.owner}_${partes.name}`  //  hunter-richardson_structorVerborum
const repositorium: string = `https://${partes.source}/${clavis}`  //  https://github.com/hunter-richardson/structorVerborum
const opera: string = `${repositorium}/actions/workflows`  // https://github.com/hunter-richardson/structorVerborum/actions/workflows
const codefactor: string = `https://codefactor.io/repository/${domus}/${clavis}`  //  https://codefactor.io/repository/github/hunter-richardson/structorVerborum
const meta: string = 'https://img.shields.io/endpoint'
const filum: string = '@/../README.md'

const deRepositorium: Res = { logo: domus }
const deRamo: Res = { branch: 'princeps' }

const ghloc: string = via({
  locus: `https://ghloc.dev/api/${clavis}/badge`,  //  https://ghloc.dev/api/hunter-richardson/structorVerborum/badge
  res: {
    filter: ['src', 'res', '.ts'].join(','),
    format: 'human',
    ...deRamo
  }
})  //  https://ghloc.dev/api/hunter-richardson/structorVerborum/badge?filter=src,res,.ts&format=human&branch=princeps

const sonarcloud: string = via({
  locus: 'https://sonarcloud.io/summary/new_code',
  res: { id: clavisSonarQube }
})  //  https://sonarcloud.io/summary/new_code?id=hunter-richardson_structorVerborum

function opus(nomen: string): string { return `${opera}/${nomen}.yml` }  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/${nomen}.yml

function operis(nomen: string): string {
  return encodeURI(via({
    locus: `${opus(nomen)}/badge.svg`,
    res: deRamo
  }))  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/${nomen}.yml/badge.svg?badge=princeps
}

type Insigniendum = {
  latinum?: string,
  anglicum: string,
  imago: string,
  locus: string
}

function sonarqube(mensura: string): Res {
  return {
    url: encodeURI(via({
      locus: 'https://sonarcloud.io/api/project_badges/measure',
      res: {
        project: clavisSonarQube,
        metric: mensura,
        ...deRamo
      }
    })),  //  https://sonarcloud.io/api/project_badges/measure?project=hunter-richardson_structorVerborum&metric=${mensura}&badge=princeps
    logo: 'sonarqubecloud'
  }
}

function insigne(insigniendum: Insigniendum): string {
  const scriptum: string = insigniendum.latinum === undefined ? insigniendum.anglicum : `${insigniendum.latinum} / ${insigniendum.anglicum}`
  return badge(scriptum, `${insigniendum.imago}&label=${new URLSearchParams(scriptum)}`, insigniendum.locus, scriptum)
}

const insignia: string =
  [[{
    latinum: 'Codicilli',
    anglicum: 'SLOC',
    imago: via({
      locus: meta,
      res: {
        url: encodeURI(ghloc),
        logo: 'lmstudio'
      }
    }),
    locus: via({
      locus: `https://ghloc.dev/${clavis}`,  //  https://ghloc.dev/hunter-richardson/structorVerborum
      res: deRamo
    })
  }, {
    latinum: 'Exitus',
    anglicum: 'Issues',
    locus: `${repositorium}/pulls`,
    imago: via({
      locus: `https://img.shields.io/${domus}/issues-raw/${clavis}`,  //  https://img.shield.io/github/issues-raw/hunter-richardson/structorVerborum
      res: deRepositorium
    })
  }, {
    latinum: 'Aedificare',
    anglicum: 'Build',
    locus: opus('aedificare'),
    imago: via({
      locus: meta,
      res: {
        url: operis('aedificare'),  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/aedificare.yml/badge.svg
        ...deRepositorium
      }
    })
  }], [{
    anglicum: 'OSV',
    locus: opus('OSV'),
    imago: via({
      locus: meta,
      res: {
        url: operis('OSV'),  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/OSV.yml/badge.svg
        logo: 'target'
      }
    })
  }, {
    locus: codefactor,
    anglicum: 'OxLint',
    imago: via({
      locus: meta,
      res: {
        url: encodeURI(`${codefactor}/badge`),  //  https://codefactor.io/repository/github/hunter-richardson/structorVerorum/badge
        logo: 'codefactor'
      }
    })
  }, {
    locus: sonarcloud,
    anglicum: 'SonarQube',
    imago: via({
      locus: meta,
      res: sonarqube('alert_status')
    })
  }], [{
    locus: sonarcloud,
    latinum: 'Fiducia',
    anglicum: 'Reliabilty',
    imago: via({
      locus: meta,
      res: sonarqube('reliability_rating')
    })
  }, {
    locus: sonarcloud,
    latinum: 'Salus',
    anglicum: 'Security',
    imago: via({
      locus: meta,
      res: sonarqube('security_rating')
    })
  }, {
    locus: sonarcloud,
    latinum: 'Servabilitas',
    anglicum: 'Maintainability',
    imago: via({
      locus: meta,
      res: sonarqube('sqale_rating')
    })
  }]]
    .map((illa) => (illa.map((insigniendum: Insigniendum) => insigne(insigniendum))))
    .map((illa) => illa.join(' '))
    .join('\n\n')

function deNoto(notum?: string): RegexConstruct {
  return regex([
    optional(startOfString),  //^?/
    '<!--',  //<!--/
    zeroOrMore(whitespace),  //\s*/
    notum ?? '',  //${notum}/
    zeroOrMore(whitespace),  //\s*/
    '-->',  //-->/
    optional(endOfString)  //$?/
  ])  //[^\n]<!--\s*(?:${notum})\s*[$\n]/
}

const deNotis: RegExp = buildRegExp([
  capture(deNoto('insignia'), { name: 'inceptum' }),  //(:<inceptum>^?<!--\s*(:insignia)\s*-->)/
  '\n',  //\n/
  oneOrMore(any),  //.+/
  '\n',  //\n/
  capture(deNoto('/insignia'), { name: 'finitum' })  //(:<finitum><!--\s*(:\/insignia)\s*-->$?)/
], {
  global: true,
  multiline: true,
  dotAll: true
})  //(?<inceptum>^?<!--\s*(:insignia)\s*-->)\n.+\n(?<finitum><!--\s*(:\/insignia)\s*-->$?)/gms

const legendum: string = await readFile(filum, 'utf-8')
const certamen: RegExpExecArray | null = deNotis.exec(legendum)
if (certamen?.groups !== undefined) {
  const scribendum: string =
    `${certamen.groups['inceptum']}\n${insignia}\n${certamen.groups['finitum']}`
  await writeFile(filum, legendum.replace(deNotis, scribendum), 'utf-8')
}
