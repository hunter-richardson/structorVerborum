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
  siSonarqubecloud,
  type SimpleIcon
} from 'simple-icons'
import { readFile, writeFile } from 'node:fs/promises'
import gitUrlParse, { type GitUrl } from 'git-url-parse'
import { resolve, relative } from 'node:path'
import origin from 'git-remote-origin-url'
import { makeBadge } from 'badge-maker'
import '@/extensions/string'
import '@/extensions/array'

type Picta =
  | 'alert'
  | 'reliability'
  | 'sqale'
  | 'security'
  | 'codefactor'
  | 'lmstudio'
  | 'build'
  | 'prs'
  | 'target'
type Valor = string | number | boolean | undefined | null
type Validum = string | number | boolean
type Res = Record<string, Valor>
type Securus = `https://${string}`

function securust(locus: string): locus is Securus {
  return locus.startsWith('https://')
}

function validust(valor: Valor): valor is Validum {
  return !(
    valor === null ||
    valor === undefined ||
    (typeof valor === 'string' && valor.trim().empty) ||
    (typeof valor === 'number' && Number.isNaN(valor))
  )
}

const imagines: Record<Picta, SimpleIcon> = {
  reliability: siSonarqubecloud,
  security: siSonarqubecloud,
  codefactor: siCodefactor,
  alert: siSonarqubecloud,
  sqale: siSonarqubecloud,
  lmstudio: siLmstudio,
  target: siTarget,
  build: siGithub,
  prs: siGithub
}

const partes: GitUrl = gitUrlParse(await origin())
const domus: string = partes['source'].split('.').first() ?? '' //  github
const clavis: `${string}/${string}` = `${partes['owner']}/${partes['name']}` //  hunter-richardson/structorVerborum
const clavisSonarQube: `${string}_${string}` = `${partes['owner']}_${partes['name']}` //  hunter-richardson_structorVerborum
const repositorium: `${string}/${string}` = `${partes['source']}/${clavis}` //  github.com/hunter-richardson/structorVerborum
const opera: `actions/workflow` = `actions/workflow`
const sonarcloud: 'sonarcloud.io' = 'sonarcloud.io' as const
const scuta: 'img.shields.io' = 'img.shields.io' as const
const ghloc: 'ghloc.dev' = 'ghloc.dev' as const
const filum: string = resolve(process.cwd(), 'README.md')
const deRamo: Res = { branch: 'princeps' } as const

function via({ locus, res }: { locus: string; res?: Res }): Securus {
  const securus: Securus = securust(locus.trim())
    ? (locus.trim() as Securus)
    : `https://${locus.trim()}`
  if (res === undefined) return securus
  const illa: Record<string, string> = Object.fromEntries(
    (Object.entries(res) as [string, Valor][])
      .filter((illud): illud is [string, Validum] => !illud[0].empty && validust(illud[1]))
      .map((illud) => [illud[0], `${illud[1]}`.trim()])
  )
  if (Object.keys(illa).empty) return securus
  const separator: string = securus.includes('?') ? '&' : '?'
  return `${securus}${separator}${new URLSearchParams(illa).toString()}`
}

function opus(nomen: string): Securus {
  return via({ locus: `${opera}/${nomen}.yml` })
} //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/${nomen}.yml

function operis(nomen: string): Securus {
  return via({
    locus: `${scuta}/github/actions/workflow/status/hunter-richardson/structorVerborum/${nomen}.yml.json`, //  img.shields.io/github/actions/workflow/status/hunter-richardson/structorVerborum/${nomen}.yml.json
    res: deRamo //  { branch: 'princeps' }
  }) //  https://img.shields.io/github/actions/workflow/status/hunter-richardson/structorVerborum/${nomen}.yml.json?branch=princeps
}

type Insigniendum = {
  latinum?: string
  anglicum: string
  imago: Securus
  locus: Securus
  picta: Picta
}

function sonarqube(mensura: string): Res & Omit<Insigniendum, 'anglicum' | 'latinum' | 'picta'> {
  return {
    locus: via({
      locus: `${sonarcloud}/summary/new_code`, //  sonarcloud.io/summary/new_code
      res: { id: clavisSonarQube } //  { id: 'hunter-richardson_structorVerborum' }
    }), //  https://sonarcloud.io/summary/new_code?id=hunter-richardson_structorVerborum
    imago: via({
      locus: `${sonarcloud}/api/measures/component`, //  sonarcloud.io/api/measures/component
      res: {
        component: clavisSonarQube, //  { component: 'hunter-richardson_structorVerborum' }
        metricKeys: mensura, //  { metricKeys: ${mensura} }
        ...deRamo //  { branch: 'princeps' }
      }
    }) //  https://sonarcloud.io/api/measures/component?component=hunter-richardson_structorVerborum&metricKeys=${mensura}&branch=princeps
  }
}

async function pingatur({
  nomen,
  scriptum,
  nuntium,
  color
}: {
  scriptum: string
  nuntium: string
  color: string
  nomen: Picta
}) {
  const filum: string = resolve(process.cwd(), 'res', 'picta', `${nomen}.svg`) //  @res/picta/${nomen}.svg
  //  eslint-disable-next-line  security/detect-non-literal-fs-filename -- Hoc filum valiust
  await writeFile(
    filum,
    makeBadge({
      //  eslint-disable-next-line  security/detect-object-injection -- Nomen tutast
      logoBase64: `data:image/svg+xml;base64,${Buffer.from(imagines[nomen].svg.replace('<svg', '<svg fill="white"'), 'utf8').toString('base64')}`,
      message: nuntium,
      label: scriptum,
      color: color
    }),
    {
      encoding: 'utf8',
      flag: 'w',
      mode: 420
    }
  )
  return relative(process.cwd(), filum)
}

async function insigniantur(...insignienda: Insigniendum[]): Promise<string[]> {
  return await Promise.all(
    insignienda.map(async (insigniendum) => {
      const scriptum: string =
        insigniendum.latinum === undefined
          ? insigniendum.anglicum
          : `${insigniendum.latinum} / ${insigniendum.anglicum}`
      const responsum: Response = await fetch(insigniendum.imago)
      if (responsum.ok) {
        const res: {
          component:
            | {
                measures: { value: string }[]
              }
            | undefined
          message?: string
          color?: string
        } = await responsum.json()
        let nuntium: string = scriptum
        switch (true) {
          case (res.message?.trim().length ?? 0) > 0:
            nuntium = res.message?.trim() ?? ''
            break
          case (res.component?.measures[0].value.trim().length ?? 0) > 0:
            {
              const gradus: number = Number.parseFloat(
                res.component?.measures[0].value.trim() ?? '0'
              )
              nuntium = Number.isNaN(gradus) ? 'ERROR' : String.fromCodePoint(gradus + 64)
              if (nuntium === '@') nuntium = 'ERROR'
            }
            break
        }
        return `[![${scriptum}](${await pingatur({
          color: res.color ?? 'blue',
          nomen: insigniendum.picta,
          scriptum: scriptum,
          nuntium: nuntium
        })})](${insigniendum.locus})`
      } else return ''
    })
  )
}

const status: string[] = await insigniantur(
  {
    latinum: 'Codicilli',
    anglicum: 'SLOC',
    picta: 'lmstudio',
    locus: via({
      locus: `${ghloc}/${clavis}`, //  ghloc.dev/hunter-richardson/structorVerborum
      res: deRamo //  { branch: 'princeps' }
    }), //  https://ghloc.dev/hunter-richardson/structorVerborum?branch=princeps
    imago: via({
      locus: `${ghloc}/api/${clavis}/badge`, //  ghloc.dev/api/hunter-richardson/structorVerborum/badge
      res: {
        filter: ['src', 'res', '.ts'].join(','), //  { filter: 'src,res,.ts' }
        format: 'human',
        ...deRamo //  { branch: 'princeps' }
      }
    }) //  https://ghloc.dev/api/hunter-richardson/structorVerborum/badge?filter=src,res,.ts&format=human&branch=princeps
  },
  {
    imago: via({ locus: `img.shields.io/${domus}/issues-raw/${clavis}.json` }), //  https://img.shields.io/github/issues-raw/hunter-richardson/structorVerborum.json
    locus: via({ locus: `${repositorium}/pulls` }), //  https://github.com/hunter-richardson/structorVerborum/pulls
    anglicum: 'Issues',
    latinum: 'Exitus',
    picta: 'prs'
  },
  {
    imago: operis('aedificare'), //  https://img.shields.io/github/actions/workflow/status/hunter-richardson/structorVerborum/aedificare.yml.json?branch=princeps
    locus: opus('aedificare'), //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/aedificare.yml
    latinum: 'Aedificare',
    anglicum: 'Build',
    picta: 'build'
  }
)

const gentes: string[] = await insigniantur(
  {
    imago: operis('OSV'), //  https://img.shields.io/github/actions/workflow/status/hunter-richardson/structorVerborum/OSV.yml.json?badge=princeps
    locus: opus('OSV'), //  https://github.com/hunter-richardson/structorVerborum/actions/workflows/OSV.yml
    anglicum: 'OSV',
    picta: 'target'
  },
  {
    imago: via({ locus: `${scuta}/codefactor/grade/${domus}/${clavis}.json` }), //  https://img.shields.io/codefactor/grade/github/hunter-richardson/structorVerborum.json
    picta: 'codefactor',
    anglicum: 'OxLint',
    locus: via({ locus: `codefactor.io/repository/${domus}/${clavis}` }) //  https://codefactor.io/repository/github/hunter-richardson/structorVerborum
  },
  {
    anglicum: 'SonarQube',
    picta: 'alert',
    ...sonarqube('alert_status') /* {
      locus: 'https://sonarcloud.io/summary/new_code?id=hunter-richardson_structorVerborum'
      imago: 'https://sonarcloud.io/api/measures/component?component=hunter-richardson_structorVerborum&metricKeys=altert_status&branch=princeps'
    } */
  }
)

const sonar: string[] = await insigniantur(
  {
    anglicum: 'Reliabilty',
    picta: 'reliability',
    latinum: 'Fiducia',
    ...sonarqube('reliability_rating') /* {
      locus: 'https://sonarcloud.io/summary/new_code?id=hunter-richardson_structorVerborum'
      imago: 'https://sonarcloud.io/api/measures/component?component=hunter-richardson_structorVerborum&metricKeys=reliability_rating&branch=princeps'
    } */
  },
  {
    anglicum: 'Maintainability',
    latinum: 'Servabilitas',
    picta: 'sqale',
    ...sonarqube('sqale_rating') /* {
      locus: 'https://sonarcloud.io/summary/new_code?id=hunter-richardson_structorVerborum'
      imago: 'https://sonarcloud.io/api/measures/component?component=hunter-richardson_structorVerborum&metricKeys=sqale_rating&branch=princeps'
    } */
  }
)

const insignia: string = [
  `## _Status_ / Stats ${status.join(' ')}`,
  `## _Gens de_ / Quality according to ${gentes.join(' ')}`,
  `## _de_ SonarQube ${sonar.join(' ')}`
].join('\n\n')

function deNoto(notum?: string): RegexConstruct {
  return regex([
    '<!--', //<!--/
    zeroOrMore(whitespace), //\s*/
    ...(notum?.trim().empty ? [] : [notum?.trim() ?? '']), //${notum}/
    zeroOrMore(whitespace), //\s*/
    '-->' //-->/
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
