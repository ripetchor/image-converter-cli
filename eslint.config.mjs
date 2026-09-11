// @ts-check

import js from "@eslint/js";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig({
  files: ["**/*.{js,ts}"],
  extends: [
    js.configs.recommended,
    tseslint.configs.strictTypeChecked,
    tseslint.configs.stylisticTypeChecked,
    perfectionist.configs["recommended-natural"],
  ],
  languageOptions: {
    parserOptions: {
      projectService: true,
    },
  },
  rules: {
    "perfectionist/sort-imports": "error",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/consistent-type-exports": "error",
    "@typescript-eslint/method-signature-style": ["error", "method"],
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-useless-empty-export": "error",
    "@typescript-eslint/prefer-enum-initializers": "error",
    "@typescript-eslint/no-unnecessary-parameter-property-assignment": "error",
    "@typescript-eslint/require-array-sort-compare": "error",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      { accessibility: "explicit" },
    ],
    "@typescript-eslint/consistent-type-assertions": [
      "error",
      {
        arrayLiteralTypeAssertions: "never",
        assertionStyle: "as",
        objectLiteralTypeAssertions: "never",
      },
    ],
    "@typescript-eslint/no-unnecessary-type-parameters": "off",
    "default-param-last": "off",
    "@typescript-eslint/default-param-last": "error",
  },
});
