import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
//import pluginReact from "eslint-plugin-react"; //uncomment after I change this to a React project
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Global ignores
  {
    ignores: [
      "_site/**",
      "coverage/**",
      "src/scripts/prism.js",
      "css/prism.css",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  // pluginReact.configs.flat.recommended, //uncomment after I change this to a React project
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
    extends: ["css/recommended"],
  },
]);
