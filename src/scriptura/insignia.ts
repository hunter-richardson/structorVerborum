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
import {
  siLmstudio,
  siGithub,
  siTarget,
  siCodefactor,
  siSonarqubecloud
} from 'simple-icons'
import { readFile, writeFile } from 'node:fs/promises'
import origin from 'git-remote-origin-url'
import gitUrlParse from 'git-url-parse'
import { makeBadge } from 'badge-maker'
import { resolve } from 'node:path'
import '@/extensions/string'
import '@/extensions/array'

type Picta = 'sonarqubecloud' | 'codefactor' | 'lmstudio' | 'github' | 'target'
type Valor = string | number | boolean | undefined | null
type Validum = string | number | boolean
type Res = Record<string, Valor>
type Securus = `https://${string}`

function securust(locus: string): locus is Securus { return locus.startsWith('https://') }

function validust(valor: Valor): valor is Validum {
  return !(
    valor === null ||
    valor === undefined ||
    (typeof valor === 'string' && valor.trim().empty) ||
    (typeof valor === 'number' && Number.isNaN(valor))
  )
}

const imagines: Record<Picta, string> = {
  sonarqubecloud: siSonarqubecloud.svg,
  codefactor: siCodefactor.svg,
  lmstudio: siLmstudio.svg,
  github: siGithub.svg,
  target: siTarget.svg,
}

const partes: Record<string, string> = gitUrlParse(await origin())
const domus: string = partes['source'].split('.').first() ?? '' //  github
const clavis: `${string}/${string}` = `${partes['owner']}/${partes['name']}` //  hunter-richardson/structorVerborum
const clavisSonarQube: `${string}_${string}` = `${partes['owner']}_${partes['name']}` //  hunter-richardson_structorVerborum
const repositorium: `${string}/${string}` = `${partes['source']}/${clavis}` //  github.com/hunter-richardson/structorVerborum
const opera: `${string}/${string}/actions/workflows` = `${repositorium}/actions/workflows` // github.com/hunter-richardson/structorVerborum/actions/workflows
const codefactor: `codefactor.io/repository/${string}/${string}/${string}` = `codefactor.io/repository/${domus}/${clavis}` //  codefactor.io/repository/github/hunter-richardson/structorVerborum
const sonarcloud: 'sonarcloud.io' = 'sonarcloud.io'
const ghloc: 'ghloc.dev' = 'ghloc.dev'
const filum: `${string}/README.md` = resolve(process.cwd(), 'README.md')
const deRepositorium: { picta: Picta } = { picta: domus as Picta } as const
const deRamo: Res = { branch: 'princeps' } as const

function via({ locus, res }: { locus: string; res?: Res }): Securus {
  const securus: Securus = securust(locus.trim()) ? (locus.trim() as Securus) : `https://${locus.trim()}`
  if (res === undefined) return securus
  const illa: Record<string, string> =
    Object.fromEntries((Object.entries(res) as [string, Valor][])
      .filter((illud): illud is [string, Validum] => !illud[0].empty && validust(illud[1]))
      .map((illud) => [illud[0], `${illud[1]}`.trim()]))
  if (Object.keys(illa).empty) return securus
  const separator: string = securus.includes('?') ? '&' : '?'
  return `${securus}${separator}${new URLSearchParams(illa).toString()}`
}

function opus(nomen: string): Securus { return via({ locus: `${opera}/${nomen}.yml` }) }  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/${nomen}.yml

function operis(nomen: string): Securus {
  return via({
    locus: `${opus(nomen)}/badge.svg`,  //  github.com/hunter-richardson/structorverborum/workflows/${nomen}.yml/badge.svg
    res: deRamo  //  { branch: 'princeps' }
  })  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/${nomen}.yml/badge.svg?badge=princeps
}

type Insigniendum = {
  latinum?: string
  anglicum: string
  imago: Securus
  locus: Securus
  picta: Picta
}

function sonarqube(mensura: string): Res & Omit<Insigniendum, 'anglicum' | 'latinum'> {
  return {
    picta: 'sonarqubecloud',
    locus: via({
      locus: `${sonarcloud}/summary/new_code`,  //  sonarcloud.io/summary/new_code
      res: { id: clavisSonarQube }  //  { id: 'hunter-richardson_structorVerborum' }
    }), //  https://sonarcloud.io/summary/new_code?id=hunter-richardson_structorVerborum
    imago: via({
      locus: `${sonarcloud}/api/project_badges/measure`,  //  sonarcloud.io/api/project_badges/measure
      res: {
        project: clavisSonarQube,  //  { project: 'hunter-richardson_structorVerborum' }
        metric: mensura,  //  { metric: ${mensura} }
        ...deRamo  //  { branch: 'princeps' }
      }
    })  //  https://sonarcloud.io/api/project_badges/measure?project=hunter-richardson_structorVerborum&metric=${mensura}&branch=princeps
  }
}

async function insigniantur(...insignienda: Insigniendum[]): Promise<string[]> {
  return await Promise.all(insignienda.map(async (insigniendum) => {
    const scriptum: string =
      insigniendum.latinum === undefined
        ? insigniendum.anglicum
        : `${insigniendum.latinum} / ${insigniendum.anglicum}`
    const responsum: Response = await fetch(insigniendum.imago)
    if (responsum.ok) {
      const res: {
        message?: string
        color?: string
      } = await (responsum.json())
      return `[![${scriptum}](${makeBadge({
        logoBase64: `data:image/svg+xml;base64,${Buffer.from(imagines[insigniendum.picta], 'utf8').toString('base64')}`,
        message: res.message || scriptum,
        color: res.color || 'grey',
        label: scriptum
      })})](${insigniendum.locus})`
    } else return ''
  }))
}

const primi: string[] = await insigniantur({
  latinum: 'Codicilli',
  anglicum: 'SLOC',
  picta: 'lmstudio',
  locus: via({
    locus: `${ghloc}/${clavis}`, //  ghloc.dev/hunter-richardson/structorVerborum
    res: deRamo  //  { branch: 'princeps' }
  }),  //  https://ghloc.dev/hunter-richardson/structorVerborum?branch=princeps
  imago: via({
    locus: `${ghloc}/api/${clavis}/badge`, //  ghloc.dev/api/hunter-richardson/structorVerborum/badge
    res: {
      filter: ['src', 'res', '.ts'].join(','),  //  { filter: 'src,res,.ts' }
      format: 'human',
      ...deRamo  //  { branch: 'princeps' }
    }
  })  //  https://ghloc.dev/api/hunter-richardson/structorVerborum/badge?filter=src,res,.ts&format=human&branch=princeps
},
  {
    locus: via({ locus: `${repositorium}/pulls` }),  //  https://github.com/hunter-richardson/structorVerborum/pulls
    anglicum: 'Issues',
    latinum: 'Exitus',
    imago: via({ locus: `img.shields.io/${domus}/issues-raw/${clavis}` }), //  https://img.shields.io/github/issues-raw/hunter-richardson/structorVerborum
    ...deRepositorium  //  { picta: 'github' }
  },
  {
    locus: opus('aedificare'),  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/aedificare.yml
    latinum: 'Aedificare',
    anglicum: 'Build',
    imago: operis('aedificare'),  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/aedificare.yml/badge.svg?branch=princeps
    ...deRepositorium  //  { picta: 'github' }
  })

const gentes: string[] = await insigniantur({
  imago: operis('OSV'),  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/OSV.yml/badge.svg?badge=princeps
  locus: opus('OSV'),  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/OSV.yml
  anglicum: 'OSV',
  picta: 'target'
},
  {
    imago: via({ locus: `${codefactor}/badge` }), //  https://codefactor.io/repository/github/hunter-richardson/structorVerorum/badge
    picta: 'codefactor',
    anglicum: 'OxLint',
    locus: via({ locus: codefactor })  //  https://codefactor.io/repository/github/hunter-richardson/structorVerborum
  },
  {
    anglicum: 'SonarQube',
    ...sonarqube('alert_status') /* {
      picta: 'sonarqubecloud',
      locus: 'https://sonarcloud.io/summary/new_code?id=hunter-richardson_structorVerborum'
      imago: 'https://sonarcloud.io/api/project_badges/measure?project=hunter-richardson_structorVerborum&metric=altert_status&branch=princeps'
    } */
  })

const sonar: string[] = await insigniantur(
  {
    anglicum: 'Reliabilty',
    latinum: 'Fiducia',
    ...sonarqube('reliability_rating') /* {
      picta: 'sonarqubecloud',
      locus: 'https://sonarcloud.io/summary/new_code?id=hunter-richardson_structorVerborum'
      imago: 'https://sonarcloud.io/api/project_badges/measure?project=hunter-richardson_structorVerborum&metric=reliability_rating&branch=princeps'
    } */
  },
  {
    anglicum: 'Security',
    latinum: 'Salus',
    ...sonarqube('security_rating') /* {
      picta: 'sonarqubecloud',
      locus: 'https://sonarcloud.io/summary/new_code?id=hunter-richardson_structorVerborum'
      imago: 'https://sonarcloud.io/api/project_badges/measure?project=hunter-richardson_structorVerborum&metric=security_rating&branch=princeps'
    } */
  },
  {
    anglicum: 'Maintainability',
    latinum: 'Servabilitas',
    ...sonarqube('sqale_rating') /* {
      picta: 'sonarqubecloud',
      locus: 'https://sonarcloud.io/summary/new_code?id=hunter-richardson_structorVerborum'
      imago: 'https://sonarcloud.io/api/project_badges/measure?project=hunter-richardson_structorVerborum&metric=sqale_rating&branch=princeps'
    } */
  })

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
