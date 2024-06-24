export enum Encliticum {
  Interrogans = 'ne',
  Coniugans = 'que',
  Eligens = 've'
}

export enum Mensa {
  Ianuarius = 1,
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

export const acta: string[] = ['infintivus', 'gerundium', 'supinum'];
export const genera: string[] = ['neutrum', 'masculinum', 'femininum'];
export const gradi: string[] = ['positivus', 'comparativus', 'superlativus'];
export const personae: string[] = ['prima', 'secunda', 'tertia'];
export const numeri: string[] = ['singularis', 'pluralis'];
export const voces: string[] = ['activa', 'passiva'];

export const categoriae: string[] = [
  'actus',
  'adiectivum',
  'adverbium',
  'coniunctio',
  'nomen',
  'numeramen',
  'numerus',
  'praepositio',
  'pronomen'
];

export const casus: string[] = [
  'derectus',
  'nominativus',
  'genitivus',
  'dativus',
  'accusativus',
  'ablativus',
  'vocativus',
  'locativus'
];

export const modi: string[] = [
  'indicativus',
  'subiunctivus',
  'infinitivus',
  'imperativus',
  'participalis'
];

export const referenda: string[] = [
  'numerus',
  'ordinale',
  'cardinale',
  'adverbium',
  'multiplicativum',
  'distributivum',
  'fractionale'
];

export const tempora: string[] = [
  'praesens',
  'infectum',
  'futurum',
  'perfectum',
  'plusquamperfectum',
  'exigendum'
];

export function anglicum(valor: string) {
  switch (valor) {
    case 'actus':
      return 'verb';
    case 'adiectivum':
      return 'adjective';
    case 'adverbium':
      return 'adverb';
    case 'coniunctio':
      return 'conjunction';
    case 'nomen':
      return 'noun';
    case 'numeramen':
    case 'numerus':
      return 'numeral';
    case 'praepositio':
      return 'preposition';
    case 'pronomen':
      return 'pronoun';
    case 'derectus':
      return 'direct';
    case 'nominativus':
      return 'nominative';
    case 'genitivus':
      return 'genitive';
    case 'dativus':
      return 'dative';
    case 'accusativus':
      return 'accusative';
    case 'ablativus':
      return 'ablative';
    case 'locativus':
      return 'locative';
    case 'vocativus':
      return 'vocative';
    case 'infinitivus':
      return 'infinitive';
    case 'gerundium':
      return 'gerund';
    case 'supinum':
      return 'supine';
    case 'neutrum':
      return 'neuter';
    case 'masculinum':
      return 'masculine';
    case 'femininum':
      return 'feminine';
    case 'positivus':
      return 'positive';
    case 'comparativus':
      return 'comparative';
    case 'superlativus':
      return 'superlative';
    case 'indicativus':
      return 'indicative';
    case 'subiunctivus':
      return 'subjunctive';
    case 'imperativus':
      return 'imperative';
    case 'participalis':
      return 'participle';
    case 'singularis':
      return 'singular';
    case 'pluralis':
      return 'plural';
    case 'ordinale':
      return 'ordinal';
    case 'cardinale':
      return 'cardinal';
    case 'distributivum':
      return 'distributive';
    case 'multiplicativum':
      return 'multiplicative';
    case 'fractionale':
      return 'fractional';
    case 'prima':
      return 'first';
    case 'secunda':
      return 'second';
    case 'tertia':
      return 'third';
    case 'praesens':
      return 'present';
    case 'infectum':
      return 'imperfect';
    case 'futurum':
      return 'future';
    case 'perfectum':
      return 'perfect';
    case 'plusquamperfectum':
      return 'plu-perfect';
    case 'exigendum':
      return 'future-perfect';
    case 'activa':
      return 'active';
    case 'passiva':
      return 'passive';
    case 'modus':
      return 'mode';
    case 'vox':
      return 'voice';
    case 'tempus':
      return 'tense';
    case 'persona':
      return 'person';
    case 'genus':
      return 'gender';
    case 'gradus':
      return 'grade';
    case 'casus':
      return 'case';
    case 'actum':
    case 'referendum':
      return 'reference';
    case 'scriptum':
      return 'form'
    default:
      return '';
  }
}
