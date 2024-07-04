import 'cypress';
import { loquatur, type Verbum } from './locutio';

describe('dolet', () => {
  it('doloris ipsius loqueretur', () => {
    const neque: Verbum = {
      categoria: 'coniunctio',
      lemma: 'neque'
    }; const porro: Verbum = {
      categoria: 'adverbium',
      lemma: 'porrō',
      valores: [ 'positivus' ]
    }; const quisquam: Verbum = {
      categoria: 'adiectivum',
      lemma: 'quidque',
      valores: [ 'singularis', 'nominativus', 'masculinum' ]
    }; const est: Verbum = {
      categoria: 'actus',
      lemma: 'esse',
      valores: [ 'indicativus', 'praesens', 'singularis', 'tertia' ]
    }; const qui: Verbum = {
      categoria: 'pronomen',
      lemma: 'quid',
      valores: [ 'singularis', 'nominativus', 'masculinum' ]
    }; const dolorem: Verbum = {
      categoria: 'nomen',
      lemma: 'dolor',
      valores: [ 'singularis', 'accusativus' ]
    }; const ipsum: Verbum = {
      categoria: 'pronomen',
      lemma: 'ipsum',
      valores: [ 'singularis', 'accusativus', 'masculinum' ]
    };

    loquatur({
      locutio: 'Neque porrō quisquam est quī dolōrem ipsum',
      verba: [
        neque, porro, quisquam, est, qui, dolorem, ipsum
      ]
    });

    const quia: Verbum = {
      categoria: 'coniunctio',
      lemma: 'quia'
    }; const dolor: Verbum = {
      categoria: 'nomen',
      lemma: 'dolor',
      valores: [ 'singularis', 'nominativus' ]
    }; const sit: Verbum = {
      categoria: 'actus',
      lemma: 'esse',
      valores: [ 'subiunctivus', 'praesens', 'singularis', 'tertia' ]
    }; const amet: Verbum = {
      categoria: 'actus',
      lemma: 'amāre',
      valores: [ 'subiunctivus', 'activa', 'infectum', 'singularis', 'tertia' ]
    }; const consectetur: Verbum = {
      categoria: 'actus',
      lemma: 'cōnsectārī',
      valores: [ 'subiunctivus', 'praesens', 'singularis', 'tertia' ]
    }; const adipisci: Verbum = {
      categoria: 'actus',
      lemma: 'adipīscī',
      valores: [ 'infinitivus', 'praesens' ]
    }; const velit: Verbum = {
      categoria: 'actus',
      lemma: 'velle',
      valores: [ 'subiunctivus', 'praesens', 'singularis', 'tertia' ]
    };

    loquatur({
      locutio: 'Quia dolor sit amet cōnsectetur adipīscī velit',
      verba: [
        quia, dolor, sit, amet, consectetur, adipisci, velit
      ]
    });

    const sed: Verbum = {
      categoria: 'coniunctio',
      lemma: 'sed'
    }; const non: Verbum = {
      categoria: 'coniunctio',
      lemma: 'nōn'
    }; const numquam: Verbum = {
      categoria: 'adverbium',
      lemma: 'numquam',
      valores: [ 'positivus' ]
    }; const eius: Verbum = {
      categoria: 'pronomen',
      lemma: 'id',
      valores: [ 'singularis', 'genitivus' ]
    }; const modi: Verbum = {
      categoria: 'nomen',
      lemma: 'modus',
      valores: [ 'singularis', 'genitivus' ]
    }; const tempora: Verbum = {
      categoria: 'nomen',
      lemma: 'tempus',
      valores: [ 'pluralis', 'nominativus' ]
    }; const incidunt: Verbum = {
      categoria: 'actus',
      lemma: 'incidere',
      valores: [ 'indicativus', 'praesens', 'pluralis', 'tertia' ]
    };

    loquatur({
      locutio: 'Sed quia nōn numquam eius modī tempora incidunt',
      verba: [
        sed, quia, non, numquam, eius, modi, tempora, incidunt
      ]
    });

    const ut: Verbum = {
      categoria: 'coniunctio',
      lemma: 'ut'
    }; const labore: Verbum = {
      categoria: 'nomen',
      lemma: 'labor',
      valores: [ 'singularis', 'ablativus' ]
    }; const et: Verbum = {
      categoria: 'coniunctio',
      lemma: 'et'
    }; const dolore: Verbum = {
      categoria: 'nomen',
      lemma: 'dolor',
      valores: [ 'singularis', 'ablativus' ]
    }; const magnam: Verbum = {
      categoria: 'nomen',
      lemma: 'magnum',
      valores: [ 'singularis', 'accusativus', 'femininum' ]
    }; const aliquam: Verbum = {
      categoria: 'pronomen',
      lemma: 'aliquid',
      valores: [ 'singularis', 'accusativus', 'femininum' ]
    }; const quaerat: Verbum = {
      categoria: 'actus',
      lemma: 'quaerere',
      valores: [ 'subiunctivus', 'activa', 'praesens', 'singularis', 'tertia' ]
    }; const voluptatem: Verbum = {
      categoria: 'nomen',
      lemma: 'voluptās',
      valores: [ 'singularis', 'accusativus' ]
    };

    loquatur({
      locutio: 'Ut labōre et dolōre magnam aliquam quaerat voluptātem',
      verba: [
        ut, labore, et, dolore, magnam, aliquam, quaerat, voluptatem
      ]
    });
  });
});
