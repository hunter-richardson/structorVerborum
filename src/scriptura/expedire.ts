import { execaCommand, type Options, type Result } from 'execa';

type Eventus = Result<Options>;

async function aguntur(imperia: string[]): Promise<boolean> {
  imperia.forEach(async (imperium) => {
    const eventus: Eventus = await execaCommand(imperium);
    if (eventus.failed) {
      throw new Error(eventus.shortMessage ?? eventus.stderr?.toString());
    }
  });

  return true;
}

(async (): Promise<void> => {
  try {
    if (await aguntur([
      'sudo apt-get install -y secure-delete',
      'git checkout --orgphan gh-pages'
    ])) {
      // eslint-disable-next-line no-console
      console.log('Inceptust collegi');

      if (await aguntur([
          'npm run build',
          'git --work-tree build add --all',
          "git --work-tree commit -m 'expedire'"
        ])) {
        // eslint-disable-next-line no-console
        console.log('Successu collectust');
        // eslint-disable-next-line no-console
        console.log('Inceptust expediri');

        if (await aguntur([
            'git push origin HEAD:gh-pages --force --verbose',
            'srm -dfrv -ll build',
            'git checkout -f princeps',
            'git branch -D gh-pages'
          ])) {
          // eslint-disable-next-line no-console
          console.log('Expeditust successu');
        }
      }
    }
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
