import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Reference design-system material, not part of the Next.js app.
    // (wildcard sidesteps an NFC/NFD Unicode normalization mismatch in the folder name)
    "Lumi*re Design System/**",
  ]),
]);

export default eslintConfig;
