import 'cypress';
import { loquatur } from './locutio';

describe('Carthago delendast', () => {
  it('Carthaginem delerendi loqueretur', () => {
    loquatur({
      locutio: 'Cēterum autem cēnseō Carthāginem esse dēlendam',
      verba: [ {
          categoria: 'nomen',
          lemma: 'cēterum',
          valores: [ 'singularis', 'nominativus' ]
        }, {
          categoria: 'coniunctio',
          lemma: 'autem'
        }, {
          categoria: 'actus',
          lemma: 'cēnsēre',
          valores: [ 'indicativus', 'activa', 'praesens', 'singularis', 'prima' ]
        }, {
          categoria: 'nomen',
          lemma: 'Carthāgō',
          valores: [ 'singularis', 'accusativus' ]
        }, {
          categoria: 'actus',
          lemma: 'esse',
          valores: [ 'infinitivus', 'praesens' ]
        }, {
          categoria: 'actus',
          lemma: 'dēlēre',
          valores: [ 'participium', 'passiva', 'futurum' ],
          sequendum: {
            categoria: 'adiectivum',
            lemma: 'participium',
            valores: [ 'singularis', 'accusativus', 'femininum' ]
          }
        }
      ]
    });
  });
});
