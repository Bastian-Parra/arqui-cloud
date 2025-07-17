import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 2022,
      sourceType: "module"
    },
    plugins: {
      js // esto lo registra como plugin para ESLint 9
    },
    rules: {
      ...js.configs.recommended.rules,
      eqeqeq: "error",
      "no-unused-vars": "warn",
      "no-console": "error",
      "no-var": "error",
      "prefer-const": "warn",
      "no-eval": "error"
    }
  },
  {
    files: ["src/utils/logger.js"],
    rules: {
      "no-console": "off"
    }
  }
]);