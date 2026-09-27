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

export const enclitica: string[] = Object.keys(encliticum)

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
