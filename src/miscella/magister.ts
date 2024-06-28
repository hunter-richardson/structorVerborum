import file from 'file-fetch';
import { marked, type Tokens } from 'marked';
import path from 'path';
import Cocutor from './cocutor';
import Ignavum from './ignavum';
import Nuntius from './nuntius';

@Nuntius.factum('Magister')
export default class Magister {
  static se: Ignavum<Magister> = new Ignavum(() => new Magister);

  private viator (via: string): string {
    const lingua: string = Cocutor.se.ipse().edatur('lingua') ?? 'latina';
    return path.join('/res/docenda', lingua, via).concat('.md');
  }

  private async aperiatur (via: string): Promise<string> {
    const corpus: Body = await file(new URL(this.viator(via)));
    return (corpus as Response).ok ? (await corpus.text()).trim() : '';
  }

  @Nuntius.futurus('Magister')
  async doceatur (docendum: string): Promise<string> {
    docendum = docendum.toLowerCase().trim();

    const redditor = new marked.Renderer();
    redditor.link = function (optanda: Tokens.Link): string {
      return marked.Renderer.prototype.link(optanda)
        .replace('>', "target='_blank' >");
    };

    const data: string = await marked.use({
      async: true,
      pedantic: true,
      renderer: redditor
    }).parse(await this.aperiatur(docendum));

    const nuntiator: (parametra: object) => void = data ? Nuntius.plusGarrio : Nuntius.timeo;
    const nuntium: string = data ? 'Docendum relatust ' : 'Nihil docendust valore ';

    nuntiator({
      nomen: 'Magister',
      nuntium: nuntium.concat(docendum)
    });

    return data;
  }
}
