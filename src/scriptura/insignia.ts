import {
  buildRegExp,
  regex,
  capture,
  oneOrMore,
  zeroOrMore,
  whitespace,
  any,
  type RegexConstruct
} from 'ts-regex-builder'
import { siLmstudio, siGithub, siTarget, siCodefactor, siSonarqubecloud, type SimpleIcon } from 'simple-icons'
import { readFile, writeFile } from 'node:fs/promises'
import origin from 'git-remote-origin-url'
import gitUrlParse from 'git-url-parse'
import { makeBadge } from 'badge-maker'
import { resolve } from 'node:path'
import '@/extensions/string'
import '@/extensions/array'

type Localia = NonNullable<ReturnType<typeof gitUrlParse>>
type Valor = string | number | bigint | boolean | undefined | null
type Validum = string | number | bigint | boolean
type Res = Record<string, Valor>
type Scutarius = {
  logoBase64?: string,
  message?: string,
  color?: string,
  label?: string
}

function validust(valor: Valor): valor is Validum {
  return !(
    valor === null ||
    valor === undefined ||
    (typeof valor === 'string' && valor.trim().empty)
  )
}

const imagines: Record<string, SimpleIcon> = {
  sonarqubecloud: siSonarqubecloud,
  codefactor: siCodefactor,
  lmstudio: siLmstudio,
  github: siGithub,
  target: siTarget,
}

const partes: Localia = gitUrlParse(await origin())
const domus: string = partes.source.split('.').first() ?? '' //  github
const clavis: string = `${partes.owner}/${partes.name}` //  hunter-richardson/structorVerborum
const clavisSonarQube: string = `${partes.owner}_${partes.name}` //  hunter-richardson_structorVerborum
const repositorium: string = `https://${partes.source}/${clavis}` //  https://github.com/hunter-richardson/structorVerborum
const opera: string = `${repositorium}/actions/workflows` // https://github.com/hunter-richardson/structorVerborum/actions/workflows
const codefactor: string = `https://codefactor.io/repository/${domus}/${clavis}` //  https://codefactor.io/repository/github/hunter-richardson/structorVerborum
const filum: string = resolve(process.cwd(), 'README.md')
const deRepositorium: Res = { logo: domus }
const deRamo: Res = { branch: 'princeps' }

function via({ locus, res }: { locus: string; res: Res }): string {
  const illa: [string, string][] = (Object.entries(res) as [string, Valor][])
    .filter(([clavis, valor]) => !clavis.empty && validust(valor))
    .map(([clavis, valor]) => [clavis, `${valor}`])
  if (illa.empty) return locus
  const separator: string = locus.includes('?') ? '&' : '?'
  return `${locus}${separator}${new URLSearchParams(illa).toString()}`
}

const sonarcloud: string = via({
  locus: 'https://sonarcloud.io/summary/new_code',
  res: { id: clavisSonarQube }
}) //  https://sonarcloud.io/summary/new_code?id=hunter-richardson_structorVerborum

function opus(nomen: string): string {
  return `${opera}/${nomen}.yml`
} //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/${nomen}.yml

function operis(nomen: string): string {
  return via({
    locus: `${opus(nomen)}/badge.svg`,
    res: deRamo
  })  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/${nomen}.yml/badge.svg?badge=princeps
}

type Insigniendum = {
  latinum?: string
  anglicum: string
  imago: string,
  picta: string
  locus: string
}

function sonarqube(mensura: string): string {
  return via({
    locus: 'https://sonarcloud.io/api/project_badges/measure',
    res: {
      project: clavisSonarQube,
      metric: mensura,
      ...deRamo
    }
  })  //  https://sonarcloud.io/api/project_badges/measure?project=hunter-richardson_structorVerborum&metric=${mensura}&branch=princeps
}

async function insigne(insigniendum: Insigniendum): Promise<string> {
  const scriptum: string =
    insigniendum.latinum === undefined
      ? insigniendum.anglicum
      : `${insigniendum.latinum} / ${insigniendum.anglicum}`
  const responsum: Response = await fetch(insigniendum.imago)
  if (responsum.ok) {
    const res: Scutarius = await (responsum.json())
    return `[![${scriptum}](${makeBadge({
      logoBase64: `data:image/svg+xml;base64,${Buffer.from(imagines[insigniendum.picta], 'utf8').toString('base64')}`,
      message: res.message || scriptum,
      color: res.color || 'grey',
      label: scriptum
    })})](${insigniendum.locus})`
  } else return ''
}

const primi: string[] = await Promise.all([
  {
    latinum: 'Codicilli',
    picta: 'lmstudio',
    anglicum: 'SLOC',
    imago: via({
      locus: `https://ghloc.dev/api/${clavis}/badge`, //  https://ghloc.dev/api/hunter-richardson/structorVerborum/badge
      res: {
        filter: ['src', 'res', '.ts'].join(','),  //  src,res,.ts
        format: 'human',
        ...deRamo
      }
    }), //  https://ghloc.dev/api/hunter-richardson/structorVerborum/badge?filter=src,res,.ts&format=human&branch=princeps
    locus: via({
      locus: `https://ghloc.dev/${clavis}`, //  https://ghloc.dev/hunter-richardson/structorVerborum
      res: deRamo
    })  //  https://ghloc.dev/hunter-richardson/structorVerborum?branch=princeps
  },
  {
    locus: `${repositorium}/pulls`,  //  https://github.com/hunter-richardson/structorVerborum/pulls
    anglicum: 'Issues',
    latinum: 'Exitus',
    picta: domus,
    imago: via({
      locus: `https://img.shields.io/${domus}/issues-raw/${clavis}`, //  https://img.shields.io/github/issues-raw/hunter-richardson/structorVerborum
      res: deRepositorium
    })  //  https://img.shields.io/github/issues-raw/hunter-richardson/structorVerboum?logo=github
  },
  {
    locus: opus('aedificare'),  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/aedificare.yml
    latinum: 'Aedificare',
    anglicum: 'Build',
    picta: domus,
    imago: via({
      locus: operis('aedificare'),  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/aedificare.yml/badge.svg?branch=princeps
      res: deRepositorium
    })  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/aedificare.yml/badge.svg?branch=princeps&logo=github
  }
].map(async (insigniendum: Insigniendum) => await insigne(insigniendum)))

const gentes: string[] = await Promise.all([
  {
    imago: operis('OSV'),  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/OSV.yml/badge.svg?badge=princeps
    locus: opus('OSV'),  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/OSV.yml
    picta: 'target',
    anglicum: 'OSV',
  },
  {
    imago: `${codefactor}/badge`, //  https://codefactor.io/repository/github/hunter-richardson/structorVerorum/badge
    picta: 'codefactor',
    anglicum: 'OxLint',
    locus: codefactor
  },
  {
    imago: sonarqube('alert_status'),  //  https://sonarcloud.io/api/project_badges/measure?project=hunter-richardson_structorVerborum&metric=alert_status&branch=princeps
    picta: 'sonarqubecloud',
    anglicum: 'SonarQube',
    locus: sonarcloud
  }
].map(async (insigniendum: Insigniendum) => await insigne(insigniendum)))

const sonar: string[] = await Promise.all([
  {
    locus: sonarcloud,
    latinum: 'Fiducia',
    anglicum: 'Reliabilty',
    picta: 'sonarqubecloud',
    imago: sonarqube('reliability_rating')  //  https://sonarcloud.io/api/project_badges/measure?project=hunter-richardson_structorVerborum&metric=reliability_rating&branch=princeps
  },
  {
    locus: sonarcloud,
    latinum: 'Salus',
    anglicum: 'Security',
    picta: 'sonarqubecloud',
    imago: sonarqube('security_rating')  //  https://sonarcloud.io/api/project_badges/measure?project=hunter-richardson_structorVerborum&metric=security_rating&branch=princeps
  },
  {
    locus: sonarcloud,
    latinum: 'Servabilitas',
    anglicum: 'Maintainability',
    picta: 'sonarqubecloud',
    imago: sonarqube('sqale_rating')  //  https://sonarcloud.io/api/project_badges/measure?project=hunter-richardson_structorVerborum&metric=sqale_rating&branch=princeps
  }
].map(async (insigniendum: Insigniendum) => await insigne(insigniendum)))

const insignia: string = [
  `# StructorVerborum ${primi.join(' ')}',
  '## _Gens de_ / Quality according to ${gentes.join(' ')}',
  '## _de_ SonarQube ${sonar.join(' ')}`
].join('\n\n')

function deNoto(notum?: string): RegexConstruct {
  return regex([
    '<!--', //<!--/
    zeroOrMore(whitespace), //\s*/
    ...(notum?.trim().empty ? [] : [notum?.trim() ?? '']), //${notum}/
    zeroOrMore(whitespace), //\s*/
    '-->', //-->/
  ]) //[^\n]<!--\s*(?:${notum})\s*[$\n]/
}

const notum: string = 'insignia'
const deNotis: RegExp = buildRegExp(
  [
    capture(deNoto(notum), { name: 'inceptum' }), //(:<inceptum><!--\s*(:insignia)\s*-->)/
    '\n', //\n/
    oneOrMore(any), //.+/
    '\n', //\n/
    capture(deNoto(`/${notum}`), { name: 'finitum' }) //(:<finitum><!--\s*(:\/insignia)\s*-->)/
  ],
  {
    global: true,
    multiline: true,
    dotAll: true
  }
) //(?<inceptum><!--\s*(:insignia)\s*-->)\n.+\n(?<finitum><!--\s*(:\/insignia)\s*-->)/gms

const legendum: string = await readFile(filum, 'utf-8')
const certamen: RegExpExecArray | null = deNotis.exec(legendum)
if (certamen?.groups !== undefined) {
  const scribendum: string = `${certamen?.groups['inceptum'] ?? ''}\n${insignia}\n${certamen?.groups['finitum'] ?? ''}`
  await writeFile(filum, legendum.replace(deNotis, scribendum), 'utf-8')
}
