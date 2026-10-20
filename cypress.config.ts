import { defineConfig } from 'cypress';
import installLogsPrinter from 'cypress-terminal-report/src/installLogsPrinter';

export default defineConfig({
  e2e: {
    specPattern: 'src/cypress/{componenta,a_capite_ad_caupam}/*.ts',
    baseUrl: 'http://localhost:4173',
    setupNodeEvents(de, figura) {
      installLogsPrinter(de, {
        outputRoot: `${figura.projectRoot}/cypress/logs`,
        outputTarget: { 'tentamina.log': 'txt' },
        printLogsToFile: 'always',
        compactLogs: undefined
      }); return figura
    }
  }
})
