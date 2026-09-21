import file from 'file-fetch';
import path from 'path';
import { crustula } from './crustula';
import Ignavum from './ignavum';
import Nuntius from './nuntius';
import { marked, type MarkedExtension, type Tokens } from 'marked';

@Nuntius.factum('Magister')
class Magister {
  private static optentur (): MarkedExtension {
    const redditor = new marked.Renderer()
    redditor.link = function (optanda: Tokens.Link): string {
      return marked.Renderer.prototype.link(optanda)
        .replace('>', "target='_blank' >")
    }

    return {
      async: true,
      pedantic: true,
      renderer: redditor
    }
  }

  private viator (via: string): string {
    const lingua: string = crustula.hoc().lingua.edatur()
    return `${path.join('/res/docenda', lingua, via)}.md`
  }

  private async aperiatur (via: string): Promise<string> {
    const corpus: Body = await file(new URL(this.viator(via)))
    return (corpus as Response).ok ? (await corpus.text()).trim() : ''
  }

  @Nuntius.futurus('Magister')
  async doceatur (docendum: string): Promise<string> {
    docendum = docendum.toLowerCase().trim()

    const data: string = await marked.use(Magister.optentur()).parse(await this.aperiatur(docendum));
    (data ? Nuntius.plusGarrio : Nuntius.timeo)({
      nomen: 'Magister',
      nuntium: `${data ? 'Docendum relatust' : 'Nihil docendust valore'} ${docendum}`
    })

    return data
  }
}

export const magister = new Ignavum(Magister)
