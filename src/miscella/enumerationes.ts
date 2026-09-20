import '../extensions/string.ts';

export enum encliticum {
  nullum = '',
  interrogans = 'ne',
  coniugans = 'que',
  eligens = 've'
}

export enum Mensa {
  Ianuarius,
  Februarius,
  Mars,
  Aprilis,
  Maius,
  Iunius,
  Iulius,
  Augustus,
  September,
  October,
  November,
  December
}

export const categoriae: string[] = [ 'actus', 'adiectivum', 'adverbium', 'coniunctio', 'nomen', 'numeramen', 'praepositio', 'pronomen' ] as const
export const casua: string[] = [ 'derectus', 'nominativus', 'genitivus', 'dativus', 'accusativus', 'ablativus', 'vocativus', 'locativus' ] as const
export const modi: string[] = [ 'infinitivus', 'indicativus', 'subiunctivus', 'imperativus', 'participium' ] as const
export const referenda: string[] = [ 'numerus', 'ordinale', 'cardinale', 'adverbium', 'multiplicativum', 'distributivum', 'fractionale' ] as const
export const tempora: string[] = [ 'nullum', 'praesens', 'infectum', 'futurum', 'perfectum', 'plusquamperfectum', 'exigendum' ] as const
export const genera: string[] = [ 'neutrum', 'masculinum', 'femininum' ] as const
export const gradua: string[] = [ 'positivus', 'comparativus', 'superlativus' ] as const
export const personae: string[] = [ 'nulla', 'prima', 'secunda', 'tertia' ] as const
export const numeri: string[] = [ 'nullus', 'singularis', 'pluralis' ] as const
export const voces: string[] = [ 'nulla', 'activa', 'passiva' ] as const
export const facta: string[] = [ 'nullum', 'infinitivum', 'gerundium', 'supinum' ] as const

export type categoria = typeof categoriae[ number ]
export type casus = typeof casua[ number ]
export type modus = typeof modi[ number ]
export type referendum = typeof referenda[ number ]
export type tempus = typeof tempora[ number ]
export type genus = typeof genera[ number ]
export type gradus = typeof gradua[ number ]
export type persona = typeof personae[ number ]
export type numerus = typeof numeri[ number ]
export type vox = typeof voces[ number ]
export type factum = typeof facta[ number ]

export type CATEGORIA = Capitalize<categoria>
export type CASUS = Capitalize<casus>
export type MODUS = Capitalize<modus>
export type REFERENDUM = Capitalize<referendum>
export type TEMPUS = Capitalize<tempus>
export type GENUS = Capitalize<genus>
export type GRADUS = Capitalize<gradus>
export type PERSONA = Capitalize<persona>
export type NUMERUS = Capitalize<numerus>
export type VOX = Capitalize<vox>
export type FACTUM = Capitalize<factum>

export const enclitica: string[] = Object.keys(encliticum)

type Valor = categoria | casus | modus | referendum | tempus | genus | gradus | persona | vox | factum
type VALOR = CATEGORIA | CASUS | MODUS | REFERENDUM | TEMPUS | GENUS | GRADUS | PERSONA | VOX | FACTUM

export function magnificeturPrima (valor: Valor): VALOR {
  return (valor as string).capitalize() as VALOR
}

export function minuatur (valor: VALOR): Valor {
  return (valor as string).toLowerCase()
}

function anglicaCategoria(valor: categoria): string {
  switch(valor) {
    case 'actus': return 'verb'
    case 'adiectivum': return 'adjective'
    case 'adverbium': return 'adverb'
    case 'coniunctio': return 'conjunction'
    case 'nomen': return 'nomen'
    case 'numeramen': return 'numeramen'
    case 'praepositio': return 'preposition'
    case 'pronomen': return 'pronoun'
    default: return ''
  }
}

function anglicusCasus(valor: casus): string {
  switch(valor) {
    case 'derectus': return 'direct'
    default: return `${valor.chop(2)}e`
  }
}

function anglicusModus(valor: modus): string {
  switch(valor) {
    case 'participium': return 'participle'
    default: return `${valor.chop(2)}e`
  }
}

function anglicumReferendum(valor: referendum): string {
  if(valor.endsWith('dinale')) {
    return valor.chop(1)
  } if(valor.endsWith('um')) {
    return `${valor.chop(2)}e`
  }
  switch(valor) {
    case 'numerus': return 'number'
    default: return valor.chop(3)
  }
}

function anglicumTempus(valor: tempus): string {
  switch(valor) {
    case 'nullum': return 'none'
    case 'praesens': return 'present'
    case 'infectum': return 'imperfect'
    case 'futurum': return 'future'
    case 'perfectum': return 'perfect'
    case 'plusquamperfectum': return 'plu-perfect'
    case 'exigendum': return 'future-perfect'
    default: return ''
  }
}

function anglicumGenus(valor: genus): string {
  switch(valor) {
    case 'neutrum': return 'neuter'
    default: return `${valor.chop(2)}e`
  }
}

function anglicusGradus(valor: gradus): string {
  return `${valor.chop(2)}e`
}

function anglicaPersona(valor: persona): string {
  switch(valor) {
    case 'prima': return 'first'
    case 'secunda': return 'second'
    case 'tertia': return 'third'
    default: return 'none'
  }
}

function anglicusNumerus(valor: numerus): string {
  switch(valor) {
    case 'nullus': return 'none'
    default: return `${valor.chop(2)}`
  }
}

function anglicaVox(valor: vox): string {
  switch(valor) {
    case 'nulla': return 'none'
    default: return `${valor.chop(1)}e`
  }
}

export function anglicum(valor: string) {
  if(categoriae.includes(valor)) {
    return anglicaCategoria(valor)
  } if(casua.includes(valor)) {
    return anglicusCasus(valor)
  } if(modi.includes(valor)) {
    return anglicusModus(valor)
  } if(tempora.includes(valor)) {
    return anglicumTempus(valor)
  } if(genera.includes(valor)) {
    return anglicumGenus(valor)
  } if(gradua.includes(valor)) {
    return anglicusGradus(valor)
  } if(personae.includes(valor)) {
    return anglicaPersona(valor)
  } if(numeri.includes(valor)) {
    return anglicusNumerus(valor)
  } if(voces.includes(valor)) {
    return anglicaVox(valor)
  } switch (valor) {
    case 'adiectiva': return 'adjectives'
    case 'casus': return 'case'
    case 'coniunctiones': return 'conjunctions'
    case 'scriptum': return 'form'
    case 'genus': return 'gender'
    case 'gerundium': return 'gerund'
    case 'gerundia': return 'gerunds'
    case 'gradus': return 'grade'
    case 'modus': return 'mode'
    case 'nomina': return 'nouns'
    case 'numeri': return 'numbers'
    case 'numeramina': return 'numerals'
    case 'persona': return 'person'
    case 'positivus': return 'positive'
    case 'praepositiones': return 'prepositions'
    case 'pronomina': return 'pronouns'
    case 'referendum': return 'reference'
    case 'supinum': return 'supine'
    case 'tempus': return 'tense'
    case 'actua': return 'verbs'
    case 'vox': return 'voice'
    case 'verbum': return 'word'
    case 'verba': return 'words'
    default: return 'none'
  }
}

export function inflectenda (categoria: string) {
  return [
    'actus',
    'adiectivum',
    'adverbium',
    'nomen',
    'numeramen',
    'pronomen'
  ].includes(categoria)
}
