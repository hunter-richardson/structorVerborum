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

const imagines: Record<Picta, string> = {
  sonarqubecloud: siSonarqubecloud.svg,
  codefactor: siCodefactor.svg,
  lmstudio: siLmstudio.svg,
  github: siGithub.svg,
  target: siTarget.svg,
}

const partes: Localia = gitUrlParse(await origin())
const domus: string = partes.source.split('.').first() ?? '' //  github
const clavis: `${string}/${string}` = `${partes.owner}/${partes.name}` //  hunter-richardson/structorVerborum
const clavisSonarQube: `${string}_${string}` = `${partes.owner}_${partes.name}` //  hunter-richardson_structorVerborum
const repositorium: `${string}/${string}` = `${partes.source}/${clavis}` //  github.com/hunter-richardson/structorVerborum
const opera: `${string}/actions/workflows` = `${repositorium}/actions/workflows` // github.com/hunter-richardson/structorVerborum/actions/workflows
const codefactor: `codefactor.io/repository/${string}/${string}/${string}` = `codefactor.io/repository/${domus}/${clavis}` //  codefactor.io/repository/github/hunter-richardson/structorVerborum
const ghloc: 'ghloc.dev' = 'ghloc.dev'
const sonarcloud: 'sonarcloud.io' = 'sonarcloud.io'
const filum: `${string}/README.md` = resolve(process.cwd(), 'README.md')
const deRepositorium: Res & { picta: Picta } = { picta: domus as Picta } as const
const deRamo: Res = { branch: 'princeps' } as const

function via({ locus, res }: { locus: string; res?: Res }): string {
  locus = locus.trim()
  if (!locus.startsWith('https://'))
    locus = `https://${locus}`
  if (res === undefined)
    return locus
  const illa: [string, string][] = (Object.entries(res) as [string, Valor][])
    .filter(([clavis, valor]) => !clavis.empty && validust(valor))
    .map(([clavis, valor]) => [clavis, `${valor}`.trim()])
  if (illa.empty) return locus
  const separator: string = locus.includes('?') ? '&' : '?'
  return `${locus}${separator}${new URLSearchParams(illa).toString()}`
}

function opus(nomen: string): string {
  return `https://${opera}/${nomen}.yml`
} //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/${nomen}.yml

function operis(nomen: string): string {
  return via({
    locus: `${opus(nomen)}/badge.svg`,  //  https://github.com/hunter-richardson/structorverborum/workflows/${nomen}.yml/badge.svg
    res: deRamo
  })  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/${nomen}.yml/badge.svg?badge=princeps
}

type Insigniendum = {
  latinum?: string
  anglicum: string
  imago: string
  locus: string
  picta: Picta
}

function sonarqube(mensura: string): Omit<Insigniendum, 'anglicum' | 'latinum'> {
  return {
    picta: 'sonarqubecloud',
    locus: via({
      locus: `${sonarcloud}/summary/new_code`,  //  sonarcloud.io/summary/new_code
      res: { id: clavisSonarQube }
    }), //  https://sonarcloud.io/summary/new_code?id=hunter-richardson_structorVerborum
    imago: via({
      locus: `${sonarcloud}/api/project_badges/measure`,  //  sonarcloud.io/api/project_badges/measure
      res: {
        project: clavisSonarQube,
        metric: mensura,
        ...deRamo
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
      const res: Scutarius = await (responsum.json())
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
    res: deRamo
  }),  //  https://ghloc.dev/hunter-richardson/structorVerborum?branch=princeps
  imago: via({
    locus: `${ghloc}/api/${clavis}/badge`, //  ghloc.dev/api/hunter-richardson/structorVerborum/badge
    res: {
      filter: ['src', 'res', '.ts'].join(','),  //  src,res,.ts
      format: 'human',
      ...deRamo
    }
  })  //  https://ghloc.dev/api/hunter-richardson/structorVerborum/badge?filter=src,res,.ts&format=human&branch=princeps
},
  {
    locus: via({ locus: `${repositorium}/pulls` }),  //  https://github.com/hunter-richardson/structorVerborum/pulls
    picta: domus as 'github',
    anglicum: 'Issues',
    latinum: 'Exitus',
    imago: via({
      locus: `https://img.shields.io/${domus}/issues-raw/${clavis}`, //  https://img.shields.io/github/issues-raw/hunter-richardson/structorVerborum
      res: deRepositorium
    })  //  https://img.shields.io/github/issues-raw/hunter-richardson/structorVerboum?logo=github
  },
  {
    locus: opus('aedificare'),  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/aedificare.yml
    picta: domus as 'github',
    latinum: 'Aedificare',
    anglicum: 'Build',
    imago: via({
      locus: operis('aedificare'),  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/aedificare.yml/badge.svg?branch=princeps
      res: deRepositorium
    })  //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/aedificare.yml/badge.svg?branch=princeps&logo=github
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
    locus: codefactor
  },
  {
    anglicum: 'SonarQube',
    ...sonarqube('alert_status')
  })

const sonar: string[] = await insigniantur(
  {
    anglicum: 'Reliabilty',
    latinum: 'Fiducia',
    ...sonarqube('reliability_rating')
  },
  {
    anglicum: 'Security',
    latinum: 'Salus',
    ...sonarqube('security_rating')
  },
  {
    anglicum: 'Maintainability',
    latinum: 'Servabilitas',
    ...sonarqube('sqale_rating')
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
