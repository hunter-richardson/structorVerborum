import browserify from 'browserify';
import { minifySync, type MinifyResult } from 'oxc-minify';

if(import.meta.env.PROD) {
  const { tsify } = require('tsify')
  const { fs } = require('fs')

  const deObtrectando = {
    compress: {
      keepNames: {
        function: true,
        class: true
      }, treeshake: {
        annotations: false
      }, drop_console: true,
      dropDebugger: true,
      unsued: true,
      joinVars: true,
      sequences: true,
    }, mangle: {
      keepNames: {
        function: true,
        class: true
      }, topLevel: true,
      debug: false
    }, module: false,
    codegen: {
      removeWhitespace: true,
      asciiOnly: true,
      // legalComments: "none",
      mangleProps: {
        debug: false
      }
    }
  }; browserify(['../figura.ts'], {
    degug: false,
    extensions: [ '.ts', '.js', '.jsx', '.tsx' ]
  }).plugin(tsify, { noImplicitAny: true })
    .bundle((error, flumen) => {
      if(error) {
        console.error(`Error struendi: ${error}`)
        process.exit(1)
      } const obtrectatus: MinifyResult = minifySync('../figura.ts', flumen.toString(), deObtrectando)
      if(obtrectatus.code) {
        console.log('Codex obtrectatust')
        fs.writeFileSync('../../dist/fascis.min.js', obtrectatus.code)
      } else console.log(`Errores obtrectandi: ${obtrectatus.errors}`)
    })
}
