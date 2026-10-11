// eslint.config.ts
import eslintComments from "@eslint-community/eslint-plugin-eslint-comments";
import jslint from "@eslint/js";
import { vueTsConfigs as vuetslint, withVueTs } from "@vue/eslint-config-typescript";
import cypresslint from "eslint-plugin-cypress";
import vuelint from "eslint-plugin-vue";
import globals from "globals";
var source = {
  files: ["src/**/*.{ts,vue}"],
  ignores: ["src/cypress/{e2e,fixtures,support}/*"],
  plugins: { "@eslint-community/eslint-comments": eslintComments },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node
    },
    parserOptions: {
      ecmaVersion: "latest",
      tsconfigRootDir: import.meta.dirname,
      projectService: true
    }
  },
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-useless-empty-export": "off",
    "@eslint-community/eslint-comments/require-description": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_+$",
        argsIgnorePattern: "^_+$",
        caughtErrorsIgnorePattern: "^_+$"
      }
    ]
  }
};
var eslint_config_default = withVueTs(
  jslint.configs.recommended,
  cypresslint.configs.recommended,
  vuelint.configs["flat/recommended"],
  vuetslint.recommended,
  source
);
export {
  eslint_config_default as default
};
